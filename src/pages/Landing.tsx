import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Wallet,
  Zap,
  Shield,
  Globe,
  Users,
  MessageCircle,
  Gift,
  ShoppingBag,
  Coins,
  Heart,
  Star,
  Sparkles,
  TrendingUp,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { connectWallet } = useWallet();

  const handleConnect = async () => {
    await connectWallet();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            CrossBeg
          </h1>
          <Badge className="bg-commerce/10 text-commerce border-commerce/20 hidden sm:flex">
            <Sparkles className="w-3 h-3 mr-1" />
            Social Commerce
          </Badge>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={handleConnect}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base px-3 sm:px-4"
          >
            <Wallet className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4 text-xs sm:text-sm">
              <Star className="w-3 h-3 mr-1" />
              The Future of Social Commerce
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where Web3 meets
              <br />
              <span className="text-commerce">Social Commerce</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4 sm:px-0">
              Buy, sell, and connect in the first social commerce platform built
              for crypto. From food platters to NFT giveaways, CrossBeg makes
              Web3 transactions social, simple, and incredibly powerful.
            </p>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 text-xs sm:text-sm text-muted-foreground px-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Cross-chain payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-commerce rounded-full"></div>
              <span>Social commerce posts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Token-gated giveaways</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Community messaging</span>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
            {/* Social Commerce */}
            <Card className="p-4 sm:p-6 shadow-commerce">
              <CardContent className="p-0">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-commerce flex items-center justify-center mb-4 mx-auto">
                  <ShoppingBag className="w-6 sm:w-8 h-6 sm:h-8 text-commerce-foreground" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">
                  Social Commerce
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Discover and buy amazing products from your community. From
                  homemade jollof rice to artisan crafts.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-commerce">
                  <Heart className="w-4 h-4" />
                  <span>Like, comment, and buy</span>
                </div>
              </CardContent>
            </Card>

            {/* Cross-Chain Payments */}
            <Card className="p-4 sm:p-6 shadow-glow">
              <CardContent className="p-0">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 mx-auto">
                  <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">
                  Cross-Chain Magic
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Pay with any crypto on any chain. Our smart bridges handle the
                  complexity automatically.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    Ethereum • Polygon • BSC
                  </span>
                  <span className="sm:hidden">Multi-chain</span>
                </div>
              </CardContent>
            </Card>

            {/* Token-Gated Giveaways */}
            <Card className="p-4 sm:p-6 shadow-violet sm:col-span-2 lg:col-span-1">
              <CardContent className="p-0">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-accent flex items-center justify-center mb-4 mx-auto">
                  <Gift className="w-6 sm:w-8 h-6 sm:h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">
                  Token-Gated Giveaways
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Create exclusive giveaways for NFT holders and token
                  communities. Build deeper connections.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-accent">
                  <Lock className="w-4 h-4" />
                  <span>NFT & Token exclusive</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Feed Preview */}
          <div className="mb-12 sm:mb-16 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              Experience the Social Feed
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Commerce Post Example */}
              <Card className="p-4 sm:p-6 shadow-card">
                <CardContent className="p-0">
                  <div className="flex items-start gap-2 sm:gap-3 mb-4">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-commerce rounded-full flex items-center justify-center">
                      <span className="text-commerce-foreground font-bold text-xs sm:text-sm">
                        ST
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm sm:text-base">
                          somto.eth
                        </span>
                        <Badge className="bg-commerce/10 text-commerce border-commerce/20 text-xs hidden sm:inline-flex">
                          ⭐ Recommended
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        45 mins ago
                      </p>
                    </div>
                    <span className="font-bold text-commerce text-sm sm:text-base">
                      $25 USDC
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                    <div className="aspect-square bg-warning/20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src="/image.jpg"
                        alt="Food"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <h4 className="font-bold mb-1 text-sm sm:text-base">
                        Grillish Platter Small Chops
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Fresh grilled small chops platter perfect for sharing!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>23</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>8</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-commerce hover:bg-commerce/90"
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Features */}
              <div className="space-y-4">
                <Card className="p-4 shadow-subtle">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <strong>trulyo.eth</strong> sent you $5 USDC
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 shadow-subtle">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <strong>mubytan.eth</strong> followed you
                        </p>
                        <p className="text-xs text-muted-foreground">
                          4 hours ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 shadow-subtle">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-commerce/10 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-commerce" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          New <strong>BAYC holders</strong> giveaway started
                        </p>
                        <p className="text-xs text-muted-foreground">
                          6 hours ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border mx-4 sm:mx-0">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              Join the Web3 Social Economy
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Connect your wallet and become part of the first social commerce
              platform built for the crypto community. Buy, sell, connect, and
              grow together.
            </p>

            <div className="flex flex-col gap-4 justify-center items-center mb-6 sm:mb-8">
              <Button
                onClick={handleConnect}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
              >
                <Wallet className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Connect Wallet & Start</span>
                <span className="sm:hidden">Connect & Start</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="bg-background/50">
                <Coins className="w-3 h-3 mr-1" />
                Multi-chain support
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                <Shield className="w-3 h-3 mr-1" />
                Secure & decentralized
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                <Users className="w-3 h-3 mr-1" />
                Community-driven
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                <MessageCircle className="w-3 h-3 mr-1" />
                Social messaging
              </Badge>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Features */}
      <footer className="border-t bg-card/50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Globe className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Cross-Chain
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Pay across Ethereum, Polygon, BSC, and more
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-commerce/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6 text-commerce" />
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Social Commerce
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Discover and buy from your community
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Gift className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Token Gating
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Exclusive giveaways for NFT and token holders
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-success" />
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Community
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Direct messaging and social features
              </p>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-muted-foreground">
              CrossBeg MVP v1.0.0 - Built for the social Web3 economy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
