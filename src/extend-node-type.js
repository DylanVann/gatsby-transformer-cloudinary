import cloudinary from 'cloudinary'
import ImageCloudinaryOriginal from './ImageCloudinaryOriginal'
import ImageCloudinaryFixed from './ImageCloudinaryFixed'
import ImageCloudinaryFluid from './ImageCloudinaryFluid'

export default (
    { type, pathPrefix, getNodeAndSavePathDependency, reporter, ...otherProps },
    { cloudName, apiKey, apiSecret },
) => {
    if (type.name !== `ImageCloudinary`) {
        return {}
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    })

    const nodeOptions = {
        pathPrefix,
        getNodeAndSavePathDependency,
        reporter,
        cloudinary,
    }

    return {
        fixed: ImageCloudinaryFixed(nodeOptions),
        fluid: ImageCloudinaryFluid(nodeOptions),
        original: ImageCloudinaryOriginal(nodeOptions),
    }
}
