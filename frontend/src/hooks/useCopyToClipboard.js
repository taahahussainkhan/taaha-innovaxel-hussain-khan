import { useState } from 'react';

export default function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (error) {
      console.error("Copy failed:", error);
      setCopied(false);
      return false;
    }
  };

  return [copied, copy];
}
