import path from 'path'
import fs from 'fs/promises'
import YAML from 'yaml'
import { getPlaiceholder } from 'plaiceholder'
import { map } from 'ramda'

import globalEnv from '~/config.server'
import { renderExcerpt } from './markdown.server'

export const dataDir = path.join(process.cwd(), 'data')

export const mapPromise = <T, U>(
  fn: (val: T) => Promise<U>,
  arr: T[]
): Promise<U[]> => {
  const mapped = map(fn, arr)
  return Promise.all(mapped)
}

export const getMetaData = async () => {
  const metadataFile = path.join(dataDir, 'metadata.yml')
  const metadata = await fs.readFile(metadataFile, 'utf8')
  return YAML.parse(metadata) as ContentMetadata
}

export const getImages = async <T extends { cover: Maybe<string> }>(
  entry: T
): Promise<EntryImages> => {
  const cover = entry?.cover
  let placeholderImage
  if (cover == null) {
    return { cover, placeholderImage, ogCover: undefined }
  }
  const { base64 } = await getPlaiceholder(cover)
  placeholderImage = base64
  const ogCover = `${globalEnv.PUBLIC_URL}/og${cover}`
  return { cover, placeholderImage, ogCover }
}

export const getEntryExcerpt = async <T extends { file: string }>(
  entry: T,
  contentType: ContentType,
  length = 155
) => {
  const markdown = await fs.readFile(
    path.join(dataDir, contentType, entry.file),
    'utf8'
  )
  return renderExcerpt(markdown, length)
}
