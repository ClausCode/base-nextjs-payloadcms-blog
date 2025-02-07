import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { ru } from "@payloadcms/translations/languages/ru"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"

import { MediaCollection, UserCollection } from "./collections"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		user: UserCollection.slug,
		theme: "dark",
		suppressHydrationWarning: true,
		importMap: {
			baseDir: path.resolve(dirname)
		}
	},
	i18n: {
		supportedLanguages: { ru },
		translations: {
			ru: {
				general: {
					locale: "Язык",
					locales: "Языки"
				}
			}
		}
	},
	collections: [UserCollection, MediaCollection],
	globals: [],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	localization: {
		locales: [{ code: "ru", label: "Русский" }],
		defaultLocale: "ru"
	},
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts")
	},
	routes: {
		admin: "/dashboard"
	},

	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || ""
		}
	}),
	plugins: [payloadCloudPlugin()]
})
