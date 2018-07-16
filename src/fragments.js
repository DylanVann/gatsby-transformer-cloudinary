/* eslint-disable */
import { graphql } from "gatsby"

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

// TODO: in v3 remove these legacy fragments
export const gatsbyImageCloudinaryResolutions = graphql`
  fragment GatsbyImageCloudinaryResolutions on ImageCloudinaryResolutions {
    base64
    width
    height
    src
    srcSet
  }
`

export const gatsbyImageCloudinaryResolutionsTracedSVG = graphql`
  fragment GatsbyImageCloudinaryResolutions_tracedSVG on ImageCloudinaryResolutions {
    tracedSVG
    width
    height
    src
    srcSet
  }
`

export const gatsbyImageCloudinaryResolutionsPreferWebp = graphql`
  fragment GatsbyImageCloudinaryResolutions_withWebp on ImageCloudinaryResolutions {
    base64
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`

export const gatsbyImageCloudinaryResolutionsPreferWebpTracedSVG = graphql`
  fragment GatsbyImageCloudinaryResolutions_withWebp_tracedSVG on ImageCloudinaryResolutions {
    tracedSVG
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`

export const gatsbyImageCloudinaryResolutionsNoBase64 = graphql`
  fragment GatsbyImageCloudinaryResolutions_noBase64 on ImageCloudinaryResolutions {
    width
    height
    src
    srcSet
  }
`

export const gatsbyImageCloudinaryResolutionsPreferWebpNoBase64 = graphql`
  fragment GatsbyImageCloudinaryResolutions_withWebp_noBase64 on ImageCloudinaryResolutions {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`

export const gatsbyImageCloudinarySizes = graphql`
  fragment GatsbyImageCloudinarySizes on ImageCloudinarySizes {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`

export const gatsbyImageCloudinarySizesTracedSVG = graphql`
  fragment GatsbyImageCloudinarySizes_tracedSVG on ImageCloudinarySizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`

export const gatsbyImageCloudinarySizesPreferWebp = graphql`
  fragment GatsbyImageCloudinarySizes_withWebp on ImageCloudinarySizes {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`

export const gatsbyImageCloudinarySizesPreferWebpTracedSVG = graphql`
  fragment GatsbyImageCloudinarySizes_withWebp_tracedSVG on ImageCloudinarySizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`

export const gatsbyImageCloudinarySizesNoBase64 = graphql`
  fragment GatsbyImageCloudinarySizes_noBase64 on ImageCloudinarySizes {
    aspectRatio
    src
    srcSet
    sizes
  }
`

export const gatsbyImageCloudinarySizesPreferWebpNoBase64 = graphql`
  fragment GatsbyImageCloudinarySizes_withWebp_noBase64 on ImageCloudinarySizes {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
