// content/homeslider.ts

export type SliderCTA = {
  text: string;
  href: string;
};

export type SliderItem = {
  label: string;
  title: string;
  description: string;
  image: string;
  author?: string;
  designation?: string;
  cta?: SliderCTA; // 👈 important
};

export const sliderData: SliderItem[] = [
  {
    label: "MESSAGE",
    title:
      "IIT Guwahati and Assam Government had envisioned a medical college where Engineers and Doctors will work together toward Medical Innovation.",
    description:
      "Hon'ble Prime Minister has helped us realise Assam's dream.",
    image: "/banners/Banners-1.png",
    author: "Dr. Himanta Biswa Sarma",
    designation: "Hon'ble Chief Minister of Assam",
  },
  {
    label: "DEDICATES TO THE NATION",
    title: "ASSAM ADVANCED HEALTHCARE INNOVATION INNOVATION INSTITUTE (AAHII)",
    description: "14th April 2023",
    image: "/banners/Banners-2.png",
    author: "Narendra Modi",
    designation: "Prime Minister of India",
    // cta is optional 👍
  },
  {
    label: "MESSAGE",
    title:
      "I am happy to note the Assam Advanced Healthcare Innovation Institute being set up in collaboration between the Govt. of Assam and IIT Guwahati will foster innovative healthcare solutions.",
    description:
      "Let us work in harmony following 'Sabka Sath, Sabka Prayas, Sabka Vikas' to achieve Swasth Bharat, Samridh Bharat.",
    image: "/banners/Banners-3.png",
    author: "Narendra Modi",
    designation: "Prime Minister of India",
    cta: {
      text: "Read Full Message",
      href: "/messages/pm",
    },
  },
];
