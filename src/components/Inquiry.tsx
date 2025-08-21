export default function InquirySimple() {
  return (
    <section id="contact" className="relative py-12 overflow-hidden">
      <div
        className="absolute inset-0 z-[1] bg-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/texture-bg.jpg')", backgroundSize: "300px" }}
      />

      <div className="relative z-[2] mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-8">
          Send us a message — we’ll reply as soon as possible.
        </p>

        <form
          action="https://formspree.io/f/xrbljpbj"
          method="POST"
          className="rounded-2xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur px-5 py-6 sm:px-8 sm:py-8"
        >
          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500" />

          {/* honeypot */}
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              name="phone"
              inputMode="tel"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="(248) 555-1234"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Message *</label>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="How can we help?"
            />
          </div>

          <input type="hidden" name="_replyto" value="" />
          <input type="hidden" name="_redirect" value="/thank-you" />

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-gray-500">* Required fields</p>
            <button
              className="rounded-xl bg-[#002366] px-5 py-2.5 text-white shadow hover:bg-[#1a3d8f] active:scale-[0.99] transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
