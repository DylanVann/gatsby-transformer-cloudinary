# gatsby-transformer-cloudinary

Creates `ImageCloudinary` nodes from supported image types.

This transformer will upload the image once with an id.
After that depending on the types you want to extract from it it
will apply transformations on it using Cloudinary.

Features:
- Optimize images.
- Optimize videos.
  - e.g. Convert video into `mp4`, `webm`, and `jpg` to create an HTML5 "GIF" with a poster.
- Transformations happen on Cloudinary's servers.
  - This means they are generally much faster and more likely to be cached than
    using `gatsby-transformer-sharp`.
  - Cloudinary also includes extra functionality like using multiple subdomains.

## Install

```bash
npm install gatsby-transformer-cloudinary
# or
yarn add gatsby-transformer-cloudinary
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
        {
            resolve: 'gatsby-transformer-cloudinary',
            options: {
                cloudName: '...',
                apiKey: '...',
                apiSecret: '...',
            }
        },
  ],
}
```

## Parsing algorithm

It recognizes files with the following extensions as images.

- jpeg
- jpg
- png
- webp
- tif
- tiff
- gif
- mp4
- webm

Each image file is parsed into a node of type `ImageCloudinary`.
