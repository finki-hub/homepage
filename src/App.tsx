import { Header } from './components/Header';
import { About } from './components/About';
import { Github } from './components/Github';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Header />
      <About />
      <Github />
      <FAQ />
      <Footer />
    </AppProvider>
  );
}
