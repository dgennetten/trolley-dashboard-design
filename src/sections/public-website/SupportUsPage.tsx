import data from '@/../product/sections/public-website/data.json'
import { SupportUsPage } from './components/SupportUsPage'
import type {
  MembershipLevel,
  SupportOption,
  PaymentOptions,
  PaymentMethod,
} from '@/../product/sections/public-website/types'

export default function SupportUsPagePreview() {
  return (
    <SupportUsPage
      membershipLevels={data.membershipLevels as MembershipLevel[]}
      supportOptions={data.supportOptions as SupportOption[]}
      paymentOptions={data.paymentOptions as PaymentOptions}
      onSubmitMemberSignup={(formData) =>
        console.log('Member signup submitted:', formData)
      }
      onDonate={(method: PaymentMethod) =>
        console.log('Donate via:', method)
      }
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
