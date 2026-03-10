export interface VideoItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // <-- You will insert link here
  date: string;
}

export const videos: VideoItem[] = [
     {
    id: 1,
    title: "PIB at AAHII & IIT-G: Showcasing Innovations",
    description: "Demonstration of prototypes at AAHII Lab.",
    thumbnail: "/videos/2.png",
    videoUrl: "https://res.cloudinary.com/ddi8hisku/video/upload/v1773137464/As-part-of-their-ongoing-press-tour-to-Assam-a-delegation-of-journalists-from-Arunachal-Pradesh_zp0qgf.mp4",
    date: "Feb 19th 2026",
  }, 
  {
    id: 2,
    title: "AAHII: Showcasing Innovations",
    description: "Unveiling of prototypes at GMCH, Guwahati.",
    thumbnail: "/videos/3.png",
    videoUrl: "https://res.cloudinary.com/ddi8hisku/video/upload/v1773137443/In-a-major-boost-to-Assams-healthcare-and-innovation-sector-the-Assam-Government-in-collaborat_gz2zxz.mp4",
    date: "Feb 1st 2026",
  },
  {
    id: 3,
    title: "Unveiling of proof of concept by Hon.Chief Minister of Assam Shri. Himanta Biswa Sarma",
    description: "Highlights from the official launch event of AAHII.",
    thumbnail: "/videos/1.png",
    videoUrl: "https://res.cloudinary.com/ddi8hisku/video/upload/v1773137428/aahi-news-vid_tiwkq5.mov", 
    date: "Feb 1st 2026",
  },
];
