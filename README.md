# @dylanvann/gatsby-transformer-cloudinary

Creates `ImageCloudinary` nodes from supported image types.

**Features:**

- Optimize images.
- Optimize videos.
- Return size information to prevent UI jank.
- Create base64 placeholders for images and videos.

## Handling videos and images

One of the primary goals of this module is to handle images and videos.

To accomplish this the GraphQL schema exposes the following fields:

- Image properties, these will be null if the source is a video.
    - `img*`
        - `imgSrc`
        - `imgSrcSet`
        - `imgBase64`
- Video properties, these will be null if the source is an image.
    - `video*`
        - `videoSrc`
        - There is no `videoSrcSet` or `videoBase64`
          since video does not support srcset and base64 encoding
          the video is probably not desirable.
    - `videoPoster*`
        - `videoPosterSrc`
        - `videoPosterSrcSet`
        - `videoPosterBase64`

You can query using `toImgFormat`, `toVideoFormat`, and `toVideoPosterFormat`.

By querying for all these fields at once you can use a generalized media component to
render an image or video based on the data returned to you.

## Install

```bash
npm install @dylanvann/gatsby-transformer-cloudinary
# or
yarn add @dylanvann/gatsby-transformer-cloudinary
```

## How to use?

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

It recognizes files with the following extensions as media:

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

- An ID is generated for the media based on an MD5 hash of its contents and the filename (better for SEO and will help you recognize it).
- We check if the media is already on Cloudinary under that ID.
- If it is not we upload it.
- Either way we get metadata for it including the dimensions.
- We generate lazy urls for the media at different sizes and formats.
