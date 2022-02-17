import getConfigFields, {VystemConfig} from "./definitions/config";
import {executeAction, vyActions} from "./definitions/actions";
import {initVyVars} from "./logic/variables";
import {vyVariables} from "./definitions/variables";
import {verifyConfig} from "./logic/config";
import instance_skel = require('../../../instance_skel');

/**
 * Companion instance class for vystem API
 */
class VystemInstance extends instance_skel<VystemConfig> {

    constructor(system, id, config) {
        super(system, id, config)
    }

    /**
     * Main initialization function called by companion once the module
     * is OK to start doing things.
     */
    init() {
        this.verifyConfig();
        this.setActions(vyActions);
        this.setVariableDefinitions(vyVariables);
        this.initVariables();
    }

    // Set fields for instance configuration in the web
    /**
     * Set fields for instance configuration in the web
     * Called by companion.
     *
     * @returns {Array} the config fields
     */
    config_fields(): any[] {
        return getConfigFields();
    }

    // Execute an action
    // function called by companion
    /**
     * Executes the provided action.
     * Called by companion.
     *
     * @param {Object} action - the action to be executed
     */
    action(action) {
        executeAction.bind(this)(action);
    }

    /**
     * Clean up the instance before it is destroyed.
     * Called by companion.
     */
    destroy() {
        this.debug('DESTROY', this.id);
    }

    /**
     * Process an updated configuration array.
     * Called by companion.
     *
     * @param {Object} config - the new configuration
     */
    updateConfig(config) {
        this.config = config;
        this.log('debug', 'Restarting vystem module after reconfiguration');
        this.initVariables()
        this.verifyConfig()
    }


    /**
     * INTERNAL: initialize variables.
     */
    initVariables() {
        initVyVars.bind(this)();
    }

    /**
     * INTERNAL: verifies the entered config variables
     * after verifying the STATUS of the instance is set accordingly
     */
    verifyConfig() {
        verifyConfig.bind(this)()
    }
}

module.exports = VystemInstance;
