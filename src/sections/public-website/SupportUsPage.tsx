import data from '@/../product/sections/public-website/data.json'
import { SupportUsPage } from './components/SupportUsPage'
import type {
  MembershipLevel,
  SupportOption,
  BraintreeConfig,
} from '@/../product/sections/public-website/types'

export default function SupportUsPagePreview() {
  return (
    <SupportUsPage
      membershipLevels={data.membershipLevels as MembershipLevel[]}
      supportOptions={data.supportOptions as SupportOption[]}
      braintreeConfig={data.braintreeConfig as BraintreeConfig}
      onSubmitMemberSignup={(formData) =>
        console.log('Member signup submitted:', formData)
      }
      onDonate={(nonce, amount) =>
        console.log('Donate:', { nonce, amount })
      }
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
