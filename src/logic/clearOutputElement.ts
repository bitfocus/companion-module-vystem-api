import vyRequest from "./api";

export async function clearOutput(options) {
    try {
        const outputs = await vyRequest({
            path: "/output/event/" + this.config.eventid,
            method: "GET",
        }, this.config.apikey)
        let output = outputs.data.find(el => el.outputId == options.outputid)
        output.activeContent = []
        await vyRequest({
            path: "/output/" + output._id,
            method: "PATCH",
            body: output
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
