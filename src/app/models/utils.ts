import { GlobalTime } from "./kodiInterfaces/others";

export let durationToString = function(totalSeconds: number, useDot = false, displayHours = true, displaySeconds = true) {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    var result = displayHours ? (hours < 10 ? "0" + hours : hours) + (useDot ? ":" : "h ") : "";
        result += (minutes < 10 ? "0" + minutes : minutes) + (useDot ?  (displaySeconds ? ":" : "") : "min ");
        result +=  displaySeconds ? (seconds  < 10 ? "0" + seconds : seconds) + (useDot ? "" : "s ") : "";
    return result;
}

export let kodiTimeToString = function(time: GlobalTime, useDot = false, displayHours = true, displaySeconds = true){
    const seconds = time.hours*3600 + time.minutes*60 + time.seconds;
    return durationToString(seconds, useDot, displayHours, displaySeconds);
}