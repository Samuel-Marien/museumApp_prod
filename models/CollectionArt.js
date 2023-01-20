import mongoose from 'mongoose'

const CollectionArtSchema = new mongoose.Schema(
  {
    collectionTitle: { type: String },
    collectionId: { type: Number },
    artTitle: { type: String },
    artId: { type: Number },
    artists: { type: Array },
    classification: { type: String },
    completeness: { type: Object },
    primaryImage: { type: String },
    medium: { type: String },
    date: { type: String },
    markings: { type: String },
    signed: { type: String },
    inscribed: { type: String },
    labels: { type: Array },
    geographicalLocations: { type: Array },
    creditLine: { type: String },
    section: { type: String },
    description: { type: String },
    exhibitions: { type: Array },
    rightsType: { type: Object },
    period: { type: String },
    dynasty: { type: String },
    images: { type: Array },
    isFavorite: {
      type: Boolean
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user']
    }
  },
  { timestamps: true }
)

export default mongoose.model('CollectionArt', CollectionArtSchema)
