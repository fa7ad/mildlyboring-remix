import { sanitize } from './markdown.config.server'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import stripMarkdown from 'strip-markdown'
import remarkStringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'

export default async function renderMarkdown(markdownText: string) {
  const uni = await unified
  const result = await uni()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, { displayMode: false })
    .use(rehypeRaw)
    .use(rehypePrism, { showLineNumbers: true, ignoreMissing: true })
    .use(rehypeSanitize, await sanitize())
    .use(rehypeStringify)
    .process(markdownText)

  return result.toString()
}

export async function renderExcerpt(
  markdownText: string,
  excerptLength: number
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(stripMarkdown)
    .use(remarkStringify)
    .process(markdownText)
  const contentText = result.toString().trim().replace(/\s+/g, ' ')
  const excerpt = contentText.slice(0, excerptLength)

  if (contentText.length > excerptLength) {
    return excerpt + '...'
  }
  return excerpt
}
