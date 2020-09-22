const shoppingCart = (function() {

    let cart = [];
    const obj = {};

    function Item(product,count,discount) {
        this.product = product;
        this.count = count;
        this.discount = discount;
    }

    // Save cart
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
        if(cart === null){
            cart = [
                {
                    product: {
                        id: 2,
                        name: 'Dr. Berg’s Chewable Vitamin C Complex',
                        image: '../assets/images/demo/vitaminc_3d1.jpg',
                        price: 29.95,
                        subscription: '',
                        product_sub: '',
                        category: 'pcs',
                        price_save: 5,
                        price_discount: 34.95
                    },
                    count: 1,
                    discount: 0
                },
                {
                    product: {
                        id: 7,
                        name: 'D3 & K2 Vitamin',
                        image: '../assets/images/demo/ezgif-6-ce53ced53df3.jpg',
                        price: 34.12,
                        subscription: '',
                        product_sub: '',
                        category: 'pcs',
                        price_save: 8.53,
                        price_discount: 42.65
                    },
                    count: 1,
                    discount: 0
                },
            ]
        }
    }

    loadCart();

    // Add to cart
    obj.addItemToCart = function(product, count, discount = 0) {
        for(let i in cart) {
            if(cart[i].product.id === product.id) {
                cart[i].count ++;
                saveCart();
                return;
            }
        }
        let item = new Item(product, count, discount);
        cart.push(item);
        saveCart();
    };

    // Add to coupon
    obj.couponToCart = function(discount) {
        for(let i in cart) {
            cart[i].discount = discount;
        }
        saveCart();
        return;
    };

    // Set count from item
    obj.setCountForItem = function(id, count) {
        for(let i in cart) {
            if (cart[i].product.id === id) {
                cart[i].count = count;
                saveCart();
                break;
            }
        }
    };

    // Remove item from cart
    obj.removeItemFromCart = function(id) {
        for(let i in cart) {
            if(cart[i].product.id === id) {
                cart[i].count --;
                if(cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };
    // Remove all items from cart
    obj.removeItemFromCartAll = function(id) {
        for (let i in cart){            
            if (cart[i].product.id === id){
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    // Count cart
    obj.totalCount = function() {
        if(cart.length === 0) return 0;
        return cart.map(function(index){
            return index.count;
        }).reduce(function(first, index){
            return first + index;
        });
    };

    // Total cart
    obj.totalCart = function() {
        if(cart.length === 0) return 0;
        const totalCart = cart.map(function(index){
            return parseFloat(index.product.price) * index.count;
        }).reduce(function(first, index){
            return first + index;
        });
        return Number(totalCart.toFixed(2));
    }; 
    // Total Discount
    obj.totalDiscount = function() {
        if(cart.length === 0) return 0;
        const discount = cart.map(function(index){
            return index.discount == 0 ? 0 : (index.product.price*(index.discount.persent/100)*100*index.count)/100;
        }).reduce(function(first, index){
            return first + index;
        });
        return Number(discount.toFixed(2));
    }; 
    // Sub total cart
    obj.subTotalCart = function() {
        return Number((this.totalCart() - this.totalDiscount()).toFixed(2));
    }; 
    
    // List cart
    obj.listCart = function() {
        let cartCopy = [];
        for(let i in cart) {
            let item = cart[i];
            let itemCopy = {};
            for(let p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.product.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    };
    return obj;
})();
var discountCode = [
    { coupon: 'LOANTEST', persent: 20 }, 
    { coupon: 'TESTBUG1', persent: 25},
    { coupon: 'TESTBUG2', persent: 30},
    { coupon: 'TESTBUG3', persent: 35},
];
//Demo product search
let chatappProducts = [
    {
        id: 1,
        name: 'Electrolyte Sports Drink Raspberry & Lemon',
        image: 'images/demo/electrolyte_sports_drink_label_2020_3d2_2.jpg',
        price: 37.62,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 46.15
    },
    {
        id: 2,
        name: 'Dr. Berg’s Chewable Vitamin C Complex',
        image: 'images/demo/vitaminc_3d1.jpg',
        price: 29.95,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 5,
        price_discount: 34.95
    },
    {
        id: 3,
        name: 'Keto Dessert Pecan Pie - Almonds',
        image: 'images/demo/dr_berg_kd_pecan_pie-1p_1_1.jpg',
        price: 13.95,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 18.95
    },
    {
        id: 4,
        name: 'Raw Wheat Grass Juice Powder',
        image: 'images/demo/wheat-grass-raw-label_3d2_2.jpg',
        price: 41.42,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 49.95
    },
    {
        id: 5,
        name: 'Electrolyte Powder Raspberry Lemon',
        image: 'images/demo/electrolyte-powder-label-3d2_1_1.jpg',
        price: 37.62,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 46.15
    },
    {
        id: 6,
        name: 'Raw Wheat Grass Juice Powder (Lemon Flavor)',
        image: 'images/demo/raw_wheat_grass_lemon_label_3d2_2.jpg',
        price: 43.42,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 5,
        price_discount: 56.38
    },
    {
        id: 7,
        name: 'D3 & K2 Vitamin',
        image: 'images/demo/ezgif-6-ce53ced53df3.jpg',
        price: 34.12,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 42.65
    },
    {
        id: 8,
        name: 'Gallbladder Formula',
        image: 'images/demo/gallbladder-formula-label_sim2_2.jpg',
        price: 36.42,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 47.29
    },
    {
        id: 9,
        name: 'Hair Formula',
        image: 'images/demo/hairformulalabel-3d2_3_1.jpg',
        price: 41.42,
        subscription: '',
        product_sub: '',
        category: 'pcs',
        price_save: 8.53,
        price_discount: 49.95
    },
];
//Demo Banking
let bankVisa = [
    {
        number: 1234567891234567,
        name: 'EMILY',
        security: 123,
        expiration: '10/2026',
        status: '00'
    },
    {
        number: 1234987601234567,
        name: 'DAVID',
        security: 345,
        expiration: '09/2025',
        status: '01'
    },
    {
        number: 1234987656780123,
        name: 'DANIEL',
        security: 567,
        expiration: '08/2024',
        status: '02'
    },
];
//Demo User
let users = [
    {id: 1, email: 'jasminetran@gmail.com', fullname: 'Jasmine Tran', roles: 'sales', position: 'Keto Consultant'},
    {id: 2, email: 'ltan9x@gmail.com', fullname: 'An Le Trung', roles: 'customer', position: ''},
]
/*Add offer coupon*/
function discountOffer(coupon){
    let result = discountCode.find(code => code.coupon === coupon);  
    if(document.querySelector('.alert--error')) document.querySelector('.alert--error').style.display = 'none';
    if(document.querySelector('.alert-checkout-js')){
        let hiddenAlert = document.querySelectorAll('.alert-checkout-js');
        for(let i = 0; i < hiddenAlert.length; i++){
            window.setTimeout(function(){
                hiddenAlert[i].style.display = 'none';
            }, 1000);
        }
    }
    if(result === undefined){
        document.querySelector('.alert--valid').style.display = 'block';
        document.getElementById('coupon-js').classList.add('active');   
        document.querySelector('.total-discount-js').classList.remove('discount--active');  
        if(document.querySelector('.alert--coupon')) document.querySelector('.alert--coupon').style.display = 'none';
    }else{
        document.querySelector('.total-discount-js').classList.add('discount--active');
        if(document.querySelector('.apply-js')) document.querySelector('.apply-js').style.display = 'inline-block';
        document.querySelector('.text-coupon-js').innerText = coupon;
        if(document.querySelector('.alert-coupon-js')) document.querySelector('.alert-coupon-js').innerText = coupon;
        if(document.querySelector('.alert--coupon')) document.querySelector('.alert--coupon').style.display = 'block';
        document.querySelector('.alert--valid').style.display = 'none';
        shoppingCart.couponToCart(result);
    }
}

/*Remove offer coupon*/
let closeDiscounts = document.querySelectorAll('.discount-close-js');
for(let i = 0; i < closeDiscounts.length; i++){
    closeDiscounts[i].addEventListener('click', function(){
        this.parentElement.parentElement.classList.remove('discount--active');
        let type = this.getAttribute('data-type');
        if(document.querySelector('.alert--coupon')) document.querySelector('.alert--coupon').style.display = 'none';
        document.querySelector('.total-discount-mobile-js').classList.remove('discount--active');
        document.querySelector('.offer-group-js').checked = false;
        document.querySelector('.discount-group-js').value = '';
        document.getElementById('coupon-js').classList.remove('active');     
        shoppingCart.couponToCart(0);
        if(type === 'cart-sales'){
            displayCartChatApp();
        }else{
            displayCart();
        }
    });
}
/*Copy content in clipboard*/
function copyToClipBoard(str){
    let el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0,99999);//mobile
    document.execCommand('copy');
    var tooltip = document.getElementById("tooltip");
    tooltip.innerText = "Copy to clipboard";
    tooltip.classList.add('tooltip__text');
    document.body.removeChild(el);
}
function copyContent() {
    let copyEl = document.querySelectorAll('.copy-step');
    for(let i = 0; i < copyEl.length; i++){
        copyEl[i].addEventListener('click', function(){
            let elVal = document.getElementById(this.getAttribute('data-type')).innerHTML;                    
            copyToClipBoard(elVal);
        });
    }
}
copyContent();