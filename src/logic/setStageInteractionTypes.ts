import vyRequest from "./api";
import {interactionTypes} from "../definitions/actions";

export async function setStageInteractionTypes(options) {
    const event = await vyRequest({
        path: "/event/get",
        method: "POST",
        body: {eventid: this.config.eventid}
    }, this.config.apikey)
    const uiComponents = event.data.pages.find(el => el?.name?.toLowerCase() == options?.pagename?.toLowerCase())?.uicomponents
    let newComponents: any[] = [];
    if (!uiComponents) this.error("Error finding Page")
    for (const c of uiComponents) {
        if (c.componentType == "stage") {
            for (const iType of interactionTypes) {
                c.stageSettings[iType.id].active = options.interactiontypes.includes(iType.id)
            }
        }
        newComponents.push(c)
    }
    await vyRequest({
            path: "/event/pages/component",
            method: "POST",
            body: {components: newComponents}
        }, this.config.apikey
    )

}
