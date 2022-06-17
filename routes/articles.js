const router = require('express').Router();
const {celebrate, Joi} = require("celebrate");
const validator = require('validator');
const {getArticles, createArticle, deleteArticle} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(1).max(254),
    title: Joi.string().required().min(1),
    text: Joi.string().required().min(1),
    date: Joi.string().required().min(8).max(10),
    source: Joi.string().required().min(1),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.error('string.uri');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.error('string.uri');
    }),
  }),
}), createArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }).unknown(true),
}), deleteArticle);

module.exports = router;