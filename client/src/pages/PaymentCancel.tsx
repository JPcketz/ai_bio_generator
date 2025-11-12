import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Home, CreditCard } from "lucide-react";

export default function PaymentCancel() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full gradient-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Payment Cancelled</CardTitle>
          <CardDescription className="text-lg">
            Your payment was not completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-2 text-center">
            <p className="text-muted-foreground">
              No charges were made to your account.
            </p>
            <p className="text-muted-foreground">
              If you encountered any issues, please try again or contact support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              onClick={() => setLocation("/")}
              variant="default"
              size="lg"
              className="flex-1 gradient-bg-purple-turquoise text-white"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
