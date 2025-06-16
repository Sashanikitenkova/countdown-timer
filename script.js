const printHours = $("#clockHours");
const printMinutes = $("#clockMinutes");
const printSeconds = $("#clockSeconds");

const hours = $("#hours");
const minutes = $("#minutes");
const seconds = $("#seconds");

const startBtn = $("#startBtn");
const resetBtn = $("#resetBtn");

const timerDisplay = $("#timerDisplay");

const editBtn = $("#editBtn");
const editTimer = $("#editTimer");
const saveBtn = $("#saveBtn");

const alarmSound = $("#alarmSound");

let hoursValue;
let minutesValue;
let secondsValue;
let interval = null;
let isRunning = false;


$(document).ready(function() {

    function formatNumber(num) {
        return num < 10 ? "0" + num : num;
    }

    function formatTwoDigits(input) {
        let val = parseInt(input.val(), 10);
        if(isNaN(val)) val = 0;
        input.val(val < 10 ? "0" + val : val);
    }

    $(hours.add(minutes).add(seconds)).on('blur', function () {
        formatTwoDigits($(this));
    });

    function getInputVal () {
        hoursValue = parseInt(hours.val()) || 0;
        minutesValue = parseInt(minutes.val()) || 0;
        secondsValue = parseInt(seconds.val()) || 0;

        printHours.text(formatNumber(hoursValue));
        printMinutes.text(formatNumber(minutesValue));
        printSeconds.text(formatNumber(secondsValue));
    }
    
    startBtn.on("click", function () {
        
        if(isRunning) return;
        isRunning = true;

        getInputVal();
        
        interval = setInterval(() => {
            secondsValue--;
            
            if (secondsValue < 0) {
                minutesValue--;
                secondsValue = 59;
            } 
            
            if (minutesValue < 0) {
                hoursValue--;
                minutesValue = 59;
            }
            
            if (hoursValue < 0) {
                hoursValue = 0;
                minutesValue = 0;
                secondsValue = 0;
            }

            printSeconds.text(formatNumber(secondsValue));
            printMinutes.text(formatNumber(minutesValue));
            printHours.text(formatNumber(hoursValue));

            
            if (hoursValue === 0 && minutesValue === 0 && secondsValue === 0) {     
                M.toast({html: 'Time is out', classes: 'rounded red lighten-2'});
                alarmSound[0].play();
                clearInterval(interval);
                isRunning = false;

                printHours.text('00');
                printMinutes.text('00');
                printSeconds.text('00');
            }
        }, 1000);
    })
    
    resetBtn.on("click", function () {
        clearInterval(interval);
        isRunning = false;
        getInputVal();
    })
    
    editBtn.on('click', function () {
        editTimer.removeClass("hidden");
    })


    saveBtn.on('click', function () {
        getInputVal();

        hoursValue = parseInt(hours.val()) || 0;
        minutesValue = parseInt(minutes.val()) || 0;
        secondsValue = parseInt(seconds.val()) || 0;

        const formattedTime = `${formatNumber(hoursValue)}:${formatNumber(minutesValue)}:${formatNumber(secondsValue)}`;
        timerDisplay.text(`Timer (${formattedTime})`);

        editTimer.addClass("hidden");
    })

})
