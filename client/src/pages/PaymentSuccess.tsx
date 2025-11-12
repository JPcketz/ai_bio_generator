import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, Home } from "lucide-react";

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    setSessionId(sid);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full gradient-border glow-gradient">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Payment Successful!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">What's Next?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>You now have access to 100+ premium bio templates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Check your email for the download link and access instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access with free updates</span>
              </li>
            </ul>
          </div>

          {sessionId && (
            <div className="text-sm text-muted-foreground text-center">
              <p>Order ID: {sessionId.substring(0, 20)}...</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setLocation("/")}
              variant="default"
              size="lg"
              className="flex-1 gradient-bg-purple-turquoise text-white"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              onClick={() => {
                // TODO: Link to actual download page
                window.open("https://gumroad.com/library", "_blank");
              }}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
