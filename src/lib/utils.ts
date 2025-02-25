import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
	return new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}).format(new Date(date))
}
