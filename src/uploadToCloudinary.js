import cloudinary from './cloudinary'

cloudinary.config({
    cloud_name: 'dylanvann-com',
    api_key: '521793315122256',
    api_secret: 'FHMBuCMCCHCLekQ-E2JqI8GnEwA',
})

export default (id, absolutePath) =>
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
