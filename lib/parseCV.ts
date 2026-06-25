import fs from 'fs'
import path from 'path'

export type CVContact = {
  name: string
  email: string
}

export type CVExperience = {
  title: string
  company: string
  link: string
  location: string
  start: string
  end: string
  description: string
}

export type CVEducation = {
  institution: string
  degree: string
  start: string
  end: string
  gpa: string
  description: string
}

export type CVReference = {
  name: string
  title: string
  relationship: string
}

export type CV = {
  contact: CVContact
  experience: CVExperience[]
  education: CVEducation[]
  skills: string[]
  references: CVReference[]
}

export function parseCV(): CV {
  const filePath = path.join(process.cwd(), 'content', 'cv.md')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const cv: CV = {
    contact: { name: '', email: '' },
    experience: [],
    education: [],
    skills: [],
    references: [],
  }

  const sections = raw.split(/---(\w+)---/).filter(Boolean)

  for (let i = 0; i < sections.length; i += 2) {
    const type = sections[i].trim()
    const content = sections[i + 1]?.trim() ?? ''

    const lines = content.split('\n')
    const meta: Record<string, string> = {}
    let contentStart = 0

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trim()
      if (line === '') {
        contentStart = j + 1
        break
      }
      const [key, ...rest] = line.split(':')
      meta[key.trim()] = rest.join(':').trim()
    }

    const description = lines.slice(contentStart).join('\n').trim()

    if (type === 'contact') {
      cv.contact = { name: meta.name, email: meta.email }
    } else if (type === 'experience') {
      cv.experience.push({
        title: meta.title,
        company: meta.company,
        link: meta.link,
        location: meta.location,
        start: meta.start,
        end: meta.end,
        description,
      })
    } else if (type === 'education') {
      cv.education.push({
        institution: meta.institution,
        degree: meta.degree,
        start: meta.start,
        end: meta.end,
        gpa: meta.gpa,
        description,
      })
    } else if (type === 'skills') {
      cv.skills = content.split(',').map((s: string) => s.trim())
    } else if (type === 'reference') {
      cv.references.push({
        name: meta.name,
        title: meta.title,
        relationship: meta.relationship,
      })
    }
  }

  return cv
}