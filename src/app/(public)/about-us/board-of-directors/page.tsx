import React from "react";
import Image from "next/image";

interface BoardMember {
  name: string;
  role: React.ReactNode;
  image: string;
  alt: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Dr. Siddharth Singh",
    role: (
      <>
        IAS, Commissioner &amp; Secretary – Medical Education &amp; Research Department,
        <br />
        Government of Assam
      </>
    ),
    image: "/about/bod/Dr_Siddharth_Singh.webp",
    alt: "Dr Siddharth Singh",
  },
  {
    name: "Prof. Devendra Jalihal",
    role: "Director – IIT Guwahati",
    image: "/about/bod/Dr_Devendra_Jalihal.webp",
    alt: "Prof Devendra Jalihal",
  },
  {
    name: "Dr. Anup Barman",
    role: (
      <>
        Director of Medical Education,
        <br />
        Government of Assam
      </>
    ),
    image: "/about/bod/Dr_Anup_Kr_Barman.webp",
    alt: "Dr Anup Barman",
  },
  {
    name: "Dr. Parameswar Aiyer",
    role: "Professor, Chemical Engineering Department – IIT Guwahati",
    image: "/about/bod/Dr_PK_Iyer.webp",
    alt: "Dr Parameswar Aiyer",
  },
  {
    name: "Dr. Dipankar Bandyopadhyay",
    role: "Professor, Chemical Engineering Department – IIT Guwahati",
    image: "/about/bod/Dr_Dipankar_Bandyopadhyay.webp",
    alt: "Dr Dipankar Bandyopadhyay",
  },
  {
    name: "Dr. Umesh Phancha",
    role: (
      <>
        Director of Health Services,
        <br />
        Government of Assam
      </>
    ),
    image: "/about/bod/Dr_Umesh_Phancha.webp",
    alt: "Dr Umesh Phancha",
  },
];

const BoardOfDirectorsPage: React.FC = () => {
  return (
    <section className="bg-white py-20">
      {/* ===== Heading ===== */}
      <div className="text-center mb-30">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
          Board of Directors
        </h1>
      </div>

      {/* ===== Board Grid ===== */}
      <div
        className="
          mx-auto max-w-[1320px] px-8
          grid grid-cols-3 gap-x-12 gap-y-[72px]
          max-[1200px]:grid-cols-2
          max-[640px]:grid-cols-1
        "
      >
        {boardMembers.map((member) => (
          <div
            key={member.name}
            className="
              group relative bg-white rounded-[24px]
              pt-[86px] px-[34px] pb-[44px]
              text-center
              shadow-[0_20px_50px_rgba(15,42,109,0.10)]
              transition-all duration-300
              hover:-translate-y-[10px]
              hover:shadow-[0_34px_72px_rgba(15,42,109,0.18)]
              max-[640px]:pt-[92px]
              max-[640px]:px-[28px]
            "
          >
            {/* Avatar */}
            <div
              className="
                absolute left-1/2 -top-[56px] -translate-x-1/2
                w-[112px] h-[112px]
                rounded-full bg-white p-[6px] overflow-hidden
                shadow-[0_22px_42px_rgba(0,0,0,0.28)]
                transition-all duration-300
                group-hover:scale-[1.12]
                group-hover:shadow-[0_26px_55px_rgba(11,92,255,0.35),0_0_0_6px_rgba(11,92,255,0.08)]
                max-[640px]:w-[100px]
                max-[640px]:h-[100px]
                max-[640px]:-top-[52px]
              "
            >
              <Image
                src={member.image}
                alt={member.alt}
                fill
                sizes="(max-width: 640px) 100px, 112px"
                className="rounded-full object-cover"
              />
            </div>

            {/* Name */}
            <div className="text-[18px] font-semibold text-[#0b5cff] mb-2.5">
              {member.name}
            </div>

            {/* Role */}
            <div className="text-[15px] leading-[1.6] text-[#6b7280]">
              {member.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoardOfDirectorsPage;
