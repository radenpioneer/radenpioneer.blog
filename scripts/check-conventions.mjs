import { existsSync } from 'node:fs'
import { glob, readFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'

const sourceDirectory = resolve('src')
const contentDirectory = resolve('src/content')
const appSlugVariable = 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG'

const readFiles = async (directory, pattern) => {
	if (!existsSync(directory)) return []

	const files = []
	for await (const entry of glob(pattern, { cwd: directory, withFileTypes: true })) {
		if (!entry.isFile()) continue

		const path = resolve(entry.parentPath, entry.name)
		files.push({
			path,
			relativePath: relative(directory, path),
			contents: await readFile(path, 'utf8'),
		})
	}
	return files
}

const lineNumber = (contents, index) => contents.slice(0, index).split('\n').length

const readAppSlug = async () => {
	const fromEnvironment = process.env[appSlugVariable]?.trim()
	if (fromEnvironment) return fromEnvironment

	const envPath = resolve('.env')
	if (!existsSync(envPath)) return undefined

	const env = await readFile(envPath, 'utf8')
	return env.match(new RegExp(`^${appSlugVariable}=(.+)$`, 'm'))?.[1].trim()
}

const failures = []
const contentFiles = await readFiles(contentDirectory, '**/*')

for (const { relativePath, contents } of contentFiles) {
	const index = contents.indexOf('](/src/')
	if (index !== -1) {
		failures.push(`Asset path: src/content/${relativePath}:${lineNumber(contents, index)} contains ](/src/`)
	}
}

const sourceFiles = (await readFiles(sourceDirectory, '**/*.{astro,ts,tsx}')).filter(
	({ relativePath }) => !relativePath.startsWith('keystatic/'),
)

for (const { relativePath, contents } of sourceFiles) {
	if (/\bclient:[a-z-]+\b/.test(contents) && !contents.includes('ISLAND:')) {
		failures.push(`Island: src/${relativePath} has a client: directive without an ISLAND: header`)
	}

	if (relativePath !== 'lib/seo.ts') {
		for (const [index, line] of contents.split('\n').entries()) {
			if ((line.includes('og:image') || line.includes('"image"')) && !line.includes('absoluteUrl(')) {
				failures.push(
					`Absolute image URL: src/${relativePath}:${index + 1} mentions an image without absoluteUrl(`,
				)
			}
		}
	}
}

if (!(await readAppSlug())) {
	failures.push(`Build variable: ${appSlugVariable} is not set in the environment or .env`)
}

if (failures.length > 0) {
	console.error(`Convention checks failed:\n- ${failures.join('\n- ')}`)
	process.exitCode = 1
}
