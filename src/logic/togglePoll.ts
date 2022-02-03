import vyRequest from "./api";

export async function togglePoll(options) {
    try {
        await vyRequest({
            path: "/companion/poll/update",
            method: "POST",
            body: {isActive: options.pollstatus == '1'}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
