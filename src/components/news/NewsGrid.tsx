"use client";

import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import NewsList from "./NewsList";
import { PressItem } from "@/content/press";

interface Props {
  articles: PressItem[];
}

export default function NewsGrid({ articles }: Props) {
  return (
    <>
      {/* ================= MOBILE (Editorial List) ================= */}
      <div className="md:hidden">
        <NewsList articles={articles} />
      </div>

      {/* ================= DESKTOP / TABLET GRID ================= */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className={
              article.featured ? "md:col-span-2 lg:col-span-2" : ""
            }
          >
            <NewsCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}