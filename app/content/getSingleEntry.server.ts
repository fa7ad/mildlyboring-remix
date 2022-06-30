import path from 'path'
import fs from 'fs/promises'
import dayjs from 'dayjs'

import renderMarkdown from './markdown.server'
import { dataDir, getImages } from './metadata.server'
import { getAllEntries } from './getAllEntries.server'

export async function getSingleEntry(contentType: ContentType, slug: string) {
  try {
    const allEntries = await getAllEntries(contentType)
    const entry = allEntries.find(entry => entry.slug === slug)
    if (entry == null) {
      return null
    }
    const filePath = path.join(dataDir, contentType, entry.file)
    const entryData = await fs.readFile(filePath, 'utf8')
    const date = entry?.date ? dayjs(entry.date).format('dddd, MMMM D, YYYY HH:mm') : null
    const { cover, ogCover, placeholderImage } = await getImages(entry)
    return {
      ...entry,
      content: await renderMarkdown(entryData),
      date,
      published: entry?.date ?? null,
      cover,
      ogCover,
      placeholderImage
    } as Entry
  } catch (error) {
    console.log({ date: Date.now(), error })
    return null
  }
}
