const videoExtensions = ['mp4', 'webm']

export const isVideo = path => {
    for (let i = 0; i < videoExtensions.length; i++) {
        const extension = videoExtensions[i]
        if (path.endsWith(extension)) return true
    }
    return false
}

export const upload = cloudinary => (id, absolutePath) =>
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
