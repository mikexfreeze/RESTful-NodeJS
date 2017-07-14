import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Article, { schema } from './model'

const router = new Router()
const { title, content } = schema.tree

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.post('/',
  body({ title, content }),
  create)

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiUse listParams
 * @apiSuccess {Object[]} articles List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /articles/:id Retrieve article
 * @apiName RetrieveArticle
 * @apiGroup Article
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.put('/:id',
  body({ title, content }),
  update)

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 */
router.delete('/:id',
  destroy)

export default router
