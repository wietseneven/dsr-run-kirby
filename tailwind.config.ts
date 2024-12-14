import plugin from "tailwindcss/plugin"
import defaultTheme from "tailwindcss/defaultTheme"
import type { Config } from "tailwindcss"
import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"
import { breakpointsString as breakpoints } from "./src/utils/breakpoints"

const variants = plugin(({ addVariant }) => {
	addVariant("not-last", "&:not(:last-child)")
	addVariant("not-first", "&:not(:first-child)")
	addVariant("hocus", ["&:hover", "&:focus-visible"])
	addVariant("group-hocus", [".group:hover &", ".group:focus-visible &"])
})

export default {
	content: [
		"./site/**/*.php",
		"./site/**/*.yml",
		"./public/assets/**/*.svg",
		"./src/**/*.ts"
	],
	future: {
		hoverOnlyWhenSupported: true,
		disableColorOpacityUtilitiesByDefault: true
	},
	theme: {
		fontFamily: {
			sans: ["Alaska", ...defaultTheme.fontFamily.sans]
		},
		// convert breakpoints to tailwindcss-object
		// screens: Object.entries(breakpoints).reduce((prev, [key, value]) => {
		// 	prev[key] = { max: value }
		// 	prev[`>${key}`] = { min: value }

		// 	return prev
		// }, {}),
		container: {
			center: true
			// screens: {
			// 	_: "96rem"
			// }
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						"--tw-prose-body": theme("colors.black"),
						"--tw-prose-headings": theme("colors.dsr-orange.DEFAULT"),
						"--tw-prose-links": "currentColor",
						"--tw-prose-bold": "currentColor",
						h1: {
							textTransform: "uppercase",
							fontStretch: "extra-expanded",
							fontWeight: "bold",
							marginTop: "1.5rem",
							marginBottom: "1rem"
						},
						h2: {
							textTransform: "uppercase",
							fontSize: "1.35rem",
							lineHeight: "1.75rem",
							fontStretch: "extra-expanded",
							fontWeight: "bold",
							marginTop: "1.5rem",
							marginBottom: "1rem",
							"@screen sm": {
								fontSize: "1.875rem",
								lineHeight: "2.25rem"
							}
						},
						h3: {
							textTransform: "uppercase",
							fontStretch: "extra-expanded",
							fontWeight: "bold"
						},
						a: {
							textDecoration: "underline",
							textUnderlineOffset: "2px",
							"&:hover": {
								color: theme("colors.dsr-orange.DEFAULT")
							}
						},
						th: {
							textAlign: "left"
						},
						li: {
							marginTop: "0",
							marginBottom: "0",
							"& p": {
								marginTop: "0",
								marginBottom: "0"
							}
						}
					}
				}
			}),
			colors: {
				"dsr-orange": {
					DEFAULT: "oklch(73.36% 0.2 58.42)",
					50: "#FEDCB4",
					100: "#FED39F",
					200: "#FDC077",
					300: "#FDAE4F",
					400: "#FC9B26",
					500: "oklch(73.36% 0.2 58.42)",
					600: "oklch(73.36% 0.25 58.42)",
					700: "#884B02",
					800: "#512C01",
					900: "#190E00"
				},
				"dsr-blue": {
					DEFAULT: "oklch(68.97% 0.1672 220.8)",
					50: "#9DE7F9",
					100: "#8AE3F8",
					200: "#63DAF5",
					300: "#3DD1F3",
					400: "#16C7F1",
					500: "oklch(68.97% 0.1672 220.8)",
					600: "#0A819C",
					700: "#065567",
					800: "#032A33",
					900: "#000000"
				}
			}
		}
	},
	plugins: [variants, formsPlugin, typographyPlugin]
} satisfies Config
