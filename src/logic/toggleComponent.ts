// Toggle a pagebuilder component


import vyRequest from "./api";

export async function toggleComponent(options) {
    const event = await vyRequest({
        path: "/event/get",
        method: "POST",
        body: {eventid: this.config.eventid}
    }, this.config.apikey)
    const uiComponents = event.data.pages.find(el => el?.name?.toLowerCase() == options?.pagename?.toLowerCase())?.uicomponents
    if (!uiComponents) this.error("Error finding Page")
    const componentToToggle = uiComponents.find(el => (el.componentIndex + 1) == options.componentindex)
    if (!componentToToggle) this.error("Error finding Component")
    await vyRequest({
            path: "/event/pages/component/toggle",
            method: "POST",
            body: {componentid: componentToToggle._id}
        }, this.config.apikey
    )
}
