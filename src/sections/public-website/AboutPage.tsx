import data from '@/../product/sections/public-website/data.json'
import { AboutPage } from './components/AboutPage'
import type { AboutContent } from '@/../product/sections/public-website/types'

export default function AboutPagePreview() {
  return (
    <AboutPage
      aboutContent={data.aboutContent as AboutContent}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
