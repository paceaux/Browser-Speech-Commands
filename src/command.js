'use strict';

class Command {
    constructor(command, transcript) {
        this.commandName = command;
        this.originalTranscript = transcript; 
    }

    get prepositions() {
        return [
            'of',
            'to',
            'for',
            'with',
            'on',
            'at',
            'from',
            'by',
            'after',
            'before',
            'over',
            'under',
            'between',
            'in',
            'out'
        ];
    }

    get hasCommandPreposition () {
        let hasPrep = false;

        // even though it's an array, using for so that I can break at first result
        for (let idx = 0, prep, searchRgx; idx < this.prepositions.length; ++idx) {
            prep = this.prepositions[idx];
            searchRgx = new RegExp(prep + '\\b', 'i');

            if (this.commandTranscript.search(searchRgx) === 0) { // there may be other prepositions. We want specifically the first one
                hasPrep = true;
                break; // 
            }
        }

        return hasPrep;
    }

    get commandPreposition() {
        let preposition = '';

        if (this.hasCommandPreposition) { 
            for (let idx = 0, prep,searchRgx; idx < this.prepositions.length; ++idx) {
                prep = this.prepositions[idx];
                searchRgx = new RegExp(prep + '\\b', 'i');

                if (this.commandTranscript.search(searchRgx) === 0) { // may be other prepositions. We want specifically the first one
                    preposition = prep; 
                    break;
                }
            }
        }

        return preposition;
    }

    get hasDirectObject () {
        return  !this.hasCommandPreposition && this.originalTranscript.length > this.commandName.length;
    }

    get directObject () {
        // need to research if there's any special parsing rules for determining directObject
        return this.hasDirectObject ? this.commandTranscript : '';
    }

    get objectOfPreposition () {
        let prepositionObject = '';


        if (this.hasCommandPreposition) {
            prepositionObject = this.commandTranscript.slice(this.commandPreposition.length).trim();
        }

        return prepositionObject.toLowerCase();
    }

    get commandTranscript () {
        return this.originalTranscript.slice(this.originalTranscript.indexOf(this.commandName) + this.commandName.length).trim();
    }
}

module.exports = Command;