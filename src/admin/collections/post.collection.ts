import cyrillicToLatin from "cyrillic-to-latin"
import { CollectionConfig } from "payload"

export const PostsCollection: CollectionConfig = {
	slug: "posts",
	labels: {
		singular: "",
		plural: "📝 Посты"
	},
	admin: {
		useAsTitle: "title",

		defaultColumns: ["featuredImage", "title", "status", "publishedDate"]
	},
	access: {
		read: () => true
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			label: "Заголовок"
		},
		{
			name: "excerpt",
			type: "textarea",
			label: "Краткое описание"
		},
		{
			name: "content",
			type: "richText",
			required: true,
			label: "Содержание"
		},
		{
			name: "status",
			type: "select",
			required: true,
			defaultValue: "draft",
			options: [
				{
					label: "Черновик",
					value: "draft"
				},
				{
					label: "Опубликовано",
					value: "published"
				}
			],
			admin: {
				position: "sidebar"
			}
		},
		{
			name: "publishedDate",
			type: "date",
			label: "Дата публикации",
			admin: {
				position: "sidebar",
				date: {
					pickerAppearance: "dayAndTime",
					timeFormat: "HH:mm",
					displayFormat: "dd MMMM yyy, HH:mm"
				}
			}
		},
		{
			name: "featuredImage",
			type: "upload",
			relationTo: "media",
			label: "Обложка",
			displayPreview: true,
			admin: {
				position: "sidebar"
			}
		},
		{
			name: "seo",
			label: "📈 SEO",
			type: "group",
			fields: [
				{
					name: "slug",
					type: "text",
					label: "URL-ссылка",
					unique: true,
					admin: {
						readOnly: true,
						description: "Будет сгенерировано автоматически из заголовка"
					},
					hooks: {
						beforeValidate: [
							(props) => {
								if (props.data?.title) {
									return cyrillicToLatin(props.data.title)
										.toLowerCase()
										.replace(/[^a-zA-Z0-9]+/g, "-")
										.replace(/^-+|-+$/g, "")
								}
								return props.value
							}
						]
					}
				},
				{
					name: "keywords",
					type: "textarea",
					label: "Ключевые слова"
				}
			],
			admin: {
				position: "sidebar"
			}
		}
	]
}
