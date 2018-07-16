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
        tracedSVG
        width
        height
        src
        srcSet
    }
`

export const gatsbyImageCloudinaryFixedPreferWebp = graphql`
    fragment GatsbyImageCloudinaryFixed_withWebp on ImageCloudinaryFixed {
        base64
        width
        height
        src
        srcSet
        srcWebp
        srcSetWebp
    }
`

export const gatsbyImageCloudinaryFixedPreferWebpTracedSVG = graphql`
    fragment GatsbyImageCloudinaryFixed_withWebp_tracedSVG on ImageCloudinaryFixed {
        tracedSVG
        width
        height
        src
        srcSet
        srcWebp
        srcSetWebp
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

export const gatsbyImageCloudinaryFixedPreferWebpNoBase64 = graphql`
    fragment GatsbyImageCloudinaryFixed_withWebp_noBase64 on ImageCloudinaryFixed {
        width
        height
        src
        srcSet
        srcWebp
        srcSetWebp
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
        tracedSVG
        aspectRatio
        src
        srcSet
        sizes
    }
`

export const gatsbyImageCloudinaryFluidPreferWebp = graphql`
    fragment GatsbyImageCloudinaryFluid_withWebp on ImageCloudinaryFluid {
        base64
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
    }
`

export const gatsbyImageCloudinaryFluidPreferWebpTracedSVG = graphql`
    fragment GatsbyImageCloudinaryFluid_withWebp_tracedSVG on ImageCloudinaryFluid {
        tracedSVG
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
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

export const gatsbyImageCloudinaryFluidPreferWebpNoBase64 = graphql`
    fragment GatsbyImageCloudinaryFluid_withWebp_noBase64 on ImageCloudinaryFluid {
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
    }
`
