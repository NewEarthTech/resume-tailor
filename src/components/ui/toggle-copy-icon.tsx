import { ElementRef, forwardRef, useEffect, useState } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { CopyCheck, CopyIcon, Italic, LucideIcon } from "lucide-react";

import { Toggle, ToggleRefProps } from "@/components/ui/toggle";

const ToggleCopyIcon = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ToggleRefProps & {
    textToCopy: string;
  }
>(({ textToCopy, className, variant, size, ...props }, ref) => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [hasCopiedText, setHasCopied] = useState<boolean>(false);
  const Icon = hasCopiedText ? CopyCheck : CopyIcon;
  useEffect(() => {
    setHasCopied(copiedText === textToCopy);
    setTimeout(() => {
      setHasCopied(false);
    }, 5000);
    return () => {
      setHasCopied(false);
    };
  }, [copiedText, textToCopy, copyToClipboard]);
  const handleToggle = () => {
    copyToClipboard(textToCopy);
  };
  return (
    <Toggle
      pressed={hasCopiedText}
      onPressedChange={() => handleToggle()}
      size="lg"
      aria-label="Toggle italic"
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  );
});

ToggleCopyIcon.displayName = TogglePrimitive.Root.displayName;

export { ToggleCopyIcon };
