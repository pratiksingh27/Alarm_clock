const currentTime =document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu =document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");


let alarmTime, isAlarmSet = false,
ringtone = new Audio("./img/ringtone.mp3");

for(let i=12;i>0;i--){
    i = i < 10 ? "0" + i : i;
    // console.log(i);
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i=59;i>0;i--){
    i = i < 10 ? "0" + i : i;
    // console.log(i);
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i=2;i>0;i--){
    i = i < 10 ? "0" + i : i;
    let ampm = i == 1 ? "AM" : "PM";
    // console.log(i);
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() =>{
    let date = new Date();
    h = date.getHours(),
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";

    if(h >= 12){
        h = h - 12;
        ampm="PM";
    }

    //if hour value is 0 set it to 12
    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    // console.log(`${h}:${m}:${s} ${ampm}`);
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime === `${h}:${m} ${ampm}`){
        console.log("alarm ringing");
        ringtone.play();
        ringtone.loop = true;
    }
    // console.log("working");
});


function setAlarm(){

    if(isAlarmSet){
        alarmTime ="";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    //   get the values from input fields and store them in variables
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Plz, select a valid time to set alarm");
    }

    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    // console.log(time);
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);