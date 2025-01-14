document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.getElementsByTagName("h1")[0];

    let minutes = parseInt(prompt("Nhập số phút: "));

    if (isNaN(minutes)) {
        minutes = 10;
    }

    let seconds = minutes * 60;

    h1.innerHTML = seconds;

    const run = document.getElementById("run");
    const stop = document.getElementById("stop");
    const reset = document.getElementById("reset");
    const end = document.getElementById("end");

    let countdown;

    function startCountdown() {
        countdown = setInterval(function() {
            h1.innerHTML = --seconds;
        }, 1000);
    }

    run.addEventListener("click", function() {
        if (seconds > 0) {
            startCountdown();
        }
    })

    stop.addEventListener("click", function() {
        clearInterval(countdown);
    })

    reset.addEventListener("click", function() {
        clearInterval(countdown);
        seconds = minutes * 60;
        h1.innerHTML = seconds;
    })
    
    end.addEventListener("click", function() {
        clearInterval(countdown);
        seconds = 0;
        h1.innerHTML = seconds;
    })
})