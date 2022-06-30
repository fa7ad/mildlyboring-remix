import dayjs from 'dayjs'
import { assoc, mergeRight } from 'ramda'
import {
  getMetaData,
  mapPromise,
  getImages,
  getEntryExcerpt
} from './metadata.server'

export async function getAllEntries(contentType: ContentType) {
  const parsedMeta = await getMetaData()
  const content = parsedMeta?.[contentType] || []

  const allEntries = await mapPromise<EntryMetadata, Entry>(async entry => {
    const date = entry?.date
      ? dayjs(entry.date).format('dddd, MMMM D, YYYY HH:mm')
      : null
    const withDate = assoc('published', entry.date, entry)
    const withPublishedDate = assoc('date', date, withDate)
    const withImages = mergeRight(
      withPublishedDate,
      await getImages(withPublishedDate)
    )
    const withSeries = assoc(
      'series',
      parsedMeta?.series?.[entry?.series ?? ''] ?? undefined,
      withImages
    )
    const withExcerpt = assoc(
      'excerpt',
      await getEntryExcerpt(withSeries, 245),
      withSeries
    )
    return withExcerpt as Entry
  }, content)
  return allEntries
}
