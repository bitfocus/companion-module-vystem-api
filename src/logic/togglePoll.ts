import vyRequest from "./api";

export async function togglePoll(options) {
    try {
        await vyRequest({
            path: "/companion/poll/" + options.pollid,
            method: "PATCH",
            body: {isActive: options.pollstatus == '1'}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
