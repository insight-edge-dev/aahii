function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-900 hover:decoration-blue-700"
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
    <div className="space-y-7 text-slate-700">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 className="pt-4 text-2xl font-semibold leading-snug text-[#0f2a6d]" key={index}>
              {parseInline(block.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 className="pt-6 text-3xl font-semibold leading-tight text-[#0f2a6d]" key={index}>
              {parseInline(block.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              className="border-l-4 border-blue-700 bg-slate-50 py-4 pl-5 pr-6 text-xl font-medium leading-9 text-slate-800"
              key={index}
            >
              {parseInline(block.replace(/^>\s+/, ""))}
            </blockquote>
          );
        }

        const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (image) {
          return (
            <figure className="py-4" key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={image[1] || "News article image"}
                className="aspect-[16/9] w-full rounded-md bg-slate-100 object-cover"
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
            <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-slate-700" key={index}>
              {block.split("\n").map((item) => (
                <li key={item}>{parseInline(item.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s+/m.test(block)) {
          return (
            <ol className="list-decimal space-y-3 pl-6 text-lg leading-8 text-slate-700" key={index}>
              {block.split("\n").map((item) => (
                <li key={item}>{parseInline(item.replace(/^\d+\.\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p className="text-lg leading-9 text-slate-700" key={index}>
            {parseInline(block)}
          </p>
        );
      })}
    </div>
  );
}
