import express from 'express'
const router = express.Router()

import {
  saveCollectionArt,
  getAllCollectionUserArts,
  deleteCollectionUserArt,
  addCollectionArtToFavorite
} from '../controllers/collectionArtController.js'

router.route('/addUserCollectionArt').post(saveCollectionArt)
router.route('/getAllCollecUserArts').get(getAllCollectionUserArts)
router
  .route('/:id')
  .delete(deleteCollectionUserArt)
  .patch(addCollectionArtToFavorite)

export default router
