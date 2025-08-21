import heroBg from "@/assets/moghul-foods-logo.png";
import Image from "next/image";
import TextCarousel from "./TextCarousel";

const reviews = [
    `★★★★★ “Excellent place for bulk foods, ethnic foods and they're official distributors for SHAN spices.” — Jameel Farooqui (Local Guide)`,
  `★★★★★ “Very professional people, great prices and helpful service! Highly recommend!” — Busy Days Meal Delivery`,
  `★★★★★ “Very clean office, amazing prices and friendly service!” — Joe Bielak (Local Guide)`,
];

export default function Hero() {
    return (
        <section id="hero" className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-[#c5a34f]" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('/noisy.jpeg')] bg-no-repeat bg-cover bg-center opacity-25 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/taj-mahal.webp')] bg-no-repeat bg-cover bg-center opacity-20 mix-blend-soft-light pointer-events-none" />
            <div className="space-y-10">

                <div className="relative z-20 mx-auto max-w-5xl px-4 py-16 flex flex-col items-center text-center mt-12">
                    <Image
                    src={heroBg}
                    alt="logo"
                    width={360}
                    height={360}
                    className="object-cover"
                    >
                    </Image>
                    <p className="py-4 font-[cursive]">
                        Bringing South Asian flavors to households across the Midwest
                    </p>
                    <TextCarousel
                    className="mt-6 font-bold"
                    items={[
                        "MOGHUL FOOD DISTRIBUTORS is a leading supplier of South Asian and Middle Eastern foods, known for competitive pricing, quality products, bulk availability, fast delivery, personalized service, and trusted certifications. From our roots in Michigan, we’ve grown into one of North America’s top ethnic food distributors.",
                        "MOGHUL FOODS, alongside sister companies Royal Distributors Inc. (Midwest) and Hyderfiner Foods (Central), forms one of the USA’s largest importers and distributors of ethnic foods. With deep market knowledge and buying power, we source in bulk at competitive rates—passing the savings on to our customers.",
                        ...reviews
                    ]}
                    intervalMs={6500}

                    />
                </div>
                <div className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                    <a
                    href="#contact"
                    className="inline-flex items-center gap-1 rounded-full bg-[#020042] text-white px-6 py-3
                                font-semibold shadow hover:shadow-md hover:brightness-110 transition"
                    >
                    Contact Us
                    </a>
                </div>
            </div>
        </section>
    )
}