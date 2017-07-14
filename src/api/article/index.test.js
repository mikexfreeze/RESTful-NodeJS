import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Article } from '.'

const app = () => express(routes)

let article

beforeEach(async () => {
  article = await Article.create({})
})

test('POST /articles 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ title: 'test', content: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('GET /articles 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /articles/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${article.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
})

test('GET /articles/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /articles/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${article.id}`)
    .send({ title: 'test', content: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('PUT /articles/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ title: 'test', content: 'test' })
  expect(status).toBe(404)
})

test('DELETE /articles/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${article.id}`)
  expect(status).toBe(204)
})

test('DELETE /articles/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
