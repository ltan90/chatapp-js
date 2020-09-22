const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io('localhost:3000');

//Join chat room
socket.emit('joinRoom', {username, room});

//Message from server
socket.on('message', (message) => {
    const name = {username};
    outputMessage(message, name.username);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const inputMessage = e.target.elements.msg;
    const msg = inputMessage.value;
    
    //Emit message to server
    socket.emit('chatMessage', msg);

    //Clear input
    inputMessage.value = '';
    inputMessage.focus();
});
//Output message to DOM
function outputMessage(message, name){    
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(message.username === trimmedName){
        isSentByCurrentUser = true;
    }

    const div = document.createElement('div');
    if(isSentByCurrentUser){
        div.classList.add('message','message-end');
        div.innerHTML = `<p class="meta">${trimmedName}</p>
                        <div class="text">
                            ${message.text}
                        </div>`;
    }else{
        div.classList.add('message','message-start');
        div.innerHTML = `<p class="meta">${message.username}</p>
                        <div class="text">
                            ${message.text}
                        </div>`;
    }
    
    document.querySelector('.chat-messages').appendChild(div);    
}