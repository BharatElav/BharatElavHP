import fs from 'fs'
import path from 'path'

export type Post = {
  title: string
  date: string
  readtime: string
  slug: string
  thumbnail?: string
  pinned: boolean
  tags?: string[]
  description: string
}

export function parseBlog(): Post[] {
  const filePath = path.join(process.cwd(), 'content', 'blog.md')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const blocks = raw
    .split('---post---')
    .map((block: string) => block.trim())
    .filter((block: string) => block.length > 0)

  return blocks.map((block: string) => {
    const lines = block.split('\n')
    const meta: Record<string, string> = {}
    let contentStart = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line === '') {
        contentStart = i + 1
        break
      }
      const [key, ...rest] = line.split(':')
      meta[key.trim()] = rest.join(':').trim()
    }

    const description = lines.slice(contentStart).join('\n').trim()

    return {
      title: meta.title,
      date: meta.date,
      readtime: meta.readtime,
      slug: meta.slug,
      thumbnail: meta.thumbnail,
      pinned: meta.pinned === 'true',
      tags: meta.tags ? meta.tags.split(',').map((t: string) => t.trim()) : [],
      description,
    }
  })
}