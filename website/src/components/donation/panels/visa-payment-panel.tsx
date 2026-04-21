"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { INPUT_CLS } from "@/definitions/donation";

interface VisaPaymentPanelProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  onCardNumberChange: (v: string) => void;
  onCardNameChange: (v: string) => void;
  onCardExpiryChange: (v: string) => void;
  onCardCvcChange: (v: string) => void;
  onConfirm: () => void;
  submitting: boolean;
}

/** Format card number as XXXX XXXX XXXX XXXX */
function formatCardNumber(raw: string) {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

/** Format expiry as MM/YY */
function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

/** Mask card for display */
function maskCard(number: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "•••• •••• •••• ••••";
  const groups = digits.padEnd(16, "•").match(/.{1,4}/g) ?? [];
  return groups.map((g, i) => (i < 3 ? g.replace(/\d/g, "•") : g)).join(" ");
}

export function VisaPaymentPanel({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvc,
  onCardNumberChange,
  onCardNameChange,
  onCardExpiryChange,
  onCardCvcChange,
  onConfirm,
  submitting,
}: VisaPaymentPanelProps) {
  const displayCard = maskCard(cardNumber);
  const displayName = cardName || "YOUR NAME";
  const displayExp = cardExpiry || "MM/YY";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="font-serif text-3xl font-bold text-[#670017]">
          Card Payment
        </h2>
        <p className="text-[#584141] font-sans text-sm">
          Enter your card details below
        </p>
      </div>

      {/* Card preview */}
      <div
        className="relative w-full aspect-[1.586/1] rounded-2xl p-6 overflow-hidden shadow-2xl select-none"
        style={{
          background: "linear-gradient(135deg, #670017 0%, #3d000e 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />

        {/* Chip */}
        <div className="absolute top-6 left-6">
          <div className="w-10 h-8 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-md grid grid-cols-2 gap-px p-1 opacity-90">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-sm bg-yellow-600/40" />
            ))}
          </div>
        </div>

        {/* VISA logo */}
        <div className="absolute top-6 right-6">
          <span className="text-white font-serif font-black italic text-2xl tracking-tight opacity-90">
            VISA
          </span>
        </div>

        {/* Card number */}
        <div className="absolute bottom-16 left-6 right-6">
          <p className="text-white/90 font-mono text-lg tracking-[0.2em] font-bold">
            {displayCard}
          </p>
        </div>

        {/* Name + Expiry */}
        <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest font-sans mb-0.5">
              Card Holder
            </p>
            <p className="text-white/90 text-xs font-bold font-sans uppercase tracking-wider">
              {displayName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[9px] uppercase tracking-widest font-sans mb-0.5">
              Expires
            </p>
            <p className="text-white/90 text-xs font-bold font-mono">
              {displayExp}
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Card number */}
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => onCardNumberChange(formatCardNumber(e.target.value))}
          maxLength={19}
          className={cn(INPUT_CLS, "font-mono tracking-widest")}
        />

        {/* Card name */}
        <Input
          type="text"
          placeholder="Name on Card"
          value={cardName}
          onChange={(e) => onCardNameChange(e.target.value.toUpperCase())}
          className={cn(INPUT_CLS, "uppercase tracking-wider")}
        />

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="MM / YY"
            value={cardExpiry}
            onChange={(e) => onCardExpiryChange(formatExpiry(e.target.value))}
            maxLength={5}
            className={cn(INPUT_CLS, "font-mono")}
          />
          <div className="relative">
            <Input
              type="password"
              placeholder="CVC"
              value={cardCvc}
              onChange={(e) =>
                onCardCvcChange(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              maxLength={4}
              className={cn(INPUT_CLS, "font-mono")}
            />
            {/* Lock icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8c7070"
              strokeWidth="2"
              className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 opacity-50"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Accepted card logos */}
      <div className="flex items-center gap-3 justify-center opacity-50">
        {["VISA", "MC", "AMEX"].map((brand) => (
          <span
            key={brand}
            className="px-3 py-1 border border-[#e0bfbf] rounded text-[10px] font-bold tracking-widest text-[#584141] font-sans"
          >
            {brand}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Button
        onClick={onConfirm}
        disabled={submitting}
        className="w-full rounded-full py-5 text-white font-bold text-base shadow-lg active:scale-[0.98] transition-all font-sans disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
        }}
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="3"
                strokeOpacity="0.3"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Processing…
          </span>
        ) : (
          "Pay Now"
        )}
      </Button>

      <p className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-[#584141]/40 font-sans">
        Secure SSL Encrypted Transaction
      </p>
    </div>
  );
}
