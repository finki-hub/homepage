import { BackToTop } from '@/components/BackToTop';
import { Community } from '@/components/Community';
import { Contribute } from '@/components/Contribute';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Overview } from '@/components/Overview';
import { Platforms } from '@/components/Platforms';
import { Projects } from '@/components/Projects';
import { LanguageProvider } from '@/hooks/LanguageProvider';

const App = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Platforms />
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
