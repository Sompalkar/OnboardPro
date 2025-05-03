import mongoose from "mongoose"

const contractSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "sent", "viewed", "signed", "expired", "cancelled"],
      default: "draft",
    },
    signatureRequest: {
      id: String,
      url: String,
      expiresAt: Date,
    },
    signedDocument: {
      url: String,
      cloudinaryId: String,
    },
    sentAt: Date,
    viewedAt: Date,
    signedAt: Date,
    expiresAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Contract = mongoose.model("Contract", contractSchema)

export default Contract
