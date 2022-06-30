import type { Options } from 'rehype-sanitize'
import { concat, mergeDeepWith } from 'ramda'

const defaultSchema = import('rehype-sanitize').then(m => m.defaultSchema)

const customSchema: Options = {
  allowComments: true,
  tagNames: ['div', 'figure', 'figcaption'],
  attributes: {
    '*': ['className', 'data*', 'data-*', 'aria*', 'line']
  }
}

export const sanitize = async () =>
  mergeDeepWith(concat, await defaultSchema, customSchema)
