import express from "express"
import Contract from "../models/Contract.js"
import Client from "../models/Client.js"
import { authenticateToken } from "../middleware/auth.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { sendContractEmail } from "../utils/email.js"
import { createSignatureRequest } from "../utils/esignature.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

// Get all contracts for the authenticated user
router.get("/", async (req, res) => {
  try {
    const contracts = await Contract.find({ user: req.user.userId })
      .populate("client", "name email company")
      .sort({ createdAt: -1 })

    res.json(contracts)
  } catch (error) {
    console.error("Get contracts error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a single contract by ID
router.get("/:id", async (req, res) => {
  try {
    const contract = await Contract.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("client", "name email company")

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" })
    }

    res.json(contract)
  } catch (error) {
    console.error("Get contract error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new contract
router.post("/", async (req, res) => {
  try {
    const { clientId, templateId, title, content } = req.body

    // Verify client exists and belongs to user
    const client = await Client.findOne({
      _id: clientId,
      user: req.user.userId,
    })

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    // Create contract
    const contract = new Contract({
      user: req.user.userId,
      client: clientId,
      template: templateId,
      title,
      content,
      status: "draft",
    })

    await contract.save()
    res.status(201).json(contract)
  } catch (error) {
    console.error("Create contract error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a contract
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body

    const contract = await Contract.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId, status: "draft" },
      { title, content },
      { new: true, runValidators: true },
    )

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found or cannot be updated (only draft contracts can be updated)",
      })
    }

    res.json(contract)
  } catch (error) {
    console.error("Update contract error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a contract
router.delete("/:id", async (req, res) => {
  try {
    const contract = await Contract.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
      status: { $in: ["draft", "expired", "cancelled"] },
    })

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found or cannot be deleted (only draft, expired, or cancelled contracts can be deleted)",
      })
    }

    res.json({ message: "Contract deleted successfully" })
  } catch (error) {
    console.error("Delete contract error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Send contract for signature
router.post("/:id/send", async (req, res) => {
  try {
    const contract = await Contract.findOne({
      _id: req.params.id,
      user: req.user.userId,
      status: "draft",
    }).populate("client", "name email")

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found or cannot be sent (only draft contracts can be sent)",
      })
    }

    // Create signature request with HelloSign or DocuSign
    const signatureRequest = await createSignatureRequest(contract)

    // Update contract with signature request info
    contract.status = "sent"
    contract.signatureRequest = {
      id: signatureRequest.id,
      url: signatureRequest.signingUrl,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    }
    contract.sentAt = new Date()

    await contract.save()

    // Send email to client
    await sendContractEmail(contract)

    res.json(contract)
  } catch (error) {
    console.error("Send contract error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Mark contract as signed (webhook callback from e-signature service)
router.post("/webhook/signed", async (req, res) => {
  try {
    const { signatureRequestId, signedDocumentUrl } = req.body

    // Find contract by signature request ID
    const contract = await Contract.findOne({
      "signatureRequest.id": signatureRequestId,
    })

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" })
    }

    // Upload signed document to Cloudinary
    const uploadResult = await uploadToCloudinary(signedDocumentUrl)

    // Update contract
    contract.status = "signed"
    contract.signedDocument = {
      url: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
    }
    contract.signedAt = new Date()

    await contract.save()

    res.json({ message: "Contract marked as signed successfully" })
  } catch (error) {
    console.error("Webhook signed contract error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get contracts by status
router.get("/status/:status", async (req, res) => {
  try {
    const contracts = await Contract.find({
      user: req.user.userId,
      status: req.params.status,
    })
      .populate("client", "name email company")
      .sort({ createdAt: -1 })

    res.json(contracts)
  } catch (error) {
    console.error("Get contracts by status error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
