const htmlParser = require('html-parser')

// <video poster='http://res.cloudinary.com/dylanvann-com/video/upload/422d88a9-b87a-50d0-80f2-739a52be1933.jpg'><source src='http://res.cloudinary.com/dylanvann-com/video/upload/422d88a9-b87a-50d0-80f2-739a52be1933.webm' type='video/webm'><source src='http://res.cloudinary.com/dylanvann-com/video/upload/422d88a9-b87a-50d0-80f2-739a52be1933.mp4' type='video/mp4'><source src='http://res.cloudinary.com/dylanvann-com/video/upload/422d88a9-b87a-50d0-80f2-739a52be1933.ogv' type='video/ogg'></video>
export const parseVideo = html => {
    const extensions = ['mp4', 'webm', 'ogv', 'jpg']
    const sources = {}
    htmlParser.parse(html, {
        attribute: function(name, value) {
            extensions.forEach(ext => {
                if (value.endsWith(`.${ext}`)) {
                    sources[ext] = value
                }
            })
        },
    })
    return sources
}
