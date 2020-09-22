/*Show Key Search*/
function showKeySearch() {
    document.getElementById('search-auto-js').addEventListener('keyup', function(){
        var filter, ul, li, a, i, txtValue;               
        filter = this.value.toUpperCase();
        ul = document.getElementById("search-autocomplete-js");
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
function addKeySearch(){
    let addKey = document.querySelectorAll('.add-key-js');
    for(let i = 0; i < addKey.length; i++){
        addKey[i].addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let key = this.getAttribute('data-key');
            document.getElementById('search-auto-js').value = key;
            let action = document.getElementById('search-js').getAttribute('action');
            window.setTimeout(function(){
                window.location = action + '?q=' + key;
            }, 100);
        })
    }
}
//View help:view-help-js
document.querySelector('.view-help-js').addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    this.nextElementSibling.style.display = 'block';
    document.querySelector('.dropdown__cart').style.display = 'none';
    closeNotifyCart();
});
//View drop cart
document.querySelector('.view-cart-js').addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    this.nextElementSibling.style.display = 'block';
    document.querySelector('.dropdown__help').style.display = 'none';
    closeNotifyCart();
});    
let closeView = document.querySelectorAll('.close-view-js');
for(let i = 0; i < closeView.length; i++){
    closeView[i].addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector('.' + this.getAttribute('data-close')).style.display = 'none';
    });
}
//Mobile footer
let showFooter = document.querySelectorAll('.footer-top-js');
for(let i = 0; i < showFooter.length; i++){
    showFooter[i].addEventListener('click', function(){
        this.parentElement.classList.toggle('footer__active');
        let panel = this.nextElementSibling;
        if(panel.style.display === 'block'){
            panel.style.display = 'none';
        }else{
            panel.style.display ='block';
        }
    })
}
//Mobile navbar
let dropOpen = document.querySelectorAll('.drop-js');
for(let i = 0; i < dropOpen.length; i++){
    dropOpen[i].addEventListener('click', function(e){
        e.stopPropagation();
        this.nextElementSibling.style.display = 'block';
        document.getElementById('nav-close-js').style.display = 'block';
        document.getElementById('nav-close-js').previousElementSibling.style.display = 'none';
    });
}  
let dropClose = document.querySelectorAll('.nav-close-js');
for(let i = 0; i < dropClose.length; i++){
    dropClose[i].addEventListener('click', function(e){
        e.stopPropagation();
        this.style.display = 'none';
        document.getElementById('nav-close-js').previousElementSibling.style.display = 'block';
        let dropOpen = document.querySelectorAll('.drop__mobile');
        for(let i = 0; i < dropOpen.length; i++){
            dropOpen[i].style.display = 'none';
        }
    });
} 
let toggleNav = document.querySelectorAll('.nav-mobile-js');
for(let i = 0; i < toggleNav.length; i++){
    toggleNav[i].addEventListener('click', function(e){
        e.stopPropagation();
        document.getElementById('nav-js').classList.toggle('nav--mobile');
        document.body.classList.toggle('overlay--mobile');
        document.querySelector('.dropdown__help').style.display = 'none';
        document.querySelector('.dropdown__cart').style.display = 'none';
        closeNotifyCart();
    })
}       
document.querySelector('#search-js').addEventListener('click', function(e){
    e.stopPropagation();
    document.body.classList.add('overlay');
    showKeySearch();
    addKeySearch();
});
document.querySelector('#show-search-js').addEventListener('click', function(e){            
    if(this.firstElementChild.firstElementChild.style.display === 'block'){
        this.firstElementChild.firstElementChild.style.display = 'none';
        this.firstElementChild.lastElementChild.style.display = 'block';
    }else{
        this.firstElementChild.firstElementChild.style.display = 'block';
        this.firstElementChild.lastElementChild.style.display = 'none';
    }
    let showId = document.getElementById(this.getAttribute('data-search'));            
    if(showId.style.display === "block"){
        showId.style.display = 'none';
    }else{
        showId.style.display = 'block';
    }
});
//Validate newsletter
document.querySelector('#newsletter-js').addEventListener('submit', function(e){
    e.preventDefault();
    let fn = document.forms['frm__newsletter']['email'];
    if(fn.value === ''){
        fn.parentElement.nextElementSibling.classList.add('frm__error--block');
        fn.focus();
        return false;
    }else{
        fn.value = '';
        document.querySelector('.newsletter-success').style.display = 'block';
    }
    return true;
});