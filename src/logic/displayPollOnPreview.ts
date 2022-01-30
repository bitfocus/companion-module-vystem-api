import vyRequest from "./api";

export async function togglePoll(options) {
    try {
        await vyRequest({
            path: "/poll/question/" + options.pollid,
            method: "POST",
            body: {showOnPreviewMonitor: true}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
