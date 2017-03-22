function formatNumber(num) {
  return (num < 10) ? "0" + num : num;
}

function secsToTime(num){
  num = parseInt(num);

    var hrs = Math.floor(num / 3600);
    var mins = Math.floor(num % 3600 / 60);
    var secs = Math.floor(num % 3600 % 60);

    hrs = (hrs > 0) ? formatNumber(hrs) + ":" : "";
    mins = (mins > 0) ? formatNumber(mins) + ":" : "00:";
    secs = formatNumber(secs);

    return hrs + mins + secs;
}

function timeToSecs(time) {
  time = time.split(":").reverse();

  var  numToSec = 0;

   for (var i = 0; i < time.length; i++) {
      numToSec += time[i] * Math.pow(60, i);
   }
   return parseInt(numToSec);
}


var breakminus = document. getElementById('breakminus');
var breakplus = document. getElementById('breakplus');
var workminus = document. getElementById('workminus');
var workplus = document. getElementById('workplus');

var breakTimeSession = document.getElementById('breaklength');
var workTimeSession = document.getElementById('worklength');

var time = document.getElementById('time');
var current = document.getElementById('session');

var breakTime = parseInt(breakTimeSession.textContent) * 60;
var workTime = parseInt(workTimeSession.textContent) * 60;

var currentSession = "session", currentLength = workTime;

var timer;
var isBreak = false;

var subtractBreak = function(){
  breakminus.addEventListener('click', function(){
    if(!isBreak)
    {
      var num = Number(breakTimeSession.textContent);
      if(num > 0){
        num--;
        breakTimeSession.textContent = num;
        breakTime = num * 60;
      }
    }
  });
}
subtractBreak();

var addBreak = function(){
  breakplus.addEventListener('click', function(){
    if(!isBreak){
      var num = Number(breakTimeSession.textContent);
      num++;
      breakTimeSession.textContent = num;
      breakTime = num * 60;
    }
  });
}
addBreak();

var subtractWorkLength = function(){
  workminus.addEventListener('click', function(){
    if(!isBreak){
      var num = Number(workTimeSession.textContent);
      if(num > 0){
        num--;
        workTimeSession.textContent = num;
        workTime = num * 60;
        if(num < 60){
          time.textContent = num + ':00'
        }else {
          time.textContent = secsToTime(num) + ':00'
        }
      }
    }
  });
}
subtractWorkLength();

var addWorkLength = function(){
  workplus.addEventListener('click', function(){
    if(!isBreak){
      var num = Number(workTimeSession.textContent);
      num++;
      workTimeSession.textContent = num;
      workTime = num * 60;
      if(num < 60){
        time.textContent = num + ':00'
      }else {
        time.textContent = secsToTime(num) + ':00'
      }
    }
  });
}
addWorkLength();

function clockSession(){
   var secs = timeToSecs(time.textContent);
   secs--;

   if(secs >= 0){
     var str = secsToTime(secs);
      time.textContent = str;
   }
   else{
     if(currentSession === 'session')
     {
       currentSession = ('break');
       currentLength = breakTime;
       current.textContent = ('Relax!!');
     }
     else
     {
       currentSession = 'session';
       currentLength = workTime;
       current.textContent = 'Work!!';
     }
     time.textContent = secsToTime(currentLength);
   }
}

function startTime(){
  timer = setInterval(clockSession, 500);
}

function stopTime() {
  clearInterval(timer);
}

function toggleTimer() {
  if (isBreak)
    {
      stopTime();
      isBreak = false;
    }
  else
    {
      startTime();
      isBreak = true;
    }
}
