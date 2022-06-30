import type { LinkDescriptor } from '@remix-run/node'

export default function stylesheetUrl(
  path: string,
  props: Omit<LinkDescriptor, 'href'> = {}
): LinkDescriptor {
  return {
    rel: 'stylesheet',
    href: path,
    ...props
  }
}
