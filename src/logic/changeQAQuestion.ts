import vyRequest from "./api";

export async function changeQAQuestion(options) {
    try {
        await vyRequest({
            path: "/companion/qa/change",
            method: "POST",
            body: {pagename: options.pagename, direction: options.direction, eventid: this.config.eventid}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
