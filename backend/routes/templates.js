import express from "express"
import Template from "../models/Template.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

// Get all templates for the authenticated user
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find({
      $or: [{ user: req.user.userId }, { isPublic: true }],
    }).sort({ createdAt: -1 })

    res.json(templates)
  } catch (error) {
    console.error("Get templates error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a single template by ID
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      $or: [{ user: req.user.userId }, { isPublic: true }],
    })

    if (!template) {
      return res.status(404).json({ message: "Template not found" })
    }

    res.json(template)
  } catch (error) {
    console.error("Get template error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new template
router.post("/", async (req, res) => {
  try {
    const { title, description, content, category, dynamicFields, isPublic } = req.body

    const template = new Template({
      user: req.user.userId,
      title,
      description,
      content,
      category,
      dynamicFields,
      isPublic: isPublic || false,
    })

    await template.save()
    res.status(201).json(template)
  } catch (error) {
    console.error("Create template error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a template
router.put("/:id", async (req, res) => {
  try {
    const { title, description, content, category, dynamicFields, isPublic } = req.body

    const template = await Template.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description, content, category, dynamicFields, isPublic },
      { new: true, runValidators: true },
    )

    if (!template) {
      return res.status(404).json({ message: "Template not found or you do not have permission to update it" })
    }

    res.json(template)
  } catch (error) {
    console.error("Update template error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a template
router.delete("/:id", async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    })

    if (!template) {
      return res.status(404).json({ message: "Template not found or you do not have permission to delete it" })
    }

    res.json({ message: "Template deleted successfully" })
  } catch (error) {
    console.error("Delete template error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get templates by category
router.get("/category/:category", async (req, res) => {
  try {
    const templates = await Template.find({
      category: req.params.category,
      $or: [{ user: req.user.userId }, { isPublic: true }],
    }).sort({ createdAt: -1 })

    res.json(templates)
  } catch (error) {
    console.error("Get templates by category error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
