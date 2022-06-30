import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'

import css from '~/styles/root.global.css'
import tailwind from '~/styles/tailwind.global.css'
import lazyImageUrl from 'react-lazy-load-image-component/src/effects/blur.css'

import { getSeo } from '~/utils/seo'
import store from './redux'

const [seoMeta, seoLinks] = getSeo({
  title: 'Home'
})

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  ...seoMeta,
  'X-UA-Compatible': 'ie=edge',
  'apple-mobile-web-app-title': 'Mildly Boring',
  'application-name': 'Mildly Boring',
  'msapplication-TileColor': '#00aba9',
  'msapplication-config': '/icons/browserconfig.xml?v=1.0.0',
  'theme-color': '#ffffff',
  author: 'Fahad Hossain',
  keywords:
    'programming,tutorial,functional,blog,rants,mildlyboring,fa7ad,fahad,hossain'
})

export const links: LinksFunction = () => [
  ...seoLinks,
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/icons/apple-touch-icon.png?v=1.0.0'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/icons/favicon-32x32.png?v=1.0.0'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/icons/favicon-16x16.png?v=1.0.0'
  },
  { rel: 'manifest', href: '/icons/site.webmanifest?v=1.0.0' },
  {
    rel: 'mask-icon',
    href: '/icons/safari-pinned-tab.svg?v=1.0.0',
    color: '#5bbad5'
  },
  { rel: 'shortcut icon', href: '/icons/favicon.ico?v=1.0.0' },
  {
    rel: 'stylesheet',
    href: tailwind
  },
  {
    rel: 'stylesheet',
    href: css
  },
  {
    rel: 'stylesheet',
    href: lazyImageUrl
  }
]

export default function App() {
  const htmlRef = useRef<HTMLHtmlElement>(null)

  useEffect(() => {
    if (htmlRef.current) {
      const darkMode = localStorage.getItem('darkMode')
      htmlRef.current.classList.toggle('dark', darkMode === 'true')
    }
  }, [])

  return (
    <html lang='en' ref={htmlRef}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Outlet />
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
