import cloudinary from 'cloudinary'
import Original from './Original'
import Fluid from './Fluid'

export default (
    { type, pathPrefix, getNodeAndSavePathDependency, reporter, ...otherProps },
    { cloudName, apiKey, apiSecret },
) => {
    if (type.name !== `ImageCloudinary`) {
        return {}
    }

    const cloudinaryConfig = {
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    }

    cloudinary.config(cloudinaryConfig)

    const nodeOptions = {
        pathPrefix,
        getNodeAndSavePathDependency,
        reporter,
        cloudinaryConfig,
    }

    return {
        fluid: Fluid(nodeOptions),
        original: Original(nodeOptions),
    }
}
