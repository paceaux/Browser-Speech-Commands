'use strict';

const commands = {
    go: function (command) {
        if (command.hasCommandPreposition) {
            this.focus(command);
        }

        if (command.hasDirectObject) {
            //hmmm. what to do here?
        }
    },

    stop: function () {
        listener.stop();
    },

    focus: function (command) {
        const destination = command.objectOfPreposition || command.directObject;
        const hashes = Object.assign(ClickHash(document.querySelectorAll('a')), ClickHash(document.querySelectorAll('button')));

        if (destination in hashes) {
            hashes[destination].focus();
        }

    },

    _back: function () {

    },

    _forward: function () {

    },

    click: function (command) {
        const hashes = Object.assign(ClickHash(document.querySelectorAll('a')), ClickHash(document.querySelectorAll('button')));

        let destination = command.objectOfPreposition || command.directObject; // You can't say "click to" but you can say "click on"

        if (destination in hashes) {
            hashes[destination].click();
        } else if (document.activeElement) {
            document.activeElement.click();
        } else {
            //error ... there's nothing to click;
        }

    }
};

module.exports = commands;