import { sanitize } from './markdown.config.server'
const unified = import('unified').then(m => m.unified)
const remarkGfm = import('remark-gfm').then(m => m.default)
const rehypeRaw = import('rehype-raw').then(m => m.default)
const remarkMath = import('remark-math').then(m => m.default)
const remarkParse = import('remark-parse').then(m => m.default)
const stripMarkdown = import('strip-markdown').then(m => m.default)
const remarkStringify = import('remark-stringify').then(m => m.default)
const remarkRehype = import('remark-rehype').then(m => m.default)
const rehypeSanitize = import('rehype-sanitize').then(m => m.default)
const rehypeStringify = import('rehype-stringify').then(m => m.default)
const rehypeKatex = import('rehype-katex').then(m => m.default)
const rehypePrism = import('rehype-prism-plus').then(m => m.default)

export default async function renderMarkdown(markdownText: string) {
  const uni = await unified
  const result = await uni()
    .use(await remarkParse)
    .use(await remarkGfm)
    .use(await remarkMath)
    .use(await remarkRehype, { allowDangerousHtml: true })
    .use(await rehypeKatex, { displayMode: false })
    .use(await rehypeRaw)
    .use(await rehypePrism, { showLineNumbers: true, ignoreMissing: true })
    .use(await rehypeSanitize, await sanitize())
    .use(await rehypeStringify)
    .process(markdownText)

  return result.toString()
}

export async function renderExcerpt(
  markdownText: string,
  excerptLength: number
) {
  const uni = await unified
  const result = await uni()
    .use(await remarkParse)
    .use(await remarkGfm)
    .use(await stripMarkdown)
    .use(await remarkStringify)
    .process(markdownText)
  const contentText = result.toString().trim().replace(/\s+/g, ' ')
  const excerpt = contentText.slice(0, excerptLength)

  if (contentText.length > excerptLength) {
    return excerpt + '...'
  }
  return excerpt
}
