console.log('hi');
import throttle from "lodash.throttle";

const throttleTime = 1000; //ms

const formEl  = document.querySelector('.feedback-form');
const keyLocalStorage = "feedback-form-state";
const valLocalStorage = {};




// === Загрузка данных из localStorage при старте ====
    const inputEmailEl = document.querySelector('input[name="email"]');
    // inputEmailEl.value = 'Hello';

    const textareaEl = document.querySelector('textarea[name="message"]');
    // textareaEl.value = 'textarea';

    let checkKey = localStorage.getItem(keyLocalStorage);
    if(checkKey){
        checkKey = JSON.parse(checkKey);
        // console.log(checkKey);
        if(checkKey.email) {
            valLocalStorage.email = checkKey.email;
            console.log('email:', valLocalStorage.email);
            inputEmailEl.value = valLocalStorage.email;
        }
        if(checkKey.message) {
            valLocalStorage.message = checkKey.message;
            console.log('message:', valLocalStorage.message);
            textareaEl.value = valLocalStorage.message;
        }
       
    }
    else {
        console.log('LocalStorage is empty');
    }

// === Загрузка данных из localStorage Конец ==




// === Submit Сохранение данных Очистка формы и localStorage ===

    formEl.addEventListener('submit', onSubmit);

    function onSubmit (event) {
        const email = event.currentTarget.elements.email.value;
        const message = event.currentTarget.elements.message.value;
        event.preventDefault();
        if(email && message) {
            console.log(email);
            console.log(message);
            event.currentTarget.reset(); //сброс полей ввода
            localStorage.removeItem(keyLocalStorage);
            console.log('Key LocalStorage has removed');
        }
        else {
            console.log('Заповніть усі поля');
            alert('Заповніть усі поля');
        }
        // const checkKey = localStorage.getItem(keyLocalStorage);
        // if(checkKey){
        //     localStorage.removeItem(keyLocalStorage);
        //     console.log('Key LocalStorage has removed');
        // }
        // else {
        //     console.log('Key LocalStorage was not found');
        // }
    }
// === Submit button Конец ===



// ==== Запись дынных в localStorage ===

    formEl.addEventListener('input', throttle(onSaveInput, throttleTime, {
        trailing: true, leading: false}));

    function onSaveInput (event) {
        switch(event.target.name) {
            case  'email': 
                console.log('INPUT-email', event.target.value);
                valLocalStorage.email = event.target.value;
                localStorage.setItem(keyLocalStorage, JSON.stringify(valLocalStorage));
                console.log(JSON.parse(localStorage.getItem(keyLocalStorage)));
                break;


            case 'message': 
                console.log('textarea-message', event.target.value);
                valLocalStorage.message = event.target.value;
                localStorage.setItem(keyLocalStorage, JSON.stringify(valLocalStorage));
                console.log(JSON.parse(localStorage.getItem(keyLocalStorage)));
                // console.log(event.target.value);
                break;
            default:
                console.log("Invalid type");
        }   
    }

// ==== Запись дынных в localStorage Конец ===






// if(event.target.name === 'email') {
        //     console.log('INPUT-email');
        // }
        // else {
        //     console.log('TEXTAREA');
        // }

        // console.log(event.target.name);
        // console.log(event.target.nodeName);
        // console.log(event.target.parentNode); // label