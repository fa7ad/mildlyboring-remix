import initSeo from 'remix-seo'

export const { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  defaultTitle: 'Mildly Boring',
  titleTemplate: '%s | Mildly Boring',
  description:
    'Some mildly boring rants, mostly about programming; all from the mind of a bored weirdo.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mildly Boring',
    profile: {
      firstName: 'Fahad',
      lastName: 'Hossain',
      username: 'fa7ad',
      gender: 'male'
    },
    defaultImageHeight: 630,
    defaultImageWidth: 1200,
    images: [
      {
        url: 'https://mildlyboring.com/og/featured/default_cover.jpg',
        alt: 'Mildly Boring',
        width: 1200,
        height: 630,
        type: 'image/jpeg'
      }
    ]
  }
})
