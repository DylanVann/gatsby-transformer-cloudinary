/* eslint-disable */
import { graphql } from 'gatsby'

export const gatsbyImageCloudinaryFixed = graphql`
    fragment GatsbyImageCloudinaryFixed on ImageCloudinaryFixed {
        base64
        width
        height
        src
        srcSet
    }
`

export const gatsbyImageCloudinaryFixedTracedSVG = graphql`
    fragment GatsbyImageCloudinaryFixed_tracedSVG on ImageCloudinaryFixed {
        width
        height
        src
        srcSet
    }
`

export const gatsbyImageCloudinaryFixedPreferWebP = graphql`
    fragment GatsbyImageCloudinaryFixed_withWebP on ImageCloudinaryFixed {
        base64
        width
        height
        src
        srcSet
        srcWebP
        srcSetWebP
    }
`

export const gatsbyImageCloudinaryFixedPreferWebPTracedSVG = graphql`
    fragment GatsbyImageCloudinaryFixed_withWebP_tracedSVG on ImageCloudinaryFixed {
        width
        height
        src
        srcSet
        srcWebP
        srcSetWebP
    }
`

export const gatsbyImageCloudinaryFixedNoBase64 = graphql`
    fragment GatsbyImageCloudinaryFixed_noBase64 on ImageCloudinaryFixed {
        width
        height
        src
        srcSet
    }
`

export const gatsbyImageCloudinaryFixedPreferWebPNoBase64 = graphql`
    fragment GatsbyImageCloudinaryFixed_withWebP_noBase64 on ImageCloudinaryFixed {
        width
        height
        src
        srcSet
        srcWebP
        srcSetWebP
    }
`

export const gatsbyImageCloudinaryFluid = graphql`
    fragment GatsbyImageCloudinaryFluid on ImageCloudinaryFluid {
        base64
        aspectRatio
        src
        srcSet
        sizes
    }
`

export const gatsbyImageCloudinaryFluidTracedSVG = graphql`
    fragment GatsbyImageCloudinaryFluid_tracedSVG on ImageCloudinaryFluid {
        aspectRatio
        src
        srcSet
        sizes
    }
`

export const gatsbyImageCloudinaryFluidPreferWebP = graphql`
    fragment GatsbyImageCloudinaryFluid_withWebP on ImageCloudinaryFluid {
        base64
        aspectRatio
        src
        srcSet
        srcWebP
        srcSetWebP
        sizes
    }
`

export const gatsbyImageCloudinaryFluidPreferWebPTracedSVG = graphql`
    fragment GatsbyImageCloudinaryFluid_withWebP_tracedSVG on ImageCloudinaryFluid {
        aspectRatio
        src
        srcSet
        srcWebP
        srcSetWebP
        sizes
    }
`

export const gatsbyImageCloudinaryFluidNoBase64 = graphql`
    fragment GatsbyImageCloudinaryFluid_noBase64 on ImageCloudinaryFluid {
        aspectRatio
        src
        srcSet
        sizes
    }
`

export const gatsbyImageCloudinaryFluidPreferWebPNoBase64 = graphql`
    fragment GatsbyImageCloudinaryFluid_withWebP_noBase64 on ImageCloudinaryFluid {
        aspectRatio
        src
        srcSet
        srcWebP
        srcSetWebP
        sizes
    }
`
