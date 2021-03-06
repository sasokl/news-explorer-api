const Article = require('../models/article');
const BadRequestErr = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => Article.find({ owner: req.user._id })
  .then((articles) => res.send({ data: articles }))
  .catch(next);

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr());
      else next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((article) => {
      if (article.owner.equals(req.user._id)) res.send({ data: article });
      else throw new ForbiddenErr();
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestErr());
      else next(err);
    });
};
