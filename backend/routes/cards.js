const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');
const {
  validationCard,
  validationDeleteCard,
  validationAddLike,
  validationDeleteLike,
} = require('../utils/validation');

router.get('/cards', getCards);
router.post('/cards', validationCard, createCard);
router.delete('/cards/:cardId', validationDeleteCard, deleteCard);
router.put('/cards/:cardId/likes', validationAddLike, addLike);
router.delete('/cards/:cardId/likes', validationDeleteLike, deleteLike);

module.exports = router;
