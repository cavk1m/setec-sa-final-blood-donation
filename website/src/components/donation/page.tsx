// components/donation-page/DonationPage.tsx
// Drop inside your existing layout — no header or footer included.

"use client";

import { useState } from "react";

import { CampaignInfo } from "./campaign-info";
import { PersonalInfoFields } from "./form/personal-info-fields";
import { PaymentMethodToggle } from "./toggle/payment-method-toggle";
import { QRPaymentPanel } from "./panels/qr-payment-panel";
import { VisaPaymentPanel } from "./panels/visa-payment-panel";
import { ConfirmationModal } from "./model/confirmation-modal";
import {
  DonationFormData,
  DonationReceipt,
  INITIAL_FORM,
} from "@/src/definitions/donation";

// ── Mock submit ───────────────────────────────────────────────────────────────
async function mockSubmitDonation(
  data: DonationFormData,
): Promise<DonationReceipt> {
  await new Promise((r) => setTimeout(r, 1200));
  const resolvedAmount = 25;
  return {
    campaign: "Pakistan Flood Relief",
    amount: resolvedAmount,
    reference: "HF-992-RELIEF",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    method: data.paymentMethod,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
export function DonationPage() {
  const [form, setForm] = useState<DonationFormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  const set = <K extends keyof DonationFormData>(
    key: K,
    value: DonationFormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const res = await mockSubmitDonation(form);
      setReceipt(res);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDone = () => {
    setReceipt(null);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 pt-32 md:pt-36 pb-24 md:pb-32">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ── LEFT: Campaign info + form inputs ── */}
        <section className="lg:col-span-6 space-y-10">
          <CampaignInfo
            title="Pakistan Flood Relief:"
            titleItalic="Rebuilding Lives"
            description="Thousands have lost their homes. Your contribution provides immediate medical aid, clean water, and emergency shelter to families in the hardest-hit regions."
            raised={85420}
            goal={150000}
          />

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_12px_40px_rgba(88,65,65,0.06)] border border-[#e0bfbf]/20">
            <PersonalInfoFields
              fullName={form.fullName}
              email={form.email}
              onFullNameChange={(v) => set("fullName", v)}
              onEmailChange={(v) => set("email", v)}
            />
          </div>
        </section>

        {/* ── RIGHT: Payment panel (sticky) ── */}
        <aside className="lg:col-span-6 lg:sticky lg:top-32">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_12px_40px_rgba(88,65,65,0.08)] border border-[#e0bfbf]/20 space-y-8">
            {/* Payment method toggle */}
            <PaymentMethodToggle
              selected={form.paymentMethod}
              onChange={(m) => set("paymentMethod", m)}
            />

            {/* Conditional panel */}
            {form.paymentMethod === "qr" ? (
              <QRPaymentPanel
                reference="HF-992-RELIEF"
                onConfirm={handleConfirm}
                submitting={submitting}
              />
            ) : (
              <VisaPaymentPanel
                cardNumber={form.cardNumber}
                cardName={form.cardName}
                cardExpiry={form.cardExpiry}
                cardCvc={form.cardCvc}
                onCardNumberChange={(v) => set("cardNumber", v)}
                onCardNameChange={(v) => set("cardName", v)}
                onCardExpiryChange={(v) => set("cardExpiry", v)}
                onCardCvcChange={(v) => set("cardCvc", v)}
                onConfirm={handleConfirm}
                submitting={submitting}
              />
            )}
          </div>
        </aside>
      </div>

      {/* Confirmation modal */}
      {receipt && <ConfirmationModal receipt={receipt} onDone={handleDone} />}
    </div>
  );
}

export default DonationPage;
