import Link from "next/link"

export default async function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-32 text-center">
			<h1 className="mb-4 text-4xl font-bold">404 - Страница не найдена</h1>
			<p className="mb-8 text-gray-600">
				Извините, страница, которую вы ищете, не существует или была перемещена.
			</p>
			<Link
				href="/"
				className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 transition-colors"
			>
				Вернуться на главную
			</Link>
		</div>
	)
}
