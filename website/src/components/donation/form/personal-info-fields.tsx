// components/donation-page/PersonalInfoFields.tsx

import { Input } from "@/components/ui/input";
import { INPUT_CLS } from "@/definitions/donation";

interface PersonalInfoFieldsProps {
  fullName: string;
  email: string;
  onFullNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
}

export function PersonalInfoFields({
  fullName,
  email,
  onFullNameChange,
  onEmailChange,
}: PersonalInfoFieldsProps) {
  return (
    <div className="space-y-5">
      <h3 className="font-serif text-2xl font-bold text-[#1c1b1f]">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          className={INPUT_CLS}
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={INPUT_CLS}
        />
      </div>
    </div>
  );
}
