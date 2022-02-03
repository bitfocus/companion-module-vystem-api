import getConfigFields, {vystemConfig} from "./definitions/config";
import {executeAction, vyActions} from "./definitions/actions";
import {initVyVars} from "./logic/variables";
import {vyVariables} from "./definitions/variables";
import {verifyConfig} from "./logic/config";
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
        this.verifyConfig();
        this.setActions(vyActions);
        this.setVariableDefinitions(vyVariables);
        this.initVariables();
    }

    // Set fields for instance configuration in the web
    config_fields(): any[] {
        return getConfigFields();
    }

    // Execute an action
    // function called by companion
    action(action) {
        executeAction.bind(this)(action);
    }

    //Clean up intance before it is destroyed
    destroy() {
        this.debug('DESTROY', this.id);
    }

    updateConfig(config) {
        this.config = config;
        this.log('debug', 'Restarting vystem module after reconfiguration');
        this.initVariables()
        this.verifyConfig()
    }

    // inits all defined variables with default data
    initVariables() {
        initVyVars.bind(this)();
    }

    verifyConfig() {
        verifyConfig.bind(this)()
    }
}

module.exports = VystemInstance;
