import Navbar from 'components/Navbar'
import Banner from 'components/banner/Banner'
import Plans from 'components/Plans'
import Footer from 'components/Footer'
import ScrollButton from 'components/buttons/ScrollButton'
import { TransitionLink } from 'components/transitions/TransitionLink'
import { getUser } from 'utils/supabase/server'

export default async function Home() {
  const user = await getUser()
  const bannerData = {
    backgroundImage: '/img/Integral-fit.png',
    align: { horizontal: 'right' },
    textAlign: { text: 'left', vertical: 'center' },
    content: {
      title: 'Genera el cambio que deseas',
      subtitle:
        'Cuéntanos sobre ti y genera la transformación que deseas en tu vida, con nuestros planes de entrenamiento personalizado.',
    },
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="flex min-h-screen flex-col items-center justify-between pb-12">
        <Banner {...bannerData}>
          <ScrollButton
            key="scroll-to-plans"
            targetId="plans-section"
            type="outline"
          >
            Ver planes
          </ScrollButton>
          {!user && (
            <TransitionLink href="/access/signup" variant="default">
              Unirme al cambio
            </TransitionLink>
          )}
        </Banner>
        <Plans id="plans-section" className="mt-12" />
      </div>
      <Footer />
    </main>
  )
}
