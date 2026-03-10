"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is AAHII a government hospital?",
    answer:
      "AAHII is not a conventional government hospital. It is an advanced healthcare innovation and research institute established through a collaboration between the Government of Assam and IIT Guwahati.",
  },
  {
    question: "Who can submit research project proposals to AAHII?",
    answer:
      "Yes. AAHII encourages interdisciplinary research and welcomes proposals from researchers across scientific, engineering, and healthcare domains. Collaborations from academia, industry, and independent researchers are evaluated based on scientific merit, feasibility, and alignment with AAHII’s research priorities.",
  },
  {
    question: "When will AAHII begin recruitment for scientific and research positions?",
    answer:
      "Recruitment will be conducted in phases as AAHII expands its infrastructure and research programs. All vacancies will be officially announced on the website and through recognized recruitment channels. Interested candidates are encouraged to regularly check for updates.",
  },
  {
    question: "How is AAHII currently managing its research and development (R&D) activities without an operational hospital?",
    answer:
      "AAHII conducts R&D activities through collaborations with partner institutions, hospitals, and research laboratories. The institute focuses on innovation, preclinical research, data-driven healthcare solutions, and translational projects while building the infrastructure required for integrated clinical research in the future.",
  },
  {
    question: "When will the postgraduate (PG) programs at AAHII commence?",
    answer:
      "AAHII is in the process of developing its academic and training framework. The timeline for launching postgraduate programs will be announced after completion of the necessary infrastructure development and subject to regulatory clearances. Updates will be shared on the official website.",
  },
  {
    question: "How can an individual or organizations contribute to or collaborate with AAHII?",
    answer:
      "AAHII welcomes collaborations in research, technology development, training programs, and healthcare innovation. Individual and organizations may contribute through partnerships, joint projects, funding support, or knowledge exchange initiatives. Interested parties may contact AAHII through the official email address on the website.",
  },
  {
    question: "Is AAHII registered to receive Corporate Social Responsibility (CSR) funding?",
    answer:
      "Yes. AAHII/AGIHF is registered as an implementing agency for accepting CSR funds from corporates and other entities. It has been registered with the Ministry of Corporate Affairs, bearing registration no: CSR000100622. Further companies are requested to facilitate partnerships and funding support, including CSR contributions, in accordance with applicable regulations.",
  },
  {
    question: "Does AAHII accept foreign donations or international funding?",
    answer:
      "AAHII is open to international collaborations and funding opportunities, subject to compliance with applicable regulatory guidelines governing foreign contributions. All such engagements are processed transparently and in accordance with national regulations. At present, AAHII is not registered under FEMA Act.",
  },
  {
    question: "Is AAHII interested in nurturing startups?",
    answer:
      "Yes. AAHII actively supports innovation and entrepreneurship in healthcare and biomedical sciences. The institute is committed to nurturing startups through mentorship, collaborative research opportunities, incubation support, and access to innovation networks.",},
  
    ];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SECTION */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Expert Guidance <br />
            <span className="text-blue-600">At Your Service.</span>
          </h1>

          <p className="text-gray-600 mb-8 max-w-md">
            Our team of world-class medical professionals is here to provide
            clarity and support for all your healthcare journey needs.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
            <Image
              src="/images/faq.png"
              alt="Doctor"
              width={500}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <p className="text-sm text-blue-600 font-semibold mb-2">
            RESOURCE CENTER
          </p>

          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mb-8">
            Quick answers to common inquiries about our recruitment,
            patient care, and clinical operations.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = active === index;

              return (
                <div
                  key={index}
                  className={`rounded-xl transition-all duration-300 ${
                    isOpen
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <button
                    onClick={() =>
                      setActive(isOpen ? null : index)
                    }
                    className="w-full flex justify-between items-center px-6 py-5 text-left"
                  >
                    <span className="font-medium">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-sm opacity-90">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SUPPORT BOX */}
          <div className="mt-10 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">
                Still have questions?
              </h3>
              <p className="text-sm opacity-80">
                Our support team is ready to help you find what you need.
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-400 transition px-5 py-2 rounded-lg font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}