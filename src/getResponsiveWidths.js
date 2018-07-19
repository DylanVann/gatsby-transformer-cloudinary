// This is enough sizes to provide close to the optimal image size for every
// device size / screen resolution.
// We don't upscale the images.
const responsiveWidthFactors = [0.25, 0.5, 1, 1.5, 2, 3]

export const getResponsiveWidths = (maxWidth, width) =>
    responsiveWidthFactors
        // Getting widths at different factors.
        .map(factor => Math.round(factor * maxWidth))
        // Filtering out widths greater than our original width.
        .filter(w => w > width)
        // Add the original width so we will have the image at max resolution.
        .concat(width)
        // Sort it so that this will look nice if we're debugging later.
        .sort()
