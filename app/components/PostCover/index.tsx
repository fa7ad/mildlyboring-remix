import type { LinksFunction } from '@remix-run/node'
import Image from '~/components/Image'

import styles from '~/styles/PostCover.module.mjs'
import stylesUrl from '~/styles/PostCover.module.css'
import stylesheetUrl from '~/utils/stylesheetUrl'

export const links: LinksFunction = () => [stylesheetUrl(stylesUrl)]

interface PostCoverProps {
  post: Post
}

const PostCover = ({ post }: PostCoverProps) => {
  if (!post.cover) {
    return null
  }

  return (
    <div className={styles.coverImage}>
      <Image src={post.cover} blurDataURL={post.placeholderImage} alt='' />
    </div>
  )
}

export default PostCover
