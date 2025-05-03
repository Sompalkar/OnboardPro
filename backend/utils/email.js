import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Send contract email
export const sendContractEmail = async (contract) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contract.client.email,
      subject: `Contract: ${contract.title} - Signature Required`,
      html: `
        <h2>Hello ${contract.client.name},</h2>
        <p>You have received a contract that requires your signature.</p>
        <p><strong>Contract:</strong> ${contract.title}</p>
        <p>Please click the link below to review and sign the contract:</p>
        <p><a href="${contract.signatureRequest.url}" target="_blank">View and Sign Contract</a></p>
        <p>This link will expire on ${new Date(contract.signatureRequest.expiresAt).toLocaleDateString()}.</p>
        <p>Thank you,<br>Your Service Provider</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error("Send contract email error:", error)
    throw new Error("Error sending contract email")
  }
}

// Send payment email
export const sendPaymentEmail = async (payment, client) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: client.email,
      subject: `Payment Request: ${payment.description || "Invoice"}`,
      html: `
        <h2>Hello ${client.name},</h2>
        <p>You have received a payment request.</p>
        <p><strong>Amount:</strong> ${payment.currency} ${payment.amount.toFixed(2)}</p>
        <p><strong>Description:</strong> ${payment.description || "Services rendered"}</p>
        <p><strong>Due Date:</strong> ${new Date(payment.dueDate).toLocaleDateString()}</p>
        <p>Please click the link below to make your payment:</p>
        <p><a href="${payment.invoiceUrl}" target="_blank">Pay Now</a></p>
        <p>Thank you for your business!</p>
        <p>Your Service Provider</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error("Send payment email error:", error)
    throw new Error("Error sending payment email")
  }
}
