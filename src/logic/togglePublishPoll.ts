import vyRequest from "./api";

export async function togglePublishPoll(options) {
    try {
        await vyRequest({
            path: "/companion/poll/update",
            method: "POST",
            body: {isShared: options.pollstatus == '1'}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
