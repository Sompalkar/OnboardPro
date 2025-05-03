import express from "express"
import Client from "../models/Client.js"
import Contract from "../models/Contract.js"
import Payment from "../models/Payment.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

// Get all clients for the authenticated user
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.userId }).sort({ createdAt: -1 })
    res.json(clients)
  } catch (error) {
    console.error("Get clients error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a single client by ID
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      user: req.user.userId,
    })

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    res.json(client)
  } catch (error) {
    console.error("Get client error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new client
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, address, notes } = req.body

    const client = new Client({
      user: req.user.userId,
      name,
      email,
      phone,
      company,
      address,
      notes,
    })

    await client.save()
    res.status(201).json(client)
  } catch (error) {
    console.error("Create client error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a client
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, company, address, status, notes } = req.body

    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { name, email, phone, company, address, status, notes },
      { new: true, runValidators: true },
    )

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    res.json(client)
  } catch (error) {
    console.error("Update client error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a client
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    })

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    // Delete associated contracts and payments
    await Contract.deleteMany({ client: req.params.id })
    await Payment.deleteMany({ client: req.params.id })

    res.json({ message: "Client deleted successfully" })
  } catch (error) {
    console.error("Delete client error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get client contracts
router.get("/:id/contracts", async (req, res) => {
  try {
    const contracts = await Contract.find({
      client: req.params.id,
      user: req.user.userId,
    }).sort({ createdAt: -1 })

    res.json(contracts)
  } catch (error) {
    console.error("Get client contracts error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get client payments
router.get("/:id/payments", async (req, res) => {
  try {
    const payments = await Payment.find({
      client: req.params.id,
      user: req.user.userId,
    }).sort({ createdAt: -1 })

    res.json(payments)
  } catch (error) {
    console.error("Get client payments error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
