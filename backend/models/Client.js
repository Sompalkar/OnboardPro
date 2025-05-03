import mongoose from "mongoose"

const clientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    notes: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

// Virtual for contracts
clientSchema.virtual("contracts", {
  ref: "Contract",
  localField: "_id",
  foreignField: "client",
})

// Virtual for payments
clientSchema.virtual("payments", {
  ref: "Payment",
  localField: "_id",
  foreignField: "client",
})

const Client = mongoose.model("Client", clientSchema)

export default Client
