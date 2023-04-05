
import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


// player.pause();
player.setVolume(0.3);
// player.setColor('#00ff00');
// player.setCurrentTime(10.000);
// player.setPlaybackRate(1.5);
// player.play();

// output
const output = document.querySelector('.output');


// ==== Установка начального времени ==

const storageKey = "videoplayer-current-time";
// const startTime = Number(localStorage.getItem(storageKey));
let startTime = localStorage.getItem(storageKey);

if(startTime === null){
    console.log('нет данных startTime');
    // player.setCurrentTime(startTime);
}
else {
    startTime = Number(startTime);
    player.setCurrentTime(startTime);
    console.log('startTime:', startTime);
    output.textContent =  startTime.toFixed(1);  // tartTime
}


const onCurrentTime = function({seconds}) {
    console.log(seconds); // Пройдено секунд
    // console.log(data.duration); // Длина видео, секунд 
    localStorage.setItem(storageKey, seconds);  
    output.textContent =  seconds.toFixed(1);
};

// ==== Установка начального времени Конец ==




// // Запись времени в память хранилища
// player.on('timeupdate', _.throttle( onCurrentTime, 1000, { 
//     trailing: false, leading: true })); //Срабатывает в начале
// // Запись времени в память хранилища Конец ==

// Запись времени в память хранилища
player.on('timeupdate', throttle( onCurrentTime, 1000, { 
    trailing: false, leading: true })); //Срабатывает в начале
// Запись времени в память хранилища Конец ==


// remove.LocalStorage button


const removeButtonEl = document.getElementById('remove');
removeButtonEl.addEventListener('click', onRemoveLocalStorage);
function onRemoveLocalStorage () {
    const checkKey = localStorage.getItem(storageKey);
    if(checkKey){
        localStorage.removeItem(storageKey);
        console.log('Key LocalStorage has removed');
        player.setCurrentTime(0);
        output.textContent = 0.0;
    }
    else {
        console.log('Key was not found');
    }
    
}



// всякие плюшки test
player.addCuePoint(15, {
    customKey: 'customValue'
});

const onCuePoint = function(data) {
    console.log('id CuePoint', data.id); // 
    player.setColor('#00ff00'); // green
}

player.on('cuepoint', onCuePoint);
