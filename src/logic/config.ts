import vyRequest from "./api";

export async function verifyConfig() {
    this.status(this.STATUS_WARNING, 'Initializing');
    try {
        await vyRequest({
            path: "/event/get",
            method: "POST",
            body: {eventid: this.config.eventid}
        }, this.config.apikey,true)
        this.status(this.STATUS_OK);
    } catch (e) {
        this.log("error", "/event/get : " + e.toString())
        this.status(this.STATUS_ERROR);
    }
    try {
       await vyRequest({
            path: "/auth/get",
            method: "POST",
        }, this.config.apikey, true)
    } catch (e) {
        this.log("error", "/auth/get : " + e.toString())
        this.status(this.STATUS_ERROR);
    }
}
