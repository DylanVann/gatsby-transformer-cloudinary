const axios = require(`axios`)

export const getBase64FromUrl = async url => {
    const response = await axios({
        method: `GET`,
        responseType: `arraybuffer`,
        url: `${url}`,
    })

    const base64Img = `data:${
        response.headers[`content-type`]
    };base64,${new Buffer(response.data).toString(`base64`)}`

    return base64Img
}
