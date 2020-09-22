/*Check html*/
function isHTML(str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}
/*Chat app*/
function getFile(){
    let attach = document.getElementById('file');
    let file = '';
    if('files' in attach){
        file = attach.files[0].name;
    }
    let text = document.createElement('div');
    text.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp-customer-file"><span>'
                    + '<a href="'+file+'" download>'+file+'</a>'
                    + '</span></div>';
    document.querySelector('.chatapp-content-js').appendChild(text);   
    scrollToBottomChatApp(); 
}
//Toggle ChatApp icon
let toggleChatApp = document.querySelectorAll('.chatapp-close-js');
for(let i = 0; i < toggleChatApp.length; i++){
    toggleChatApp[i].addEventListener('click', function(){
        document.querySelector('.chatapp__icon').classList.toggle('chatapp-hidden');
        document.querySelector('.panel').classList.toggle('panel-active');
    });
}
//Toggle Cart Detail
function toggleCartDetail(){
    let toggleEl = document.querySelectorAll('.toggle-chatapp-cart-js');
    for(i = 0; i < toggleEl.length; i++){
        toggleEl[i].addEventListener('click', function(){
            this.classList.toggle('order__coupon__title--checkout');
            this.nextElementSibling.classList.toggle('products-active');
        });
    }
}
//User login
var t,t1,t2,t3;
let toggleLoginChatApp = document.querySelectorAll('.chatapp-login-js');
for(let i = 0; i < toggleLoginChatApp.length; i++){
    toggleLoginChatApp[i].addEventListener('submit', function(e){
        e.preventDefault();
        let emailLogin = this['email'];
        if(emailLogin.value === ''){
            emailLogin.classList.add('panel__input--error');
            emailLogin.focus();
            return false;
        }
        sessionStorage.setItem('emailUser', this['email'].value);
        emailLogin.value = '';
        let loginEmail = sessionStorage.getItem('emailUser');
        if(loginEmail !== ''){
            document.querySelector('.chatapp-logo').classList.add('chatapp-hidden');
            document.querySelector('.chatapp-form').parentElement.classList.remove('panel__body--login');
            document.querySelector('.chatapp-form').classList.add('chatapp-hidden');
            document.querySelector('.panel__title').innerText = "Live Chat";
            document.querySelector('.panel').classList.add('panel--system');
            document.querySelector('.chatapp-system').classList.remove('chatapp-visible');                    
            document.querySelector('.chatapp-message-js').firstElementChild.removeAttribute('readonly');
            document.querySelector('.chatapp-message-js').firstElementChild.nextElementSibling.removeAttribute('disabled');
            document.querySelector('.file').removeAttribute('disabled');
            document.querySelector('.footer-active-js').firstElementChild.nextElementSibling.classList.add('search-product-js');                           
            let thank = document.createElement('div');
            thank.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp-thank"><span>Thank you for messaging us. How can we help you?</span></div>';
            document.querySelector('.chatapp-content-js').appendChild(thank); 
            t = setTimeout(function(){
                let service = document.createElement('div');
                service.innerHTML = '<p class="text-center chatapp__text chatapp-service">Please wait!<br/>We are finding a Customer Service agent to assist you</p>';
                document.querySelector('.chatapp-content-js').appendChild(service); 
                scrollToBottomChatApp();  
            }, 60000); 
            t1 = setTimeout(function(){
                let oops = document.createElement('div');
                oops.innerHTML = '<p class="text-center chatapp__text chatapp-oops">Oops...It seems to be taking more than usual.<br/>Please hold</p>';
                document.querySelector('.chatapp-content-js').appendChild(oops);
                scrollToBottomChatApp();
            }, 120000);  
            t2 = setTimeout(function(){
                let sale = document.createElement('div');
                sale.innerHTML = '<p class="text-center chatapp__text chatapp__text--sales chatapp-sales">You are now chatting with Jasmine Tran - Keto Consultant</p>';
                document.querySelector('.chatapp-content-js').appendChild(sale);       
                if(document.querySelector('.chatapp-service')) document.querySelector('.chatapp-service').parentElement.remove();
                if(document.querySelector('.chatapp-oops')) document.querySelector('.chatapp-oops').parentElement.remove();
                document.querySelector('.panel__title').innerText = "Jasmine Tran";
                document.querySelector('.panel__name').innerText = "Keto Consultant";
                scrollToBottomChatApp();
            }, 180000);
            t3 = setTimeout(function(){
                if(document.querySelector('.chatapp-sales')) document.querySelector('.chatapp-sales').parentElement.remove();
            }, 182000);
        }
    });
}
//Close ChatApp
document.querySelector('.chatapp-session-js').addEventListener('click', function(){
    sessionStorage.removeItem('emailUser');
    clearTimeout(t);
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    document.querySelector('.chatapp-logo').classList.remove('chatapp-hidden');
    document.querySelector('.chatapp-form').parentElement.classList.add('panel__body--login');
    document.querySelector('.chatapp-form').classList.remove('chatapp-hidden');    
    document.querySelector('.panel').classList.remove('panel--system');
    document.querySelector('.chatapp-system').classList.add('chatapp-visible');                    
    document.querySelector('.chatapp-message-js').firstElementChild.setAttribute('readonly','readonly');
    document.querySelector('.chatapp-message-js').firstElementChild.nextElementSibling.setAttribute('disabled','disabled');
    document.querySelector('.file').setAttribute('disabled','disabled');
    document.querySelector('.footer-active-js').firstElementChild.nextElementSibling.classList.remove('search-product-js');
    document.querySelector('.chatapp-content-js').innerHTML = '';
    document.querySelector('.panel').classList.remove('panel-active');
    document.querySelector('.chatapp__icon').classList.remove('chatapp-hidden');
    document.querySelector('.panel__title').innerText = "";
    document.querySelector('.panel__name').innerText = "";
});
//Send message
const messages = document.getElementById('messages');
document.querySelector('.chatapp-message-js').addEventListener('submit', function(e){
    e.preventDefault();
    //The first chat customer: Hi, I want to know some info of Keto menu package. Can you help?
    if(this['message'].value === ''){
        this.focus();
    }else{
        let message = this['message'].value; 
        let shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight; 
        let content = '';
        if(isHTML(message)){ 
            content = document.createElement('div');
            if(message.includes("shop-cart")){     
                content.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp__order chatapp__order--cart">'
                                        + '<div class="chatapp__order__head">'
                                            + '<h4 class="order__heading">Your cart</h4>'
                                        + '</div>'
                                        + '<div id="chatapp-body">'
                                            + message
                                        + '</div>'
                                    + '</div>';
                document.querySelector('.chatapp-content-js').appendChild(content); 
                confirmCartChatApp();
                openEditConfirm();
                scrollToBottomChatApp();
            }else if(message.includes("shipping-billing")){            
                content.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp__order chatapp-change-info-js">'
                                        + '<div class="chatapp__order__body chatapp__order__body--bill">'
                                            + '<h2 class="order__secondary">Shipping and billing information</h2>'
                                            + message
                                        + '</div>'
                                        +  '<div class="chatapp__order__foot">'
                                            + '<div class="order__button">'
                                                + '<a href="#" class="btn btn--green chatapp-confirm-billing-js">Confirm</a>'
                                                + '<a href="chatapp/checkout-customer-shipping-billing.html" class="btn btn--grey chatapp-edit-js">Edit Info</a>'
                                            + '</div>'
                                        + '</div>'
                                    +'</div>';
                document.querySelector('.chatapp-content-js').appendChild(content);      
                openEditConfirm();
                confirmInformation();
                scrollToBottomChatApp();
            }else if(message.includes("shipping-method")){
                content.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp__order">'
                                        + '<div class="chatapp__order__body chatapp__order__body--bill">'
                                            + '<h2 class="order__secondary">Shipping Method</h2>'
                                            + message                                            
                                        + '</div>'
                                        +  '<div class="chatapp__order__foot">'
                                            + '<div class="order__button">'
                                                + '<a href="#" class="btn btn--green chatapp-confirm-shipping-js">Confirm</a>'
                                            + '</div>'
                                        + '</div>'
                                    +'</div>';
                document.querySelector('.chatapp-content-js').appendChild(content);      
                scrollToBottomChatApp();
                activeShippingMethod();
                confirmInShippingMethod();
            }else if(message.includes('order-summary')){
                content.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp__order chatapp__order--coupon">'
                                        + '<div class="chatapp__order__body chatapp__order__body--coupon chatapp__order--products">'
                                            + '<h2 class="order__secondary">Order Summary</h2>'
                                            + message                                            
                                        + '</div>'
                                        +  '<div class="chatapp__order__foot">'
                                            + '<div class="order__button">'
                                                + '<a href="#" class="btn btn--green chatapp-confirm-order-js">Confirm</a>'
                                            + '</div>'
                                        + '</div>'
                                    +'</div>';
                document.querySelector('.chatapp-content-js').appendChild(content);      
                scrollToBottomChatApp();      
                toggleCartDetail();   
                confirmOrderSummary();
            }
        }else{
            switch (message){
                case 'Could you help me make an order?':
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);
                    scrollToBottomChatApp();            
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>Sure, what kind of products do you want to purchase?</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();
                    }, 2000);
                    clearTimeout(t);
                    clearTimeout(t1);
                    clearTimeout(t2);
                    clearTimeout(t3);
                    break;
                case 'I want to purchase an Dr. Berg’s Chewable Vitamin C Complex by Dr.Berg':
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);            
                    scrollToBottomChatApp();
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--product chatapp__box--product-sales chatapp-customer-product">'
                                            + '<span><p class="search__item mb-0">' 
                                                + '<img width="40" class="search__img" src="../assets/images/demo/vitaminc_3d1.jpg" alt="">'
                                                + '<a class="search__link" href="#">Dr. Berg’s Chewable Vitamin C Complex</a>'
                                                + '<span class="search__price">'
                                                    + '<span class="search__price__discount">$34.95</span><br/>'
                                                    + '<span class="search__price__special">$29.95</span>'
                                                + '</span>'
                                            + '</p></span></div>';   
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();
                    }, 2000);
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>Do you mean this one?</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();                
                    }, 4000);
                    break;
                case 'Yes, that one':
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);
                    scrollToBottomChatApp();
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>How many bottle do you want?</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();
                    }, 2000);
                    break;
                case 'one, please':
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);
                    scrollToBottomChatApp();
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>anything else?</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();                
                    }, 2000);
                    break;
                case 'and a bottle for D3 & K2 Vitamin':            
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);            
                    scrollToBottomChatApp();
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--product chatapp__box--product-sales chatapp-customer-product">'
                                            + '<span><p class="search__item mb-0">' 
                                                + '<img width="40" class="search__img" src="../assets/images/demo/ezgif-6-ce53ced53df3.jpg" alt="">'
                                                + '<a class="search__link" href="#">D3 & K2 Vitamin</a>'
                                                + '<span class="search__price">'
                                                    + '<span class="search__price__discount">$42.65</span><br/>'
                                                    + '<span class="search__price__special">$34.12</span>'
                                                + '</span>'
                                            + '</p></span></div>';   
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();
                    }, 2000);
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>Do you mean this one?</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);  
                        scrollToBottomChatApp();
                    }, 4000);
                    break;
                case 'Yes, that one. 1 bottle, please':
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);            
                    scrollToBottomChatApp();        
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>Ok, Anything else?</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();
                    }, 2000);
                    break;
                case "That's all. Thanks":
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);
                    scrollToBottomChatApp();            
                    setTimeout(function(){
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>Okay. Please wait a minute.</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);  
                        scrollToBottomChatApp();
                    }, 2000);
                    setTimeout(function(){                
                        content = document.createElement('div');
                        content.innerHTML = '<div class="chatapp__box chatapp__box--system"><span>Here is your cart, please check and press Confirm button if you agree to purcharse those.</span></div>';
                        document.querySelector('.chatapp-content-js').appendChild(content);   
                        scrollToBottomChatApp();
                    }, 8000);
                    break;
                case "I don't coupon code":            
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);            
                    scrollToBottomChatApp();
                    demoMessageOrderSummary();
                    break;
                default:
                    content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer"><span>'+message+'</span></div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);                    
                    scrollToBottomChatApp();
                    break;
            } 
        }
        this['message'].value = '';
    }       
});
//Edit Cart Info
function openEditConfirm(){
    let popup;
    let openWebConfirm = document.querySelectorAll('.chatapp-edit-js');
    for(let i = 0; i < openWebConfirm.length; i++){
        openWebConfirm[i].addEventListener('click', function(e){
            e.preventDefault();
            popup = window.open(this.href, "Popup", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=250,width=1023,height=650");
            return false;
        });
    }
}
//View Cart Sales
function viewCartSales(){
    let cartArray = shoppingCart.listCart();
    let viewCartChatApp = '';
    for(let i in cartArray) {
        let priceDiscount = cartArray[i].product.price_discount !== undefined ? '<span class="order__price__discount">$'+cartArray[i].product.price_discount+'</span>' : '';
        viewCartChatApp += "<div class='row'>"
                    + "<div class='col__4 col__sm__3 text-center pr-0'>"
                        + "<img src='"+cartArray[i].product.image+"' alt='"+ cartArray[i].product.name +"' width='100%'>"
                    + "</div>"
                    + "<div class='col__8 col__sm__9'>" 
                        + "<p class='products__quantity'>x"+cartArray[i].count+"</p>"                       
                        + "<a href='#' class='products__title'>"+ cartArray[i].product.name +"</a>"
                        + "<p class='order__price'>"
                            + '<span class="order__price__special">$'+cartArray[i].product.price+'</span>'
                            + priceDiscount
                        +"</p>"
                    + "</div>"
                +  "</div>";
    }
    let subTotalHtml = '<span class="info__label">Subtotal</span>'
                        + '<span class="info__price">$<span id="subtotal-cart-js">'+shoppingCart.subTotalCart()+'</span></span>';
    let discountHtml = '<label class="info__label">Discount</label>'
                        + '<label class="info__label">-$<span id="total-discount-js">'+shoppingCart.totalDiscount()+'</span></label>';
    let productHtml = '<label class="info__label">Product cost:</label>'
                        + '<label class="info__label">$<span id="product-cost-js" class="total-cart-js">'+shoppingCart.totalCart()+'</span></label>';
    let subTotalCartHtml = '<label class="info__label">Total: '+shoppingCart.totalCount()+' <span>product</span></label>'
                        + '<label class="info__price">$'+shoppingCart.subTotalCart()+'</label>';
    if(document.getElementById('chatapp-product')) document.getElementById('chatapp-product').innerHTML = viewCartChatApp;
    if(document.querySelector('.show-cart-js')) document.querySelector('.show-cart-js').innerHTML = viewCartChatApp;
    if(document.querySelector('.chatapp-subtotal-js')) document.querySelector('.chatapp-subtotal-js').innerHTML = subTotalCartHtml;
    if(document.querySelector('.chatapp-order-product-js')) document.querySelector('.chatapp-order-product-js').innerHTML = productHtml;
    if(document.querySelector('.chatapp-order-discount-js')) document.querySelector('.chatapp-order-discount-js').innerHTML = discountHtml;
    if(document.querySelector('.chatapp-subtotal-order-js')) document.querySelector('.chatapp-subtotal-order-js').innerHTML = subTotalHtml;                                                     
}
//Search product
document.querySelector('.active-search-js').addEventListener('click', function(e){
    e.stopPropagation();
    this.firstElementChild.classList.add('chatapp__form--active');
    searchProduct();
});
let html = '';
for(let i in chatappProducts){
    html += '<li class="search__item search__radius">'
            + '<div class="search__item__col">'
                + '<img width="40" data-img="'+chatappProducts[i].image +'" class="search__img" src="'+chatappProducts[i].image+'" alt="">'
                + '<a class="search__link" href="#">'+chatappProducts[i].name+'</a>'
            + '</div>'
            + '<div class="search__item__col">'
                + '<span class="search__price" data-discount="'+chatappProducts[i].price_discount+'" data-special="'+chatappProducts[i].price+'">'
                    + '<span class="search__price__discount">$'+chatappProducts[i].price_discount+'</span><br/>'
                    + '<span class="search__price__special">$'+chatappProducts[i].price+'</span>'
                + '</span>'
                + '<button class="btn__send send-product-js">Send</button>'
            + '</div>'
        + '</li>';
}
let listProduct = document.createElement('div');         
listProduct.innerHTML = '<ul id="autocomplete-products-js" class="search__list" style="display: none;">'+html+'</ul>';
document.querySelector('.search-list-js').appendChild(listProduct);
function searchProduct() {
    document.getElementById('search-product').addEventListener('keyup', function(e){
        var filter, ul, li, a, i, txtValue;               
        filter = this.value.toUpperCase();
        ul = document.getElementById("autocomplete-products-js");
        if(filter !== ''){
            ul.style.display = 'block';
        }else{
            ul.style.display = 'none';
        }
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });
}
//Send product in content chatapp
function sendProductChatApp(){
    let sendProducts = document.querySelectorAll('.send-product-js');
    for(let i = 0; i < sendProducts.length; i++){
        sendProducts[i].addEventListener('click', function(e){
            e.preventDefault();
            let srcImg = this.parentElement.previousElementSibling.firstElementChild.getAttribute('data-img');
            let contentLink = this.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent;
            let priceDiscount = this.previousElementSibling.getAttribute('data-discount');
            let priceSpecial = this.previousElementSibling.getAttribute('data-special');
            let ele = document.createElement('div');
            ele.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__box--product chatapp-customer-product">'
                            + '<span><p class="search__item mb-0">' 
                                + '<img width="40" class="search__img" src="'+srcImg+'" alt="">'
                                + '<a class="search__link" href="#">'+contentLink+'</a>'
                                + '<span class="search__price">'
                                    + '<span class="search__price__discount">$'+priceDiscount+'</span><br/>'
                                    + '<span class="search__price__special">$'+priceSpecial+'</span>'
                                + '</span>'
                            + '</p></span></div>';                        
            document.querySelector('.chatapp-content-js').appendChild(ele);  
            scrollToBottomChatApp();    
        });
    }
}
sendProductChatApp();
//Confirm Your cart
function confirmCartChatApp(){
    document.querySelector('.chatapp-confirm-js').addEventListener('click', function(e){
        e.preventDefault();
        let button, listProduct, content;
        button = this.parentElement.style.display = 'none';
        listProduct = this.parentElement.parentElement.parentElement.innerHTML;
        content = document.createElement('div');
        content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order chatapp__order--cart">'
                            + '<div class="chatapp__order__head">'
                                + '<h4 class="order__heading order__heading--confirm">Confirmed Cart</h4>'
                            + '</div>'
                            + listProduct
                        +'</div>';
        document.querySelector('.chatapp-content-js').appendChild(content);
        scrollToBottomChatApp();
        demoBillingChatApp();
    });
}
function demoBillingChatApp(){
    setTimeout(function (){
        let messageBilling = document.createElement('div');
        messageBilling.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp-thank"><span>Please verify your Shipping and Billing info.</span></div>';
        document.querySelector('.chatapp-content-js').appendChild(messageBilling);  
        scrollToBottomChatApp();
    }, 2000);
}
//Confirm Billing in ChatApp
function confirmInformation(){
    document.querySelector('.chatapp-confirm-billing-js').addEventListener('click', function(e){
        e.preventDefault();
        let button, informationBody, content;
        button = this.parentElement.parentElement.style.display = 'none';        
        informationBody = this.parentElement.parentElement.parentElement.innerHTML;
        content = document.createElement('div');
        content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order">'
                            + '<div class="chatapp__order__head">'
                                + '<h4 class="order__heading order__heading--confirm">Confirmed Information</h4>'
                            + '</div>'
                            + informationBody
                        +'</div>';
        document.querySelector('.chatapp-content-js').appendChild(content);
        scrollToBottomChatApp();
        demoShippingMethod();
    });
}
function demoShippingMethod(){
    setTimeout(function (){
        let messageBilling = document.createElement('div');
        messageBilling.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp-thank"><span>Here is your Shipping Method, please check and press Confirm button if you agree to this Shipping Method</span></div>';
        document.querySelector('.chatapp-content-js').appendChild(messageBilling);  
        scrollToBottomChatApp();        
    }, 2000);
}
/*Active shipping*/
function activeShippingMethod(){
    let activeShipping = document.querySelectorAll('.shipping-js');
    for (var i = 0; i < activeShipping.length; i++) {
        activeShipping[i].onclick = function (event) {
            event.preventDefault();
            for (var i = 0; i < activeShipping.length; i++) {
                activeShipping[i].classList.remove('frm__shipping--active');
            }
            this.classList.add("frm__shipping--active");
            document.getElementById("type-shipping-js").nextElementSibling.classList.remove('frm__error--block');
            let shippingMethod = this.getAttribute('data-shipping-method');                
            document.getElementById("type-shipping-js").setAttribute('value', shippingMethod);
            localStorage.setItem('shipping-method', shippingMethod);
        }
    }
}
//Confirm Billing in ChatApp
function confirmInShippingMethod(){
    document.querySelector('.chatapp-confirm-shipping-js').addEventListener('click', function(e){
        e.preventDefault();     
        let typeShippingMethod = document.getElementById("type-shipping-js");
        if(typeShippingMethod.value == ''){
            typeShippingMethod.nextElementSibling.classList.add('frm__error--block');
        }else{
            typeShippingMethod.nextElementSibling.classList.remove('frm__error--block');
            let button = this.parentElement.parentElement;
            let htmlBody = document.querySelector('.frm__shipping--active').innerHTML;
            setTimeout(function (){
                button.style.display = 'none';
                let content = document.createElement('div');
                content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order">'
                                    + '<div class="chatapp__order__head">'
                                        + '<h4 class="order__heading order__heading--confirm">Confirmed Shipping Method</h4>'
                                    + '</div>'
                                    + '<div class="chatapp__order__body chatapp__order__body--bill">'
                                        + '<h2 class="order__secondary">Shipping Method</h2>'
                                        + '<div class="frm frm--checkout">'
                                            + '<div class="frm__shipping shipping-js frm__shipping--active">'
                                                + htmlBody
                                            + '</div>'
                                            + '<p class="frm__shipping__policy order__shipping">'
                                                + 'For more shipping related info please view <a href="#" class="frm__link modal-js" data-modal="modal-shipping">Shipping and refund policy</a>'
                                            + '</p>'
                                        + '</div>'
                                    + '</div>'
                                +'</div>';
                document.querySelector('.chatapp-content-js').appendChild(content);
                scrollToBottomChatApp();
            }, 2000);
            setTimeout(function (){
                let messageBilling = document.createElement('div');
                messageBilling.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp-thank"><span>If you have any coupon code please apply it below</span></div>';
                document.querySelector('.chatapp-content-js').appendChild(messageBilling);  
                scrollToBottomChatApp();
            }, 4000);
            setTimeout(function (){
                salesCouponChatApp();
                scrollToBottomChatApp();
            }, 6000);
        }   
    });
}
//Show Coupon ChatApp
function salesCouponChatApp(){
    let content = document.createElement('div');
    content.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp__order chatapp__order--coupon">'
                            + '<div class="chatapp__order__body chatapp__order__body--coupon">'
                                + '<h2 class="order__secondary">Coupon Code</h2>'
                                + '<div class="alert alert--valid alert--danger alert--danger--checkout  alert-checkout-js mb-3" style="display: none;">'
                                    + "The coupon code isn't valid. Verify the code and try again."
                                + '</div>'
                                + '<div class="frm frm__group">'
                                    + '<input type="text" name="coupon_code" class="frm__control discount-group-js" placeholder="ENTER DISCOUNT CODE"/>'
                                    + '<p class="frm__error">This is a required field.</p>'
                                + '</div>'
                            + '</div>'
                            +  '<div class="chatapp__order__foot">'
                                + '<div class="order__button">'
                                    + '<a href="#" class="btn btn--green chatapp-apply-coupon-js">Apply Discount</a>'
                                + '</div>'
                            + '</div>'
                        +'</div>';
    document.querySelector('.chatapp-content-js').appendChild(content);
    scrollToBottomChatApp();
    applyCouponChatApp();
}
//Apply Coupon Chat App
function applyCouponChatApp(){
    document.querySelector('.discount-group-js').addEventListener('keyup', function(){
        if(this.value !== '') this.nextElementSibling.classList.remove('frm__error--block');
    });
    document.querySelector('.chatapp-apply-coupon-js').addEventListener('click', function(e){
        e.preventDefault();
        let coupon = document.querySelector('.discount-group-js');
        if(coupon.value === ''){
            coupon.nextElementSibling.classList.add('frm__error--block');
        }else{
            let result = discountCode.find(code => code.coupon === coupon.value);
            if(result === undefined){
                document.querySelector('.alert-checkout-js').style.display = 'block';
                setTimeout(function(){
                    document.querySelector('.alert-checkout-js').style.display = 'none';
                }, 1000);
            }else{
                shoppingCart.couponToCart(result);
                let button = this.parentElement.parentElement;
                setTimeout(function (){
                    button.style.display = 'none';
                    let content = document.createElement('div');
                    content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order chatapp__order--coupon">'
                                            + '<div class="chatapp__order__head">'
                                                + '<h4 class="order__heading order__heading--confirm">Applied</h4>'
                                            + '</div>'
                                            + '<div class="chatapp__order__body chatapp__order__body--coupon">'
                                                + '<h2 class="order__secondary">Coupon Code</h2>'
                                                + '<div class="chatapp__order__coupon">'
                                                    + '<span>'+result.coupon+' - '+result.persent+'% OFF</span>'
                                                    + '<span>- $'+shoppingCart.totalDiscount()+'</span>'
                                                + '</div>'
                                            + '</div>'
                                        +'</div>';
                    document.querySelector('.chatapp-content-js').appendChild(content);
                    scrollToBottomChatApp();
                }, 2000);
                demoMessageOrderSummary(4000);
            }
        }
    });
}
//Demo Review Order Summary
function demoMessageOrderSummary(t = 2000){
    setTimeout(function (){
        let messageBilling = document.createElement('div');
        messageBilling.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp-thank"><span>'
                                    + 'Please review the order summary to confirm your order information is correct'
                                    +'</span></div>';
        document.querySelector('.chatapp-content-js').appendChild(messageBilling);  
        scrollToBottomChatApp();
    }, t);
}
//Confirm Order Summary
function confirmOrderSummary(){
    document.querySelector('.chatapp-confirm-order-js').addEventListener('click', function(e){
        e.preventDefault();
        let button = this.parentElement.parentElement;
        let htmlBody = this.parentElement.parentElement.previousElementSibling;
        setTimeout(function (){
            button.style.display = 'none';
            let bodyOrderSummary = htmlBody.innerHTML;
            let content = document.createElement('div');
            content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order chatapp__order--coupon">'
                                    + '<div class="chatapp__order__head">'
                                        + '<h4 class="order__heading order__heading--confirm">Confirmed Order Summary</h4>'
                                    + '</div>'
                                    + '<div class="chatapp__order__body chatapp__order__body--coupon chatapp__order--products">' + bodyOrderSummary + '</div>';
                                +'</div>';
            document.querySelector('.chatapp-content-js').appendChild(content);
            toggleCartDetail();
            scrollToBottomChatApp();
        }, 2000);
        setTimeout(function (){
            let messageBilling = document.createElement('div');
            messageBilling.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp-thank"><span>'
                                        + 'Please select your payment method'
                                        +'</span></div>';
            document.querySelector('.chatapp-content-js').appendChild(messageBilling);  
            scrollToBottomChatApp();
        }, 4000);
        setTimeout(function (){
            paymentMethodChatApp();
            scrollToBottomChatApp();
        }, 6000);
    });
}
//Show Payment Method
function paymentMethodChatApp(){
    let content = document.createElement('div');
    content.innerHTML = '<div class="chatapp__box chatapp__box--system chatapp__order chatapp__order--cart">'
                            + '<div class="chatapp__order__body chatapp__order__body--coupon">'
                                + '<h2 class="order__secondary">Payment Method</h2>'
                                + '<div class="order__info__payment">'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="51" height="30" viewBox="0 0 41 24"><defs><style>.a78{fill:#fff;stroke:#e3e3e3;}.b78{fill:#1a1f71;}.c78{stroke:none;}.d{fill:none;}</style></defs><g transform="translate(-1130 -256)"><g class="a78" transform="translate(1130 256)"><rect class="c78" width="41" height="24" rx="3"></rect><rect class="d" x="0.5" y="0.5" width="40" height="23" rx="2.5"></rect></g><g transform="translate(1133.891 263.055)"><path class="b78" d="M11.746.185l-4.051,10H5.045l-1.987-8a1.1,1.1,0,0,0-.586-.871A9.8,9.8,0,0,0,0,.475L.051.185H4.306A1.178,1.178,0,0,1,5.453,1.214L6.5,6.993,9.1.185Zm10.37,6.729c0-2.639-3.516-2.8-3.491-3.958,0-.369.331-.739,1.07-.844a4.619,4.619,0,0,1,2.472.449L22.6.449A6.319,6.319,0,0,0,20.257,0c-2.472,0-4.2,1.372-4.23,3.3C16,4.75,17.275,5.542,18.218,6.017s1.3.818,1.3,1.24c0,.66-.79.976-1.5.976A4.985,4.985,0,0,1,15.441,7.6l-.459,2.19a6.882,6.882,0,0,0,2.777.528c2.624.026,4.332-1.319,4.357-3.4Zm6.523,3.272h2.319l-2.013-10h-2.14a1.139,1.139,0,0,0-1.07.739l-3.771,9.263h2.624l.51-1.5h3.21Zm-2.8-3.536L27.162,2.9l.764,3.747ZM15.314.185l-2.064,10h-2.5l2.064-10Z" transform="translate(0 0)"></path></g></g></svg>'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="30" viewBox="0 0 35 24"><defs><style>.a79{fill:#fff;stroke:#e3e3e3;}.b79{fill:#222;}.c79{fill:#ff5f00;}.d79{fill:#eb001b;}.e79{fill:#f79e1b;}.f79{stroke:none;}.g79{fill:none;}</style></defs><g transform="translate(-1175 -256)"><g class="a79" transform="translate(1175 256)"><rect class="f79" width="35" height="24" rx="3"></rect><rect class="g79" x="0.5" y="0.5" width="34" height="23" rx="2.5"></rect></g><g transform="translate(1182.545 261.281)"><g transform="translate(0 0)"><path class="b79" d="M4.206,30.954v-1.04a.63.63,0,0,0-.158-.477.546.546,0,0,0-.441-.182.626.626,0,0,0-.551.295.558.558,0,0,0-.518-.295.539.539,0,0,0-.47.243V29.29H1.76v1.664h.308V30a.405.405,0,0,1,.1-.315.35.35,0,0,1,.29-.118c.227,0,.356.156.356.433v.953h.308V30a.405.405,0,0,1,.1-.315.35.35,0,0,1,.29-.118c.227,0,.356.156.356.433v.953ZM9.26,29.307H8.693v-.5H8.385v.5H8.061V29.6h.324v.78c0,.381.13.606.518.606a.861.861,0,0,0,.421-.121l-.1-.295a.507.507,0,0,1-.292.087.219.219,0,0,1-.184-.076.254.254,0,0,1-.059-.2v-.8H9.26Zm2.883-.052a.479.479,0,0,0-.421.243V29.29h-.308v1.664h.308v-.936c0-.277.13-.451.34-.451a.889.889,0,0,1,.211.035l.1-.312A1.026,1.026,0,0,0,12.143,29.255Zm-4.357.173a1.056,1.056,0,0,0-.632-.173c-.389,0-.632.191-.632.52,0,.277.178.433.518.485l.162.017c.178.035.292.1.292.191,0,.121-.13.208-.373.208A.816.816,0,0,1,6.6,30.5l-.162.26a1.118,1.118,0,0,0,.664.208c.454,0,.7-.225.7-.537s-.194-.433-.535-.485l-.162-.017c-.146-.017-.275-.069-.275-.173s.13-.208.308-.208a1.109,1.109,0,0,1,.486.139Zm4.714.693a.85.85,0,0,0,.222.628.737.737,0,0,0,.587.238.776.776,0,0,0,.551-.191l-.162-.26a.623.623,0,0,1-.405.156.56.56,0,0,1,0-1.109.623.623,0,0,1,.405.156l.162-.26a.776.776,0,0,0-.551-.191.7.7,0,0,0-.589.211.807.807,0,0,0-.221.621Zm-2.187-.866a.775.775,0,0,0-.761.866.848.848,0,0,0,.216.623.736.736,0,0,0,.578.244.95.95,0,0,0,.632-.225l-.162-.243a.743.743,0,0,1-.454.173.466.466,0,0,1-.47-.433h1.15v-.139c0-.52-.292-.866-.729-.866Zm0,.312a.373.373,0,0,1,.286.115.429.429,0,0,1,.119.3H9.875a.427.427,0,0,1,.437-.416Zm-4.2.554V29.29H5.81V29.5a.581.581,0,0,0-.5-.243.868.868,0,0,0,0,1.733.58.58,0,0,0,.5-.243v.208h.308Zm-1.263,0a.5.5,0,0,1,.506-.485.522.522,0,0,1-.02,1.039.461.461,0,0,1-.359-.161.532.532,0,0,1-.127-.394Zm11.971-.866a.479.479,0,0,0-.421.243V29.29H16.1v1.664H16.4v-.936c0-.277.13-.451.34-.451a.89.89,0,0,1,.211.035l.1-.312a1.026,1.026,0,0,0-.227-.035Zm-1.2.866V29.29h-.308V29.5a.581.581,0,0,0-.5-.243.868.868,0,0,0,0,1.733.581.581,0,0,0,.5-.243v.208h.308Zm-1.247,0a.5.5,0,0,1,.506-.485.522.522,0,0,1-.02,1.039c-.308.017-.486-.243-.486-.554Zm4.39,0v-1.49h-.308V29.5a.581.581,0,0,0-.5-.243.868.868,0,0,0,0,1.733.581.581,0,0,0,.5-.243v.208h.308Zm-1.263,0a.5.5,0,0,1,.506-.485.522.522,0,0,1-.02,1.039.461.461,0,0,1-.359-.161A.532.532,0,0,1,17.5,30.122Z" transform="translate(-1.126 -16.119)"></path><rect class="c79" width="5.684" height="9.142" transform="translate(6.708 1.244)"></rect><path class="d79" d="M7.613,5.962A5.8,5.8,0,0,1,9.857,1.391a5.963,5.963,0,0,0-6.991-.217A5.772,5.772,0,0,0,.584,7.694a5.935,5.935,0,0,0,9.274,2.839A5.8,5.8,0,0,1,7.613,5.962Z" transform="translate(-0.316 -0.147)"></path><path class="e79" d="M31.607,5.97a5.808,5.808,0,0,1-3.318,5.223,5.965,5.965,0,0,1-6.215-.652,5.778,5.778,0,0,0,0-9.142A5.965,5.965,0,0,1,28.289.747,5.808,5.808,0,0,1,31.607,5.97Z" transform="translate(-12.517 -0.155)"></path></g></g></g></svg>'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="30" viewBox="0 0 48 30"><defs><style>.a80{fill:#fff;stroke:#e2e2e2;}.b80{fill:#016fd0;}.c80{stroke:none;}.d80{fill:none;}</style></defs><g transform="translate(-1238 -419)"><g class="a80" transform="translate(1238 419)"><rect class="c80" width="48" height="30" rx="3"></rect><rect class="d80" x="0.5" y="0.5" width="47" height="29" rx="2.5"></rect></g><g transform="translate(1101.209 75.233)"><path class="b80" d="M142.645,352.584l-1.952,4.538h1.271l.36-.909h2.094l.358.909h1.3l-1.95-4.538Zm.722,1.056.638,1.588h-1.278Z" transform="translate(0 -0.019)"></path><path class="b80" d="M283.223,357.1v-4.538l1.806.007,1.05,2.926,1.025-2.933H288.9V357.1h-1.135v-3.344l-1.2,3.344h-.995l-1.206-3.344V357.1Z" transform="translate(-137.014)"></path><path class="b80" d="M449.861,357.1v-4.538h3.7v1.015h-2.556v.776h2.5v.955h-2.5v.806h2.556v.985Z" transform="translate(-297.203)"></path><path class="b80" d="M562.5,352.584v4.538h1.135V355.51h.478l1.36,1.612h1.386l-1.493-1.672a1.382,1.382,0,0,0,1.245-1.394,1.468,1.468,0,0,0-1.586-1.472Zm1.135,1.015h1.3a.521.521,0,0,1,.537.478.513.513,0,0,1-.521.478h-1.314Z" transform="translate(-405.48 -0.019)"></path><path class="b80" d="M681.844,357.1h-1.158v-4.538h1.158Z" transform="translate(-519.095)"></path><path class="b80" d="M727.087,357.1h-.25a2,2,0,0,1-1.944-2.25,2.079,2.079,0,0,1,2.254-2.288H728.4v1.075h-1.3a1.092,1.092,0,0,0-1.059,1.224,1.111,1.111,0,0,0,1.224,1.248h.3Z" transform="translate(-561.591)"></path><path class="b80" d="M796.9,352.584l-1.952,4.538h1.271l.36-.909h2.094l.358.909h1.3l-1.95-4.538Zm.722,1.056.638,1.588h-1.278l.64-1.588Z" transform="translate(-628.938 -0.019)"></path><path class="b80" d="M937.434,357.1v-4.538h1.442l1.842,2.851v-2.851h1.135V357.1h-1.4l-1.888-2.926V357.1Z" transform="translate(-765.907)"></path><path class="b80" d="M354.2,562.314v-4.538h3.7v1.015h-2.556v.776h2.5v.955h-2.5v.806H357.9v.985Z" transform="translate(-205.242 -197.27)"></path><path class="b80" d="M822.946,562.314v-4.538h3.7v1.015h-2.556v.776h2.484v.955h-2.484v.806h2.556v.985Z" transform="translate(-655.85 -197.27)"></path><path class="b80" d="M452.508,562.314l1.8-2.241-1.845-2.3h1.429l1.1,1.42,1.1-1.42h1.373l-1.821,2.269,1.806,2.269h-1.429l-1.067-1.4-1.041,1.4Z" transform="translate(-299.706 -197.27)"></path><path class="b80" d="M584.869,557.795v4.538h1.164V560.9h1.194A1.57,1.57,0,0,0,589,559.321a1.494,1.494,0,0,0-1.629-1.526Zm1.164,1.026h1.258a.512.512,0,0,1,.56.523.524.524,0,0,1-.564.523h-1.254v-1.045Z" transform="translate(-426.986 -197.289)"></path><path class="b80" d="M704.448,557.776v4.538h1.135V560.7h.478l1.36,1.612h1.386l-1.493-1.672a1.382,1.382,0,0,0,1.245-1.394,1.468,1.468,0,0,0-1.586-1.472Zm1.135,1.015h1.3a.521.521,0,0,1,.537.478.513.513,0,0,1-.521.478h-1.314Z" transform="translate(-541.938 -197.27)"></path><path class="b80" d="M928.609,562.314v-.985h2.271c.336,0,.481-.182.481-.381s-.145-.384-.481-.384h-1.026a1.269,1.269,0,0,1-1.389-1.359c0-.728.455-1.429,1.78-1.429h2.209l-.478,1.021h-1.911c-.365,0-.478.192-.478.375a.4.4,0,0,0,.418.4h1.075a1.245,1.245,0,0,1,1.426,1.3,1.361,1.361,0,0,1-1.48,1.444Z" transform="translate(-757.285 -197.27)"></path><path class="b80" d="M1036.205,562.314v-.985h2.271c.336,0,.481-.182.481-.381s-.145-.384-.481-.384h-1.026a1.269,1.269,0,0,1-1.389-1.359c0-.728.455-1.429,1.78-1.429h2.209l-.478,1.021h-1.911c-.365,0-.478.192-.478.375a.4.4,0,0,0,.418.4h1.075a1.245,1.245,0,0,1,1.426,1.3,1.361,1.361,0,0,1-1.48,1.444Z" transform="translate(-860.717 -197.27)"></path></g></g></svg>'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="card" checked/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30"><defs><style>.a83{fill:#fff;stroke:#e2e2e2;}.b83{fill:#238ec2;}.b83,.c83,.d83{fill-rule:evenodd;}.c83{fill:#253667;}.d83{fill:#20274f;}.e83{stroke:none;}.f83{fill:none;}</style></defs><g transform="translate(-1130 -468)"><g class="a83" transform="translate(1130 468)"><rect class="e83" width="100" height="30" rx="3"></rect><rect class="f83" x="0.5" y="0.5" width="99" height="29" rx="2.5"></rect></g><g transform="translate(7 166)"><path class="b83" d="M24.608,27.728c-.208,1.382-1.254,1.382-2.264,1.382h-.575l.4-2.582a.319.319,0,0,1,.312-.272h.264c.688,0,1.337,0,1.673.4a1.309,1.309,0,0,1,.183,1.074Zm-.44-3.61h-3.81a.533.533,0,0,0-.523.453L18.3,34.447a.321.321,0,0,0,.312.371h1.956a.371.371,0,0,0,.367-.315l.435-2.8a.536.536,0,0,1,.524-.452H23.1a3.928,3.928,0,0,0,4.338-3.662,3,3,0,0,0-.487-2.485,3.529,3.529,0,0,0-2.782-.986Z" transform="translate(1168.687 286.215)"></path><path class="c83" d="M6.316,27.728C6.108,29.11,5.064,29.11,4.054,29.11H3.474l.4-2.582a.323.323,0,0,1,.316-.272h.264c.688,0,1.337,0,1.673.4a1.3,1.3,0,0,1,.184,1.074Zm-.44-3.61H2.068a.531.531,0,0,0-.523.453L0,34.446a.321.321,0,0,0,.312.371H2.139a.531.531,0,0,0,.523-.452L3.078,31.7a.531.531,0,0,1,.523-.452H4.807a3.928,3.928,0,0,0,4.338-3.662,2.992,2.992,0,0,0-.49-2.485,3.506,3.506,0,0,0-2.778-.986Z" transform="translate(1157.852 286.214)"></path><path class="c83" d="M11.9,30.164a2.041,2.041,0,0,1-2.059,1.76,1.533,1.533,0,0,1-1.226-.5,1.581,1.581,0,0,1-.288-1.3A2.048,2.048,0,0,1,10.37,28.36a1.534,1.534,0,0,1,1.218.5,1.612,1.612,0,0,1,.308,1.3Zm2.54-3.591H12.616a.317.317,0,0,0-.312.272l-.082.513-.128-.187A2.579,2.579,0,0,0,9.941,26.4a4.208,4.208,0,0,0-4.07,3.708,3.494,3.494,0,0,0,.677,2.833,2.838,2.838,0,0,0,2.3.936A3.476,3.476,0,0,0,11.37,32.82l-.08.514a.321.321,0,0,0,.312.371h1.644a.534.534,0,0,0,.523-.453l.983-6.314a.322.322,0,0,0-.315-.371Z" transform="translate(1161.291 287.322)"></path><path class="b83" d="M30.188,30.164a2.035,2.035,0,0,1-2.057,1.76,1.528,1.528,0,0,1-1.224-.5,1.574,1.574,0,0,1-.282-1.3,2.047,2.047,0,0,1,2.043-1.771,1.534,1.534,0,0,1,1.218.5,1.612,1.612,0,0,1,.308,1.3Zm2.545-3.591H30.909a.316.316,0,0,0-.312.272l-.082.513-.128-.187a2.583,2.583,0,0,0-2.154-.772,4.214,4.214,0,0,0-4.073,3.708,3.516,3.516,0,0,0,.679,2.833,2.833,2.833,0,0,0,2.3.936,3.48,3.48,0,0,0,2.525-1.055l-.082.514a.322.322,0,0,0,.315.371h1.643a.533.533,0,0,0,.523-.453l.986-6.314a.321.321,0,0,0-.312-.371Z" transform="translate(1172.414 287.322)"></path><path class="c83" d="M20.94,26.518H19.107a.524.524,0,0,0-.438.233l-2.53,3.766L15.069,26.9a.533.533,0,0,0-.51-.382h-1.8a.319.319,0,0,0-.3.423l2.02,5.991-1.9,2.708a.322.322,0,0,0,.26.508h1.835a.529.529,0,0,0,.435-.23l6.1-8.9a.32.32,0,0,0-.261-.5" transform="translate(1165.207 287.38)"></path><path class="b83" d="M31.872,24.388,30.309,34.445a.321.321,0,0,0,.312.371H32.2a.528.528,0,0,0,.52-.452l1.548-9.876a.322.322,0,0,0-.315-.371H32.184a.32.32,0,0,0-.312.272" transform="translate(1175.424 286.215)"></path></g><g transform="translate(11.674 168.886)"><path class="c83" d="M13.846,4.077a.629.629,0,0,1,.381-.463.744.744,0,0,1,.3-.061h4.295a9.806,9.806,0,0,1,1.417.093c.124.018.244.039.362.062s.23.05.34.079l.163.044a4.348,4.348,0,0,1,.594.228,2.95,2.95,0,0,0-.741-2.848c-.818-.84-2.293-1.2-4.18-1.2H11.292a.764.764,0,0,0-.775.6L8.239,13.692a.441.441,0,0,0,.464.492h3.383L13.847,4.077" transform="translate(1122.093 305.99)"></path><path class="b83" d="M20.275,4.06a3.189,3.189,0,0,0-.664-2.848c-.731-.84-2.05-1.2-3.738-1.2h-4.9a.7.7,0,0,0-.693.6L8.238,13.692a.424.424,0,0,0,.415.492H11.68l-.208,1.339a.37.37,0,0,0,.363.43h2.55a.618.618,0,0,0,.608-.523l.024-.131.482-3.08.03-.168a.616.616,0,0,1,.606-.524h.382c2.471,0,4.406-1.015,4.971-3.95a3.385,3.385,0,0,0-.511-2.969,2.4,2.4,0,0,0-.7-.546" transform="translate(1122.879 305.99)"></path><path class="d83" d="M21.692,4.06a2.948,2.948,0,0,0-.742-2.848c-.817-.84-2.291-1.2-4.179-1.2H11.292a.764.764,0,0,0-.775.6L8.239,13.692a.441.441,0,0,0,.464.492h3.383l.85-4.873-.025.151a.758.758,0,0,1,.77-.6h1.607c3.156,0,5.629-1.16,6.352-4.515.022-.1.04-.2.056-.291" transform="translate(1122.093 305.99)"></path></g></g></svg>'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="card"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30"><defs><style>.a84{fill:#fff;stroke:#e2e2e2;}.b84{fill:#f8991d;}.b84,.c84{fill-rule:evenodd;}.c84{fill:#333e47;}.d84{stroke:none;}.e84{fill:none;}</style></defs><g transform="translate(-1130 -517)"><g class="a84" transform="translate(1130 517)"><rect class="d84" width="100" height="30" rx="3"></rect><rect class="e84" x="0.5" y="0.5" width="99" height="29" rx="2.5"></rect></g><g transform="translate(752 262)"><path class="b84" d="M429.507,287.161a18.567,18.567,0,0,1-10.482,3.2,18.968,18.968,0,0,1-12.8-4.884c-.265-.24-.029-.567.291-.381a25.771,25.771,0,0,0,12.811,3.4,25.482,25.482,0,0,0,9.772-2c.479-.2.881.316.412.663Z" transform="translate(-9.244 -12.652)"></path><path class="b84" d="M459.021,285.128c-.363-.464-2.4-.22-3.31-.111-.276.033-.32-.208-.07-.384,1.622-1.139,4.281-.81,4.59-.429s-.082,3.05-1.6,4.322c-.234.2-.457.091-.353-.167.342-.855,1.108-2.768.745-3.232Z" transform="translate(-37.579 -11.965)"></path><path class="c84" d="M455.8,264.928v-1.107a.273.273,0,0,1,.281-.28h4.963a.276.276,0,0,1,.286.279v.95a1.557,1.557,0,0,1-.373.7l-2.571,3.67a5.512,5.512,0,0,1,2.831.608.507.507,0,0,1,.263.432v1.182c0,.163-.179.351-.366.253a5.716,5.716,0,0,0-5.243.01c-.173.092-.353-.094-.353-.257v-1.123a1.336,1.336,0,0,1,.185-.761l2.978-4.273h-2.593a.277.277,0,0,1-.287-.279Z" transform="translate(-37.601 -0.31)"></path><path class="c84" d="M411.294,271.651h-1.51a.285.285,0,0,1-.27-.255v-7.748a.285.285,0,0,1,.291-.279h1.406a.285.285,0,0,1,.274.26v1.011h.028a2.074,2.074,0,0,1,3.946,0,2.23,2.23,0,0,1,3.833-.587,4.116,4.116,0,0,1,.381,2.43v4.89a.285.285,0,0,1-.291.279h-1.508a.282.282,0,0,1-.271-.278v-4.108a9.887,9.887,0,0,0-.042-1.451.787.787,0,0,0-.887-.669,1,1,0,0,0-.9.636,4.683,4.683,0,0,0-.141,1.484v4.108a.285.285,0,0,1-.291.279h-1.508a.283.283,0,0,1-.271-.278l0-4.108c0-.864.141-2.135-.93-2.135s-1.043,1.239-1.043,2.135v4.108a.285.285,0,0,1-.291.279Z" transform="translate(-11.2 -0.118)"></path><path class="c84" d="M474.621,264.787c-1.113,0-1.184,1.516-1.184,2.462s-.014,2.968,1.17,2.968,1.226-1.631,1.226-2.625a7.161,7.161,0,0,0-.226-2.055.945.945,0,0,0-.987-.75Zm-.013-1.582c2.24,0,3.452,1.925,3.452,4.37,0,2.364-1.339,4.24-3.452,4.24-2.2,0-3.4-1.924-3.4-4.321,0-2.414,1.212-4.289,3.4-4.289Z" transform="translate(-46.61 -0.118)"></path><path class="c84" d="M491.713,271.651h-1.5a.283.283,0,0,1-.271-.278l0-7.751a.286.286,0,0,1,.29-.253h1.4a.287.287,0,0,1,.268.217v1.185h.029a2.053,2.053,0,0,1,2.057-1.565,1.978,1.978,0,0,1,1.761.913,4.927,4.927,0,0,1,.395,2.413v4.876a.286.286,0,0,1-.289.244h-1.513a.284.284,0,0,1-.269-.244V267.2c0-.848.1-2.088-.944-2.088a.988.988,0,0,0-.874.62,3.44,3.44,0,0,0-.239,1.468v4.172a.29.29,0,0,1-.294.279Z" transform="translate(-57.356 -0.118)"></path><path class="c84" d="M442.422,271.531a.311.311,0,0,1-.356.035,3.684,3.684,0,0,1-.866-1.006,2.991,2.991,0,0,1-2.489,1.1,2.143,2.143,0,0,1-2.259-2.353,2.564,2.564,0,0,1,1.61-2.467,10.434,10.434,0,0,1,2.839-.523v-.2a1.934,1.934,0,0,0-.184-1.095,1.01,1.01,0,0,0-.847-.392,1.15,1.15,0,0,0-1.214.907.32.32,0,0,1-.262.278l-1.463-.158a.266.266,0,0,1-.226-.316c.332-1.751,1.9-2.3,3.317-2.311h.112a3.4,3.4,0,0,1,2.222.752c.735.686.663,1.6.663,2.6v2.352a2.062,2.062,0,0,0,.57,1.4.285.285,0,0,1-.005.4c-.308.258-.856.734-1.157,1l0,0Zm-1.521-3.681a2.964,2.964,0,0,1-.283,1.6,1.227,1.227,0,0,1-1.045.686c-.579,0-.918-.441-.918-1.095,0-1.286,1.153-1.52,2.246-1.52v.327Z" transform="translate(-26.66 -0.017)"></path><path class="c84" d="M395.971,271.531a.311.311,0,0,1-.357.035,3.668,3.668,0,0,1-.865-1.006,2.992,2.992,0,0,1-2.489,1.1,2.143,2.143,0,0,1-2.26-2.353,2.564,2.564,0,0,1,1.61-2.467,10.431,10.431,0,0,1,2.838-.523v-.2a1.933,1.933,0,0,0-.183-1.095,1.009,1.009,0,0,0-.847-.392,1.149,1.149,0,0,0-1.213.907.32.32,0,0,1-.262.278l-1.463-.158a.266.266,0,0,1-.225-.316c.331-1.751,1.895-2.3,3.316-2.311h.112a3.4,3.4,0,0,1,2.222.752c.734.686.664,1.6.664,2.6v2.352a2.059,2.059,0,0,0,.57,1.4.286.286,0,0,1,0,.4c-.308.258-.857.734-1.158,1l0,0Zm-1.522-3.681a2.96,2.96,0,0,1-.282,1.6,1.226,1.226,0,0,1-1.045.686c-.579,0-.918-.441-.918-1.095,0-1.286,1.153-1.52,2.245-1.52v.327Z" transform="translate(0 -0.017)"></path><path class="c84" d="M552.328,274.643v-.569c0-.162.08-.274.249-.264a3.547,3.547,0,0,0,1.078.024,1.252,1.252,0,0,0,.886-.781c.248-.566.411-1.022.515-1.321l-3.141-7.78c-.053-.132-.069-.378.2-.378h1.1a.342.342,0,0,1,.342.263l2.277,6.32,2.174-6.32a.343.343,0,0,1,.341-.263h1.035c.262,0,.247.245.2.378l-3.116,8.023c-.4,1.069-.94,2.769-2.15,3.065a3.181,3.181,0,0,1-1.82-.087.353.353,0,0,1-.157-.309Z" transform="translate(-92.91 -0.329)"></path><path class="c84" d="M540.706,271.059a.265.265,0,0,1-.264.263h-.774a.3.3,0,0,1-.3-.263l-.078-.527a4.527,4.527,0,0,1-1.267.75,3.182,3.182,0,0,1-2.85-.134,2.271,2.271,0,0,1-.985-1.963,2.408,2.408,0,0,1,.611-1.671,3.1,3.1,0,0,1,2.359-.9,7.34,7.34,0,0,1,2.062.272v-1.06c0-1.078-.454-1.545-1.651-1.545a8.012,8.012,0,0,0-2.589.441.237.237,0,0,1-.247-.258v-.6a.376.376,0,0,1,.258-.328,7.81,7.81,0,0,1,2.729-.527c1.366,0,2.988.308,2.988,2.409v5.651Zm-1.488-1.548v-1.6a8.277,8.277,0,0,0-1.713-.2,1.979,1.979,0,0,0-1.4.448,1.321,1.321,0,0,0-.326.907,1.212,1.212,0,0,0,.491,1.064,2,2,0,0,0,1.6.073,3.512,3.512,0,0,0,1.347-.691Z" transform="translate(-82.753)"></path><path class="c84" d="M517.807,264.307c1.718,0,2.186,1.351,2.186,2.9a3.479,3.479,0,0,1-.722,2.5,1.954,1.954,0,0,1-1.535.507,3.725,3.725,0,0,1-1.994-.754V265.04a3.551,3.551,0,0,1,2.066-.732Zm-2.329,10.29H514.44a.264.264,0,0,1-.263-.263V263.528a.264.264,0,0,1,.263-.263h.794a.3.3,0,0,1,.3.263l.083.566a4.079,4.079,0,0,1,2.613-1.084c2.554,0,3.395,2.1,3.395,4.293,0,2.342-1.285,4.223-3.458,4.223a3.637,3.637,0,0,1-2.428-.924v3.731a.264.264,0,0,1-.264.263Z" transform="translate(-71.269 -0.006)"></path></g></g></svg>'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="amazon"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<img src="assets/images/apple_pay.svg" alt="apple pay">'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="apple_pay"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<img src="assets/images/google_pay.svg" alt="google pay">'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="google_pay"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                + '</div>'
                            + '</div>'
                            +  '<div class="chatapp__order__foot chatapp-select-hidden-js">'
                                + '<div class="order__button">'
                                    + '<a href="chatapp/checkout-customer-payment.html" class="btn btn--green chatapp-edit-js">Select</a>'
                                + '</div>'
                            + '</div>'
                        +'</div>';
    document.querySelector('.chatapp-content-js').appendChild(content);
    scrollToBottomChatApp();
    openEditConfirm();
}
//Show Reselect Payment Method
function reselectPaymentMethodChatApp(){
    let content = document.createElement('div');
    content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order">'
                            + '<div class="chatapp__order__head">'
                                + '<h4 class="order__heading order__heading--confirm order__heading--danger">Payment Unsuccessful</h4>'
                            + '</div>'
                            + '<div class="chatapp__order__body chatapp__order__body--coupon">'
                                + '<div class="chatapp__order__coupon text-center chatapp__order__coupon--danger">Unfortunately we have an issue with your payment. Do you want to select a different payment method?</div>'
                                + '<h2 class="order__secondary">Payment Method</h2>'
                                + '<div class="order__info__payment">'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="51" height="30" viewBox="0 0 41 24"><defs><style>.a78{fill:#fff;stroke:#e3e3e3;}.b78{fill:#1a1f71;}.c78{stroke:none;}.d{fill:none;}</style></defs><g transform="translate(-1130 -256)"><g class="a78" transform="translate(1130 256)"><rect class="c78" width="41" height="24" rx="3"></rect><rect class="d" x="0.5" y="0.5" width="40" height="23" rx="2.5"></rect></g><g transform="translate(1133.891 263.055)"><path class="b78" d="M11.746.185l-4.051,10H5.045l-1.987-8a1.1,1.1,0,0,0-.586-.871A9.8,9.8,0,0,0,0,.475L.051.185H4.306A1.178,1.178,0,0,1,5.453,1.214L6.5,6.993,9.1.185Zm10.37,6.729c0-2.639-3.516-2.8-3.491-3.958,0-.369.331-.739,1.07-.844a4.619,4.619,0,0,1,2.472.449L22.6.449A6.319,6.319,0,0,0,20.257,0c-2.472,0-4.2,1.372-4.23,3.3C16,4.75,17.275,5.542,18.218,6.017s1.3.818,1.3,1.24c0,.66-.79.976-1.5.976A4.985,4.985,0,0,1,15.441,7.6l-.459,2.19a6.882,6.882,0,0,0,2.777.528c2.624.026,4.332-1.319,4.357-3.4Zm6.523,3.272h2.319l-2.013-10h-2.14a1.139,1.139,0,0,0-1.07.739l-3.771,9.263h2.624l.51-1.5h3.21Zm-2.8-3.536L27.162,2.9l.764,3.747ZM15.314.185l-2.064,10h-2.5l2.064-10Z" transform="translate(0 0)"></path></g></g></svg>'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="30" viewBox="0 0 35 24"><defs><style>.a79{fill:#fff;stroke:#e3e3e3;}.b79{fill:#222;}.c79{fill:#ff5f00;}.d79{fill:#eb001b;}.e79{fill:#f79e1b;}.f79{stroke:none;}.g79{fill:none;}</style></defs><g transform="translate(-1175 -256)"><g class="a79" transform="translate(1175 256)"><rect class="f79" width="35" height="24" rx="3"></rect><rect class="g79" x="0.5" y="0.5" width="34" height="23" rx="2.5"></rect></g><g transform="translate(1182.545 261.281)"><g transform="translate(0 0)"><path class="b79" d="M4.206,30.954v-1.04a.63.63,0,0,0-.158-.477.546.546,0,0,0-.441-.182.626.626,0,0,0-.551.295.558.558,0,0,0-.518-.295.539.539,0,0,0-.47.243V29.29H1.76v1.664h.308V30a.405.405,0,0,1,.1-.315.35.35,0,0,1,.29-.118c.227,0,.356.156.356.433v.953h.308V30a.405.405,0,0,1,.1-.315.35.35,0,0,1,.29-.118c.227,0,.356.156.356.433v.953ZM9.26,29.307H8.693v-.5H8.385v.5H8.061V29.6h.324v.78c0,.381.13.606.518.606a.861.861,0,0,0,.421-.121l-.1-.295a.507.507,0,0,1-.292.087.219.219,0,0,1-.184-.076.254.254,0,0,1-.059-.2v-.8H9.26Zm2.883-.052a.479.479,0,0,0-.421.243V29.29h-.308v1.664h.308v-.936c0-.277.13-.451.34-.451a.889.889,0,0,1,.211.035l.1-.312A1.026,1.026,0,0,0,12.143,29.255Zm-4.357.173a1.056,1.056,0,0,0-.632-.173c-.389,0-.632.191-.632.52,0,.277.178.433.518.485l.162.017c.178.035.292.1.292.191,0,.121-.13.208-.373.208A.816.816,0,0,1,6.6,30.5l-.162.26a1.118,1.118,0,0,0,.664.208c.454,0,.7-.225.7-.537s-.194-.433-.535-.485l-.162-.017c-.146-.017-.275-.069-.275-.173s.13-.208.308-.208a1.109,1.109,0,0,1,.486.139Zm4.714.693a.85.85,0,0,0,.222.628.737.737,0,0,0,.587.238.776.776,0,0,0,.551-.191l-.162-.26a.623.623,0,0,1-.405.156.56.56,0,0,1,0-1.109.623.623,0,0,1,.405.156l.162-.26a.776.776,0,0,0-.551-.191.7.7,0,0,0-.589.211.807.807,0,0,0-.221.621Zm-2.187-.866a.775.775,0,0,0-.761.866.848.848,0,0,0,.216.623.736.736,0,0,0,.578.244.95.95,0,0,0,.632-.225l-.162-.243a.743.743,0,0,1-.454.173.466.466,0,0,1-.47-.433h1.15v-.139c0-.52-.292-.866-.729-.866Zm0,.312a.373.373,0,0,1,.286.115.429.429,0,0,1,.119.3H9.875a.427.427,0,0,1,.437-.416Zm-4.2.554V29.29H5.81V29.5a.581.581,0,0,0-.5-.243.868.868,0,0,0,0,1.733.58.58,0,0,0,.5-.243v.208h.308Zm-1.263,0a.5.5,0,0,1,.506-.485.522.522,0,0,1-.02,1.039.461.461,0,0,1-.359-.161.532.532,0,0,1-.127-.394Zm11.971-.866a.479.479,0,0,0-.421.243V29.29H16.1v1.664H16.4v-.936c0-.277.13-.451.34-.451a.89.89,0,0,1,.211.035l.1-.312a1.026,1.026,0,0,0-.227-.035Zm-1.2.866V29.29h-.308V29.5a.581.581,0,0,0-.5-.243.868.868,0,0,0,0,1.733.581.581,0,0,0,.5-.243v.208h.308Zm-1.247,0a.5.5,0,0,1,.506-.485.522.522,0,0,1-.02,1.039c-.308.017-.486-.243-.486-.554Zm4.39,0v-1.49h-.308V29.5a.581.581,0,0,0-.5-.243.868.868,0,0,0,0,1.733.581.581,0,0,0,.5-.243v.208h.308Zm-1.263,0a.5.5,0,0,1,.506-.485.522.522,0,0,1-.02,1.039.461.461,0,0,1-.359-.161A.532.532,0,0,1,17.5,30.122Z" transform="translate(-1.126 -16.119)"></path><rect class="c79" width="5.684" height="9.142" transform="translate(6.708 1.244)"></rect><path class="d79" d="M7.613,5.962A5.8,5.8,0,0,1,9.857,1.391a5.963,5.963,0,0,0-6.991-.217A5.772,5.772,0,0,0,.584,7.694a5.935,5.935,0,0,0,9.274,2.839A5.8,5.8,0,0,1,7.613,5.962Z" transform="translate(-0.316 -0.147)"></path><path class="e79" d="M31.607,5.97a5.808,5.808,0,0,1-3.318,5.223,5.965,5.965,0,0,1-6.215-.652,5.778,5.778,0,0,0,0-9.142A5.965,5.965,0,0,1,28.289.747,5.808,5.808,0,0,1,31.607,5.97Z" transform="translate(-12.517 -0.155)"></path></g></g></g></svg>'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="30" viewBox="0 0 48 30"><defs><style>.a80{fill:#fff;stroke:#e2e2e2;}.b80{fill:#016fd0;}.c80{stroke:none;}.d80{fill:none;}</style></defs><g transform="translate(-1238 -419)"><g class="a80" transform="translate(1238 419)"><rect class="c80" width="48" height="30" rx="3"></rect><rect class="d80" x="0.5" y="0.5" width="47" height="29" rx="2.5"></rect></g><g transform="translate(1101.209 75.233)"><path class="b80" d="M142.645,352.584l-1.952,4.538h1.271l.36-.909h2.094l.358.909h1.3l-1.95-4.538Zm.722,1.056.638,1.588h-1.278Z" transform="translate(0 -0.019)"></path><path class="b80" d="M283.223,357.1v-4.538l1.806.007,1.05,2.926,1.025-2.933H288.9V357.1h-1.135v-3.344l-1.2,3.344h-.995l-1.206-3.344V357.1Z" transform="translate(-137.014)"></path><path class="b80" d="M449.861,357.1v-4.538h3.7v1.015h-2.556v.776h2.5v.955h-2.5v.806h2.556v.985Z" transform="translate(-297.203)"></path><path class="b80" d="M562.5,352.584v4.538h1.135V355.51h.478l1.36,1.612h1.386l-1.493-1.672a1.382,1.382,0,0,0,1.245-1.394,1.468,1.468,0,0,0-1.586-1.472Zm1.135,1.015h1.3a.521.521,0,0,1,.537.478.513.513,0,0,1-.521.478h-1.314Z" transform="translate(-405.48 -0.019)"></path><path class="b80" d="M681.844,357.1h-1.158v-4.538h1.158Z" transform="translate(-519.095)"></path><path class="b80" d="M727.087,357.1h-.25a2,2,0,0,1-1.944-2.25,2.079,2.079,0,0,1,2.254-2.288H728.4v1.075h-1.3a1.092,1.092,0,0,0-1.059,1.224,1.111,1.111,0,0,0,1.224,1.248h.3Z" transform="translate(-561.591)"></path><path class="b80" d="M796.9,352.584l-1.952,4.538h1.271l.36-.909h2.094l.358.909h1.3l-1.95-4.538Zm.722,1.056.638,1.588h-1.278l.64-1.588Z" transform="translate(-628.938 -0.019)"></path><path class="b80" d="M937.434,357.1v-4.538h1.442l1.842,2.851v-2.851h1.135V357.1h-1.4l-1.888-2.926V357.1Z" transform="translate(-765.907)"></path><path class="b80" d="M354.2,562.314v-4.538h3.7v1.015h-2.556v.776h2.5v.955h-2.5v.806H357.9v.985Z" transform="translate(-205.242 -197.27)"></path><path class="b80" d="M822.946,562.314v-4.538h3.7v1.015h-2.556v.776h2.484v.955h-2.484v.806h2.556v.985Z" transform="translate(-655.85 -197.27)"></path><path class="b80" d="M452.508,562.314l1.8-2.241-1.845-2.3h1.429l1.1,1.42,1.1-1.42h1.373l-1.821,2.269,1.806,2.269h-1.429l-1.067-1.4-1.041,1.4Z" transform="translate(-299.706 -197.27)"></path><path class="b80" d="M584.869,557.795v4.538h1.164V560.9h1.194A1.57,1.57,0,0,0,589,559.321a1.494,1.494,0,0,0-1.629-1.526Zm1.164,1.026h1.258a.512.512,0,0,1,.56.523.524.524,0,0,1-.564.523h-1.254v-1.045Z" transform="translate(-426.986 -197.289)"></path><path class="b80" d="M704.448,557.776v4.538h1.135V560.7h.478l1.36,1.612h1.386l-1.493-1.672a1.382,1.382,0,0,0,1.245-1.394,1.468,1.468,0,0,0-1.586-1.472Zm1.135,1.015h1.3a.521.521,0,0,1,.537.478.513.513,0,0,1-.521.478h-1.314Z" transform="translate(-541.938 -197.27)"></path><path class="b80" d="M928.609,562.314v-.985h2.271c.336,0,.481-.182.481-.381s-.145-.384-.481-.384h-1.026a1.269,1.269,0,0,1-1.389-1.359c0-.728.455-1.429,1.78-1.429h2.209l-.478,1.021h-1.911c-.365,0-.478.192-.478.375a.4.4,0,0,0,.418.4h1.075a1.245,1.245,0,0,1,1.426,1.3,1.361,1.361,0,0,1-1.48,1.444Z" transform="translate(-757.285 -197.27)"></path><path class="b80" d="M1036.205,562.314v-.985h2.271c.336,0,.481-.182.481-.381s-.145-.384-.481-.384h-1.026a1.269,1.269,0,0,1-1.389-1.359c0-.728.455-1.429,1.78-1.429h2.209l-.478,1.021h-1.911c-.365,0-.478.192-.478.375a.4.4,0,0,0,.418.4h1.075a1.245,1.245,0,0,1,1.426,1.3,1.361,1.361,0,0,1-1.48,1.444Z" transform="translate(-860.717 -197.27)"></path></g></g></svg>'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="card" checked/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30"><defs><style>.a83{fill:#fff;stroke:#e2e2e2;}.b83{fill:#238ec2;}.b83,.c83,.d83{fill-rule:evenodd;}.c83{fill:#253667;}.d83{fill:#20274f;}.e83{stroke:none;}.f83{fill:none;}</style></defs><g transform="translate(-1130 -468)"><g class="a83" transform="translate(1130 468)"><rect class="e83" width="100" height="30" rx="3"></rect><rect class="f83" x="0.5" y="0.5" width="99" height="29" rx="2.5"></rect></g><g transform="translate(7 166)"><path class="b83" d="M24.608,27.728c-.208,1.382-1.254,1.382-2.264,1.382h-.575l.4-2.582a.319.319,0,0,1,.312-.272h.264c.688,0,1.337,0,1.673.4a1.309,1.309,0,0,1,.183,1.074Zm-.44-3.61h-3.81a.533.533,0,0,0-.523.453L18.3,34.447a.321.321,0,0,0,.312.371h1.956a.371.371,0,0,0,.367-.315l.435-2.8a.536.536,0,0,1,.524-.452H23.1a3.928,3.928,0,0,0,4.338-3.662,3,3,0,0,0-.487-2.485,3.529,3.529,0,0,0-2.782-.986Z" transform="translate(1168.687 286.215)"></path><path class="c83" d="M6.316,27.728C6.108,29.11,5.064,29.11,4.054,29.11H3.474l.4-2.582a.323.323,0,0,1,.316-.272h.264c.688,0,1.337,0,1.673.4a1.3,1.3,0,0,1,.184,1.074Zm-.44-3.61H2.068a.531.531,0,0,0-.523.453L0,34.446a.321.321,0,0,0,.312.371H2.139a.531.531,0,0,0,.523-.452L3.078,31.7a.531.531,0,0,1,.523-.452H4.807a3.928,3.928,0,0,0,4.338-3.662,2.992,2.992,0,0,0-.49-2.485,3.506,3.506,0,0,0-2.778-.986Z" transform="translate(1157.852 286.214)"></path><path class="c83" d="M11.9,30.164a2.041,2.041,0,0,1-2.059,1.76,1.533,1.533,0,0,1-1.226-.5,1.581,1.581,0,0,1-.288-1.3A2.048,2.048,0,0,1,10.37,28.36a1.534,1.534,0,0,1,1.218.5,1.612,1.612,0,0,1,.308,1.3Zm2.54-3.591H12.616a.317.317,0,0,0-.312.272l-.082.513-.128-.187A2.579,2.579,0,0,0,9.941,26.4a4.208,4.208,0,0,0-4.07,3.708,3.494,3.494,0,0,0,.677,2.833,2.838,2.838,0,0,0,2.3.936A3.476,3.476,0,0,0,11.37,32.82l-.08.514a.321.321,0,0,0,.312.371h1.644a.534.534,0,0,0,.523-.453l.983-6.314a.322.322,0,0,0-.315-.371Z" transform="translate(1161.291 287.322)"></path><path class="b83" d="M30.188,30.164a2.035,2.035,0,0,1-2.057,1.76,1.528,1.528,0,0,1-1.224-.5,1.574,1.574,0,0,1-.282-1.3,2.047,2.047,0,0,1,2.043-1.771,1.534,1.534,0,0,1,1.218.5,1.612,1.612,0,0,1,.308,1.3Zm2.545-3.591H30.909a.316.316,0,0,0-.312.272l-.082.513-.128-.187a2.583,2.583,0,0,0-2.154-.772,4.214,4.214,0,0,0-4.073,3.708,3.516,3.516,0,0,0,.679,2.833,2.833,2.833,0,0,0,2.3.936,3.48,3.48,0,0,0,2.525-1.055l-.082.514a.322.322,0,0,0,.315.371h1.643a.533.533,0,0,0,.523-.453l.986-6.314a.321.321,0,0,0-.312-.371Z" transform="translate(1172.414 287.322)"></path><path class="c83" d="M20.94,26.518H19.107a.524.524,0,0,0-.438.233l-2.53,3.766L15.069,26.9a.533.533,0,0,0-.51-.382h-1.8a.319.319,0,0,0-.3.423l2.02,5.991-1.9,2.708a.322.322,0,0,0,.26.508h1.835a.529.529,0,0,0,.435-.23l6.1-8.9a.32.32,0,0,0-.261-.5" transform="translate(1165.207 287.38)"></path><path class="b83" d="M31.872,24.388,30.309,34.445a.321.321,0,0,0,.312.371H32.2a.528.528,0,0,0,.52-.452l1.548-9.876a.322.322,0,0,0-.315-.371H32.184a.32.32,0,0,0-.312.272" transform="translate(1175.424 286.215)"></path></g><g transform="translate(11.674 168.886)"><path class="c83" d="M13.846,4.077a.629.629,0,0,1,.381-.463.744.744,0,0,1,.3-.061h4.295a9.806,9.806,0,0,1,1.417.093c.124.018.244.039.362.062s.23.05.34.079l.163.044a4.348,4.348,0,0,1,.594.228,2.95,2.95,0,0,0-.741-2.848c-.818-.84-2.293-1.2-4.18-1.2H11.292a.764.764,0,0,0-.775.6L8.239,13.692a.441.441,0,0,0,.464.492h3.383L13.847,4.077" transform="translate(1122.093 305.99)"></path><path class="b83" d="M20.275,4.06a3.189,3.189,0,0,0-.664-2.848c-.731-.84-2.05-1.2-3.738-1.2h-4.9a.7.7,0,0,0-.693.6L8.238,13.692a.424.424,0,0,0,.415.492H11.68l-.208,1.339a.37.37,0,0,0,.363.43h2.55a.618.618,0,0,0,.608-.523l.024-.131.482-3.08.03-.168a.616.616,0,0,1,.606-.524h.382c2.471,0,4.406-1.015,4.971-3.95a3.385,3.385,0,0,0-.511-2.969,2.4,2.4,0,0,0-.7-.546" transform="translate(1122.879 305.99)"></path><path class="d83" d="M21.692,4.06a2.948,2.948,0,0,0-.742-2.848c-.817-.84-2.291-1.2-4.179-1.2H11.292a.764.764,0,0,0-.775.6L8.239,13.692a.441.441,0,0,0,.464.492h3.383l.85-4.873-.025.151a.758.758,0,0,1,.77-.6h1.607c3.156,0,5.629-1.16,6.352-4.515.022-.1.04-.2.056-.291" transform="translate(1122.093 305.99)"></path></g></g></svg>'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="card"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30"><defs><style>.a84{fill:#fff;stroke:#e2e2e2;}.b84{fill:#f8991d;}.b84,.c84{fill-rule:evenodd;}.c84{fill:#333e47;}.d84{stroke:none;}.e84{fill:none;}</style></defs><g transform="translate(-1130 -517)"><g class="a84" transform="translate(1130 517)"><rect class="d84" width="100" height="30" rx="3"></rect><rect class="e84" x="0.5" y="0.5" width="99" height="29" rx="2.5"></rect></g><g transform="translate(752 262)"><path class="b84" d="M429.507,287.161a18.567,18.567,0,0,1-10.482,3.2,18.968,18.968,0,0,1-12.8-4.884c-.265-.24-.029-.567.291-.381a25.771,25.771,0,0,0,12.811,3.4,25.482,25.482,0,0,0,9.772-2c.479-.2.881.316.412.663Z" transform="translate(-9.244 -12.652)"></path><path class="b84" d="M459.021,285.128c-.363-.464-2.4-.22-3.31-.111-.276.033-.32-.208-.07-.384,1.622-1.139,4.281-.81,4.59-.429s-.082,3.05-1.6,4.322c-.234.2-.457.091-.353-.167.342-.855,1.108-2.768.745-3.232Z" transform="translate(-37.579 -11.965)"></path><path class="c84" d="M455.8,264.928v-1.107a.273.273,0,0,1,.281-.28h4.963a.276.276,0,0,1,.286.279v.95a1.557,1.557,0,0,1-.373.7l-2.571,3.67a5.512,5.512,0,0,1,2.831.608.507.507,0,0,1,.263.432v1.182c0,.163-.179.351-.366.253a5.716,5.716,0,0,0-5.243.01c-.173.092-.353-.094-.353-.257v-1.123a1.336,1.336,0,0,1,.185-.761l2.978-4.273h-2.593a.277.277,0,0,1-.287-.279Z" transform="translate(-37.601 -0.31)"></path><path class="c84" d="M411.294,271.651h-1.51a.285.285,0,0,1-.27-.255v-7.748a.285.285,0,0,1,.291-.279h1.406a.285.285,0,0,1,.274.26v1.011h.028a2.074,2.074,0,0,1,3.946,0,2.23,2.23,0,0,1,3.833-.587,4.116,4.116,0,0,1,.381,2.43v4.89a.285.285,0,0,1-.291.279h-1.508a.282.282,0,0,1-.271-.278v-4.108a9.887,9.887,0,0,0-.042-1.451.787.787,0,0,0-.887-.669,1,1,0,0,0-.9.636,4.683,4.683,0,0,0-.141,1.484v4.108a.285.285,0,0,1-.291.279h-1.508a.283.283,0,0,1-.271-.278l0-4.108c0-.864.141-2.135-.93-2.135s-1.043,1.239-1.043,2.135v4.108a.285.285,0,0,1-.291.279Z" transform="translate(-11.2 -0.118)"></path><path class="c84" d="M474.621,264.787c-1.113,0-1.184,1.516-1.184,2.462s-.014,2.968,1.17,2.968,1.226-1.631,1.226-2.625a7.161,7.161,0,0,0-.226-2.055.945.945,0,0,0-.987-.75Zm-.013-1.582c2.24,0,3.452,1.925,3.452,4.37,0,2.364-1.339,4.24-3.452,4.24-2.2,0-3.4-1.924-3.4-4.321,0-2.414,1.212-4.289,3.4-4.289Z" transform="translate(-46.61 -0.118)"></path><path class="c84" d="M491.713,271.651h-1.5a.283.283,0,0,1-.271-.278l0-7.751a.286.286,0,0,1,.29-.253h1.4a.287.287,0,0,1,.268.217v1.185h.029a2.053,2.053,0,0,1,2.057-1.565,1.978,1.978,0,0,1,1.761.913,4.927,4.927,0,0,1,.395,2.413v4.876a.286.286,0,0,1-.289.244h-1.513a.284.284,0,0,1-.269-.244V267.2c0-.848.1-2.088-.944-2.088a.988.988,0,0,0-.874.62,3.44,3.44,0,0,0-.239,1.468v4.172a.29.29,0,0,1-.294.279Z" transform="translate(-57.356 -0.118)"></path><path class="c84" d="M442.422,271.531a.311.311,0,0,1-.356.035,3.684,3.684,0,0,1-.866-1.006,2.991,2.991,0,0,1-2.489,1.1,2.143,2.143,0,0,1-2.259-2.353,2.564,2.564,0,0,1,1.61-2.467,10.434,10.434,0,0,1,2.839-.523v-.2a1.934,1.934,0,0,0-.184-1.095,1.01,1.01,0,0,0-.847-.392,1.15,1.15,0,0,0-1.214.907.32.32,0,0,1-.262.278l-1.463-.158a.266.266,0,0,1-.226-.316c.332-1.751,1.9-2.3,3.317-2.311h.112a3.4,3.4,0,0,1,2.222.752c.735.686.663,1.6.663,2.6v2.352a2.062,2.062,0,0,0,.57,1.4.285.285,0,0,1-.005.4c-.308.258-.856.734-1.157,1l0,0Zm-1.521-3.681a2.964,2.964,0,0,1-.283,1.6,1.227,1.227,0,0,1-1.045.686c-.579,0-.918-.441-.918-1.095,0-1.286,1.153-1.52,2.246-1.52v.327Z" transform="translate(-26.66 -0.017)"></path><path class="c84" d="M395.971,271.531a.311.311,0,0,1-.357.035,3.668,3.668,0,0,1-.865-1.006,2.992,2.992,0,0,1-2.489,1.1,2.143,2.143,0,0,1-2.26-2.353,2.564,2.564,0,0,1,1.61-2.467,10.431,10.431,0,0,1,2.838-.523v-.2a1.933,1.933,0,0,0-.183-1.095,1.009,1.009,0,0,0-.847-.392,1.149,1.149,0,0,0-1.213.907.32.32,0,0,1-.262.278l-1.463-.158a.266.266,0,0,1-.225-.316c.331-1.751,1.895-2.3,3.316-2.311h.112a3.4,3.4,0,0,1,2.222.752c.734.686.664,1.6.664,2.6v2.352a2.059,2.059,0,0,0,.57,1.4.286.286,0,0,1,0,.4c-.308.258-.857.734-1.158,1l0,0Zm-1.522-3.681a2.96,2.96,0,0,1-.282,1.6,1.226,1.226,0,0,1-1.045.686c-.579,0-.918-.441-.918-1.095,0-1.286,1.153-1.52,2.245-1.52v.327Z" transform="translate(0 -0.017)"></path><path class="c84" d="M552.328,274.643v-.569c0-.162.08-.274.249-.264a3.547,3.547,0,0,0,1.078.024,1.252,1.252,0,0,0,.886-.781c.248-.566.411-1.022.515-1.321l-3.141-7.78c-.053-.132-.069-.378.2-.378h1.1a.342.342,0,0,1,.342.263l2.277,6.32,2.174-6.32a.343.343,0,0,1,.341-.263h1.035c.262,0,.247.245.2.378l-3.116,8.023c-.4,1.069-.94,2.769-2.15,3.065a3.181,3.181,0,0,1-1.82-.087.353.353,0,0,1-.157-.309Z" transform="translate(-92.91 -0.329)"></path><path class="c84" d="M540.706,271.059a.265.265,0,0,1-.264.263h-.774a.3.3,0,0,1-.3-.263l-.078-.527a4.527,4.527,0,0,1-1.267.75,3.182,3.182,0,0,1-2.85-.134,2.271,2.271,0,0,1-.985-1.963,2.408,2.408,0,0,1,.611-1.671,3.1,3.1,0,0,1,2.359-.9,7.34,7.34,0,0,1,2.062.272v-1.06c0-1.078-.454-1.545-1.651-1.545a8.012,8.012,0,0,0-2.589.441.237.237,0,0,1-.247-.258v-.6a.376.376,0,0,1,.258-.328,7.81,7.81,0,0,1,2.729-.527c1.366,0,2.988.308,2.988,2.409v5.651Zm-1.488-1.548v-1.6a8.277,8.277,0,0,0-1.713-.2,1.979,1.979,0,0,0-1.4.448,1.321,1.321,0,0,0-.326.907,1.212,1.212,0,0,0,.491,1.064,2,2,0,0,0,1.6.073,3.512,3.512,0,0,0,1.347-.691Z" transform="translate(-82.753)"></path><path class="c84" d="M517.807,264.307c1.718,0,2.186,1.351,2.186,2.9a3.479,3.479,0,0,1-.722,2.5,1.954,1.954,0,0,1-1.535.507,3.725,3.725,0,0,1-1.994-.754V265.04a3.551,3.551,0,0,1,2.066-.732Zm-2.329,10.29H514.44a.264.264,0,0,1-.263-.263V263.528a.264.264,0,0,1,.263-.263h.794a.3.3,0,0,1,.3.263l.083.566a4.079,4.079,0,0,1,2.613-1.084c2.554,0,3.395,2.1,3.395,4.293,0,2.342-1.285,4.223-3.458,4.223a3.637,3.637,0,0,1-2.428-.924v3.731a.264.264,0,0,1-.264.263Z" transform="translate(-71.269 -0.006)"></path></g></g></svg>'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="amazon"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<img src="assets/images/apple_pay.svg" alt="apple pay">'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="apple_pay"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                    + '<label class="frm__checkbox">'
                                        + '<span class="info__payment">'
                                            + '<img src="assets/images/google_pay.svg" alt="google pay">'
                                        + '</span>'
                                        + '<input type="radio" name="pay_type" class="frm__checkbox__control" data-radio="google_pay"/>'
                                        + '<span class="frm__checkbox__checkmark"></span>'
                                    + '</label>'
                                + '</div>'
                            + '</div>'
                            +  '<div class="chatapp__order__foot chatapp-reselect-hidden-js">'
                                + '<div class="order__button order__button--unpayment">'
                                    + '<a href="chatapp/checkout-customer-payment.html" class="btn btn--green chatapp-edit-js">ReSelect Payment Method</a>'
                                    + '<a href="#" class="btn btn--green btn--green--warning chatapp-save-js">Save Cart for later</a> '
                                + '</div>'
                            + '</div>'
                        +'</div>';
    document.querySelector('.chatapp-content-js').appendChild(content);
    scrollToBottomChatApp();
    openEditConfirm();
    saveCartChatApp();
}
//Alert Message ChatApp
function alertMessageChatApp(messageTitle,messageSuccess,messageType = null){
    let content = document.createElement('div');
    let messageClass = messageType == 'order-pending' ? ['order__heading--pending','chatapp__order__coupon--pending'] : '';
    content.innerHTML = '<div class="chatapp__box chatapp__box--customer chatapp__order">'
                            + '<div class="chatapp__order__head">'
                                + '<h4 class="order__heading order__heading--confirm '+messageClass[0]+'">'+messageTitle+'</h4>'
                            + '</div>'
                            + '<div class="chatapp__order__body chatapp__order__body--coupon">'
                                + '<div class="chatapp__order__coupon text-center '+messageClass[1]+'">'+messageSuccess+'</div>'
                            + '</div>'
                        +'</div>';
    document.querySelector('.chatapp-content-js').appendChild(content);
}
function saveCartChatApp(){
    document.querySelector('.chatapp-save-js').addEventListener('click', function(e){
        e.preventDefault();
        this.parentElement.parentElement.style.display = 'none';
        let messageTitle = 'Save Cart Successfully';
        let messageSuccess = "You don't have to start over. We'll save your cart and email you a link to it.";
        alertMessageChatApp(messageTitle,messageSuccess);
        scrollToBottomChatApp();
    });
}
function alertPaymentSuccess(){
    let messageTitle = 'Purchased Successfully';
    let messageSuccess = "Your order has been placed.<br/>We'll send you an email with your order details";
    alertMessageChatApp(messageTitle,messageSuccess);
}
function alertPaymentPending(){
    let messageTitle = 'Order Pending';
    let messageSuccess = "Although your payment was processed, the result is still pending. Please check your email for the status of your order.";
    alertMessageChatApp(messageTitle,messageSuccess,'order-pending');
}
function scrollToBottomChatApp(){
    messages.scrollTop = messages.scrollHeight;
}
scrollToBottomChatApp();
