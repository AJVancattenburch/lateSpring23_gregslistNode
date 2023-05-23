import mongoose from "mongoose";
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    company: { 
      type: String,
      required: true,
      minLength: 3 },
      
    jobTitle: { 
      type: String,
      required: true 
      },

    hours: { 
      type: Number,
      required: true 
      },

    rate: { 
      type: Number,
      required: true 
      },

    description: { 
      type: String,
       required: true,
        maxLength: 500 },

    creatorId: { 
      type: Schema.Types.ObjectId,
      required: true }
  },

  { timestamps: true }
)