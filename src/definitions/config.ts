// Config fields for the web interface

/**
 * Module configuration structure.
 */
export interface VystemConfig {
    apikey?: string;
    eventid?: string;
}

export default function getConfigFields() {
    return [
        {
            type: 'text',
            id: 'info',
            width: 12,
            label: 'Information',
            value: `This module runs with your vystem API Key. You can request it via their support team`
        },
        {
            type: 'textinput',
            label: 'vystem API Key',
            id: 'apikey',
            width: 10
        },
        {
            type: 'textinput',
            label: 'Event ID',
            id: 'eventid',
            regex: '/^[a-f\\d]{24}$/i',
            width: 10
        },
    ]
};
