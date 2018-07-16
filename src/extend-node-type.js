import ImageCloudinaryOriginal from './ImageCloudinaryOriginal'
import ImageCloudinaryFixed from './ImageCloudinaryFixed'
import ImageCloudinaryFluid from './ImageCloudinaryFluid'

export default ({
    type,
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter,
}) => {
    if (type.name !== `ImageCloudinary`) {
        return {}
    }

    const nodeOptions = {
        pathPrefix,
        getNodeAndSavePathDependency,
        reporter,
    }

    return {
        fixed: ImageCloudinaryFixed(nodeOptions),
        fluid: ImageCloudinaryFluid(nodeOptions),
        original: ImageCloudinaryOriginal(nodeOptions),
    }
}
