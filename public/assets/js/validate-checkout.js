/*Validate password regex*/
let validatePassword = document.querySelectorAll('.validate-password-js');
for(let i = 0; i < validatePassword.length; i++){
    validatePassword[i].addEventListener('keyup', function(e){        
        let removeActive = document.querySelectorAll('.error');
        for(let j = 0; j < removeActive.length; j++){
            removeActive[j].classList.remove('active');
        }
        let password = this.value;
        if(!password) return false;
        let lower = /[a-z]/g, upper = /[A-Z]/g, digits = /[0-9]/g, special = /[!@#$%^&*]/g;
        if(lower.test(password)) document.getElementById('lower'+i).classList.add('active');
        if(upper.test(password)) document.getElementById('upper'+i).classList.add('active');
        if(digits.test(password)) document.getElementById('digits'+i).classList.add('active');
        if(special.test(password)) document.getElementById('special'+i).classList.add('active');
    })
}
/*Submit form*/
let onSubmit = document.querySelectorAll('.submit-js');
for (var i = 0; i < onSubmit.length; i++) {
    onSubmit[i].addEventListener("submit", function (e) {
        e.preventDefault();
        let step = this.getAttribute('data-edit');
        switch(step) {
            case 'step1':
                let stepLogin = this.getAttribute('data-step');
                email = stepLogin == 'email' ? this['email'].value : '';
                if(validateStep1(this,stepLogin)){
                    let active = this.getAttribute('data-active');
                    this.parentElement.style.display = 'none';
                    if(email == "demo@gmail.com"){
                        document.querySelector('.card__head').classList.add('card__head--back');
                        document.getElementById('step-password').firstElementChild.firstElementChild.nextElementSibling.innerText = email;
                        document.getElementById('step-password').firstElementChild.lastElementChild.value = email;
                        document.getElementById('step-password').style.display = 'block';
                    }else if(stepLogin == "password" || stepLogin == "account"){
                        let active = this.getAttribute('data-active');
                        document.querySelector('.card__head').classList.remove('card__head--back');
                        document.querySelector('.card__title__login').innerText = this['email'].value;
                        document.getElementById(step).classList.remove('active');
                        document.getElementById(step).classList.add('card--edit');
                        document.getElementById(step).style.opacity = '0.5';
                        document.getElementById(active).classList.add('active');
                    }else{
                        document.querySelector('.card__head').classList.add('card__head--back');
                        document.getElementById('step-account').firstElementChild.lastElementChild.value = email;
                        document.getElementById('step-account').firstElementChild.firstElementChild.nextElementSibling.innerText = email;
                        document.getElementById('step-account').style.display = 'block';
                    }
                }
            break;
            case 'step2': 
                if(validateStep2(this)){
                    let active = this.getAttribute('data-active');
                    document.getElementById(step).classList.remove('active');
                    document.getElementById(step).classList.add('card--edit');
                    document.getElementById(active).classList.add('active');
                    let office = this['add_address'].value;
                    let fullNamePhone = this['first_name'].value +'&nbsp;'+ this['last_name'].value + ',&nbsp;' + this['phone_number'].value + ',';
                    let state = this['state'].value;
                    let region = this['regions'].getAttribute('data-name') == '' ? state : this['regions'].getAttribute('data-name');
                    let fullAddress = this['address'].value + '&nbsp;' + this['city'].value +',&nbsp;'+region+'&nbsp;'+ this['zip'].value + '&nbsp;' + this['countries'].getAttribute('data-name');
                    let info = '<h3 class="card__body__title shipping-billing">Ship to:</h3>'
                                + '<h4 class="card__body__title card__body--title">'+office+'</h4>'
                                + '<p class="card__body__text">'+fullNamePhone+'<br/>'+fullAddress+'</p>'
                                + '<h3 class="card__body__title">Bill to:</h3>'
                                + '<h4 class="card__body__title card__body--title">'+office+'</h4>'
                                + '<p class="card__body__text">'+fullNamePhone+'<br/>'+fullAddress+'</p>';
                    document.querySelector('.info-step-2').innerHTML = info;
                }
            break;
            case 'step3':
                if(validateStep3(this)){
                    let active = this.getAttribute('data-active');
                    document.getElementById(step).classList.remove('active');
                    document.getElementById(step).classList.add('card--edit');
                    document.getElementById(active).classList.add('active');
                    let typeShipping = document.getElementById('type-shipping-js').value.split(",");
                    let html = "<p class='card__body__text'>"
                                +"<span class='text__price'>$"+typeShipping[2]+"</span>"
                                + typeShipping[1] +" - "+ typeShipping[0]
                                + "</p>";
                    this.parentElement.previousElementSibling.innerHTML = html;
                }
            break;
            case 'step4':
                if(validateStep4(this)){
                    alert('You have payment success!');
                }
            break;
        }
    });
}
/*Validate step by step*/
function validateStep1(form,stepLogin){
    if(stepLogin == 'email'){
        let email = form['email'];
        if(email.value === ''){
            email.classList.add('frm__error__border');
            email.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            email.focus();
            return false;
        }
    }else if(stepLogin == 'account'){
        let fields = ["first_name_account", "password", "password_confirm"];
        fields.forEach((element) => {
            if(form[element].value === ''){
                document.querySelector('.' + element).previousElementSibling.previousElementSibling.classList.add('frm__error__border');
                document.querySelector('.' + element).classList.add('frm__error--block');
                return false;
            }
        });
        let fn = form['first_name_account'];            
        if(fn.value === ''){
            fn.classList.add('frm__error__border');
            fn.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            fn.focus();
            return false;
        }
        let ps = form['password'];
        let lower = /[a-z]/g, upper = /[A-Z]/g, digits = /[0-9]/g, special = /[!@#$%^&*]/g;
        //|| (!lower.test(ps.value)) || (!digits.test(ps.value)) || (!upper.test(ps.value)) || (!special.test(ps.value))
        if(ps.value === ''){
            ps.classList.add('frm__error__border');
            ps.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            ps.focus();
            return false;
        }else if(ps.value.length < 8){
            document.querySelector('.frm__error--password').classList.add('frm__error--block');
            document.querySelector('.frm__error--password').innerText = 'The password needs at least 8 characters. Create a new password and try again.'
            ps.focus();
            return false;
        }else{
            document.querySelector('.frm__error--password').innerText = '';
        }
        let pc = form['password_confirm'];
        if(pc.value === ''){
            pc.classList.add('frm__error__border');
            pc.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            pc.focus();
            return false;
        }
        if(pc.value !== ps.value){
            pc.classList.add('frm__error__border');
            pc.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            pc.nextElementSibling.nextElementSibling.innerText = 'Please enter the same value again.'
            pc.focus();
            return false;
        }
        let chkTerms = form['terms_conditions'];
        if(!chkTerms.checked){
            chkTerms.parentElement.nextElementSibling.classList.add('frm__error--block');
            chkTerms.parentElement.nextElementSibling.innerText = 'Accept the terms';
            chkTerms.focus();
            return false;
        }
        if((!lower.test(ps.value)) || (!digits.test(ps.value)) || (!upper.test(ps.value)) || (!special.test(ps.value))){
            document.querySelector('.frm__error--password').innerText = '';
            return false;
        }

    }else if(stepLogin == 'password'){
        let ps = form['password'];
        if(ps.value === ''){
            ps.classList.add('frm__error__border');
            ps.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            ps.focus();
            return false;
        }else if(ps.value !== 'Demo@123'){
            ps.classList.add('frm__error__border');
            ps.nextElementSibling.nextElementSibling.innerText = 'Invalid login or password.'
            ps.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
            ps.focus();
            return false;
        }
    }
    return true;
}
function validateStep2(form){
    let fields = ["first_name", "last_name", "phone_number", "address", "city", "zip"];
    fields.forEach((element) => {
        if(form[element].value === ''){
            document.querySelector('.' + element).classList.add('frm__error--block');
            document.querySelector('.' + element).previousElementSibling.previousElementSibling.classList.add('frm__error__border');            
            return false;
        }
    });
    let fn = form['first_name'];
    if(fn.value === ''){
        fn.classList.add('frm__error__border');
        fn.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    if(fn.value.length === 1){
        fn.classList.add('frm__error__border');
        fn.nextElementSibling.nextElementSibling.innerText = 'Please enter more or equal than 2 symbols.'
        fn.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let ln = form['last_name'];
    if(ln.value === ''){
        ln.classList.add('frm__error__border');
        ln.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    if(ln.value.length === 1){
        ln.classList.add('frm__error__border');
        ln.nextElementSibling.nextElementSibling.innerText = 'Please enter more or equal than 2 symbols.'
        ln.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let pn = form['phone_number'];
    if(pn.value === ''){
        pn.classList.add('frm__error__border');
        pn.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let ad = form['address'];
    if(ad.value === ''){
        ad.classList.add('frm__error__border');
        ad.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let ct = form['city'];
    if(ct.value === ''){
        ct.classList.add('frm__error__border');
        ct.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let zp = form['zip'];
    if(zp.value === ''){
        zp.classList.add('frm__error__border');
        zp.nextElementSibling.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let st = form['regions'];
    if(st.getAttribute('data-value') === ''){
        st.parentElement.parentElement.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    return true;
}
function validateStep3(form){
    let ts = form['type_shipping'];
    if(ts.value === ''){
        ts.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    return true;
}
function validateStep4(form){
    let fields = ["credit_number", "name_card", "security_cvv", "expiration_month"];
    fields.forEach((element) => {
        if(form[element].value === ''){
            document.querySelector('.' + element).classList.add('frm__error--block');
            return false;
        }
    });
    let cn = form['credit_number'];
    if(cn.value === ''){
        cn.parentElement.nextElementSibling.classList.add('frm__error--block');
        cn.focus();
        return false;
    }
    if(parseInt(cn.value.length) < 19){
        cn.parentElement.nextElementSibling.classList.add('frm__error--block');
        cn.focus();
        return false;
    }
    let nc = form['name_card'];
    if(nc.value === ''){
        nc.parentElement.nextElementSibling.classList.add('frm__error--block');
        nc.focus();
        return false;
    }
    let sc = form['security_cvv'];
    if(sc.value === ''){
        sc.parentElement.nextElementSibling.classList.add('frm__error--block');
        sc.focus();
        return false;
    }
    let month = form['expiration_month'];
    if(month.value === ''){                              
        month.parentElement.parentElement.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let year = form['expiration_years'];
    if(year.value === ''){                              
        year.parentElement.parentElement.nextElementSibling.classList.add('frm__error--block');
        return false;
    }
    let chkTerm = form['terms-conditions'];
    if(!chkTerm.checked){
        chkTerm.parentElement.nextElementSibling.classList.add('frm__error--block');
        chkTerm.focus();
        return false;
    }
    return true;
}