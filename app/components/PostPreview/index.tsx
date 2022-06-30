import type { LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Image from '~/components/Image'
import stylesheetUrl from '~/utils/stylesheetUrl'

import styles from '~/styles/PostPreview.module.mjs'
import stylesUrl from '~/styles/PostPreview.module.css'

interface PostPreviewProps {
  slug: string
  title: string
  date?: string
  excerpt?: string
  cover?: string
  coverAlt?: string
  placeholderImage?: string
}

export const links: LinksFunction = () => [stylesheetUrl(stylesUrl)]

export default function PostPreview({
  excerpt,
  slug,
  title,
  date,
  cover,
  placeholderImage
}: PostPreviewProps) {
  return (
    <article className={styles.root}>
      <Link to={`/posts/${slug}`} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.subtitle}>{date}</p>
      {cover ? (
        <p className={styles.coverImage}>
          <Image src={cover} alt='' blurDataURL={placeholderImage} />
        </p>
      ) : null}
      {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
      <Link to={`/posts/${slug}`}>
        <button className={styles.button}>Read more</button>
      </Link>
    </article>
  )
}
