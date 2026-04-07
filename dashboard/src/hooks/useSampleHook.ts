import { useState } from 'react';
export function useSampleHook() {
  const [value, setValue] = useState(0);
  return { value, setValue };
}
