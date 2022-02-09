import axios from "axios";

export default async function vyRequest(config: { method: "GET" | "POST" | "PATCH", path: string, body?: any }, key: string, force?: boolean) {
    const basePath = "https://app.vystem.io/api/v1"
    try {
        const re = await axios.request({
            method: config.method,
            url: `${basePath}${config.path}`,
            data: config.body,
            headers: {Authorization: `Bearer ${key}`}
        })
        return re.data;
    } catch (e) {
        if (force) {
            throw e
        } else {
            console.log(e.response.data)
            // this.log("warn", `failing API request to: '${config.path}' : ${e?.response?.data ? JSON.stringify(e.response.data) : e.toString()}`)
        }
    }
}

