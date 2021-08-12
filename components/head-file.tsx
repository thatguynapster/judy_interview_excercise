import Head from 'next/head'
import { FC } from 'react'
import { NextSeo } from 'next-seo'
import { IHeaderProps } from '../types'

import { SEOConfig } from '../configs/global_variables'

export const HeadFile: FC<IHeaderProps> = ({ title, canonical }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="keywords" content="" />
      </Head>

      <NextSeo
        title={title || SEOConfig.title}
        description={SEOConfig.description}
        canonical={canonical || SEOConfig.canonical || process.env.NEXT_PUBLIC_BASE_URL}
        openGraph={{
          title: title || SEOConfig.title,
          description: SEOConfig.description,
          url: SEOConfig.canonical || process.env.NEXT_PUBLIC_BASE_URL,
          locale: SEOConfig.locale,
          site_name: SEOConfig.site_name
        }}
      />
    </>
  )
}

export default HeadFile
