import data from '@/../product/sections/authentication-and-member-portal/data.json'
import { MessagesPage } from './components/MessagesPage'
import type { Message } from '@/../product/sections/authentication-and-member-portal/types'

export default function MessagesPagePreview() {
  return (
    <MessagesPage
      messages={data.messages as Message[]}
      onSendMessage={(d) => console.log('Send message:', d)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
