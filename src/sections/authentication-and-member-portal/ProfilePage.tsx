import data from '@/../product/sections/authentication-and-member-portal/data.json'
import { ProfilePage } from './components/ProfilePage'
import type {
  MemberProfile,
  PaymentRecord,
  AvailableLevel,
} from '@/../product/sections/authentication-and-member-portal/types'

export default function ProfilePagePreview() {
  return (
    <ProfilePage
      profile={data.memberProfile as MemberProfile}
      paymentHistory={data.paymentHistory as PaymentRecord[]}
      availableLevels={data.availableLevels as AvailableLevel[]}
      onUpdateProfile={(d) => console.log('Update profile:', d)}
      onChangePassword={(d) => console.log('Change password:', d)}
      onRenew={(id) => console.log('Renew:', id)}
      onUpgradeMembership={(id) => console.log('Upgrade:', id)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
