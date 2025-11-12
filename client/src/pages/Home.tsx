import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, Download, Share2, Check, Zap, TrendingUp, Heart, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  generateMultipleBios,
  type BioStyle,
  type Platform,
  bioStyleDescriptions,
  platformDescriptions,
} from "@/lib/bioGenerator";
import {
  generateProfilePictureUrl,
  generateMultipleProfilePictures,
  downloadProfilePicture,
  type ProfilePictureConfig,
} from "@/lib/profilePictureGenerator";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [selectedStyle, setSelectedStyle] = useState<BioStyle>("professional");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [keywords, setKeywords] = useState("");
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProfilePictures, setGeneratedProfilePictures] = useState<ProfilePictureConfig[]>([]);
  const [isGeneratingPictures, setIsGeneratingPictures] = useState(false);
  const [showProfilePictureSection, setShowProfilePictureSection] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const keywordArray = keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      const bios = generateMultipleBios(
        {
          style: selectedStyle,
          platform: selectedPlatform,
          keywords: keywordArray,
          includeEmojis: true,
          length: "medium",
        },
        3
      );

      setGeneratedBios(bios);
      setIsGenerating(false);
      toast.success("🎉 Bios generated successfully!");
    }, 800);
  };

  const handleCopy = (bio: string, index: number) => {
    navigator.clipboard.writeText(bio);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleDownload = (bio: string) => {
    const blob = new Blob([bio], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bio-${selectedPlatform}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Bio downloaded!");
  };

  const handleShare = (bio: string) => {
    const shareText = `Check out my new bio! 🚀\n\n${bio}\n\nGenerate yours at: ${window.location.href}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleGenerateProfilePictures = () => {
    if (generatedBios.length === 0) {
      toast.error("Please generate a bio first!");
      return;
    }

    setIsGeneratingPictures(true);
    setShowProfilePictureSection(true);

    // Simulate loading for better UX
    setTimeout(() => {
      const pictures = generateMultipleProfilePictures(
        selectedStyle,
        selectedPlatform,
        generatedBios[0], // Use first bio as seed
        3
      );
      setGeneratedProfilePictures(pictures);
      setIsGeneratingPictures(false);
      toast.success("🎨 Profile pictures generated!");
    }, 1000);
  };

  const handleDownloadProfilePicture = async (picture: ProfilePictureConfig, index: number) => {
    try {
      const filename = `profile-picture-${selectedStyle}-${index + 1}.svg`;
      await downloadProfilePicture(picture.url, filename);
      toast.success("Profile picture downloaded!");
    } catch (error) {
      toast.error("Failed to download profile picture");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* AdSense Top Banner Placeholder */}
      <div className="bg-muted/20 border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-center text-xs text-muted-foreground">
            <div className="text-center">
              <p className="mb-1">Advertisement</p>
              <div className="bg-muted/50 rounded px-4 py-2 border border-border">
                {/* Replace with actual AdSense code after approval */}
                <p className="text-sm">Google AdSense Banner (728x90) - Pending Approval</p>
                <p className="text-xs mt-1">Insert your AdSense code here after account approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg-dark py-20 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="gradient-bg-purple-turquoise text-white border-0 px-4 py-1.5 text-sm font-semibold">
              <Zap className="w-4 h-4 mr-1.5" />
              Free AI Bio Generator
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Create Your Perfect{" "}
              <span className="gradient-text">Social Bio</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Generate viral, personalized bios for Instagram, Twitter, TikTok & LinkedIn in seconds. 
              Stand out from the crowd with AI-powered creativity.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>10,000+ bios generated</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>No signup required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="gradient-border glow-gradient bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Customize Your Bio</CardTitle>
                <CardDescription className="text-base">
                  Select your style, platform, and add keywords to generate the perfect bio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Style Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Bio Style</Label>
                  <RadioGroup
                    value={selectedStyle}
                    onValueChange={(value) => setSelectedStyle(value as BioStyle)}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4"
                  >
                    {Object.entries(bioStyleDescriptions).map(([style, description]) => (
                      <div key={style}>
                        <RadioGroupItem
                          value={style}
                          id={style}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={style}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
                        >
                          <span className="text-sm font-semibold capitalize">{style}</span>
                          <span className="text-xs text-muted-foreground text-center mt-1">
                            {description}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Platform Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Platform</Label>
                  <RadioGroup
                    value={selectedPlatform}
                    onValueChange={(value) => setSelectedPlatform(value as Platform)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {Object.entries(platformDescriptions).map(([platform, description]) => (
                      <div key={platform}>
                        <RadioGroupItem
                          value={platform}
                          id={platform}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={platform}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/10 cursor-pointer transition-all"
                        >
                          <span className="text-sm font-semibold capitalize">{platform}</span>
                          <span className="text-xs text-muted-foreground text-center mt-1">
                            {description}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Keywords Input */}
                <div className="space-y-4">
                  <Label htmlFor="keywords" className="text-lg font-semibold">
                    Keywords (Optional)
                  </Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., travel, photography, entrepreneur (comma-separated)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="bg-background border-border text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Add up to 3 keywords to personalize your bio
                  </p>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full gradient-bg-purple-turquoise text-white text-lg py-6 font-bold hover:opacity-90 transition-opacity animate-pulse-glow"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Generating Your Bios...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate My Bio
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Bios */}
            {generatedBios.length > 0 && (
              <div className="mt-12 space-y-6">
                <h2 className="text-3xl font-bold text-center">
                  Your Generated Bios <span className="gradient-text">✨</span>
                </h2>
                
                <div className="grid gap-6 md:grid-cols-1">
                  {generatedBios.map((bio, index) => (
                    <Card key={index} className="gradient-border bg-card text-card-foreground">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <p className="text-base leading-relaxed whitespace-pre-line font-medium">
                            {bio}
                          </p>
                          
                          <div className="flex flex-wrap gap-3">
                            <Button
                              onClick={() => handleCopy(bio, index)}
                              variant="outline"
                              size="sm"
                              className="flex-1 sm:flex-none"
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </>
                              )}
                            </Button>
                            
                            <Button
                              onClick={() => handleDownload(bio)}
                              variant="outline"
                              size="sm"
                              className="flex-1 sm:flex-none"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            
                            <Button
                              onClick={() => handleShare(bio)}
                              variant="outline"
                              size="sm"
                              className="flex-1 sm:flex-none"
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleGenerate}
                      variant="outline"
                      size="lg"
                      className="gradient-border"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate More Bios
                    </Button>
                    
                    <Button
                      onClick={handleGenerateProfilePictures}
                      variant="default"
                      size="lg"
                      className="gradient-bg-purple-turquoise text-white"
                      disabled={isGeneratingPictures}
                    >
                      {isGeneratingPictures ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-5 w-5" />
                          Generate Matching Profile Picture
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Pictures Section */}
            {showProfilePictureSection && generatedProfilePictures.length > 0 && (
              <div className="mt-16 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">
                    Your Matching Profile Pictures <span className="gradient-text">🎨</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Choose the perfect avatar that matches your bio style
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                  {generatedProfilePictures.map((picture, index) => (
                    <Card key={index} className="gradient-border bg-card text-card-foreground overflow-hidden">
                      <CardContent className="p-6 space-y-4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                          <img
                            src={picture.url}
                            alt={`Profile picture ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground text-center capitalize">
                            Style: {picture.style.replace('-', ' ')}
                          </p>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleDownloadProfilePicture(picture, index)}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            
                            <Button
                              onClick={() => {
                                window.open(picture.url, '_blank');
                              }}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              View Full
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleGenerateProfilePictures}
                    variant="outline"
                    size="lg"
                    className="gradient-border"
                  >
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Generate New Variations
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Monetization Section - Premium Templates CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="gradient-bg-purple-turquoise text-white border-0">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Want Premium Bio Templates?
                </h2>
                <p className="text-lg md:text-xl opacity-90">
                  Get access to 100+ professionally crafted bio templates, industry-specific styles, 
                  and advanced customization options.
                </p>
                <Button
                  onClick={async () => {
                    try {
                      const { url } = await trpc.stripe.createCheckoutSession.mutate({
                        productId: "PREMIUM_BIO_TEMPLATES",
                      });
                      if (url) {
                        toast.info("Redirecting to checkout...");
                        window.open(url, "_blank");
                      }
                    } catch (error) {
                      toast.error("Failed to create checkout session. Please try again.");
                    }
                  }}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6"
                >
                  Get Premium Templates - $9.99
                </Button>
                <p className="text-sm opacity-75">
                  One-time payment • Instant access • Lifetime updates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* A-Ads Crypto Ad Network */}
      <section className="py-12 bg-muted/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Sponsored</p>
            <div className="bg-card border border-border rounded-lg p-6">
              {/* Replace with actual A-Ads code */}
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold mb-2">A-Ads Crypto Network (300x250)</p>
                <p className="text-xs">Insert your A-Ads code here</p>
                <p className="text-xs mt-2">Sign up at: <a href="https://a-ads.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">a-ads.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AI Bio Generator. Made with ❤️ for creators everywhere.</p>
            <p className="mt-2">
              Share this tool with your friends and help them create amazing bios too!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
