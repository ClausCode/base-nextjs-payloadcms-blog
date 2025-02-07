import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"

import { Post } from "@/types/post"

interface PostCardProps {
	post: Post
}

export function PostCard({ post }: PostCardProps) {
	return (
		<article className="group relative flex flex-col space-y-2">
			{post.featuredImage && (
				<Image
					src={post.featuredImage.url}
					alt={post.featuredImage.alt || post.title}
					width={600}
					height={400}
					className="bg-muted aspect-video rounded-md border object-cover transition-colors"
				/>
			)}
			<h2 className="text-2xl font-bold">{post.title}</h2>
			{post.excerpt && (
				<p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
			)}
			<time className="text-muted-foreground text-sm">
				{formatDate(post.publishedDate)}
			</time>
			<Link href={`/blog/${post.seo.slug}`} className="absolute inset-0">
				<span className="sr-only">Перейти к посту {post.title}</span>
			</Link>
		</article>
	)
}
