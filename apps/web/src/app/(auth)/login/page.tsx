import RevolutionHero from '@/components/revolution-hero'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
       {/* O Hero atua como Background */}
       <div className="absolute inset-0 z-0">
         <RevolutionHero />
       </div>

       {/* O Form flutua por cima */}
       <div className="relative z-10 flex items-center justify-center h-full pointer-events-none">
         {/* pointer-events-auto no form para permitir digitação */}
         <div className="pointer-events-auto">
           <LoginForm />
         </div>
       </div>
    </main>
  )
}
