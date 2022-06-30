import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@remix-run/node'

import dayjs from 'dayjs'
import { json } from '@remix-run/node'
import { reverse, sortBy } from 'ramda'
import { useLoaderData } from '@remix-run/react'

import { getAllEntries } from '~/content/getAllEntries.server'

import { getSeo } from '~/utils/seo'
import stylesheetUrl from '~/utils/stylesheetUrl'

import Page, { links as pageLinks } from '~/components/Page'
import PostPreview, { links as previewLinks } from '~/components/PostPreview'

import styles from '~/styles/home.module.mjs'
import stylesUrl from '~/styles/home.module.css'

const [seoMeta, seoLinks] = getSeo({
  title: 'Boring you with code ever so mildly',
  titleTemplate: '%s'
})

export const links: LinksFunction = () => [
  ...seoLinks,
  ...pageLinks(),
  ...previewLinks(),
  stylesheetUrl(stylesUrl)
]

export const meta: MetaFunction = () => ({ ...seoMeta })

export const loader: LoaderFunction = async () => {
  const allPosts = await getAllEntries('posts')
  const sortedPosts = reverse(
    sortBy(entry => dayjs(entry.published).unix(), allPosts)
  )
  return json({ posts: sortedPosts })
}

interface LoaderData {
  posts: Entry[]
}

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()

  return (
    <Page className={styles.homeContainer}>
      <section className={styles.postsSection} id='blog'>
        <h1>Blog Posts</h1>
        <div className={styles.postsList} id='content'>
          {posts?.map(post => (
            <PostPreview key={post.slug + post.date} {...post} />
          ))}
        </div>
      </section>
    </Page>
  )
}
