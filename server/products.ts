/**
 * Stripe Product Configuration
 * Define your products and prices here for centralized management
 */

export interface ProductConfig {
  name: string;
  description: string;
  priceId: string; // Stripe Price ID (create in Stripe Dashboard)
  amount: number; // Amount in cents
  currency: string;
  features: string[];
}

/**
 * Premium Bio Templates Product
 * Users get access to 100+ professionally crafted bio templates
 */
export const PREMIUM_BIO_TEMPLATES: ProductConfig = {
  name: "Premium Bio Templates",
  description: "Access 100+ professionally crafted bio templates with industry-specific styles and advanced customization options",
  priceId: process.env.STRIPE_PREMIUM_TEMPLATES_PRICE_ID || "price_premium_templates", // Replace with actual Stripe Price ID
  amount: 999, // $9.99
  currency: "usd",
  features: [
    "100+ premium bio templates",
    "Industry-specific styles",
    "Advanced customization options",
    "Lifetime access",
    "Free updates forever",
    "Priority support"
  ]
};

/**
 * All available products
 */
export const PRODUCTS = {
  PREMIUM_BIO_TEMPLATES,
} as const;

/**
 * Get product by price ID
 */
export function getProductByPriceId(priceId: string): ProductConfig | undefined {
  return Object.values(PRODUCTS).find(product => product.priceId === priceId);
}
