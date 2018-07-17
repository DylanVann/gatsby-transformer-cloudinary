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
