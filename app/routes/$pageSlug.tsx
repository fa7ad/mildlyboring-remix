import type { Params } from '@remix-run/react'
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@remix-run/node'

import { json } from '@remix-run/node'

import { useEffect } from 'react'
import parse from 'html-react-parser'
import { useLoaderData, useParams } from '@remix-run/react'

import Page, { links as pageLinks } from '~/components/Page'

import { useAppDispatch } from '~/redux/hooks'
import { setActiveNavKey } from '~/redux/ui.slice'
import { getSeoLinks, getSeoMeta } from '~/utils/seo'

import globalEnv from '~/config.server'
import { getSingleEntry } from '~/content/getSingleEntry.server'
import { KATEX_CSS } from '~/components/ThirdParty'

interface LoaderData {
  page: Entry
  globalEnv: typeof globalEnv
}

export const loader: LoaderFunction = async ({ params }) => {
  const { pageSlug } = params
  if (!pageSlug) {
    return json({ page: null, globalEnv })
  }
  const page = await getSingleEntry('pages', pageSlug)
  return json({ page, globalEnv })
}

export const links: LinksFunction = () => {
  const seoLinks = getSeoLinks()
  return [...seoLinks, KATEX_CSS, ...pageLinks()]
}

export const meta: MetaFunction = ({
  data,
  params
}: {
  data: Maybe<LoaderData>
  params: Params
}) => {
  const ogMeta = getSeoMeta({
    title: data?.page?.title || params.pageSlug,
    description: data?.page?.excerpt,
    canonical: `${data?.globalEnv.PUBLIC_URL}/${params.pageSlug}`,
    openGraph: {
      article: {
        publishedTime: data?.page?.published || undefined,
        authors: ['Fahad Hossain']
      }
    }
  })

  return { ...ogMeta }
}

export default function ContentPage() {
  const dispatch = useAppDispatch()
  const { pageSlug } = useParams()
  const { page } = useLoaderData<LoaderData>()

  useEffect(() => {
    dispatch(setActiveNavKey(pageSlug))
  }, [dispatch, pageSlug])

  return (
    <Page>
      <article
        className='prose lg:prose-xl w-full md:max-w-4xl px-4'
        id='content'
      >
        {parse(page.content)}
      </article>
    </Page>
  )
}
