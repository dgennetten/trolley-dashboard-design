import { LoginPage } from './components/LoginPage'

export default function LoginPagePreview() {
  return (
    <LoginPage
      onRequestCode={(email) => console.log('Request code:', email)}
      onVerifyCode={(data) => console.log('Verify code:', data)}
      onResendCode={(email) => console.log('Resend code:', email)}
      onRegister={(data) => console.log('Register:', data)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
