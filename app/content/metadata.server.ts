import fs from 'fs'
import * as path from 'path'
import { map } from 'ramda'
import { getPlaiceholder } from 'plaiceholder'

import globalEnv from '~/config.server'
import { renderExcerpt } from './markdown.server'

import contentMetadata from './content.server'

const importGot = import('got').then(m => m.default)

export const mapPromise = <T, U>(
  fn: (val: T) => Promise<U>,
  arr: T[]
): Promise<U[]> => {
  const mapped = map(fn, arr)
  return Promise.all(mapped)
}

export const getMetaData = async () => {
  return contentMetadata as ContentMetadata
}

export const getImages = async <T extends { cover: Maybe<string> }>(
  entry: T
): Promise<EntryImages> => {
  const cover = entry?.cover
  let placeholderImage
  if (cover == null) {
    return { cover, placeholderImage, ogCover: undefined }
  }
  const coverUrl = `${globalEnv.PUBLIC_URL}${cover}`

  const { base64 } = await getPlaiceholder(
    await (await importGot)(coverUrl).buffer()
  )
  placeholderImage = base64
  const ogCover = `${globalEnv.PUBLIC_URL}/og${cover}`
  return { cover: coverUrl, placeholderImage, ogCover }
}

export const getEntryExcerpt = async <T extends { file: string }>(
  entry: T,
  length = 155
) => {
  const markdown = fs.readFileSync(
    path.resolve(process.cwd(), entry.file),
    'utf8'
  )
  return renderExcerpt(markdown, length)
}
