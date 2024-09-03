"use client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
export const ToastDemo = () => {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    variant: "default",
                    title: "Success! Mail Send to Mr XYZ",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                })
            }}
        >
            Send Mail
        </Button>
    );
}
