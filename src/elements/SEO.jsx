/* eslint-disable react/require-default-props */
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../config/website'

const SEO = props => {
  const { locale, postNode, postPath, postSEO } = props
  const { htmlLang, ogLang, translation: i18n } = locale
  let title
  let description
  let image
  let imageWidth
  let imageHeight
  let postURL
  if (postSEO) {
    const postMeta = postNode.data
    const postImage = postMeta.cover.localFile.childImageSharp.resize
    description = `${postNode.fields.excerpt}...`
    image = postImage.src
    imageWidth = postImage.width
    imageHeight = postImage.height
    postURL = config.siteUrl + postPath
  } else {
    title = i18n.siteTitle
    description = i18n.siteDescription
    image = config.siteBanner
    imageWidth = config.siteBannerWidth
    imageHeight = config.siteBannerHeight
  }
  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
  image = config.siteUrl + realPrefix + image
  const blogURL = config.siteUrl + realPrefix
  let schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      '@id': blogURL,
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    },
  ]
  if (postSEO) {
    schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        '@id': postURL,
        url: postURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
        datePublished: postNode.first_publication_date,
        dateModified: postNode.last_publication_date,
        author: {
          '@type': 'Person',
          name: 'LekoArts',
        },
        publisher: {
          '@type': 'Organization',
          name: 'LekoArts',
          logo: {
            '@type': 'ImageObject',
            url: config.siteUrl + realPrefix + config.siteLogo,
          },
        },
        isPartOf: blogURL,
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': blogURL,
        },
      },
    ]
  }
  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#343849" />
      <meta name="msapplication-TileColor" content="#3498db" />
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      <meta property="og:locale" content={ogLang} />
      <meta property="og:site_name" content={config.facebook} />
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  locale: PropTypes.object,
  postNode: PropTypes.object,
  postPath: PropTypes.string,
  postSEO: PropTypes.bool,
}
