import { BackToTop } from '@/components/BackToTop';
import { Community } from '@/components/Community';
import { Contribute } from '@/components/Contribute';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Overview } from '@/components/Overview';
import { Projects } from '@/components/Projects';
import { LanguageProvider } from '@/hooks/useLanguage';

const App = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Projects />
        <Community />
        <Contribute />
      </main>
      <Footer />
      <BackToTop />
    </div>
  </LanguageProvider>
);

export default App;
