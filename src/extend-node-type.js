import cloudinary from 'cloudinary'
import Original from './Original'
import Fixed from './Fixed'
import Fluid from './Fluid'

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
        cloudName,
    }

    return {
        fixed: Fixed(nodeOptions),
        fluid: Fluid(nodeOptions),
        original: Original(nodeOptions),
    }
}
