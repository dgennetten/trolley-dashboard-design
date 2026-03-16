import { LoginPage } from './components/LoginPage'

export default function LoginPagePreview() {
  return (
    <LoginPage
      onLogin={(creds) => console.log('Login:', creds)}
      onMagicLink={(email) => console.log('Magic link:', email)}
      onRegister={(data) => console.log('Register:', data)}
      onForgotPassword={(email) => console.log('Forgot password:', email)}
      onNavigate={(href) => console.log('Navigate:', href)}
    />
  )
}
