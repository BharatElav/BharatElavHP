'use client'

import { Project } from '@/lib/parseProjects'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        className="border border-black/10 rounded-xl overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
      >
        <div className="aspect-video bg-gray-50 overflow-hidden">
          {project.mediaType === 'video' ? (
            <video
              src={project.media}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.media}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-5">
          <span className="block text-xs text-gray-400 uppercase tracking-wide">{project.tag}</span>
          <h3 className="font-bold text-base mt-1">{project.title}</h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{project.description}</p>
        </div>
      </motion.div>
    </Link>
  )
}