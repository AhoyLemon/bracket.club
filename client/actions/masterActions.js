'use strict';

let alt = require('../alt');
let api = require('../helpers/api');
let eventSource = require('../helpers/eventSource');


class MasterActions {
    constructor () {
        this.generateActions(
            'addMaster',
            'getFirst',
            'getLast',
            'getNext',
            'getPrevious',
            'getIndex',
            'receiveMasters',
            'loading',
            'error'
        );
    }

    fetchMasters (options) {
        this.actions.loading(true);
        api('/masters', (err, masters) => {
            this.actions.loading(false);
            if (err) {
                this.actions.error(err);
            }
            else {
                if (options.stream) {
                    eventSource('/masters/events', 'masters', this.actions.addMaster);
                }
                this.actions.receiveMasters(masters);
            }
        });
    }
}

module.exports = alt.createActions(MasterActions);
