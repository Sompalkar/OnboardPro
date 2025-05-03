import express from "express"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

// Update user profile
router.put("/profile", async (req, res) => {
  try {
    const { name, company } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, company },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Change password
router.put("/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Find user with password
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update subscription
router.put("/subscription", async (req, res) => {
  try {
    const { plan, status, endDate } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        "subscription.plan": plan,
        "subscription.status": status,
        "subscription.endDate": endDate ? new Date(endDate) : undefined,
      },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Update subscription error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
