import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

// Get PayPal access token
const getPayPalAccessToken = async () => {
  try {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64")

    const response = await axios({
      method: "post",
      url: `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      data: "grant_type=client_credentials",
    })

    return response.data.access_token
  } catch (error) {
    console.error("Get PayPal access token error:", error)
    throw new Error("Error getting PayPal access token")
  }
}

// Create PayPal payment
export const createPayPalPayment = async (payment, client) => {
  try {
    // This is a mock implementation
    // In a real app, you would use the PayPal SDK

    // For development purposes, we'll return a mock response
    return {
      url: `https://example.com/paypal/${payment._id}`,
    }

    // Real implementation would look something like this:
    /*
    const accessToken = await getPayPalAccessToken();
    
    const response = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: payment.currency.toUpperCase(),
              value: payment.amount.toFixed(2)
            },
            description: payment.description || 'Services',
            custom_id: payment._id.toString()
          }
        ],
        application_context: {
          brand_name: client.company || 'Your Service Provider',
          return_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
        }
      }
    });
    
    return {
      url: response.data.links.find(link => link.rel === 'approve').href
    };
    */
  } catch (error) {
    console.error("Create PayPal payment error:", error)
    throw new Error("Error creating PayPal payment")
  }
}

// Handle PayPal webhook
export const handlePayPalWebhook = async (event) => {
  try {
    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = event.resource

      return {
        paymentId: resource.custom_id,
        transactionId: resource.id,
      }
    }

    return null
  } catch (error) {
    console.error("Handle PayPal webhook error:", error)
    throw new Error("Error handling PayPal webhook")
  }
}
