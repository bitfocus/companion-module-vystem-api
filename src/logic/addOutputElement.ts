import vyRequest from "./api";
import {outputElements} from "../definitions/actions";

export async function addOutputElement(options) {
    try {
        const outputs = await vyRequest({
            path: "/output/event/" + this.config.eventid,
            method: "GET",
        }, this.config.apikey)
        const event = await vyRequest({
            path: "/event/get",
            method: "POST",
            body: {eventid: this.config.eventid}
        }, this.config.apikey)
        const pageid = event.data.pages.find(el => el?.name?.toLowerCase() == options?.pagename?.toLowerCase())?._id
        let output = outputs.data.find(el => el.outputId == options.outputid)
        output.activeContent.push(`${outputElements.find(el => el.id == options.outputelement).scope == "page" ? pageid : this.config.eventid}-${options.outputelement}`)
        await vyRequest({
            path: "/output/" + output._id,
            method: "PATCH",
            body: output
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}
