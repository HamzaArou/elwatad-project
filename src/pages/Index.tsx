
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import RequestProperty from "@/components/RequestProperty";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import ContactUs from "@/components/ContactUs";
import FloatingContact from "@/components/FloatingContact";
import MortgageCalculator from "@/components/MortgageCalculator";
import PropertySearch from "@/components/PropertySearch";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <PropertySearch />
      <FeaturedProjects />
      <RequestProperty />
      <Services />
      <Stats />
      <MortgageCalculator />
      <Partners />
      <AboutUs />
      <ContactUs />
      <FloatingContact />
    </main>
  );
}
