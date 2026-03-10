import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

/* =======================
   DATA
======================= */
const coreTeamMembers: TeamMember[] = [
  {
    name: "Dr. Sajal Sen",
    role: "Chief Operating Officer",
    image: "/about/management-team/Dr_Sajal_Sen.webp",
    linkedin: "https://www.linkedin.com/in/dr-sajal-sen-a5000a22/",
  },
  {
    name: "Rajendra Bokil",
    role: "Chief Financial Officer",
    image: "/about/management-team/bbb.jpeg",
    linkedin: "https://www.linkedin.com/in/rajendra-bokil-2142038/",
  },
  {
    name: "Saurabhjit Uzir",
    role: "Head – Procurement",
    image: "/about/management-team/Saurabhjit_Uzir.webp",
    linkedin: "https://www.linkedin.com/in/saurabhjit-uzir-4b3b6587/",
  },
  {
    name: "Pankhi Krishnatriya",
    role: "Head – HR & Admin",
    image: "/about/management-team/Pankhi_Krishnatriya.webp",
    linkedin: "https://www.linkedin.com/in/pankhi-krishnatriya-5b4042251/",
  },
  {
    name: "Atish Roy",
    role: "Company Secretary",
    image: "/about/management-team/atishroy.jpeg",
    linkedin: "https://www.linkedin.com/in/atish-roy-a94ab21aa/",
  },
  {
    name: "Raktim Jyoti Bora",
    role: "Project Engineer",
    image: "/about/management-team/Raktim_Jyoti_Bora.webp",
    linkedin: "https://www.linkedin.com/in/raktim-jyoti-bora-mep/",
  },
  {
    name: "Dr. Chohelee Choudhury",
    role: "RA, R&D",
    image: "/about/management-team/efef.png",
    linkedin: "https://www.linkedin.com/in/chohelee-choudhury/",
  },
  {
    name: "Shahil Kumar Gangwal",
    role: "Senior Executive Accountant",
    image: "/about/management-team/sahil1111.jpeg",
    linkedin: "#",
  },
];

const consultants: TeamMember[] = [
  {
    name: "Amarendra Goswami",
    role: "Consultant",
    image: "/about/management-team/Amarendra_Goswami.webp",
    linkedin: "#",
  },
  {
    name: "Torgam Jagat Singh",
    role: "Consultant",
    image: "/about/management-team/Tongbram_Jagat_Singh.webp",
    linkedin: "#",
  },
];

/* =======================
   PAGE
======================= */
export default function BoardOfDirectorsPage() {
  return (
    <section className="bg-white py-20 sm:py-24">
      {/* Main heading */}
      <header className="text-center mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a]">
          Management Team
        </h1>
      </header>

      {/* Core team */}
      <Section title="Core Team Members">
        <Grid>
          {coreTeamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </Grid>
      </Section>

      {/* Consultants */}
      <Section title="Consultants" className="mt-24">
        <Grid>
          {consultants.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </Grid>
      </Section>
    </section>
  );
}

/* =======================
   HELPERS
======================= */
function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-6 ${className}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-20">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
      {children}
    </div>
  );
}

/* =======================
   CARD
======================= */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="
        group relative bg-white rounded-[24px]
        pt-[86px] px-[34px] pb-[44px]
        shadow-[0_20px_50px_rgba(15,42,109,0.10)]
        transition-all duration-300
        hover:-translate-y-[10px]
        hover:shadow-[0_34px_72px_rgba(15,42,109,0.18)]
      "
    >
      {/* Avatar */}
      <div
        className="
          absolute left-1/2 -top-[56px] -translate-x-1/2
          sm:left-6 sm:translate-x-0

          w-[112px] h-[112px]
          rounded-full bg-white p-[6px] overflow-hidden

          shadow-[0_22px_42px_rgba(0,0,0,0.28)]
          transition-all duration-300

          group-hover:scale-[1.12]
          group-hover:shadow-[0_26px_55px_rgba(11,92,255,0.35),0_0_0_6px_rgba(11,92,255,0.08)]
        "
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          unoptimized
          className="rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-center sm:text-left">
        <h3 className="text-[18px] font-semibold text-[#0b5cff] mb-2.5">
          {member.name}
        </h3>

        <p className="text-[15px] leading-[1.6] text-[#6b7280] mb-6">
          {member.role}
        </p>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} LinkedIn`}
          className="
            inline-flex items-center text-[#0a66c2]
            transition-colors duration-200
            hover:text-[#0047ff]
          "
        >
          <Linkedin size={18} />
        </a>
      </div>
    </article>
  );
}
