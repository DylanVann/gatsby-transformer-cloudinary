// This is enough sizes to provide close to the optimal image size for every
// device size / screen resolution.
// We don't upscale the images.
// We're considering users may use max widths up to 4k (3,840px).
// So we need sizes down to much smaller sizes.
const responsiveWidthFactors = [0.05, 0.1, 0.25, 0.5, 1, 1.5, 2, 3]

export const getResponsiveWidths = (maxWidth, width) =>
    responsiveWidthFactors
        // Getting widths at different factors.
        .map(factor => Math.round(factor * maxWidth))
        // Filter out really small sizes.
        .filter(w => w > 200)
        // Filtering out widths greater than our original width.
        // We only want widths smaller than the original size.
        .filter(w => w < width)
        // Add the original width so we will have the image at max resolution.
        .concat(width)
        // Sort it so that this will look nice if we're debugging later.
        // It's also important that this sorts from lowest to highest.
        // Since that is how srcset is evaluated.
        .sort((a, b) => a - b)
