import vyRequest from "./api";

export async function togglePublishPoll(options) {
    try {
        await vyRequest({
            path: "/poll/question/" + options.pollid,
            method: "POST",
            body: {isShared: options.pollstatus == '1'}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
