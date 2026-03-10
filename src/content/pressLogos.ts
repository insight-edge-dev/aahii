// content/pressLogos.ts

export type PressLogo = {
  id: number;
  name: string;
  logo: string;
  link?: string;
};

export const pressLogos: PressLogo[] = [
  {
    id: 1,
    name: "Business Standard",
    logo: "/press/business-standard.png",
    link: "https://www.business-standard.com",
  },
  {
    id: 2,
    name: "The Assam Tribune",
    logo: "/press/assam-tribune.png",
    link: "https://assamtribune.com",
  },
  {
    id: 3,
    name: "EastMojo",
    logo: "/press/eastmojo.png",
    link: "https://www.eastmojo.com",
  },
  {
    id: 4,
    name: "The Indian Express",
    logo: "/press/indian-express.png",
    link: "https://indianexpress.com",
  },
];
