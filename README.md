# @dylanvann/gatsby-transformer-cloudinary

Processes images in Gatsby's GraphQL layer using Cloudinary.

Creates `ImageCloudinary` nodes from images Gatsby's GraphQL layer.

## Install

```bash
npm install @dylanvann/gatsby-transformer-cloudinary
# or
yarn add @dylanvann/gatsby-transformer-cloudinary
```

## Usage

```js
// gatsby-config.js
module.exports = {
    plugins: [
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: '@dylanvann/gatsby-remark-cloudinary',
                        options: {
                            cloudName: '...',
                            apiKey: '...',
                            apiSecret: '...',
                        },
                    },
                ],
            },
        },
    ],
}
```