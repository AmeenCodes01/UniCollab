"use client";

import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/copyToClipboard";

export const useClipboardWithToast = () => {
  const { toast } = useToast();

  const handleCopy = async (text: string) => {
    try {
      await copyToClipboard(text);
      toast({
        title: "Email copied to clipboard",
      });
      
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "There was an issue copying to clipboard.",
        variant: "destructive",
      });
    }
  };

  return { copyToClipboard: handleCopy };
};
