'use strict';
const listener = {
    init: function () {
        for(let evtCb in this.evtCbs) {
            this.evtCbs[evtCb] = this.evtCbs[evtCb].bind(this);
        }

        this.recognition = new Recognition();
        this.bindEvts();
        this.listen();

    }, 
    bindEvts: function () {
        // automate task of adding event CBs, each callback matches a speech recognition event
        for (let evtCb in this.evtCbs) {
            this.recognition.addEventListener(evtCb, this.evtCbs[evtCb]);
        }
    },
    evtCbs: {
        audiostart: function (evt) {
            console.log('audio start')
        },
        speechstart: function (evt) {
            console.log('speech start');
        },
        start: function (evt) {
            console.log('start');
        },
        result: function (evt) {
            console.log('result');
            console.log(evt);
            this.processResult(evt.results[evt.results.length-1]);
        },
        end: function (evt) {
            console.log('end');
        },
        speechend: function (evt) {
            console.log('speech end');
        },
        error: function (evt) {
            console.warn('error');
        }
    },
    listen: function () {
        this.recognition.start();
    },
    stop: function () {
        this.recognition.stop();
    },
    processResult: function (result) {
        if (result.isFinal) {
            this.parseCommands(result[0].transcript);
        }
    },
    parseCommands: function(transcript) {
        transcript = transcript.trim().toLowerCase();
        for (let commandName in commands) {
            if (transcript.indexOf(commandName) != -1) {
                command = new Command(commandName, transcript);
                console.log('command', command);
                commands[commandName](command);
                break; 
            }
        }
    }
};

module.exports = listener;