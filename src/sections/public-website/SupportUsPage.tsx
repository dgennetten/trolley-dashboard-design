import data from '@/../product/sections/public-website/data.json'
import { SupportUsPage } from './components/SupportUsPage'
import type {
  MembershipLevel,
  SupportOption,
  BraintreeConfig,
  ProcessingFeeConfig,
  ZelleConfig,
} from '@/../product/sections/public-website/types'

export default function SupportUsPagePreview() {
  return (
    <SupportUsPage
      membershipLevels={data.membershipLevels as MembershipLevel[]}
      supportOptions={data.supportOptions as SupportOption[]}
      braintreeConfig={data.braintreeConfig as BraintreeConfig}
      processingFeeConfig={data.processingFeeConfig as ProcessingFeeConfig}
      zelleConfig={data.zelleConfig as ZelleConfig}
      onSubmitMemberSignup={(formData) =>
        console.log('Member signup submitted:', formData)
      }
      onDonate={(donation) => console.log('Donate:', donation)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
