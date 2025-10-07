import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import MVPs from "../components/landing/MVPs";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <MVPs />
      <Footer />
    </div>
  );
}
