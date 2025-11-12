import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import Stripe from "stripe";
import { ENV } from "./_core/env";
import { PREMIUM_BIO_TEMPLATES } from "./products";

// Initialize Stripe
const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2024-12-18.acacia",
});

export const stripeRouter = router({
  /**
   * Create a checkout session for premium bio templates
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        productId: z.enum(["PREMIUM_BIO_TEMPLATES"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = PREMIUM_BIO_TEMPLATES;
      
      const origin = ctx.req.headers.origin || `https://${ctx.req.headers.host}`;

      try {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: product.currency,
                product_data: {
                  name: product.name,
                  description: product.description,
                },
                unit_amount: product.amount,
              },
              quantity: 1,
            },
          ],
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
            product_id: input.productId,
          },
          allow_promotion_codes: true,
          success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/payment-cancel`,
        });

        return {
          url: session.url,
          sessionId: session.id,
        };
      } catch (error) {
        console.error("[Stripe] Failed to create checkout session:", error);
        throw new Error("Failed to create checkout session");
      }
    }),

  /**
   * Get checkout session details
   */
  getCheckoutSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const session = await stripe.checkout.sessions.retrieve(input.sessionId);
        
        return {
          id: session.id,
          status: session.payment_status,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          currency: session.currency,
        };
      } catch (error) {
        console.error("[Stripe] Failed to retrieve checkout session:", error);
        throw new Error("Failed to retrieve checkout session");
      }
    }),

  /**
   * Get user's payment history (mock for now - extend with database later)
   */
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Query from database once payment records are stored
    // For now, return empty array
    return [];
  }),
});
