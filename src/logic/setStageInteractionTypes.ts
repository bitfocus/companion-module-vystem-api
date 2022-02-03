import vyRequest from "./api";

export async function setStageInteractionTypes(options) {
    await vyRequest({
            path: "/companion/stage/update",
            method: "POST",
            body: {eventid: this.config.eventid, pagename: options?.pagename, interactiontypes: options.interactiontypes}
        }, this.config.apikey
    )
}
