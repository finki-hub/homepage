import { About } from './components/About';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Github } from './components/Github';
import { Header } from './components/Header';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Header />
      <About />
      <Github />
      <Faq />
      <Footer />
    </AppProvider>
  );
}
