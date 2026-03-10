export type EventCategory =
  | "medical-workshops"
  | "research-conferences"
  | "official-visits";

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  category: EventCategory;

  // for cards / listing
  coverImage: string;

  // for gallery page
  images: string[];
}

export const eventsData: EventItem[] = [

    {
    id: 2,
    title: "Unveiling of Indigenous Low-Field MRI and Surgical Robot Prototypes in the Presence of the Hon’ble Chief Minister of Assam",
    slug: "unveiling-indigenous-low-field-mri-surgical-robot-prototypes",
    category: "research-conferences",
    coverImage:"https://res.cloudinary.com/ddi8hisku/image/upload/v1773136844/image_vnq8ui.jpg",
      
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136937/1-3-scaled_z7tvc5.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137142/1-14-scaled_jivrqk.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137149/1-4-scaled_vvckvw.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137128/cm_yvf0lj.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137158/DSC01275.JPG-scaled_oc0njh.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137170/1-11-scaled_wbrtp6.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137182/1-5-scaled_tc1a7l.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137192/1-9-scaled_nowz7p.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137202/1-10-scaled_ps5ts5.jpg",
    ],
  },

  {
    id: 3,
    title: "Delegates from Kagawa University, Japan, 27th Jan 2026",
    slug: "delegates-kagawa-university-japan",
    category: "research-conferences",
    coverImage:"https://res.cloudinary.com/ddi8hisku/image/upload/v1773135856/image_fhkog7.jpg",
      
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136489/image_eeudv8.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136504/image_yeifvy.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136771/image_a6cgxd.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136540/image_vywuaq.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136551/image_vpozyj.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136563/image_cybkh6.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136576/image_iqpcqc.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136587/image_db5z0m.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136599/image_qnkrqv.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773136608/image_xr0vza.jpg",
    ],
  },

  {
    id: 4,
    title: "Training on Improvement of quality components in the NICU and all medical college hospitals in Assam, 9th Jan 2026",
    slug: "training-nicu-quality-components-assam",
    category: "official-visits",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131908/image_kyuoic.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131920/image_zndcou.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131926/image_idzsjs.jpg",
    ],
  },

  {
    id: 5,
    title: "Director review visit at AAHII, 5th Jan 2026",
    slug: "director-review-visit-aahii",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131800/image_mxdsoj.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131819/image_d4p9rr.jpg",
    ],
  },

  {
    id: 6,
    title: "ICC Healthtech & Well-Being Conclave, 19th Dec 2025​",
    slug: "icc-healthtech-well-being-conclave",
    category: "research-conferences",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131747/image_o9ttxs.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131762/image_gtuara.jpg",
    ],
  },

  {
    id: 7,
    title: "ICANN Dec 12th-14th, 2025",
    slug: "icann-dec-2025",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131429/image_lgox0g.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131454/image_bgh78f.png",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131465/image_mqbavv.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131472/image_zqz6a8.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131481/image_nvrp7c.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131484/image_zo8ki9.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131497/image_fgeosi.jpg",
    ],
  },
  {
    id: 8,
    title: "Synapse, 14th-15th Nov 2025",
    slug: "synapse-nov-2025",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131161/image_ndik4s.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131177/image_isn4u7.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131185/image_wkyc5y.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131356/image_s7dndj.jpg",
    ],
  },
  {
    id: 9,
    title: "TAG Meeting, AHIDMS 29th–30th May 2025",
    slug: "tag-meeting-ahidms-may-2025",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131030/image_unk03z.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131048/image_btqlj1.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773131060/image_io4sr0.jpg",
    ],
  },
{
    id: 10,
    title: "Healthcare Leadership Meet Eastern Region 2025",
    slug: "healthcare-leadership-meet-eastern-region-2025",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130981/image_eko3pj.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130981/image_eko3pj.jpg",
    ],
  },
    {
    id: 11,
    title: "AGIHF Welcomes Dr. Siddharth Singh, 21st May 2025",
    slug: "agihf-welcomes-dr-siddharth-singh-may-2025",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130609/image_hbycu2.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130627/image_vxkonw.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130633/image_ntfjq8.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130641/image_vgscqp.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130809/image_bybf8w.jpg",
    ],
  },
 {
    id: 12,
    title: "PAN IIT, 21st Jan 2025",
    slug: "pan-iit-jan-2025",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130382/image_fypfhz.jpg ",         
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130402/image_rqfnwe.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130409/image_y37uxg.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130416/image_qhz8fh.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130423/image_sulc8t.jpg",
    ],
  },
   {
    id: 13,
    title: "Indian International Science Festival (IISF), 30th Nov - 3rd Dec 2024",
    slug: "iisf-nov-dec-2024",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130137/image_urowqv.jpg",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130229/image_urb7ug.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130256/image_orwueb.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130238/image_v5vods.jpg",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773130245/image_yqlost.jpg",
    ],
  },
   {
    id: 14,
    title: "Symposium, 8th November 2024",
    slug: "symposium-nov-2024",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129809/Symposium_2_kbht1e.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129811/Symposium_1_sntim4.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129809/Symposium_2_kbht1e.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129806/Symposium_3-scaled_e4yeop.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129813/Symposium_4_ivqzrx.webp",
    ],
  },
     {
    id: 15,
    title: "MOA signing, 4th November 2024",
    slug: "moa-signing-nov-2024",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129584/MOA_4_witzqv.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129582/MOA_1_cxmdw4.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129581/MOA_2_yiyrry.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129580/MOA_3_quqlzd.webp",
    ],
  },
       {
    id: 16,
    title: "Frontiers in Nano Sciences, FINS, 1st-2nd November,2024",
    slug: "frontiers-nano-sciences-nov-2024",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129473/FINS_2_tqqpyi.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129472/FINS_1_m5qvpl.webp",
    ],
  },
       {
    id: 17,
    title: "New Office Opening Ceremony at Research Park, 30th October 2024",
    slug: "new-office-opening-research-park-oct-2024",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129339/RESERACH_PARK_1_dzpchh.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129340/RESERACH_PARK_2_wqdwim.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129343/RESERACH_PARK_3_xso5ou.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129344/RESERACH_PARK_4_k4ru9q.webp",
    ],
  },
         {
    id: 18,
    title: "ICANN, Our 2nd Doctor’s Conclave 29th November - 1st December, 2023 ",
    slug: "icann-doctors-conclave-nov-dec-2023",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129206/Doctors_Conclave_new_1_mn2q2u.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129206/Doctors_Conclave_new_2_mrzdcl.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129207/Doctors_Conclave_new_3_romz8a.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773129208/Doctors_Conclave_new_4_xo4tiq.webp",
    ],
  },
    {
    id: 19,
    title: "Our 1st Doctor’s Conclave ",
    slug: "our-1st-doctors-conclave",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128692/Doctors_Conclave_old_2_nw77yz.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128692/Doctors_Conclave_old_2_nw77yz.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128692/Doctors_Conclave_old_3_b5mntt.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128694/Doctors_Conclave_old_4_xojull.webp",
    ],
  },
  {
    id: 20,
    title: "Foundation Stone, 14th April, 2023",
    slug: "foundation-stone-april-2023",
    category: "medical-workshops",
    coverImage:
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128471/Foundation_3_w8zzm5.webp",
    images: [
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128471/Foundation_1_iqibfx.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128471/Foundation_3_w8zzm5.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128471/Foundation_5_o86u8f.webp",
      "https://res.cloudinary.com/ddi8hisku/image/upload/v1773128471/Foundation_4_qqkpwa.webp",
    ],
  },
];
