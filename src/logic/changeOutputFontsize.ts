import vyRequest from "./api";

export async function changeOutputFontsize(options) {
    try {
        await vyRequest({
            path: "/companion/output/fontsize",
            method: "PATCH",
            body: {
                outputid: options.outputid,
                factor: options.factor,
            }
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
