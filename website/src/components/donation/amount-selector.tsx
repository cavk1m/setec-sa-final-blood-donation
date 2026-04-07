// components/donation-page/AmountSelector.tsx

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DonationAmount,
  PRESET_AMOUNTS,
  INPUT_CLS,
} from "@/src/definitions/donation";

interface AmountSelectorProps {
  amount: DonationAmount;
  customAmount: string;
  onAmountChange: (a: DonationAmount) => void;
  onCustomAmountChange: (v: string) => void;
}

export function AmountSelector({
  amount,
  customAmount,
  onAmountChange,
  onCustomAmountChange,
}: AmountSelectorProps) {
  return (
    <div className="space-y-5">
      <h3 className="font-serif text-2xl font-bold text-[#1c1b1f]">
        Choose an amount
      </h3>

      {/* Preset chips */}
      <div className="grid grid-cols-4 gap-3">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              onAmountChange(preset);
              onCustomAmountChange("");
            }}
            className={cn(
              "py-4 px-2 rounded-full font-bold text-lg transition-all duration-200 active:scale-95 cursor-pointer",
              amount === preset && !customAmount
                ? "text-white shadow-xl scale-105"
                : "border border-[#e0bfbf] text-[#1c1b1f] hover:border-[#670017] hover:text-[#670017]",
            )}
            style={
              amount === preset && !customAmount
                ? {
                    background:
                      "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
                  }
                : {}
            }
          >
            ${preset}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8c7070]/60 font-bold select-none">
          $
        </span>
        <Input
          type="text"
          placeholder="Custom Amount"
          value={customAmount}
          onChange={(e) => {
            onCustomAmountChange(e.target.value);
            onAmountChange(null);
          }}
          className={cn(INPUT_CLS, "pl-12 py-5 text-lg font-medium")}
        />
      </div>
    </div>
  );
}
