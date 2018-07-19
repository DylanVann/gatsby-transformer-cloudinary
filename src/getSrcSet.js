export const getSrcSet = images =>
    images.map(image => `${image.src} ${Math.round(image.width)}w`).join(`,\n`)
