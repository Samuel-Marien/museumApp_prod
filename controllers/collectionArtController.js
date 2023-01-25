import CollectionArt from '../models/CollectionArt.js'
import { NotFounderror } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPermissions.js'

const saveCollectionArt = async (req, res) => {
  req.body.createdBy = req.user.userId

  const art = await CollectionArt.create(req.body)
  res.status(StatusCodes.CREATED).json({ art })
}

const getAllCollectionUserArts = async (req, res) => {
  const { isFavorite, sort, search, category } = req.query

  const queryObject = {
    createdBy: req.user.userId
  }

  // sort by favorite
  if (isFavorite) {
    queryObject.isFavorite = isFavorite
  }

  // user search by type collection title
  if (search) {
    queryObject.artTitle = { $regex: search, $options: 'i' }
  }
  // sort by category
  switch (category) {
    case 'Arts of Africa':
      queryObject.collectionTitle = 'Arts of Africa'
      break
    case 'Photography':
      queryObject.collectionTitle = 'Photography'
      break
    case 'European Art':
      queryObject.collectionTitle = 'European Art'
      break
    case 'Elizabeth A. Sackler Center for Feminist Art':
      queryObject.collectionTitle =
        'Elizabeth A. Sackler Center for Feminist Art'
      break
    case 'Egyptian, Classical, Ancient Near Eastern Art':
      queryObject.collectionTitle =
        'Egyptian, Classical, Ancient Near Eastern Art'
      break
    case 'Decorative Arts':
      queryObject.collectionTitle = 'Decorative Arts'
      break
    case 'American Art':
      queryObject.collectionTitle = 'American Art'
      break
    case 'Arts of the Islamic World':
      queryObject.collectionTitle = 'Arts of the Islamic World'
      break
    case 'Arts of the Americas':
      queryObject.collectionTitle = 'Arts of the Americas'
      break
    case 'Arts of the Pacific Islands':
      queryObject.collectionTitle = 'Arts of the Pacific Islands'
      break
    case 'Asian Art':
      queryObject.collectionTitle = 'Asian Art'
      break
    case 'Contemporary Art':
      queryObject.collectionTitle = 'Contemporary Art'
      break

    default:
      break
  }

  let result = CollectionArt.find(queryObject)

  //knowing number of all arts by user
  let resultAllArtsQuery = CollectionArt.find({
    createdBy: req.user.userId
  })
  let resultAllArts = await resultAllArtsQuery
  let numOfAllArts = resultAllArts.length

  //knowing number of favorite
  let resultFavoriteQuery = CollectionArt.find({
    createdBy: req.user.userId,
    isFavorite: true
  })
  const resultFavorite = await resultFavoriteQuery
  const numOfCollecFavorite = resultFavorite.length

  //sort by date
  if (sort === 'latest') {
    result = result.sort('-date')
  }
  if (sort === 'oldest') {
    result = result.sort('date')
  }
  //sort by saved date
  if (sort === 'latest saved') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest saved') {
    result = result.sort('createdAt')
  }
  // sort by collec Title
  if (sort === 'a-z') {
    result = result.sort('artTitle')
  }
  if (sort === 'z-a') {
    result = result.sort('-artTitle')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 12
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const artsCollec = await result

  const totalCollecArts = await CollectionArt.countDocuments(queryObject)
  const numOfCollecPages = Math.ceil(totalCollecArts / limit)
  res.status(StatusCodes.OK).json({
    artsCollec,
    totalCollecArts,
    numOfCollecPages,
    numOfCollecFavorite,
    numOfAllArts
  })
}

const deleteCollectionUserArt = async (req, res) => {
  const { id: artId } = req.params
  const art = await CollectionArt.findOne({ _id: artId })

  if (!art) {
    throw new NotFounderror(`No artwork found with this id: ${artId}`)
  }

  checkPermissions(req.user, art.createdBy)

  await art.remove()
  res.status(StatusCodes.OK).json({ msg: 'Art deleted successfully' })
}

const addCollectionArtToFavorite = async (req, res) => {
  const { id: artId } = req.params
  const art = await CollectionArt.findOne({ id: artId })

  if (!art) {
    throw new NotFounderror(`No art found with thisid: ${artId}`)
  }

  checkPermissions(req.user, art.createdBy)

  const favoriteArt = await CollectionArt.findOneAndUpdate(
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
  saveCollectionArt,
  getAllCollectionUserArts,
  deleteCollectionUserArt,
  addCollectionArtToFavorite
}
