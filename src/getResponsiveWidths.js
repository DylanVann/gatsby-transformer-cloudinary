// This is enough sizes to provide close to the optimal image size for every
// device size / screen resolution.
// We don't upscale the images.
const responsiveWidthFactors = [0.25, 0.5, 1, 1.5, 2, 3]

export const getResponsiveWidths = (maxWidth, width) =>
    responsiveWidthFactors
        .map(x => Math.round(x * maxWidth))
        .filter(x => x < width)
        .concat(width)
        .sort()
