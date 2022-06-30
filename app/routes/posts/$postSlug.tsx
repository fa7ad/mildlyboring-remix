import type {
  LoaderFunction,
  LinksFunction,
  MetaFunction
} from '@remix-run/node'

import clsx from 'clsx'
import { json } from '@remix-run/node'
import { ClientOnly } from 'remix-utils'
import { DiscussionEmbed } from 'disqus-react'
import React, { useEffect, useRef } from 'react'
import { Params, useLoaderData } from '@remix-run/react'

import globalEnv from '~/config.server'
import renderHtml from '~/utils/renderHtml'
import useOnScreen from '~/hooks/useOnScreen'

import { useAppDispatch } from '~/redux/hooks'
import { setActiveNavKey } from '~/redux/ui.slice'

import { KATEX_CSS } from '~/components/ThirdParty'
import { getSeoLinks, getSeoMeta } from '~/utils/seo'

import Page, { links as pageLinks } from '~/components/Page'
import PostCover, { links as postCoverLinks } from '~/components/PostCover'
import ArticleSeriesBox, {
  links as boxLinks
} from '~/components/ArticleSeriesBox'

import styles from '~/styles/Post.module.mjs'
import stylesUrl from '~/styles/Post.module.css'
import stylesheetUrl from '~/utils/stylesheetUrl'

import { getSingleEntry } from '~/content/getSingleEntry.server'

interface LoaderData {
  post: Entry | null
  ogImages: OpenGraphMedia[]
  globalEnv: typeof globalEnv
}

export const links: LinksFunction = () => {
  const seoLinks = getSeoLinks()
  return [
    ...seoLinks,
    KATEX_CSS,
    ...pageLinks(),
    ...postCoverLinks(),
    ...boxLinks(),
    stylesheetUrl(stylesUrl)
  ]
}

export const meta: MetaFunction = ({
  data,
  params
}: {
  data: Maybe<LoaderData>
  params: Params
}) => {
  const ogMeta = getSeoMeta({
    title: data?.post?.title || 'A Blog Post',
    description: data?.post?.excerpt,
    canonical: `${data?.globalEnv.PUBLIC_URL}/posts/${params.postSlug}`,
    openGraph: {
      article: {
        publishedTime: data?.post?.published || undefined,
        authors: ['Fahad Hossain']
      },
      images: data?.ogImages
    }
  })

  return { ...ogMeta }
}

export const loader: LoaderFunction = async ({ params }) => {
  const { postSlug } = params
  if (!postSlug) {
    return json({ post: null, ogImages: [], globalEnv })
  }
  const post = await getSingleEntry('posts', postSlug)
  let ogImages: OpenGraphMedia[] = []

  if (post?.ogCover) {
    ogImages = [
      {
        url: post.ogCover,
        alt: post.title,
        width: 1200,
        height: 630,
        type: 'image/jpeg'
      }
    ]
  }

  return json({ post, ogImages, globalEnv })
}

export default function BlogPostFull() {
  const dispatch = useAppDispatch()
  const comments = useRef(null)
  const commentsVisible = useOnScreen(comments, '-10px')
  const data = useLoaderData<LoaderData>()
  const { post, globalEnv } = data

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
    if (!window.Prism) {
      window.Prism = {} as any
    }
    Object.assign(window.Prism, { manual: true, plugins: ['line-numbers'] })
  }, [dispatch])

  const activatePrismJs = () => {
    if (window.Prism?.highlightAll) {
      window.Prism.highlightAll()
    }
  }

  return (
    <Page>
      <article
        id='content'
        className={clsx('prose', 'lg:prose-xl', styles.article)}
      >
        {post ? (
          <>
            <PostCover post={post} />
            <h1 className={styles.notTitle}>{post.title}</h1>
            <p className={styles.date}>{post.date}</p>
            <ArticleSeriesBox post={post} />
            <div id='readable_content'>{renderHtml(post.content)}</div>

            <hr />
            <section id='comments_section' className='relative' ref={comments}>
              <ClientOnly>
                {() =>
                  commentsVisible ? (
                    <DiscussionEmbed
                      shortname='mildly-boring'
                      config={{
                        url: `${globalEnv.PUBLIC_URL}/posts/${post.slug}`,
                        identifier: post.slug,
                        title: post.title
                      }}
                      key='disqus'
                    />
                  ) : (
                    <React.Fragment key='disqus' />
                  )
                }
              </ClientOnly>
            </section>
          </>
        ) : (
          'Loading...'
        )}
        <script src='/prism.min.js' onLoad={activatePrismJs} />
      </article>
    </Page>
  )
}
