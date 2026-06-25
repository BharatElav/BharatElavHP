import { parseBlog } from '@/lib/parseBlog'
import BlogList from '@/app/components/bloglist'

export default function BlogPage() {
    const posts = parseBlog()

    return (
        <main className="min-h-screen pt-32 pb-16 [&::-webkit-scrollbar]:hidden flex flex-col items-center">
            <div className="w-full max-w-2xl px-8">
                <h1 className="text-5xl font-bold mb-12">Blog</h1>
                <BlogList posts={posts} />
            </div>
        </main>
    )
}