import cloudinary from 'cloudinary'
import { urlExists } from 'url-exists-promise'

const videoExtensions = ['mp4', 'webm']

export const isVideo = path => {
    for (let i = 0; i < videoExtensions.length; i++) {
        const extension = videoExtensions[i]
        if (path.endsWith(extension)) return true
    }
    return false
}

export const uploadFile = (id, absolutePath) =>
    new Promise((resolve, reject) =>
        cloudinary.v2.uploader.upload(
            absolutePath,
            {
                public_id: id,
                resource_type: isVideo(absolutePath) ? 'video' : 'image',
            },
            (error, result) => {
                if (error) reject(error)
                resolve(result)
            },
        ),
    )

export const getMetadata = (id, absolutePath) =>
    new Promise((resolve, reject) =>
        cloudinary.v2.uploader.explicit(
            id,
            {
                image_metadata: true,
                type: 'upload',
                resource_type: isVideo(absolutePath) ? 'video' : 'image',
            },
            (error, result) => {
                if (error) reject(error)
                resolve(result)
            },
        ),
    )

export const fileExists = async id => {
    const urlImg = `http://res.cloudinary.com/${cloudName}/image/upload/${id}`
    const urlVideo = `http://res.cloudinary.com/${cloudName}/video/upload/${id}`
    const imgExists = await urlExists(urlImg)
    const videoExists = await urlExists(urlVideo)
    return imgExists || videoExists
}

export const uploadOrGetMetadata = async (id, path) => {
    const exists = await fileExists(id)
    if (!exists) {
        // Have to upload the image or video
        return uploadFile(id, path)
    } else {
        // Already uploaded, we just get the metadata
        return await getMetadata(id, path)
    }
}
