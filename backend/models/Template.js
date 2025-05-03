import mongoose from "mongoose"

const templateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["contract", "proposal", "scope", "legal", "other"],
      default: "other",
    },
    dynamicFields: [
      {
        key: String,
        description: String,
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Template = mongoose.model("Template", templateSchema)

export default Template
