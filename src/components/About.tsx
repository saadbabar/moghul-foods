import TextSlide from "@/components/TextSlide";
import { Brands }from "@/components/Brands";
import { Stores } from "@/components/Brands";

export default function About() {
  return (
    <section id="about" className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-white" />
      <div
        className="absolute inset-0 z-[1] bg-repeat pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/texture-bg.jpg')",
          backgroundSize: "300px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Our Partners</h2>
        <p className="mb-4 text-gray-700">
          Mutual Relationship Yielding Mutual Benefits
        </p>

        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
          <video
            src="/videos/moghul-brands.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain bg-transparent"
          />
        </div>

        <div className="mt-1">
          <TextSlide
            items={[
              "Serving Shan for 13 years",
              "Partners of distribution with",
              "Shan Foods",
              "Tapal",
              "United King",
              "Karachi Bakery",
              "Shangrila",
              "Al-Safa",
              "Lipton",
              "Telugu Foods",
              "Grand Sweets",
              "Fruit-O"
            ]}
            intervalMs={1500}
          />
        </div>

        <Brands />
        <div className= "mt-10 font-bold text-lg">
            <h2>Regional Presence in Ethnic Markets</h2>
        </div>
        <div className="mt-0 text-md">
        <TextSlide
        items={[
        "Patel Brothers",
        "Al-Hermain",
        "Al-Aqsa",
        "India Grocers"
        ]}
        intervalMs={1500}
        />
        </div>
        <Stores/>
      </div>
    </section>
  );
}
