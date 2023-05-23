import mongoose from 'mongoose';
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {
    bedrooms: { 
      type: Number, 
      required: true 
    },

    bathrooms: { 
      type: Number, 
      required: true 
    },

    levels: { 
      type: Number, 
      required: true 
    },

    year: { 
      type: Number, 
      required: true 
    },

    price: { 
      type: Number, 
      required: true 
    },

    description: { 
      type: String, 
      required: true,
       maxLength: 500 },
    imgUrl: { 
      type: String,
      required: true,
      default: 'http://placehold.it/200x200' 
    },

    creatorId: { 
      type: Schema.Types.ObjectId, 
      required: true }
    
  },
)