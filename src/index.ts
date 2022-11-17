import getConfigFields, {VystemConfig} from "./definitions/config";
import {executeAction, interactionTypes, outputElements} from "./definitions/actions";
import {initVyVars} from "./logic/variables";
import {vyVariables} from "./definitions/variables";
import {verifyConfig} from "./logic/config";
import vyRequest from "./logic/api";
import instance_skel = require('../../../instance_skel');

/**
 * Companion instance class for vystem API
 */
class VystemInstance extends instance_skel<VystemConfig> {

    CHOICES_PAGES: { id: string, label: string } []
    CHOICES_OUTPUTS: { id: string, label: string }[]

    constructor(system, id, config) {
        super(system, id, config)
        this.CHOICES_PAGES = []
        this.CHOICES_OUTPUTS = []
    }

    /**
     * Main initialization function called by companion once the module
     * is OK to start doing things.
     */
    init() {
        this.verifyConfig();
        this.setVariableDefinitions(vyVariables);
        this.initVariables();
        this.updateChoices();
        this.setupVYActions()
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
        this.setupVYActions()
        this.updateChoices()
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

    /**
     * INTERNAL: Setup the actions.
     */
    setupVYActions() {
        try {
            const vyActions: any = {
                toggleComponent: {
                    label: 'Toggle a specific component on a page',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'Page Name',
                            id: 'pagename',
                            tooltip: 'Fill in the name of the page the component is located on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_PAGES
                        },
                        {
                            type: 'number',
                            label: 'Component Index',
                            id: 'componentindex',
                            tooltip: 'Fill in the position of the component on the page. Here visible and non visible components are counted.',
                            regex: '/^[a-f\\d]{24}$/i'
                        }
                    ]
                },
                togglePoll: {
                    label: 'Toggle/Untoggle a poll for voting',
                    options: [
                        {
                            type: 'textinput',
                            label: 'Poll Id',
                            id: 'pollid',
                            regex: '/^[a-f\\d]{24}$/i',
                            tooltip: 'Fill in the id of the poll',
                        },
                        {
                            type: 'dropdown',
                            label: 'Poll Status',
                            id: 'pollstatus',
                            default: '1',
                            tooltip: 'Should the poll be toggled or untoggled?',
                            choices: [
                                {id: '1', label: 'Toggle'},
                                {id: '0', label: 'Untoggle'},
                            ],
                        }
                    ]
                },
                sendBroadcast: {
                    label: 'Send a broadcast to all Event Attendees',
                    options: [
                        {
                            type: 'textinput',
                            label: 'Message',
                            id: 'message',
                            tooltip: 'The message to post in the broadcast. If it is a Dialog the message supports HTML formatting.',
                        },
                        {
                            type: 'dropdown',
                            label: 'Message Type',
                            id: 'type',
                            default: 'snackbar',
                            tooltip: 'Should the poll be toggled or untoggled?',
                            choices: [
                                {id: 'snackbar', label: 'Snackbar'},
                                {id: 'dialog', label: 'Dialog'},
                            ],
                        }
                    ]
                },
                togglePublishPoll: {
                    label: 'Toggle/Untoggle publish of a poll',
                    options: [
                        {
                            type: 'textinput',
                            label: 'Poll Id',
                            id: 'pollid',
                            regex: '/^[a-f\\d]{24}$/i',
                            tooltip: 'Fill in the id of the poll',
                        },
                        {
                            type: 'dropdown',
                            label: 'Poll Status',
                            id: 'pollstatus',
                            default: '1',
                            tooltip: 'Should the poll be published or unpublished?',
                            choices: [
                                {id: '1', label: 'Publish'},
                                {id: '0', label: 'Unpublish'},
                            ],
                        }
                    ]
                },
                displayPollOnPreview: {
                    label: 'Select Poll for Preview',
                    options: [
                        {
                            type: 'textinput',
                            label: 'Poll Id',
                            id: 'pollid',
                            regex: '/^[a-f\\d]{24}$/i',
                            tooltip: 'Fill in the id of the poll',
                        }
                    ]
                },
                addOutputElement: {
                    label: 'Add OUTPUT element',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'OUTPUT ID',
                            id: 'outputid',
                            tooltip: 'Fill in the ID of the OUTPUT to change elements on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_OUTPUTS
                        }, {
                            type: 'dropdown',
                            label: 'Page Name',
                            id: 'pagename',
                            tooltip: 'Fill in the name of the page the element is coming from (Optional)',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_PAGES
                        }, {
                            type: 'dropdown',
                            label: 'Output Element',
                            default: '',
                            id: 'outputelement',
                            tooltip: 'Which elements should be added?',
                            choices: outputElements
                        }
                    ]
                },
                removeOutputElement: {
                    label: 'Remove OUTPUT element',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'OUTPUT ID',
                            id: 'outputid',
                            tooltip: 'Fill in the ID of the OUTPUT to change elements on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_OUTPUTS
                        },
                        {
                            type: 'dropdown',
                            label: 'Page Name',
                            id: 'pagename',
                            tooltip: 'Fill in the name of the page the element is located on. (Optional)',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_PAGES
                        }, {
                            type: 'dropdown',
                            label: 'Output Element',
                            id: 'outputelement',
                            default: '',
                            tooltip: 'Which elements should be removed?',
                            choices: outputElements
                        }
                    ]
                },
                clearOutput: {
                    label: 'Clear OUTPUT',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'OUTPUT ID',
                            id: 'outputid',
                            tooltip: 'Fill in the ID of the OUTPUT to change elements on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_OUTPUTS
                        },
                    ]
                },
                changeOutputFontsize: {
                    label: 'Change Fontsize of OUTPUT',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'OUTPUT ID',
                            id: 'outputid',
                            tooltip: 'Fill in the ID of the OUTPUT to change elements on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_OUTPUTS
                        },
                        {
                            type: 'number',
                            label: 'Factor',
                            id: 'factor',
                            tooltip: 'Fill in the factor the font should be increased or decreased. e.g. -10 or 10',
                        }
                    ]
                },
                startOutputCountdown: {
                    label: 'Start a Countdown Timer on OUTPUT',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'OUTPUT ID',
                            id: 'outputid',
                            tooltip: 'Fill in the ID of the OUTPUT to change elements on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_OUTPUTS
                        },
                        {
                            type: 'number',
                            label: 'Length in Seconds',
                            id: 'value',
                            tooltip: 'The length of the timer in seconds. E.g.300 for 5 Minutes',
                        }
                    ]
                },
                setStageInteractionTypes: {
                    label: 'Set Interaction Options for a stage',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'Page Name',
                            id: 'pagename',
                            tooltip: 'Fill in the name of the page the stage is located on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_PAGES
                        }, {
                            type: 'multiselect',
                            label: 'Interaction Types',
                            default: '',
                            id: 'interactiontypes',
                            tooltip: 'Which interaction types should be visible?',
                            choices: interactionTypes
                        }
                    ]
                },
                changeQAQuestion: {
                    label: 'Change Q&A Question on preview',
                    options: [
                        {
                            type: 'dropdown',
                            label: 'Page Name',
                            id: 'pagename',
                            tooltip: 'Fill in the name of the page the Questions should be changed on.',
                            allowCustom: true,
                            default: '',
                            choices: this.CHOICES_PAGES
                        }, {
                            type: 'dropdown',
                            label: 'Direction',
                            id: 'direction',
                            default: "next",
                            choices: [
                                {id: 'next', label: 'Next Question'},
                                {id: 'prior', label: 'Prior Question'}
                            ]
                        }
                    ]
                },
            };

            this.setActions(vyActions)

        } catch (e) {
            if (e.code) {
                this.log('error', e.code + ' ' + e.name)
            }
        }
    }

    /**
     * INTERNAL: Get list of current event's pages
     */
    async updateChoices() {
        try {
            let res = await vyRequest({
                    path: "/event/get",
                    method: "POST",
                    body: {eventid: this.config.eventid}
                }, this.config.apikey
            );
            this.CHOICES_PAGES = res.data.pages.map(el => {
                return {id: el.name, label: el.name}
            })
            res = await vyRequest({
                    path: "/companion/output/event/" + this.config.eventid,
                    method: "GET",
                }, this.config.apikey
            );
            this.CHOICES_OUTPUTS = res.data.map(el => {
                return {id: el.outputId, label: `${el.name} (${el.outputId})`}
            })

            this.setupVYActions() // reinit actions to update list
        } catch (e) {
            if (e.code) {
                this.log('error', e.code + ' ' + e.name)
            }
        }
    }
}

module.exports = VystemInstance;
