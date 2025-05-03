import Stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Create Stripe payment
export const createStripePayment = async (payment, client) => {
  try {
    // Create a payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: payment.currency.toLowerCase(),
            product_data: {
              name: payment.description || "Services",
            },
            unit_amount: Math.round(payment.amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        paymentId: payment._id.toString(),
        clientId: client._id.toString(),
      },
    })

    return {
      url: paymentLink.url,
    }
  } catch (error) {
    console.error("Create Stripe payment error:", error)
    throw new Error("Error creating Stripe payment")
  }
}

// Handle Stripe webhook
export const handleStripeWebhook = async (event) => {
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object

        // Extract payment ID from metadata
        const paymentId = session.metadata.paymentId

        return {
          paymentId,
          transactionId: session.payment_intent,
        }

      default:
        return null
    }
  } catch (error) {
    console.error("Handle Stripe webhook error:", error)
    throw new Error("Error handling Stripe webhook")
  }
}
