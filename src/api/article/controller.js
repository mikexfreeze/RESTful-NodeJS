import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Article } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Article.create(body)
    .then((article) => article.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Article.find(query, select, cursor)
    .then((articles) => articles.map((article) => article.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? article.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? _.merge(article, body).save() : null)
    .then((article) => article ? article.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? article.remove() : null)
    .then(success(res, 204))
    .catch(next)
