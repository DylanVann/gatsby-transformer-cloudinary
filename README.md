# gatsby-transformer-cloudinary

Creates `ImageCloudinary` nodes from supported image types.

This transformer will upload the image once with an id.
After that depending on the types you want to extract from it it
will apply transformations on it using Cloudinary.

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
      `gatsby-transformer-cloudinary`
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
