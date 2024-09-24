"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function ToastMessage({
  title = "Uh oh! Something went wrong.",
  description = "There was a problem with your request.",
}: {
  title: string;
  description: string;
}) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title,
          description,
        });
      }}>
      Show Toast
    </Button>
  );
}
