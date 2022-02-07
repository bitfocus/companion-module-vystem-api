import {toggleComponent} from "../logic/toggleComponent";
import {setStageInteractionTypes} from "../logic/setStageInteractionTypes";
import {togglePoll} from "../logic/togglePoll";
import {togglePublishPoll} from "../logic/togglePublishPoll";
import {displayPollOnPreview} from "../logic/displayPollOnPreview";
import {addOutputElement, clearOutput, removeOutputElement} from "../logic/outputElement";
import {changeOutputFontsize} from "../logic/changeOutputFontsize";
import {startOutputCountdown} from "../logic/startOutputCountdown";

export const interactionTypes = [
    {id: 'chat', label: 'Chat'},
    {id: 'qa', label: 'Q&A'},
    {id: 'poll', label: 'Polls'},
    {id: 'wordsuggestion', label: 'Wordclouds'},
    {id: 'like', label: 'Emojis'}
]

export const outputElements = [
    {id: 'chat', label: 'Chat', scope: "page"},
    {id: 'qa', label: 'Q&A', scope: "page"},
    {id: 'poll', label: 'Polls', scope: "event"},
    {id: 'countdown', label: 'Countdown', scope: "event"},
    {id: 'wordcloud', label: 'Wordcloud', scope: "page"},
    {id: 'reaction', label: 'Emojis', scope: "page"},
    {id: 'pageqr', label: 'Hybrid QR Code', scope: "page"}
]

export const vyActions: any = {
    toggleComponent: {
        label: 'Toggle a specific component on a page',
        options: [
            {
                type: 'textinput',
                label: 'Page Name',
                id: 'pagename',
                tooltip: 'Fill in the name of the page the component is located on. (Optional)',
            }, {
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
                type: 'textinput',
                label: 'OUTPUT ID',
                id: 'outputid',
                tooltip: 'Fill in the ID of the OUTPUT to change elements on',
            }, {
                type: 'textinput',
                label: 'Page Name',
                id: 'pagename',
                tooltip: 'Fill in the name of the page the interaction is coming from.',
            }, {
                type: 'dropdown',
                label: 'Output Element',
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
                type: 'textinput',
                label: 'OUTPUT ID',
                id: 'outputid',
                tooltip: 'Fill in the ID of the OUTPUT to change elements on',
            }, {
                type: 'textinput',
                label: 'Page Name',
                id: 'pagename',
                tooltip: 'Fill in the name of the page the interaction is coming from.',
            }, {
                type: 'dropdown',
                label: 'Output Element',
                id: 'outputelement',
                tooltip: 'Which elements should be removed?',
                choices: outputElements
            }
        ]
    },
    clearOutput: {
        label: 'Clear OUTPUT',
        options: [
            {
                type: 'textinput',
                label: 'OUTPUT ID',
                id: 'outputid',
                tooltip: 'Fill in the ID of the OUTPUT to change elements on',
            }
        ]
    },
    changeOutputFontsize: {
        label: 'Change Fontsize of OUTPUT',
        options: [
            {
                type: 'textinput',
                label: 'OUTPUT ID',
                id: 'outputid',
                tooltip: 'Fill in the ID of the OUTPUT to change elements on',
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
                type: 'textinput',
                label: 'OUTPUT ID',
                id: 'outputid',
                tooltip: 'Fill in the ID of the OUTPUT to change elements on',
            },
            {
                type: 'number',
                label: 'Length in Seconds',
                id: 'factor',
                tooltip: 'The length of the timer in seconds. E.g.300 for 5 Minutes',
            }
        ]
    },
    setStageInteractionTypes: {
        label: 'Set Interaction Options for a stage',
        options: [
            {
                type: 'textinput',
                label: 'Page Name',
                id: 'pagename',
                tooltip: 'Fill in the name of the page the component is located on.',
            }, {
                type: 'multiselect',
                label: 'Interaction Types',
                id: 'interactiontypes',
                tooltip: 'Which interaction types should be visible?',
                choices: interactionTypes
            }
        ]
    },
};

export function executeAction(action) {
    switch (action.action) {
        case 'toggleComponent': {
            toggleComponent.bind(this)(action.options);
            break;
        }
        case 'addOutputElement': {
            addOutputElement.bind(this)(action.options);
            break;
        }
        case 'removeOutputElement': {
            removeOutputElement.bind(this)(action.options);
            break;
        }
        case 'togglePoll': {
            togglePoll.bind(this)(action.options);
            break;
        }
        case 'togglePublishPoll': {
            togglePublishPoll.bind(this)(action.options);
            break;
        }
        case 'displayPollOnPreview': {
            displayPollOnPreview.bind(this)(action.options);
            break;
        }
        case 'clearOutput': {
            clearOutput.bind(this)(action.options);
            break;
        }
        case 'changeOutputFontsize': {
            changeOutputFontsize.bind(this)(action.options);
            break;
        }
        case 'startOutputCountdown': {
            startOutputCountdown.bind(this)(action.options);
            break;
        }
        case 'setStageInteractionTypes': {
            setStageInteractionTypes.bind(this)(action.options);
            break;
        }
        default: {
            break;
        }
    }
}
