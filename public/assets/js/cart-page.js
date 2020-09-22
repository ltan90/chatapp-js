// Add item
let products = [
    {
        id: 3,
        name: 'Intermittent Fasting Nutrients Bundle',
        image: '../assets/images/intermittent-fasting-nutrients_1.jpg',
        price: 98.79,
        subscription: '',
        product_sub: [
            { qty: 1, name: 'Electrolyte Powder Raspberry Lemon', price_discount: 46.15, price: 35.74},
            { qty: 1, name: 'Nutritional Yeast Tablets', price_discount: 29.95, price: 25.1},
            { qty: 1, name: 'Keto Essential Aminos', price_discount: 46.85, price: 37.95}
        ],
        category: 'bundle(s)',
        price_save: 24.16,
    },
    {
        id: 4,
        name: 'Keto Kit Bundle',
        image: '../assets/images/keto-kit-bundle-1.jpg',
        price: 100.19,
        subscription: '',
        product_sub: [
            { qty: 1, name: 'Electrolyte Powder Raspberry Lemon', price_discount: 46.15, price: 35.74},
            { qty: 1, name: 'Nutritional Yeast Tablets', price_discount: 29.95, price: 25.1},
            { qty: 1, name: 'Raw Wheat Grass Juice Powder', price_discount: 49.95, price: 39.35}
        ],
        category: 'bundle(s)',
        price_save: 25.86,
    },
    {
        id: 5,
        name: 'Electrolyte Sports Drink Raspberry & Lemon',
        image: '../assets/images/demo/electrolyte_sports_drink_label_2020_3d2_2.jpg',
        price: 37.62,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
    },
    {
        id: 6,
        name: 'Dr. Berg’s Chewable Vitamin C Complex',
        image: '../assets/images/demo/vitaminc_3d1.jpg',
        price: 29.95,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 5,
    },
    {
        id: 7,
        name: 'Keto Dessert Pecan Pie - Almonds',
        image: '../assets/images/demo/dr_berg_kd_pecan_pie-1p_1_1.jpg',
        price: 13.95,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
    },
    {
        id: 8,
        name: 'Raw Wheat Grass Juice Powder',
        image: '../assets/images/demo/wheat-grass-raw-label_3d2_2.jpg',
        price: 41.42,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
    },
]
function addToCart(){
    let cartItems = document.querySelectorAll('.add-cart-js');
    for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        element.addEventListener('click', function (e) {
            e.stopPropagation();
            if(document.querySelector('.cart-notify-js')) document.querySelector('.cart-notify-js').classList.remove('cart__notify--active');
            if(document.querySelector('.cart-success')) document.querySelector('.cart-success').style.display = 'block';
            var id = parseInt(this.getAttribute('data-id'));            
            const product = products.find(function (index){
                return index.id === id;
            });   
            var name = this.getAttribute('data-name');     
            shoppingCart.addItemToCart(product, 1);
            window.setTimeout(function(){
                document.querySelector('.cart-notify-js').classList.add('cart__notify--active');
                document.querySelector('.cart__notify__title').innerText = 'Product ' + name + ' was added to your cart';
            }, 500);
            displayCart();
        });
    }
}
addToCart();
//Show cart
function displayCart() {
    let cartArray = shoppingCart.listCart();    
    let output = "";
    let viewCart = "";
    let coupon = '';
    for(let i in cartArray) {
        let sub = "";
        let listOption = '';
        let listSubProduct = '';  
        coupon = cartArray[i].discount == 0 ? '' : cartArray[i].discount.coupon;
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
        viewCart += "<div class='row'>"
                    + "<div class='col__4 col__sm__3 text-center pr-0'>"
                        + "<img src='"+cartArray[i].product.image+"' alt='"+ cartArray[i].product.name +"' width='100%'>"
                    + "</div>"
                    + "<div class='col__8 col__sm__9'>" 
                        + "<p class='products__text'>"+cartArray[i].count+"x</p>"                       
                        + "<a href='#' class='products__text products__title'>"+ cartArray[i].product.name +"</a>"
                        + "<p class='products__text products__price'>$"+Number(cartArray[i].product.price*cartArray[i].count).toFixed(2)+"</p>"
                    + "</div>"
                +  "</div><hr class='hr'/>";
    }
    if(document.querySelector('.show-cart-js')) document.querySelector('.show-cart-js').innerHTML = output;
    if(document.querySelector('.product-cost-js')) document.querySelector('.product-cost-js').innerText = shoppingCart.totalCart();
    if(document.querySelector('.product-order-js')) document.querySelector('.product-order-js').innerText = shoppingCart.totalCart();
    if(document.querySelector('.subtotal-cart-js')) document.querySelector('.subtotal-cart-js').innerText = shoppingCart.subTotalCart();
    if(document.querySelector('.subtotal-order-js')) document.querySelector('.subtotal-order-js').innerText = shoppingCart.subTotalCart();
    if(document.querySelector('.show-quantity-js')) document.querySelector('.show-quantity-js').innerHTML = viewCart;
    if(document.getElementById('subtotal-cart-js')) document.getElementById('subtotal-cart-js').innerText = shoppingCart.subTotalCart();
    if(shoppingCart.totalDiscount() === 0){
        if(document.querySelector('.offer-group-js')) document.querySelector('.offer-group-js').checked = false;
        if(document.getElementById('total-discount-js')) document.getElementById('total-discount-js').innerText = 0;
        if(document.querySelector('.total-discount-js')) document.querySelector('.total-discount-js').classList.remove('discount--active');
    }else{
        if(document.querySelector('.offer-group-js')) document.querySelector('.offer-group-js').checked = true;
        if(document.querySelector('.text-coupon-mobile-js')) document.querySelector('.text-coupon-mobile-js').innerText = coupon;
        if(document.getElementById('total-discount-mobile-js')) document.getElementById('total-discount-mobile-js').innerText = shoppingCart.totalDiscount();
        if(document.querySelector('.total-discount-mobile-js')) document.querySelector('.total-discount-mobile-js').classList.add('discount--active');
        if(document.querySelector('.text-coupon-js')) document.querySelector('.text-coupon-js').innerText = coupon;
        if(document.getElementById('total-discount-js')) document.getElementById('total-discount-js').innerText = shoppingCart.totalDiscount();
        if(document.querySelector('.total-discount-js')) document.querySelector('.total-discount-js').classList.add('discount--active');
    }
    if (shoppingCart.totalCount() > 0) {
        if(document.querySelector('.total-count-js')) document.querySelector('.total-count-js').innerHTML = '<span class="cart__quantity">'+shoppingCart.totalCount()+'</span>';
        if(document.querySelector('.total-count-mobile-js')) document.querySelector('.total-count-mobile-js').innerHTML = '<span class="cart__quantity">'+shoppingCart.totalCount()+'</span>';
        if(document.querySelector('.cart__empty')) document.querySelector('.cart__empty').style.display = 'none';
        if(document.querySelector('.cart')) document.querySelector('.cart').style.display = 'block';
        if(document.querySelector('.view__cart')) document.querySelector('.view__cart').style.display = 'block';
        if(document.querySelector('.total-view-js')) document.querySelector('.total-view-js').innerHTML = 'Total: '+shoppingCart.totalCount()+' <span class="info__label__text">products</span>';
    }else{
        if(document.querySelector('.offer-group-js')) document.querySelector('.offer-group-js').checked = false;
        if(document.querySelector('.total-count-mobile-js')) document.querySelector('.total-count-mobile-js').innerHTML = "";
        if(document.querySelector('.total-count-js')) document.querySelector('.total-count-js').innerHTML = "";
        if(document.querySelector('.cart__empty')) document.querySelector('.cart__empty').style.display = 'block';
        if(document.querySelector('.cart')) document.querySelector('.cart').style.display = 'none';
        document.querySelector('.view__empty').style.display = 'block';
        document.querySelector('.view__cart').style.display = 'none';
    }
    changeQuantityItem();
    deleteItem();
}
displayCart();
/*Change quantity item*/
function changeQuantityItem(){
    var countItems = document.querySelectorAll('.item-count-js');
	for (let i = 0; i < countItems.length; i++) {	  
	  countItems[i].addEventListener('change', function (e) {     
        e.preventDefault(); 
        var id = parseInt(this.getAttribute('data-id'));  	
        var count = parseInt(this.value);
		shoppingCart.setCountForItem(id, count);
        displayCart();
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
            displayCart();
		}
	}
}