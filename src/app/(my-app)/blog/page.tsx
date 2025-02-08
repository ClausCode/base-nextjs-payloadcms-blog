import Link from "next/link"
import { Suspense } from "react"

import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@/components/ui/pagination"

import { getPosts } from "@/lib/api"

interface BlogPageProps {
	searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const currentPage = Number((await searchParams).page) || 1
	const postsPerPage = 6

	try {
		const {
			docs: posts,
			totalPages,
			hasNextPage,
			hasPrevPage
		} = await getPosts(currentPage, postsPerPage)

		if (!posts || posts.length === 0) {
			return (
				<main className="container mx-auto py-6 lg:py-10">
					<div className="flex flex-col items-center gap-4">
						<h1 className="text-3xl font-bold">Записи не найдены</h1>
						<p className="text-muted-foreground">
							В данный момент записей в блоге нет или они недоступны
						</p>
						<Button asChild>
							<Link href="/">Вернуться на первую страницу</Link>
						</Button>
					</div>
				</main>
			)
		}

		return (
			<main className="container py-6 lg:py-10">
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold">Блог</h1>

					<Suspense fallback={<div>Загрузка...</div>}>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{posts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
					</Suspense>

					<Pagination className="mt-8">
						<PaginationContent>
							{hasPrevPage && (
								<PaginationItem>
									<PaginationPrevious href={`/blog?page=${currentPage - 1}`} />
								</PaginationItem>
							)}

							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<PaginationItem key={page}>
										<PaginationLink
											href={`/blog?page=${page}`}
											isActive={currentPage === page}
										>
											{page}
										</PaginationLink>
									</PaginationItem>
								)
							)}

							{hasNextPage && (
								<PaginationItem>
									<PaginationNext href={`/blog?page=${currentPage + 1}`} />
								</PaginationItem>
							)}
						</PaginationContent>
					</Pagination>
				</div>
			</main>
		)
	} catch (error) {
		return (
			<main className="container py-6 lg:py-10">
				<div className="flex flex-col items-center gap-4">
					<h1 className="text-3xl font-bold">Ошибка загрузки</h1>
					<p className="text-muted-foreground">
						{error instanceof Error
							? `Не удалось загрузить записи блога: ${error.message}`
							: "Произошла неизвестная ошибка при загрузке записей блога"}
					</p>
					<PaginationLink href="/blog" className="mt-4">
						Попробовать снова
					</PaginationLink>
				</div>
			</main>
		)
	}
}
