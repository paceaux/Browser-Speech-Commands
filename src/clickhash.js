'use strict';

function ClickHash (nodelist) {
    const hash = {};

    for (let node of nodelist) {
        hash[node.innerText.toLowerCase().trim()] = node;
    }

    return hash;
}

module.exports = ClickHash;