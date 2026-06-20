import type { Metadata } from "next";

import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | AAHII",
  description:
    "How the Assam Advanced Healthcare Innovation Institute (AAHII), under the Assam Government IIT-G Healthcare Foundation (AGIHF), collects, uses, and protects information on this website.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "The Assam Advanced Healthcare Innovation Institute (AAHII) is an institute established under the Assam Government IIT-G Healthcare Foundation (AGIHF), a collaborative initiative of the Government of Assam and the Indian Institute of Technology Guwahati. References to “AGIHF,” “AAHII,” “we,” “us,” or “our” in this Privacy Policy refer to the Foundation and the Institute together, as operators of this website.",
      "This Privacy Policy explains what information we collect when you visit or use this website, why we collect it, how it is used and safeguarded, and the choices available to you. It applies to this website and any forms, subscriptions, or services offered through it. It does not apply to clinical or patient records, which, where applicable, are governed by separate institutional and regulatory protocols.",
      "By using this website, you agree to the practices described in this Policy. If you do not agree with any part of this Policy, we recommend that you discontinue use of the website.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "We collect information in two ways: information you provide to us directly, and information collected automatically as you browse the website.",
    ],
    list: [
      "Information you provide: your name, email address, phone number, organisation, and any message content when you fill in a contact, enquiry, careers, tender, or vendor registration form, or subscribe to updates.",
      "Information collected automatically: technical details such as IP address, browser type, device type, pages visited, referring URL, and timestamps, collected through standard server logs and analytics tools.",
      "Information you choose to upload, such as a CV, proposal document, or supporting file, where a form on the website permits attachments.",
    ],
  },
  {
    id: "contact-forms",
    title: "Contact Forms",
    paragraphs: [
      "Contact, enquiry, careers, vendor registration, and similar forms on this website ask for the minimum information required to respond to your request, such as your name, email address, phone number, and message.",
      "Information submitted through these forms is used solely to respond to your enquiry, process your application or registration, or route it to the relevant department within AGIHF or AAHII. We do not sell or rent this information, and we do not use it for unrelated marketing purposes without your consent.",
    ],
  },
  {
    id: "newsletter-subscriptions",
    title: "Newsletter Subscriptions",
    paragraphs: [
      "Where this website offers a newsletter, announcement, or update subscription, we collect your email address (and, where requested, your name) solely to send you institutional news, research updates, and announcements from AGIHF and AAHII.",
      "Subscription is voluntary. Every newsletter communication includes a way to unsubscribe, or you may write to us at the contact address below to be removed from our mailing list at any time. We do not share subscriber lists with third parties for their own marketing purposes.",
    ],
  },
  {
    id: "cookies-analytics",
    title: "Cookies & Analytics",
    paragraphs: [
      "Cookies are small text files stored on your device by your browser. This website uses a limited number of cookies in two categories:",
    ],
    list: [
      "Strictly necessary cookies, such as a secure session cookie used to keep an authenticated administrator signed in. These are essential for the relevant section of the website to function and cannot be disabled.",
      "Analytics cookies, used to understand how visitors use the website (for example, which pages are most viewed) so that we can improve content and navigation. These are non-essential and are described further below.",
    ],
  },
  {
    id: "google-analytics-usage",
    title: "Google Analytics Usage",
    paragraphs: [
      "Where enabled, this website uses Google Analytics, a web analytics service provided by Google, to understand aggregate visitor behaviour such as page views, session duration, and traffic sources. Google Analytics may set its own cookies and collect information such as approximate location (derived from IP address), device and browser type, and pages visited.",
      "Data collected through Google Analytics is reported to us in aggregated, statistical form and is not used by AGIHF or AAHII to identify individual visitors. Google's use of this data is governed by Google's own privacy policy. You can opt out of Google Analytics tracking using your browser's cookie settings or a recognised opt-out browser extension.",
    ],
  },
  {
    id: "website-security",
    title: "Website Security",
    paragraphs: [
      "We apply reasonable administrative, technical, and physical safeguards to protect information collected through this website against unauthorised access, alteration, disclosure, or destruction. These include access controls on administrative systems, encrypted transmission (HTTPS) of data submitted through forms, and restricted internal access to submitted information on a need-to-know basis.",
      "No method of transmission over the internet or electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security, and we encourage you to avoid sharing sensitive personal information through unsecured channels.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    paragraphs: [
      "This website may use third-party service providers to support its operation, such as cloud hosting, email delivery, embedded maps, and analytics tools. These providers process information strictly to perform the service requested (for example, displaying a map or sending a confirmation email) and are expected to handle any information in accordance with their own privacy policies and applicable law.",
      "We do not authorise these providers to use information collected through this website for their own independent purposes.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as is necessary to fulfil the purpose for which it was collected, such as responding to an enquiry, processing an application, or maintaining a subscription, and thereafter for any additional period required to meet legal, audit, or institutional record-keeping obligations.",
      "Information that is no longer required is securely deleted or anonymised in accordance with our internal data-handling practices.",
    ],
  },
  {
    id: "user-rights",
    title: "User Rights",
    paragraphs: [
      "Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may have the right to request access to, correction of, or deletion of personal information you have provided to us, to withdraw consent for processing (such as a newsletter subscription), and to raise a grievance regarding how your information has been handled.",
      "To exercise any of these rights, please contact us using the details provided in the Contact Information section below. We will respond to verified requests within a reasonable timeframe.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      "This website is intended for general institutional, research, recruitment, and public communication purposes and is not directed at children. We do not knowingly collect personal information from children without appropriate parental or guardian consent. If we become aware that we have inadvertently collected such information without the necessary consent, we will take steps to delete it promptly.",
    ],
  },
  {
    id: "external-links",
    title: "External Links",
    paragraphs: [
      "This website may contain links to third-party websites, including partner institutions, government portals, funding agencies, and news sources. These linked websites operate independently of AGIHF and AAHII and maintain their own privacy policies. We are not responsible for the content or privacy practices of any external website and encourage you to review their policies before sharing information with them.",
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes To This Policy",
    paragraphs: [
      "We may revise this Privacy Policy from time to time to reflect changes in our practices, the services offered on this website, or applicable law. The “Effective date” at the top of this page indicates when the Policy was last updated. We encourage you to review this page periodically. Continued use of the website after changes are posted constitutes acceptance of the revised Policy.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    paragraphs: [
      "If you have questions, concerns, or requests relating to this Privacy Policy or the handling of your information, please contact us at:",
    ],
    list: [
      "Assam Government IIT-G Healthcare Foundation (AGIHF) / Assam Advanced Healthcare Innovation Institute (AAHII)",
      "5th Floor, Room No. 505–508, Research Park, IIT Guwahati, Amingaon, Guwahati – 781039, Assam, India",
      "Email: info@agihf.org",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="20 June 2026"
      intro={[
        "This Privacy Policy describes how the Assam Government IIT-G Healthcare Foundation (AGIHF) and the Assam Advanced Healthcare Innovation Institute (AAHII) collect, use, and protect information when you visit this website.",
      ]}
      sections={sections}
    />
  );
}
