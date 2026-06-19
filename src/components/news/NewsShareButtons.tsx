"use client";

import { Check, Copy, Facebook, Linkedin, MessageCircle, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NewsShareButtonsProps = {
  title: string;
  description?: string | null;
};

export default function NewsShareButtons({
  title,
  description,
}: NewsShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setUrl(window.location.href);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(description || title);

    return [
      {
        label: "Facebook",
        icon: Facebook,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        label: "LinkedIn",
        icon: Linkedin,
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        label: "X",
        icon: Send,
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      },
      {
        label: "WhatsApp",
        icon: MessageCircle,
        href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      },
      {
        label: "Telegram",
        icon: Send,
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      },
    ];
  }, [description, title, url]);

  async function copyLink() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const content = (
    <>
      {links.map((item) => (
        <a
          aria-label={`Share on ${item.label}`}
          className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          href={item.href}
          key={item.label}
          rel="noopener noreferrer"
          target="_blank"
        >
          <item.icon aria-hidden="true" size={18} />
        </a>
      ))}
      <button
        aria-label="Copy article link"
        className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        onClick={copyLink}
        type="button"
      >
        {copied ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
      </button>
    </>
  );

  return (
    <>
      <aside className="fixed left-6 top-1/3 z-30 hidden flex-col gap-3 lg:flex">
        {content}
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2">
          {content}
        </div>
      </div>
    </>
  );
}
