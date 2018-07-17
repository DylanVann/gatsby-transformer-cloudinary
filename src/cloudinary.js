export const upload = cloudinary => (id, absolutePath) =>
    new Promise((resolve, reject) =>
        cloudinary.v2.uploader.upload(
            absolutePath,
            {
                public_id: id,
            },
            (error, result) => {
                if (error) reject(error)
                resolve(result)
            },
        ),
    )

export const transform = cloudinary => (id, options) =>
    new Promise((resolve, reject) => {
        cloudinary.v2.uploader.explicit(
            id,
            {
                type: 'upload',
                eager: [options],
            },
            (error, result) => {
                if (error) reject(error)
                resolve(result)
            },
        )
    })

export const checkImage = cloudinary => id =>
    new Promise((resolve, reject) => {
        cloudinary.v2.uploader.explicit(
            id,
            { type: 'upload' },
            (error, result) => {
                console.log('check', result)
                if (error) reject(error)
                resolve(result)
            },
        )
    })
