import { PostsResponse } from "@/types/post"

export async function getPosts(
	page: number = 1,
	limit: number = 6
): Promise<PostsResponse> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[status][equals]=published&sort=-publishedDate&page=${page}&limit=${limit}`,
			{ next: { revalidate: 3600 } }
		)

		if (!response.ok) {
			throw new Error(
				`Ошибка при загрузке постов: ${response.status} ${response.statusText}`
			)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Ошибка при получении постов:", error)
		throw new Error("Не удалось загрузить посты. Пожалуйста, попробуйте позже.")
	}
}
