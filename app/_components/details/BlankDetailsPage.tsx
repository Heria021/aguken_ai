import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { redirect } from "next/navigation";

interface BlankDetailsPageProps {
  onBack?: () => void;
}

export default function BlankDetailsPage({ onBack }: BlankDetailsPageProps) {
  return (
    <Card className="bg-background border border-border shadow-none rounded-2xl p-6">
      <CardContent className="py-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Details Coming Soon</h2>
          <p className="text-muted-foreground">
            We're still working on the details form for this business type.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t border-border">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={redirect('/')}>
          Home
        </Button>
      </CardFooter>
    </Card>
  );
}
