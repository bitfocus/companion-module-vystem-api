import vyRequest from "./api";

export async function sendBroadcast(options) {
    try {
        await vyRequest({
            path: "/companion/broadcast",
            method: "POST",
            body: {message: options.message, type: options.type, eventid: this.config.eventid}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
