// Toggle a pagebuilder component


import vyRequest from "./api";

export async function toggleComponent(options) {
    try {
    await vyRequest({
            path: "/companion/component/toggle",
            method: "POST",
            body: {eventid: this.config.eventid, pagename: options?.pagename?.toLowerCase(), componentindex: options.componentindex}
        }, this.config.apikey
    )}
    catch (e) {
        console.log(e)
    }
}
