import {toggleComponent} from "../logic/toggleComponent";
import {setStageInteractionTypes} from "../logic/setStageInteractionTypes";
import {togglePoll} from "../logic/togglePoll";
import {togglePublishPoll} from "../logic/togglePublishPoll";
import {displayPollOnPreview} from "../logic/displayPollOnPreview";
import {addOutputElement, clearOutput, removeOutputElement} from "../logic/outputElement";
import {changeOutputFontsize} from "../logic/changeOutputFontsize";
import {startOutputCountdown} from "../logic/startOutputCountdown";
import {sendBroadcast} from "../logic/sendBroadcast";
import {changeQAQuestion} from "../logic/changeQAQuestion";

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
    {id: 'time', label: 'Current Time', scope: "event"},
    {id: 'wordcloud', label: 'Wordcloud', scope: "page"},
    {id: 'usercount', label: 'Live user count', scope: "page"},
    {id: 'reaction', label: 'Emojis', scope: "page"},
    {id: 'pageqr', label: 'Hybrid QR Code', scope: "page"}
]

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
        case 'sendBroadcast': {
            sendBroadcast.bind(this)(action.options);
            break;
        }
        case 'changeQAQuestion': {
            changeQAQuestion.bind(this)(action.options);
            break;
        }
        default: {
            break;
        }
    }
}
