import data from '@/../product/sections/public-website/data.json'
import { ChartersPage } from './components/ChartersPage'
import type { CharterInfo } from '@/../product/sections/public-website/types'

export default function ChartersPagePreview() {
  return (
    <ChartersPage
      charterInfo={data.charterInfo as CharterInfo}
      onSubmitCharterRequest={(formData) =>
        console.log('Charter request submitted:', formData)
      }
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
