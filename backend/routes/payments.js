import express from "express"
import Payment from "../models/Payment.js"
import Client from "../models/Client.js"
import Contract from "../models/Contract.js"
import { authenticateToken } from "../middleware/auth.js"
import { createStripePayment } from "../utils/stripe.js"
import { createPayPalPayment } from "../utils/paypal.js"
import { sendPaymentEmail } from "../utils/email.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

// Get all payments for the authenticated user
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.userId })
      .populate("client", "name email company")
      .populate("contract", "title")
      .sort({ createdAt: -1 })

    res.json(payments)
  } catch (error) {
    console.error("Get payments error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a single payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      user: req.user.userId,
    })
      .populate("client", "name email company")
      .populate("contract", "title")

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" })
    }

    res.json(payment)
  } catch (error) {
    console.error("Get payment error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new payment request
router.post("/", async (req, res) => {
  try {
    const { clientId, contractId, amount, currency, description, paymentMethod, dueDate } = req.body

    // Verify client exists and belongs to user
    const client = await Client.findOne({
      _id: clientId,
      user: req.user.userId,
    })

    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    // Verify contract if provided
    if (contractId) {
      const contract = await Contract.findOne({
        _id: contractId,
        user: req.user.userId,
        client: clientId,
      })

      if (!contract) {
        return res.status(404).json({ message: "Contract not found or does not belong to this client" })
      }
    }

    // Create payment
    const payment = new Payment({
      user: req.user.userId,
      client: clientId,
      contract: contractId,
      amount,
      currency,
      description,
      paymentMethod,
      status: "pending",
      dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days
    })

    // Generate payment link based on method
    let paymentLink
    if (paymentMethod === "stripe") {
      const stripeResult = await createStripePayment(payment, client)
      payment.invoiceUrl = stripeResult.url
    } else if (paymentMethod === "paypal") {
      const paypalResult = await createPayPalPayment(payment, client)
      payment.invoiceUrl = paypalResult.url
    }

    await payment.save()

    // Send email to client
    await sendPaymentEmail(payment, client)

    res.status(201).json(payment)
  } catch (error) {
    console.error("Create payment error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Mark payment as paid (webhook callback from payment processor)
router.post("/webhook/paid", async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body

    const payment = await Payment.findById(paymentId)

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" })
    }

    payment.status = "paid"
    payment.transactionId = transactionId
    payment.paidAt = new Date()

    await payment.save()

    res.json({ message: "Payment marked as paid successfully" })
  } catch (error) {
    console.error("Webhook paid payment error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get payments by status
router.get("/status/:status", async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user.userId,
      status: req.params.status,
    })
      .populate("client", "name email company")
      .populate("contract", "title")
      .sort({ createdAt: -1 })

    res.json(payments)
  } catch (error) {
    console.error("Get payments by status error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get payments by client
router.get("/client/:clientId", async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user.userId,
      client: req.params.clientId,
    })
      .populate("client", "name email company")
      .populate("contract", "title")
      .sort({ createdAt: -1 })

    res.json(payments)
  } catch (error) {
    console.error("Get payments by client error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
