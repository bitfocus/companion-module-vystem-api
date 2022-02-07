import vyRequest from "./api";

export async function displayPollOnPreview(options) {
    try {
        await vyRequest({
            path: "/companion/poll/" + options.pollid,
            method: "PATCH",
            body: {showOnPreviewMonitor: true}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
