import clsx from 'clsx'
import type { LinksFunction } from '@remix-run/node'
import stylesheetUrl from '~/utils/stylesheetUrl'

import Header from './_header'
import Footer from './_footer'

import styles from '~/styles/Page.module.mjs'
import stylesUrl from '~/styles/Page.module.css'

export const links: LinksFunction = () => [stylesheetUrl(stylesUrl)]

interface PageProps {
  children: React.ReactNode
  className?: string
}

export default function Page({ children, className }: PageProps) {
  return (
    <>
      <a className={styles.skipToContent} href='#content' tabIndex={0}>
        Skip to content
      </a>
      <Header />
      <main className={clsx(styles.main, className)}>{children}</main>
      <Footer />
    </>
  )
}
