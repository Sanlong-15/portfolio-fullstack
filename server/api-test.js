/**
 * API tests that run WITHOUT a database:
 * routing, admin auth, invalid-id handling, 404s, and schema validation.
 */
import assert from 'node:assert'
process.env.ADMIN_KEY = 'test-key-123'
process.env.CLIENT_ORIGIN = 'http://localhost:5173'

const { default: app } = await import('./app.js')
const { default: Project } = await import('./models/Project.js')
const { default: Message } = await import('./models/Message.js')

const server = app.listen(5050)
const base = 'http://localhost:5050'
let pass = 0

const check = async (name, fn) => {
  try { await fn(); pass++; console.log(`PASS  ${name}`) }
  catch (e) { console.log(`FAIL  ${name}: ${e.message}`) }
}

await check('GET /api/health -> 200', async () => {
  const r = await fetch(`${base}/api/health`)
  assert.equal(r.status, 200)
  const j = await r.json()
  assert.equal(j.success, true)
})

await check('GET unknown route -> 404 JSON', async () => {
  const r = await fetch(`${base}/api/nothing`)
  assert.equal(r.status, 404)
  const j = await r.json()
  assert.equal(j.success, false)
})

await check('GET /api/projects/badid -> 400 invalid id', async () => {
  const r = await fetch(`${base}/api/projects/not-a-real-id`)
  assert.equal(r.status, 400)
})

await check('POST /api/projects without key -> 401', async () => {
  const r = await fetch(`${base}/api/projects`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
  })
  assert.equal(r.status, 401)
})

await check('POST /api/projects with WRONG key -> 401', async () => {
  const r = await fetch(`${base}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': 'wrong' },
    body: '{}',
  })
  assert.equal(r.status, 401)
})

await check('DELETE /api/projects/badid with right key -> 400 (id checked)', async () => {
  const r = await fetch(`${base}/api/projects/xyz`, {
    method: 'DELETE', headers: { 'x-admin-key': 'test-key-123' },
  })
  assert.equal(r.status, 400)
})

await check('GET /api/messages without key -> 401 (not public)', async () => {
  const r = await fetch(`${base}/api/messages`)
  assert.equal(r.status, 401)
})

await check('CORS header present for allowed origin', async () => {
  const r = await fetch(`${base}/api/health`, { headers: { Origin: 'http://localhost:5173' } })
  assert.equal(r.headers.get('access-control-allow-origin'), 'http://localhost:5173')
})

/* Schema validation — runs locally, no DB needed */
await check('Project schema rejects empty title + no technologies', async () => {
  const p = new Project({ description: 'x', technologies: [] })
  let err = null
  try { await p.validate() } catch (e) { err = e }
  assert.ok(err)
  assert.ok(err.errors.title)
  assert.ok(err.errors.technologies)
})

await check('Project schema accepts valid data', async () => {
  const p = new Project({ title: 'Valid Project', description: 'A fine project', technologies: ['React'] })
  await p.validate()
})

await check('Message schema rejects bad email + short message', async () => {
  const m = new Message({ name: 'K', email: 'not-an-email', subject: 's', message: 'short' })
  let err = null
  try { await m.validate() } catch (e) { err = e }
  assert.ok(err)
  assert.ok(err.errors.email)
  assert.ok(err.errors.message)
})

await check('Message schema accepts valid data', async () => {
  const m = new Message({ name: 'Koko', email: 'k@example.com', subject: 'Hello', message: 'This is long enough to pass.' })
  await m.validate()
})

server.close()
console.log(`\n${pass}/12 tests passed`)
process.exit(pass === 12 ? 0 : 1)
