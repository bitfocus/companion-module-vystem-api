import getConfigFields, {vystemConfig} from "./definitions/config";
import {executeAction, getActions} from "./definitions/actions";
import instance_skel = require('../../../instance_skel');

/**
 * Companion instance class for vystem API
 */
class VystemInstance extends instance_skel<vystemConfig> {

    constructor(system, id, config) {
        super(system, id, config)
    }

    // Called when instance is created
    init() {
        this.actions();
    }


    // Set fields for instance configuration in the web
    config_fields(): any[] {
        return getConfigFields();
    }

    // Execute an action
    action(action) {
        executeAction.bind(this)(action);
    }

    // Set available actions
    actions() {
        this.system.emit('instance_actions', this.id, getActions.bind(this)());
    }

    //Clean up intance before it is destroyed
    destroy() {
        this.debug('DESTROY', this.id);
    }

    updateConfig(config) {
    }
}

module.exports = VystemInstance;
