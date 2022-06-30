import clsx from 'clsx'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import type { LazyLoadImageProps } from 'react-lazy-load-image-component'

interface ImageProps extends Partial<LazyLoadImageProps> {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  blurDataURL?: string
}

const TRANSP_IMAGE = `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`

const AugmentedLazyImage = trackWindowScroll(({ scrollPosition, ...props }) => {
  delete (props as any).forwardRef

  return <LazyLoadImage scrollPosition={scrollPosition} {...props} />
}) as typeof LazyLoadImage

function Image({ src, alt, className, wrapperClassName, blurDataURL = TRANSP_IMAGE, ...props }: ImageProps) {
  return (
    <AugmentedLazyImage
      src={src}
      alt={alt}
      wrapperClassName={clsx(wrapperClassName, 'imagefillContainer')}
      className={clsx('imagefill', className)}
      placeholderSrc={blurDataURL}
      scrollPosition={props?.scrollPosition}
      effect='blur'
      {...props}
    />
  )
}

export default Image
