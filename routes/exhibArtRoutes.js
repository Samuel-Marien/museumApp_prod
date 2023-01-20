import express from 'express'
const router = express.Router()

import {
  saveExhibitionArt,
  getAllExhibitionUserArts,
  deleteExhibitionArt,
  addExhibitionArtToFavorite
} from '../controllers/ExhibitionArtController.js'

router.route('/addUserArts').post(saveExhibitionArt)
router.route('/getAllUserArts').get(getAllExhibitionUserArts)
router
  .route('/:id')
  .delete(deleteExhibitionArt)
  .patch(addExhibitionArtToFavorite)

export default router
