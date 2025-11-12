import { Request, Response } from "express";
import Stripe from "stripe";
import { ENV } from "./_core/env";

const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2024-12-18.acacia",
});

/**
 * Stripe Webhook Handler
 * Processes Stripe webhook events for payment confirmations
 * 
 * IMPORTANT: This route MUST be registered with express.raw() middleware
 * in server/_core/index.ts BEFORE express.json()
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("[Stripe Webhook] Missing stripe-signature header");
    return res.status(400).send("Missing stripe-signature header");
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      ENV.stripeWebhookSecret
    );
  } catch (err) {
    const error = err as Error;
    console.error("[Stripe Webhook] Signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Stripe Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

  try {
    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("[Stripe Webhook] Checkout session completed:", {
          sessionId: session.id,
          userId: session.metadata?.user_id,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
        });

        // TODO: Store payment record in database
        // Example:
        // await db.insert(payments).values({
        //   userId: parseInt(session.metadata?.user_id || "0"),
        //   stripeSessionId: session.id,
        //   stripePaymentIntentId: session.payment_intent as string,
        //   amount: session.amount_total || 0,
        //   currency: session.currency || "usd",
        //   status: "completed",
        //   productId: session.metadata?.product_id,
        // });

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Stripe Webhook] Payment succeeded:", {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Stripe Webhook] Payment failed:", {
          paymentIntentId: paymentIntent.id,
          lastError: paymentIntent.last_payment_error?.message,
        });
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    // Return success response
    res.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Error processing event:", error);
    res.status(500).send("Webhook handler failed");
  }
}
