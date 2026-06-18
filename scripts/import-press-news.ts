import { PrismaClient, NewsType } from "@prisma/client";

import { pressData } from "../src/content/press";

const prisma = new PrismaClient();

function slugify(title: string, fallbackId: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `press-${fallbackId}`;
}

function parsePublishedAt(value: string) {
  const parsed = new Date(value);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return new Date();
}

async function main() {
  let imported = 0;
  let skipped = 0;

  for (const item of pressData) {
    const slug = slugify(item.title, item.id);

    const existing = await prisma.news.findFirst({
      where: {
        OR: [
          { slug },
          { title: item.title.trim() },
        ],
      },
      select: { id: true },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    await prisma.news.create({
      data: {
        slug,
        source: item.source,
        title: item.title.trim(),
        excerpt: item.excerpt,
        link: item.link && item.link !== "#" ? item.link : null,
        coverImage: item.image,
        publishedAt: parsePublishedAt(item.publishedAt),
        featured: item.featured ?? false,
        type: NewsType.PRESS,
        isActive: true,
      },
    });

    imported += 1;
  }

  const total = await prisma.news.count();

  console.log(
    JSON.stringify(
      {
        imported,
        skipped,
        total,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
