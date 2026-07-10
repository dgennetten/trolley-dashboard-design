import data from '@/../product/sections/authentication-and-member-portal/data.json'
import { ProfilePage } from './components/ProfilePage'
import type {
  MemberProfile,
  PaymentRecord,
  AvailableLevel,
  ProcessingFeeConfig,
  ZelleConfig,
} from '@/../product/sections/authentication-and-member-portal/types'

export default function ProfilePagePreview() {
  return (
    <ProfilePage
      profile={data.memberProfile as MemberProfile}
      paymentHistory={data.paymentHistory as PaymentRecord[]}
      availableLevels={data.availableLevels as AvailableLevel[]}
      processingFeeConfig={data.processingFeeConfig as ProcessingFeeConfig}
      zelleConfig={data.zelleConfig as ZelleConfig}
      onUpdateProfile={(d) => console.log('Update profile:', d)}
      onRenew={(d) => console.log('Renew:', d)}
      onUpgradeMembership={(d) => console.log('Upgrade:', d)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
