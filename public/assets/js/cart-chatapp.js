//Search Product
let html = '';
for(let i in chatappProducts){
    html += '<li class="search__item search__radius">'
            + '<div class="search__item__col">'
                + '<img width="40" class="search__img search__img--cart" src="'+chatappProducts[i].image+'" alt="">'
                + '<a class="search__link" href="#">'+chatappProducts[i].name+'</a>'
            + '</div>'
            + '<div class="search__item__col">'
                + '<span class="search__price">'
                    + '<span class="search__price__discount">$'+chatappProducts[i].price_discount+'</span><br/>'
                    + '<span class="search__price__special">$'+chatappProducts[i].price+'</span>'
                + '</span>'
                + '<button class="btn__send add-cart-js" data-id='+chatappProducts[i].id+'>Add to cart</button>'
            + '</div>'
        + '</li>';
}
let listProduct = document.createElement('div');      
listProduct.innerHTML = '<ul id="autocomplete-products-js" class="cart__search-list search__list" style="display: none;">'+html+'</ul>';
document.querySelector('.cart-search-js').appendChild(listProduct);
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
searchProduct();
//Add to cart
function addToCartChatApp(){
let cartItems = document.querySelectorAll('.add-cart-js');
    for (let i = 0; i < cartItems.length; i++) {                
        cartItems[i].addEventListener('click', function (e) {
            e.stopPropagation();
            var id = parseInt(this.getAttribute('data-id'));            
            const product = chatappProducts.find(function (index){
                return index.id === id;
            });        
            shoppingCart.addItemToCart(product, 1);
            displayCartChatApp();
        });
    }
}
addToCartChatApp();  
//Show cart ChatApp
function displayCartChatApp() {
    let cartArray = shoppingCart.listCart();    
    let output = "";
    let viewCartChatApp = "";
    for(let i in cartArray) {
        let sub = "";
        let listOption = '';
        let listSubProduct = '';  
        for(let j = 1; j <= 15; j++){
            let selected = cartArray[i].count == j ? 'selected' : '';
            listOption += "<option value='"+j+"'"+selected+">"+j+"</option>"
        } 
        if (cartArray[i].product.subscription !== ''){
            sub = "<p class='mb-0 item__sub'>"
                    + "<label class='item__label'>Subscription:</label>&nbsp;"
                    + "<span>"+ cartArray[i].product.subscription +"</span>"
                + "</p>";
        }
        if (cartArray[i].product.product_sub.length > 0){
            let subProduct = cartArray[i].product.product_sub;
            for(let j = 0; j < subProduct.length; j++){
                listSubProduct += '<p class="mb-1">'
                                + '<span class="quantity">' + subProduct[j].qty + 'x </span>'
                                + subProduct[j].name
                                + ' $'+subProduct[j].price
                                +'</p>';
            }
            sub = "<dl class='item__dl'>"
                    + "<dt class='item__label'>Products in each bundle:</dt>"
                    + "<dd class='item__dd'>"
                        + listSubProduct
                    +"</dd>"
                + "</dl>";    
        }
        output += "<div class='cart__item'><div class='row'>"
            + "<div class='col__3'>"
                + "<img src='"+cartArray[i].product.image+"' alt='"+ cartArray[i].product.name +"' width='100%'>"
            + "</div>"
            + "<div class='col__9'>"
                + "<div class='cart__header'>"
                    + "<div class='cart__item__info'>"
                        + "<a href='#' class='item__title'>"+ cartArray[i].product.name +"</a>"
                    + "</div>"
                    + "<div class='cart__item__quantity'>"
                        + "<select name='quantity' class='item-count-js quantity__number' data-id='" + cartArray[i].product.id + "'>"
                            + listOption
                        + "</select>"
                        + "<span class='fs-14'>"+cartArray[i].product.category+"</span>"
                    + "</div>"
                    + "<div class='cart__item__price'>"
                        + "<p class='mb-0 price__lg'>$"+Number(cartArray[i].product.price*cartArray[i].count).toFixed(2)+"</p>"
                        + "<p class='mb-0'>You save: $"+Number(cartArray[i].product.price_save*cartArray[i].count).toFixed(2)+"</p>"
                    + "</div>"
                + "</div>"
                + "<div class='cart__footer'>"
                    + "<div class='cart__item__info'>"
                        + sub
                    + "</div>"
                    + "<div class='cart__event'>"
                        + "<a href='#' class='cart__event__btn cart__event--favorites'>Move to favorites</a>"
                        + "<a href='#' class='cart__event__btn delete-item-js' data-id=" + cartArray[i].product.id + ">Delete</a>"
                    + "</div>"
                + "</div>"
            + "</div>"
            +  "</div></div>";
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
    if(document.querySelector('.show-cart-js')) document.querySelector('.show-cart-js').innerHTML = output;
    if(document.querySelector('.product-cost-js')) document.querySelector('.product-cost-js').innerText = shoppingCart.totalCart();
    if(document.querySelector('.product-order-js')) document.querySelector('.product-order-js').innerText = shoppingCart.totalCart();
    if(document.querySelector('.subtotal-cart-js')) document.querySelector('.subtotal-cart-js').innerText = shoppingCart.subTotalCart();
    if(document.querySelector('.subtotal-order-js')) document.querySelector('.subtotal-order-js').innerText = shoppingCart.subTotalCart();
    if(document.getElementById('subtotal-cart-js')) document.getElementById('subtotal-cart-js').innerText = shoppingCart.subTotalCart();
    if (shoppingCart.totalCount() == 0) {
        let cartEmpty = document.createElement('div');
        cartEmpty.className = 'cart__empty--chatapp';
        cartEmpty.innerHTML = 'CART IS EMPTY';
        document.querySelector('.show-cart-js').appendChild(cartEmpty);
    }
    if(document.getElementById('chatapp-product')) document.getElementById('chatapp-product').innerHTML = viewCartChatApp;
    if(document.querySelector('.chatapp-subtotal-js')) document.querySelector('.chatapp-subtotal-js').innerHTML = '<label class="info__label">Total: '+shoppingCart. totalCount()+' <span>product</span></label>'
                                                            + '<label class="info__price">$'+shoppingCart.subTotalCart()+'</label>';
    changeQuantityItem();
    deleteItem();
}
displayCartChatApp();
/*Change quantity item*/
function changeQuantityItem(){
    var countItems = document.querySelectorAll('.item-count-js');
    for (let i = 0; i < countItems.length; i++) {	  
    countItems[i].addEventListener('change', function (e) {     
            e.preventDefault(); 
            var id = parseInt(this.getAttribute('data-id'));  	
            var count = parseInt(this.value);
            shoppingCart.setCountForItem(id, count);
            displayCartChatApp();
        })
    }
}
/*Delete item*/
function deleteItem(){
    var deleteItems = document.querySelectorAll('.delete-item-js');
    for (let i = 0; i < deleteItems.length; i++) {
        deleteItems[i].onclick = function(e){
            e.preventDefault();
            var id = parseInt(this.getAttribute('data-id'));  		
            shoppingCart.removeItemFromCartAll(id);
            displayCartChatApp();
        }
    }
}   
