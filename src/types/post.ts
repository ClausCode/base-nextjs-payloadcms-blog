export interface Post {
	id: string
	title: string
	excerpt?: string
	featuredImage?: {
		url: string
		alt: string
	}
	publishedDate: string
	seo: {
		slug: string
	}
}

export interface PostsResponse {
	docs: Post[]
	totalDocs: number
	limit: number
	totalPages: number
	page: number
	pagingCounter: number
	hasPrevPage: boolean
	hasNextPage: boolean
	prevPage: number | null
	nextPage: number | null
}
