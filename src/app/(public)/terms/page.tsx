import type { Metadata } from "next";

import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions | AAHII",
  description:
    "Terms and conditions governing the use of the Assam Advanced Healthcare Innovation Institute (AAHII) website, operated under the Assam Government IIT-G Healthcare Foundation (AGIHF).",
  alternates: {
    canonical: "/terms",
  },
};

const sections: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    paragraphs: [
      "These Terms & Conditions govern your access to and use of this website, operated by the Assam Government IIT-G Healthcare Foundation (AGIHF) on behalf of the Assam Advanced Healthcare Innovation Institute (AAHII). References to “AGIHF,” “AAHII,” “we,” “us,” or “our” refer to the Foundation and the Institute together.",
      "By accessing or using this website, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree with these Terms, please discontinue use of the website.",
    ],
  },
  {
    id: "website-usage",
    title: "Website Usage",
    paragraphs: [
      "This website is provided for general informational purposes, including sharing updates on AAHII's research programs, departments, careers, tenders, news, and institutional activities. You may browse the website, submit enquiries or applications through the forms provided, and download or print publicly available material for personal, non-commercial, or academic reference.",
      "You agree not to use the website in any way that could damage, disable, overburden, or impair it, or interfere with any other party's use and enjoyment of it, including through unauthorised automated access (such as scraping or bots) that is not expressly permitted.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, graphics, logos, images, institutional branding, layout, and underlying software, is the property of AGIHF and AAHII or their licensors, and is protected under applicable Indian and international intellectual property laws, unless otherwise credited.",
      "You may view, print, or download content from this website for personal, educational, or non-commercial reference. You may not reproduce, republish, distribute, modify, or use any content for commercial purposes without prior written permission from AGIHF.",
    ],
  },
  {
    id: "research-content-disclaimer",
    title: "Research Content Disclaimer",
    paragraphs: [
      "Information relating to AAHII's research programs, ongoing studies, publications, and innovation initiatives is shared for general awareness and institutional transparency. Such content reflects work in progress and evolving scientific understanding, and should not be interpreted as a final, peer-reviewed, or conclusive scientific position unless explicitly stated.",
      "Researchers, collaborators, and visitors should independently verify any research information before relying on it for academic citation, funding decisions, or further research, and are encouraged to contact the relevant department for the most current status of any project referenced on this website.",
    ],
  },
  {
    id: "medical-information-disclaimer",
    title: "Medical Information Disclaimer",
    paragraphs: [
      "Any health, clinical, or medical information presented on this website is provided for general educational and institutional purposes only. It is not intended as, and should not be used as, a substitute for professional medical advice, diagnosis, or treatment.",
      "AAHII is an advanced healthcare research and innovation institute and, where it does not operate as a treating clinical facility, does not provide remote diagnosis, treatment recommendations, or medical consultations through this website. Always seek the advice of a qualified physician or healthcare provider with any questions regarding a medical condition, and do not delay seeking care because of something you have read on this website.",
    ],
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    paragraphs: [
      "We take reasonable care to keep the information on this website, including announcements, vacancies, tender notices, and contact details, accurate and up to date. However, information may change without prior notice, and we do not warrant that all content is complete, error-free, or current at every point in time.",
      "Where official notices (such as recruitment or tender documents) are published as downloadable files, the content of the published document shall prevail over any summary presented on the webpage. In case of discrepancy, please refer to the original document or contact the relevant department for clarification.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paragraphs: [
      "This website may link to third-party websites, such as government portals, partner institutions, funding bodies, or news publications, for reference and convenience. These links do not constitute an endorsement, and AGIHF and AAHII have no control over, and accept no responsibility for, the content, accuracy, or privacy practices of any linked third-party website.",
    ],
  },
  {
    id: "user-conduct",
    title: "User Conduct",
    paragraphs: [
      "When using this website, including any forms, comment fields, or submission tools, you agree not to submit content that is unlawful, defamatory, fraudulent, abusive, or that infringes the rights of any third party, and not to attempt to gain unauthorised access to any part of the website, its administrative systems, or related infrastructure.",
      "We reserve the right to remove any submitted content that violates these Terms and to take appropriate action, including reporting unlawful activity to the relevant authorities.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    paragraphs: [
      "This website and its content are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, AGIHF and AAHII, along with their officers, employees, and affiliates, shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising from your access to, use of, or inability to use this website, or from reliance on any information presented on it, including any linked third-party website.",
      "Nothing in these Terms is intended to limit liability that cannot be excluded under applicable Indian law.",
    ],
  },
  {
    id: "copyright",
    title: "Copyright",
    paragraphs: [
      "© AGIHF / AAHII. All rights reserved. AGIHF retains copyright over all original text, graphics, and institutional material published on this website. No part of this website may be reproduced, sold, or distributed for commercial gain, or incorporated into another publication or website, without the prior written consent of AGIHF.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law (India)",
    paragraphs: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of India, including the Information Technology Act, 2000 and rules made thereunder. Any dispute arising out of or in connection with these Terms or the use of this website shall be subject to the exclusive jurisdiction of the courts at Guwahati, Assam.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes To Terms",
    paragraphs: [
      "We may update these Terms & Conditions from time to time to reflect changes in our services, operations, or applicable law. The “Effective date” at the top of this page indicates when these Terms were last revised. Continued use of the website after any update constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    paragraphs: [
      "For any questions regarding these Terms & Conditions, please contact us at:",
    ],
    list: [
      "Assam Government IIT-G Healthcare Foundation (AGIHF) / Assam Advanced Healthcare Innovation Institute (AAHII)",
      "5th Floor, Room No. 505–508, Research Park, IIT Guwahati, Amingaon, Guwahati – 781039, Assam, India",
      "Email: info@agihf.org",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms & Conditions"
      effectiveDate="20 June 2026"
      intro={[
        "These Terms & Conditions govern your use of this website, operated by the Assam Government IIT-G Healthcare Foundation (AGIHF) for the Assam Advanced Healthcare Innovation Institute (AAHII).",
      ]}
      sections={sections}
    />
  );
}
