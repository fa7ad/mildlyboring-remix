import * as React from 'react'
import type { Element } from 'html-react-parser'
import parse from 'html-react-parser'

export default function renderHtml(content: string) {
  return parse(content, {
    replace: node => {
      const domNode = node as Element
      if (domNode.name === 'img' && !/^(https?:)?\/\//i.test(domNode.attribs.src)) {
        const props: React.ImgHTMLAttributes<HTMLImageElement> = {
          src: domNode.attribs.src
        }
        if (domNode.attribs.src.startsWith('/images')) {
          const res = domNode.attribs.src.match(/_(?<width>\d+)x(?<height>\d+)\..*?$/)
          const width = res?.groups?.width
          const height = res?.groups?.height
          if (width && height) {
            props.width = width
            props.height = height
          }
        }
        return <img alt={domNode.attribs.alt} {...props} className='max-w-full' />
      }
    }
  })
}
