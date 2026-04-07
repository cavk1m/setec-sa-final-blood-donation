// components/donor-registration/InfoBento.tsx

export function InfoBento() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* What happens next */}
      <div className="sm:col-span-2 p-6 rounded-2xl bg-white border border-[#e0bfbf]/30 shadow-sm">
        <h4 className="text-lg font-serif font-bold text-[#670017] mb-2">
          What happens next?
        </h4>
        <p className="text-sm text-[#584141] leading-relaxed font-sans">
          Once registered, you'll receive a digital queue number. Present this
          at your selected donation center. Our medical team will perform a
          final vital check before proceeding with your donation.
        </p>
      </div>

      {/* Impact tile */}
      <div className="p-6 rounded-2xl bg-[#670017] text-white flex flex-col items-center justify-center text-center shadow-lg shadow-[#670017]/20">
        <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 mb-3">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h4 className="font-bold text-lg mb-0.5 font-sans">1 Donation</h4>
        <p className="text-xs opacity-75 font-sans">Can save up to 3 lives.</p>
      </div>
    </div>
  );
}
