import HeroSection from '../components/home/HeroSection'
import CategoryShowcase from '../components/home/CategoryShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import PromoBanner from '../components/home/PromoBanner'
import BestSellers from '../components/home/BestSellers'
import ProcessTimeline from '../components/home/ProcessTimeline'
import Testimonials from '../components/home/Testimonials'
import StatsCounter from '../components/home/StatsCounter'
import BlogPreview from '../components/home/BlogPreview'
import BrandPartners from '../components/home/BrandPartners'
import Newsletter from '../components/home/Newsletter'

export default function HomePage() {
  return (
    <div className="animate-fade-in pb-16">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <ProcessTimeline />
      <Testimonials />
      <StatsCounter />
      <BlogPreview />
      <BrandPartners />
      <Newsletter />
    </div>
  )
}
