function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900"
          href={link[2]}
          key={index}
          rel="noopener noreferrer"
          target={link[2].startsWith("http") ? "_blank" : undefined}
        >
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

export default function NewsContentRenderer({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="prose prose-slate max-w-none prose-headings:text-[#0f2a6d] prose-a:text-blue-700 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/70 prose-blockquote:px-5 prose-blockquote:py-3">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 className="mt-8 text-2xl font-semibold" key={index}>
              {parseInline(block.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 className="mt-10 text-3xl font-semibold" key={index}>
              {parseInline(block.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote className="rounded-r-lg text-lg font-medium" key={index}>
              {parseInline(block.replace(/^>\s+/, ""))}
            </blockquote>
          );
        }

        const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (image) {
          return (
            <figure className="my-10" key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={image[1] || "News article image"}
                className="aspect-[16/9] w-full rounded-lg bg-slate-100 object-cover"
                src={image[2]}
              />
              {image[1] ? (
                <figcaption className="mt-3 text-center text-sm text-slate-500">
                  {image[1]}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (/^[-*]\s+/m.test(block)) {
          return (
            <ul className="my-6 list-disc space-y-2 pl-6" key={index}>
              {block.split("\n").map((item) => (
                <li key={item}>{parseInline(item.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s+/m.test(block)) {
          return (
            <ol className="my-6 list-decimal space-y-2 pl-6" key={index}>
              {block.split("\n").map((item) => (
                <li key={item}>{parseInline(item.replace(/^\d+\.\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p className="text-lg leading-8 text-slate-700" key={index}>
            {parseInline(block)}
          </p>
        );
      })}
    </div>
  );
}
