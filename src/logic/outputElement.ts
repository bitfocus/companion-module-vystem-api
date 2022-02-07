import vyRequest from "./api";
import {outputElements} from "../definitions/actions";

export async function clearOutput(options) {
    try {
        await vyRequest({
            path: "/companion/output/clear",
            method: "POST",
            body: {
                outputid: options.outputid,
                eventid: this.config.eventid,
            }
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}

export async function removeOutputElement(options) {
    try {
        const event = await vyRequest({
            path: "/event/get",
            method: "POST",
            body: {eventid: this.config.eventid}
        }, this.config.apikey)
        const output = await vyRequest({
            path: "/companion/output/" + options.outputid,
            method: "GET"
        }, this.config.apikey)
        const pageid = _getPageIdForPagename(event.data, options?.pagename)
        const activeContent = output.activeContent.filter(curr => curr !== `${outputElements.find(el => el.id == options.outputelement).scope == "page" ? pageid : this.config.eventid}-${options.outputelement}`)
        await vyRequest({
            path: "/companion/output/activecontent",
            method: "PATCH",
            body: {activecontent: activeContent, eventid: this.config.eventid, outputid: options.outputid}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}


export async function addOutputElement(options) {
    try {
        const event = await vyRequest({
            path: "/event/get",
            method: "POST",
            body: {eventid: this.config.eventid}
        }, this.config.apikey)
        const output = await vyRequest({
            path: "/companion/output/" + options.outputid,
            method: "GET"
        }, this.config.apikey)
        const pageid = _getPageIdForPagename(event.data, options?.pagename)
        const activeContent = output.activeContent || [];
        activeContent.push(`${outputElements.find(el => el.id == options.outputelement).scope == "page" ? pageid : this.config.eventid}-${options.outputelement}`)
        await vyRequest({
            path: "/companion/output/activecontent",
            method: "PATCH",
            body: {activecontent: activeContent, eventid: this.config.eventid, outputid: options.outputid}
        }, this.config.apikey)
    } catch (e) {
        console.log(e)
    }
}

function _getPageIdForPagename(eventEntity: any, pagename: string) {
    return eventEntity.pages.find(el => el?.name?.toLowerCase() == pagename.toLowerCase())?._id
}
