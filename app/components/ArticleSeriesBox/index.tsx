import clsx from 'clsx'
import { Link } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import stylesheetUrl from '~/utils/stylesheetUrl'

import styles from '~/styles/ArticleSeriesBox.module.mjs'
import stylesUrl from '~/styles/ArticleSeriesBox.module.css'

export const links: LinksFunction = () => [stylesheetUrl(stylesUrl)]

interface ArticleSeriesBoxProps {
  post: Post
}

export default function ArticleSeriesBox({ post }: ArticleSeriesBoxProps) {
  if (!post.series) {
    return null
  }

  const getSeriesItemClassName = (slug: string) =>
    clsx(styles.seriesItem, {
      [styles.activeSeriesItem]: slug === post.slug
    })

  return (
    <div className={styles.seriesListing}>
      <h2>This article is part of a series</h2>
      <h2>Series Title: {post.series.title}</h2>
      <ul className={styles.seriesBox}>
        {post.series.posts.map(({ slug, title }) => (
          <Link key={slug} to={`/posts/${slug}`}>
            <li className={getSeriesItemClassName(slug)}>{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
