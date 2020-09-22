function closeAlert(ob) {
    ob.parentElement.style.display = 'none';
}
function toggleCoupon(el){
    let element = document.getElementById(el);
    if(el === 'product-js') element.previousElementSibling.classList.toggle('order__coupon__title--checkout');
    element.classList.toggle('active');
}
let showOffer = document.querySelectorAll('.offer-link-js');
for(let i = 0; i < showOffer.length; i++){
    showOffer[i].addEventListener('click', function(e){
        e.preventDefault();
        let id = this.getAttribute('data-id');
        document.getElementById(id).style.display = 'none';
        if (id === 'offer-js') {
            document.getElementById('discount-js').style.display = 'block';
        }else{
            document.getElementById('offer-js').style.display = 'block';
        }
    })
}
//Close Notify Cart
function closeNotifyCart(){
    if(document.querySelector('.cart-notify-js')) document.querySelector('.cart-notify-js').classList.remove('cart__notify--active');
}
window.addEventListener('load', stopClick);
function stopClick(){
    let stopClicks = document.querySelectorAll('.stop-body-js');
    for(let i = 0; i < stopClicks.length; i++){
        stopClicks[i].addEventListener('click', function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        });
    }
}
document.body.addEventListener('click', function(e){
    this.classList.remove('overlay');
    this.classList.remove('overlay--mobile');
    closeNotifyCart();
    if(document.querySelectorAll('.tooltip__price')) {
        let closeTooltip = document.querySelectorAll('.tooltip__price');
        for(let i = 0; i < closeTooltip.length; i++){
            closeTooltip[i].style.display = 'none';
        }
    }
    if(document.querySelector('.cart__search-list')) document.querySelector('.cart__search-list').style.display = 'none';
    if(document.querySelector('.chatapp__form--search')) document.querySelector('.chatapp__form--search').classList.remove('chatapp__form--active');
    if(document.querySelector('.country-js')) document.querySelector('.country-js').style.display = 'none';
    if(document.querySelector('.region-js')) document.querySelector('.region-js').style.display = 'none';
    if(document.querySelector('.dropdown__help')) document.querySelector('.dropdown__help').style.display = 'none';
    if(document.querySelector('.dropdown__cart')) document.querySelector('.dropdown__cart').style.display = 'none';
    if(document.getElementById('search-autocomplete-js')) document.getElementById('search-autocomplete-js').style.display = 'none';
    if(document.getElementById('modal-shipping')) document.getElementById('modal-shipping').classList.remove('modal--show');
    if(document.getElementById('modal-term')) document.getElementById('modal-term').classList.remove('modal--show');
    if(document.getElementById('nav-js')) document.getElementById('nav-js').classList.remove('nav--mobile');
});