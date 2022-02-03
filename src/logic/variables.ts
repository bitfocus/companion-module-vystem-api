import vyRequest from "./api";

export async function initVyVars() {
    const event = await vyRequest({
        path: "/event/get",
        method: "POST",
        body: {eventid: this.config.eventid}
    }, this.config.apikey)
    this.setVariable("event_name", event.data.name)
}
