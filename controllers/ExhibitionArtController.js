import ExhibitionArt from '../models/ExhibitionArt.js'
import { NotFounderror } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPermissions.js'

const saveExhibitionArt = async (req, res) => {
  req.body.createdBy = req.user.userId

  // console.log(req.body)

  const art = await ExhibitionArt.create(req.body)
  res.status(StatusCodes.CREATED).json({ art })
}

const getAllExhibitionUserArts = async (req, res) => {
  const { isFavorite, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId
  }

  // sort by favorite
  if (isFavorite) {
    queryObject.isFavorite = isFavorite
  }

  // user search by type exhib title
  if (search) {
    queryObject.exibitionTitle = { $regex: search, $options: 'i' }
  }

  let result = ExhibitionArt.find(queryObject)

  //knowing number of all arts by user
  let resultAllArtsQuery = ExhibitionArt.find({
    createdBy: req.user.userId
  })
  let resultAllArts = await resultAllArtsQuery
  let numOfAllArts = resultAllArts.length

  //knowing number of favorite
  let resultFavoriteQuery = ExhibitionArt.find({ isFavorite: true })
  const resultFavorite = await resultFavoriteQuery
  const numOfExhibFavorite = resultFavorite.length

  //sort by date
  if (sort === 'latest') {
    result = result.sort('-imageDate')
  }
  if (sort === 'oldest') {
    result = result.sort('imageDate')
  }
  //sort by saved date
  if (sort === 'latest saved') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest saved') {
    result = result.sort('createdAt')
  }
  // sort by exhib Title
  if (sort === 'a-z') {
    result = result.sort('exibitionTitle')
  }
  if (sort === 'z-a') {
    result = result.sort('-exibitionTitle')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 12
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const arts = await result

  const totalArts = await ExhibitionArt.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalArts / limit)
  res
    .status(StatusCodes.OK)
    .json({ arts, totalArts, numOfPages, numOfExhibFavorite, numOfAllArts })
}

const deleteExhibitionArt = async (req, res) => {
  const { id: artId } = req.params
  const art = await ExhibitionArt.findOne({ _id: artId })

  if (!art) {
    throw new NotFounderror(`No art with thisid: ${artId}`)
  }

  checkPermissions(req.user, art.createdBy)

  await art.remove()
  res.status(StatusCodes.OK).json({ msg: 'Art removed successfully!' })
}

const addExhibitionArtToFavorite = async (req, res) => {
  const { id: artId } = req.params
  const art = await ExhibitionArt.findOne({ _id: artId })

  if (!art) {
    throw new NotFounderror(`No art found with thisid: ${artId}`)
  }

  checkPermissions(req.user, art.createdBy)

  const favoriteArt = await ExhibitionArt.findOneAndUpdate(
    { _id: artId },
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  res.status(StatusCodes.OK).json({ favoriteArt })
}

export {
  saveExhibitionArt,
  getAllExhibitionUserArts,
  deleteExhibitionArt,
  addExhibitionArtToFavorite
}
