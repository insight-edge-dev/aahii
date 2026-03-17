"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:py-12 flex items-center justify-center">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg max-w-6xl w-full grid lg:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-8 md:p-10"
      >
        
        {/* LEFT CONTENT */}
        <div className="space-y-5 md:space-y-6">
          
          <p className="text-[10px] sm:text-xs uppercase text-gray-400 tracking-widest">
            Terms of Usage
          </p>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Legal Disclaimer
          </h1>

          {/* TEXT */}
          <div className="text-gray-600 text-xs sm:text-sm md:text-[15px] leading-relaxed space-y-4 text-justify">
            <p>
              Assam Government-IITG Healthcare Foundation retains copyright on all
              the text, graphics and trademarks displayed on this site. All the text,
              graphics and trademarks displayed on this site are owned by Assam
              Government-IITG Healthcare Foundation and used under licence by its
              affiliates.
            </p>

            <p>
              You may print copies of the information on this site for your personal
              use and store the files on your computer for personal use. You may not
              distribute text or graphics to others without the express written
              consent of Assam Government-IITG Healthcare Foundation and its
              affiliates. Also, you may not, without our permission, copy and
              distribute this information on any other server, or modify or reuse
              text or graphics on this or any another system.
            </p>

            <p>
              No reproduction of any part of the site may be sold or distributed for
              commercial gain, nor shall it be modified or incorporated in any other
              work, publication or site, whether in hard copy or electronic format,
              including postings to any other site. Assam Government-IITG Healthcare
              Foundation reserves all other rights.
            </p>

            <p>
              The information on this site has been included in good faith and is for
              general purposes only. It should not be relied upon for any specific
              purpose and no representation or warranty is given as regards its
              accuracy or completeness.
            </p>

            <p>
              Neither Assam Government-IITG Healthcare Foundation and its affiliates,
              nor their or their affiliates' officers, employees or agents shall be
              liable for any loss, damage or expense arising out of any access to or
              use of this site or any site linked to it, including, without
              limitation, any loss of profit, indirect, incidental or consequential
              loss.
            </p>
          </div>

          {/* SEO LINKS */}
          <div className="pt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
            <p>
              For more information, please review our{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/terms-and-conditions" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>,{" "}
              
               You can also visit our{" "}
              <Link href="/faq" className="text-blue-600 hover:underline">
                FAQ
              </Link>
              .
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center order-first lg:order-last"
        >
          <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-sm aspect-square">
            <Image
              src="/disclaimer.png"
              alt="Healthcare legal illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}