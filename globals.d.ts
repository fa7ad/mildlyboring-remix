/// <reference types="prismjs" />

type Maybe<T> = T | undefined
type Nullable<T> = T | null

interface OpenGraphMedia {
  alt: string
  height?: number
  secureUrl?: string
  type?: string
  url: string
  width?: number
}

type EntryImages = {
  cover: Maybe<string>
  ogCover: Maybe<string>
  placeholderImage: Maybe<string>
}

type PostSeries = {
  title: string
  posts: {
    title: string
    slug: string
  }[]
}

type EntryContent = {}

type EntryMetadata = {
  title: string
  slug: string
  date: Maybe<string>
  series: Maybe<string>
  cover: Maybe<string>
  file: string
}

type CoreMeta = Omit<EntryMetadata, 'cover' | 'series'>

type Entry = EntryImages &
  (CoreMeta & {
    published: Maybe<string>
    content: string
    excerpt: string
    series: Maybe<PostSeries>
  })
type ContentMetadata = {
  posts: EntryMetadata[]
  pages: EntryMetadata[]
  series: Record<string, PostSeries>
}

type ContentType = Exclude<keyof ContentMetadata, 'series'>
