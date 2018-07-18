# @dylanvann/gatsby-transformer-cloudinary

Creates `ImageCloudinary` nodes from supported image types.

**Features:**

- Optimize images.
- Optimize videos.

## Install

```bash
npm install @dylanvann/gatsby-transformer-cloudinary
# or
yarn add @dylanvann/gatsby-transformer-cloudinary
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
        {
            resolve: '@dylanvann/gatsby-transformer-cloudinary',
            options: {
                cloudName: '...',
                apiKey: '...',
                apiSecret: '...',
            }
        },
  ],
}
```

## How does this recognize images?

It recognizes files with the following extensions as images:

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

## How does this interact with Cloudinary?

When this encounters a query for a version of an image or video:

- It checks to see if the image or video exists on cloudinary's servers based on the ID (Every image node should have a unique ID).
- If the image is not on Cloudinary's servers then it uploads the image.
- If the image is on Cloudinary's servers then it fetches the metadata (width, height, etc.) for the image or video.
- After this lazy urls are generated for the image or video sizes you request.
