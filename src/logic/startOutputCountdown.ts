import vyRequest from "./api";

export async function startOutputCountdown(options) {
    try {
        await vyRequest({
            path: "/companion/output/countdown",
            method: "POST",
            body: {
                outputid: options.outputid,
                value: options.value,
            }
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
