import { notFound } from "next/navigation";

import AnnouncementForm from "@/lib/features/admin/announcements/components/AnnouncementForm";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    announcementId: string;
  }>;
};

export default async function EditAnnouncementPage({ params }: PageProps) {
  const { announcementId } = await params;
  const announcement = await prisma.announcement.findUnique({
    where: { id: announcementId },
  });

  if (!announcement) {
    notFound();
  }

  return (
    <div className="p-6">
      <AnnouncementForm
        editData={{
          ...announcement,
          publishedAt: announcement.publishedAt.toISOString(),
          createdAt: announcement.createdAt.toISOString(),
          updatedAt: announcement.updatedAt.toISOString(),
        }}
      />
    </div>
  );
}
