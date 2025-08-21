import Image from "next/image";
import { FiMail, FiPrinter, FiMapPin, FiClock, FiArrowUpRight } from "react-icons/fi";
import logo from "@/assets/moghul-foods-logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-[#c5a34f] text-white">
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[url('/noisy.jpeg')] bg-no-repeat bg-cover bg-center opacity-40 mix-blend-soft-light pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Moghul Foods logo"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <span className="text-xl font-semibold font-[cursive]">Moghul Foods</span>
            </div>

            <p className="mt-4 text-sm text-white/80 leading-relaxed max-w-md">
              For any inquiries or questions, use the contact form, email directly, or call during working hours.
              For product availability & wholesale pricing, please call our office directly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <div className="flex items-start gap-3">
              <FiMail className="mt-1 shrink-0" />
              <a href="mailto:azam@moghulfoods.com" className="hover:underline">
                azam@moghulfoods.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FiPrinter className="mt-1 shrink-0" />
              <a href="fax:2485881214" className="hover:underline">
                Fax: 248-588-1214
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0" />
              <address className="not-italic">
                32007–32011 Stephenson Hwy<br />
                Madison Heights, MI 48071, USA
              </address>
            </div>
            <a
              href="https://maps.google.com/?q=32007+Stephenson+Hwy+Madison+Heights+MI+48071"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-yellow-300 hover:text-yellow-200 mt-2"
            >
              View on Maps <FiArrowUpRight />
            </a>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
            <div className="flex items-start gap-3">
              <FiClock className="mt-1 shrink-0" />
              <ul className="space-y-1 text-sm">
                <li>Mon–Fri: 10:00 AM – 6:00 PM</li>
                <li>Saturday: 10:00 AM – 3:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-10 border-t border-white/15 pt-4 text-center text-sm text-white/70">
          © 2025 Moghul Foods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
