import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import clientRoutes from "./routes/clients.js"
import templateRoutes from "./routes/templates.js"
import contractRoutes from "./routes/contracts.js"
import paymentRoutes from "./routes/payments.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/clients", clientRoutes)
app.use("/api/templates", templateRoutes)
app.use("/api/contracts", contractRoutes)
app.use("/api/payments", paymentRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("OnboardPro API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
