// components/donation-page/types.ts

export type PaymentMethod = "qr" | "visa";

export type DonationAmount = 10 | 25 | 50 | 100 | null;

export interface DonationFormData {
  amount: DonationAmount;
  customAmount: string;
  fullName: string;
  email: string;
  paymentMethod: PaymentMethod;
  // Visa-specific
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface DonationReceipt {
  campaign: string;
  amount: number;
  reference: string;
  date: string;
  method: PaymentMethod;
}

// export const PRESET_AMOUNTS: DonationAmount[] = [10, 25, 50, 100];

// Shared Tailwind input style
export const INPUT_CLS =
  "w-full bg-[#f7f2f8] border-none rounded-xl py-4 px-6 text-sm text-[#1c1b1f] placeholder:text-[#8c7070]/60 focus:ring-2 focus:ring-[#670017] transition-all font-sans outline-none";
