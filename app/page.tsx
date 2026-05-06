import HeroSection from '@/components/HeroSection'
import ProductIntro from '@/components/ProductIntro'
import Advantages from '@/components/Advantages'
import Applications from '@/components/Applications'
import ProductTypes from '@/components/ProductTypes'
import TechSpecs from '@/components/TechSpecs'
import WhyChooseUs from '@/components/WhyChooseUs'
import QuoteProcess from '@/components/QuoteProcess'
import CallToAction from '@/components/CallToAction'
import QuoteForm from '@/components/QuoteForm'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductIntro />
      <Advantages />
      <Applications />
      <ProductTypes />
      <TechSpecs />
      <WhyChooseUs />
      <QuoteProcess />
      <CallToAction />
      <QuoteForm />
    </main>
  )
}
