import cloudinary from 'cloudinary'
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

    const nodeOptions = {
        pathPrefix,
        getNodeAndSavePathDependency,
        reporter,
        cloudinaryConfig,
    }

    return {
        fluid: Fluid(nodeOptions),
    }
}
