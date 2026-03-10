"use client";
import Image from "next/image";
import { motion, type Variants  } from "framer-motion";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // premium easing
    },
  },
};

export default function ContactPage() {
  return (
    <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="bg-[#ffffff00] ">
  <div className="max-w-7xl mx-auto px-6 py-20">

    {/* ================= HERO ================= */}
    <motion.div
      variants={fadeUp}
      className="text-center max-w-2xl mx-auto mb-16">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Contact us
      </h1>
      <p className="text-gray-600 text-sm leading-relaxed">
        Get in touch and ask us anything. We are here to help and answer any
        question you might have. We look forward to hearing from you 🙂
      </p>
    </motion.div>

    {/* ================= FORM + ILLUSTRATIONS ================= */}
    <motion.div
      variants={fadeUp}
      className="relative grid lg:grid-cols-3 gap-12 items-center">
      {/* Left Illustration */}
      <div className="hidden lg:flex justify-center items-center">
        <Image
          src="/contact/contact.png"
          alt="Contact Illustration"
          width={400}
          height={400}
          className="max-w-[280px] h-auto object-contain"
        />
      </div>

      {/* Form */}
      <div className="lg:col-span-1 bg-transparent">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-md border px-4 py-2 text-sm bg-transparent"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border px-4 py-2 text-sm bg-transparent"
            />
          </div>

          <textarea
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-md border px-4 py-2 text-sm bg-transparent"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-full py-3 text-sm font-medium hover:bg-blue-700 transition"
          >
            Send your message
          </button>

          <p className="text-[11px] text-center text-gray-500">
            By clicking, you agree to our{" "}
            <span className="underline">Terms & Conditions</span>,{" "}
            <span className="underline">Privacy</span> and{" "}
            <span className="underline">Data Protection Policy</span>.
          </p>
        </form>
      </div>

      {/* Right Illustration */}
      <div className="hidden lg:flex justify-center">
        <Image
          src="/contact/contact1.png"
          alt="Contact Illustration 2"
          width={400}
          height={400}
          className="max-w-[280px] h-auto object-contain"
        />
      </div>
    </motion.div>

    {/* ================= LOCATION ================= */}
    <motion.div
      variants={fadeUp}
      className="mt-32">
      <h2 className="text-4xl font-extrabold text-center mb-12">
        Get in touch with AAHII
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 items-start">

        {/* Map */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl overflow-hidden border h-[300px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.338962343904!2d91.7018375!3d26.1962642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5b002291b0b5%3A0xb26dbfa8dfebafeb!2sAssam%20Advanced%20Healthcare%20Innovation%20Institute%20(AAHII)%20Under%20AGIHF!5e0!3m2!1sen!2sin!4v1707050000000"
            className="w-full h-full rounded-2xl border-0"
            loading="lazy"
          />
        </motion.div>

        {/* Address Card */}
        <motion.div
          variants={fadeUp}
          className="bg-[#f3ede4] rounded-2xl p-8 space-y-6 shadow-sm"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Corporate Office
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              5th Floor, Room No. 505–508 <br />
              Research Park, IIT Guwahati <br />
              Amingaon, Guwahati – 781039
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Working Hours
            </p>
            <p className="text-sm text-gray-800">
              Mon to Fri: 9:30am – 5:30pm
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Email Address
            </p>
            <a
              href="mailto:info@agihf.org"
              className="text-sm text-blue-600 hover:underline transition"
            >
              info@agihf.org
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</motion.section>

  );
}
