'use client'

import { CV } from '@/lib/parseCV'
import { useEffect, useRef, useState } from 'react'

const sections = ['Contact', 'Experience', 'Education', 'Skills', 'References']

export default function CVSection({ data }: { data: CV }) {
    const [active, setActive] = useState('Contact')
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id)
                    }
                })
            },
            { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
        )

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollTo = (id: string) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="h-screen snap-start flex overflow-hidden pt-20 justify-center">
            <div className="flex w-full max-w-5xl">

                {/* Sidebar */}
                <div className="w-36 shrink-0 px-4 py-12 flex flex-col gap-4 border-r border-black/10 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    {sections.map((s) => (
                        <button
                            key={s}
                            onClick={() => scrollTo(s)}
                            className={`text-left text-sm transition-colors ${active === s ? 'text-black font-bold border-l-2 border-black pl-2' : 'text-gray-400 hover:text-black pl-2'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-10 py-12 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden">

                    {/* Contact */}
                    <div
                        id="Contact"
                        ref={(el) => { sectionRefs.current['Contact'] = el }}
                        className="border border-black/10 rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="grid grid-cols-2 gap-y-3">
                            <span className="font-semibold">Name</span>
                            <span>{data.contact.name}</span>
                            <span className="font-semibold">Email</span>
                            <a href={`mailto:${data.contact.email}`} className="hover:underline">{data.contact.email}</a>
                        </div>
                    </div>

                    {/* Experience */}
                    <div
                        id="Experience"
                        ref={(el) => { sectionRefs.current['Experience'] = el }}
                        className="border border-black/10 rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Experience</h2>
                        <div className="flex flex-col gap-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="flex gap-8">
                                    <div className="w-36 shrink-0 text-right">
                                        <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                                            {exp.start} — {exp.end}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">{exp.location}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base leading-tight">{exp.title}</h3>
                                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">
                                            {exp.company}
                                        </a>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div
                        id="Education"
                        ref={(el) => { sectionRefs.current['Education'] = el }}
                        className="border border-black/10 rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Education</h2>
                        <div className="flex flex-col gap-8">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex gap-8">
                                    <div className="w-36 shrink-0 text-right">
                                        <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                                            {edu.start} — {edu.end}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base leading-tight">{edu.institution}</h3>
                                        <p className="text-sm text-gray-500">{edu.degree}</p>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{edu.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div
                        id="Skills"
                        ref={(el) => { sectionRefs.current['Skills'] = el }}
                        className="border border-black/10 rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="text-sm border border-black px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* References */}
                    <div
                        id="References"
                        ref={(el) => { sectionRefs.current['References'] = el }}
                        className="border border-black/10 rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">References</h2>
                        <div className="flex flex-col gap-6">
                            {data.references.map((ref, i) => (
                                <div key={i}>
                                    <p className="font-bold">{ref.name}</p>
                                    <p className="text-sm text-gray-500">{ref.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{ref.relationship}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}