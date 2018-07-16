import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
})

export default (id, absolutePath) =>
    new Promise((resolve, reject) =>
        cloudinary.v2.uploader.upload(
            absolutePath,
            {
                public_id: id,
            },
            (error, result) => {
                console.log('----------------')
                console.log(result, error)
                console.log('----------------')
                if (error) reject(error)
                resolve(result)
            },
        ),
    )
