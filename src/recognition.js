'use strict';

function Recognition () {
    const recognition = new webkitSpeechRecognition();
    
    recognition.continuous = true;

    return recognition;
}

module.exports = Recognition;