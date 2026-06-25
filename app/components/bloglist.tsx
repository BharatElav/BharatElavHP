'use client'

import { Post } from '@/lib/parseBlog'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BlogList({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags ?? [])))
  const pinned = posts.filter(p => p.pinned)
  const regular = posts.filter(p => !p.pinned && (activeTag === null || p.tags?.includes(activeTag)))

  return (
    <div className="flex flex-col">

      {/* Tag filter row */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-3 border-b border-black/10 mb-6 text-sm text-gray-400">
          <button
            onClick={() => setActiveTag(null)}
            className={`transition-colors hover:text-black ${activeTag === null ? 'text-black font-medium' : ''}`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="text-black/20">•</span>
              <button
                onClick={() => setActiveTag(tag)}
                className={`transition-colors hover:text-black ${activeTag === tag ? 'text-black font-medium' : ''}`}
              >
                #{tag}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Pinned / featured posts */}
      {pinned.length > 0 && (
        <>
          <div className={`grid gap-4 mb-6 ${pinned.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {pinned.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <motion.div
                  className="border border-black/10 rounded-xl p-6 cursor-pointer h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl lowercase">{post.title}</h3>
                    <span className="text-xs text-gray-400 ml-2 border border-gray-200 px-1.5 py-0.5 rounded">pinned</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{post.description}</p>
                  <p className="text-xs text-gray-400">
                    {post.readtime} min read &nbsp;·&nbsp; {new Date(post.date).getFullYear()}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
          <hr className="border-black/10 mb-6" />
        </>
      )}

      {/* Regular post list */}
      <ul className="flex flex-col">
        {regular.map((post) => (
          <li key={post.slug} className="border-b border-black/10">
            <Link href={`/blog/${post.slug}`}>
              <motion.div
                className="flex gap-6 py-6 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{post.description}</p>
                  <p className="text-sm text-gray-400">
                    {post.readtime} min read &nbsp;·&nbsp;
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 flex flex-wrap gap-2">
                    <span>{new Date(post.date).getFullYear()}</span>
                    {post.tags?.map(tag => (
                      <button
                        key={tag}
                        onClick={(e) => { e.preventDefault(); setActiveTag(tag) }}
                        className="hover:text-black transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </p>
                </div>
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-32 h-24 object-cover rounded-lg shrink-0 self-start"
                  />
                )}
              </motion.div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}