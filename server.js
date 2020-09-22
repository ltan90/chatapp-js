const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { addUser, removeUser, getUser }  = require('./utils/users');
const { clear } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatBot';
//Run when client connects
io.on('connection', socket => {
    //Join Room
    socket.on('joinRoom', ({ username, userInfo, room }) => {
        
        const user = addUser({id: socket.id, username, userInfo, room});
        
        socket.join(user.room);

        //Welcome current user
        if(user.userInfo.roles !== 'sales'){
            socket.emit('message', formatMessage(botName, `Thank you for messaging us. How can we help you?`));
        }
        setTimeout(function(){
            socket.emit('message', formatMessage(botName, `<span class="waiting-customer">Please wait!<br/> We are finding a Customer Service agent to assist you</span>`));
        }, 5000);
        setTimeout(function(){
            socket.emit('message', formatMessage(botName, `<span class="please-oops">Oops...It seems to be taking more than usual.<br/>Please hold</span>`));
        }, 10000);
        if(user.userInfo.roles === 'sales'){
            //Broadcast when a use connects
            socket.broadcast.to(user.room).emit('message', formatMessage(botName, `<span class="chat-now">You are now chatting with ${user.userInfo.fullname} - ${user.userInfo.position}</span>`, user.userInfo));
        }
    });
    
    //Listen chat message in client
    socket.on('chatMessage', msg => {
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', formatMessage(user.username, msg));

    });

    //When a client disconnect
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('message', formatMessage(user.username, `${user.username} has left.`));        
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));