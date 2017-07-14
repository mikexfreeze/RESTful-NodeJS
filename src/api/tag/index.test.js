import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Tag } from '.'

const app = () => express(routes)

let userSession, anotherSession, tag

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  tag = await Tag.create({ creator: user })
})

test('POST /tags 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, label: 'test', url: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.label).toEqual('test')
  expect(body.url).toEqual('test')
  expect(typeof body.creator).toEqual('object')
})

test('POST /tags 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /tags 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /tags/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${tag.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
})

test('GET /tags/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tags/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${tag.id}`)
    .send({ access_token: userSession, label: 'test', url: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
  expect(body.label).toEqual('test')
  expect(body.url).toEqual('test')
  expect(typeof body.creator).toEqual('object')
})

test('PUT /tags/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${tag.id}`)
    .send({ access_token: anotherSession, label: 'test', url: 'test' })
  expect(status).toBe(401)
})

test('PUT /tags/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${tag.id}`)
  expect(status).toBe(401)
})

test('PUT /tags/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, label: 'test', url: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tags/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${tag.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /tags/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${tag.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /tags/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${tag.id}`)
  expect(status).toBe(401)
})

test('DELETE /tags/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
