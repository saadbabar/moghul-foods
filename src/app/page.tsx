import Hero from "@/components/Hero"
import About from "@/components/About"
import Coverage from "@/components/Coverage"
import InquirySimple from "@/components/Inquiry"
import Services from "@/components/Services"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Coverage/>
        <Services/>
        <InquirySimple/>
      </main>
      <Footer/>
    </>
  )
}