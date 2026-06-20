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
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          href={item.href}
          key={item.label}
          rel="noopener noreferrer"
          target="_blank"
        >
          <item.icon aria-hidden="true" size={18} />
          <span>{item.label}</span>
        </a>
      ))}
      <button
        aria-label="Copy article link"
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        onClick={copyLink}
        type="button"
      >
        {copied ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
        <span>{copied ? "Copied" : "Copy Link"}</span>
      </button>
    </>
  );

  return (
    <div
      aria-label="Share this article"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {content}
    </div>
  );
}
