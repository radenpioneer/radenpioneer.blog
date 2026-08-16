import assert from 'node:assert/strict'
import { glob, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const outputDirectory = resolve('dist/client')

const routes = []
for await (const path of glob('**/*.html', { cwd: outputDirectory })) {
	const html = await readFile(resolve(outputDirectory, path), 'utf8')
	routes.push({ path, html })
}

test('every built route has a non-empty title', () => {
	assert.ok(routes.length > 0, `Expected built routes in ${outputDirectory}; actual: none`)

	const missing = routes
		.filter(({ html }) => !/<title>\s*\S[\s\S]*?<\/title>/.test(html))
		.map(({ path }) => path)

	assert.deepEqual(missing, [], `Expected every route to have a title; actual missing: ${missing.join(', ')}`)
})

test('every internal link has a trailing slash', () => {
	const missing = routes.flatMap(({ path, html }) =>
		[...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)]
			.map(([, href]) => href)
			.filter((href) => href.startsWith('/') && href !== '/' && !href.endsWith('/'))
			.map((href) => `${path}: ${href}`)
	)

	assert.deepEqual(
		missing,
		[],
		`Expected every internal link to end in /; actual violations: ${missing.join(', ')}`,
	)
})

test('no built route ships a script', () => {
	const routesWithScripts = routes
		.filter(({ html }) => /<script\b/i.test(html))
		.map(({ path }) => path)

	assert.deepEqual(
		routesWithScripts,
		[],
		`Expected no route scripts; actual routes with scripts: ${routesWithScripts.join(', ')}`,
	)
})
