import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Jazzicon } from "@/components/Jazzicon";
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  Clock,
  Users,
  Coins,
  CheckCircle,
  Settings,
  LogOut,
} from "lucide-react";

// Duration options
const durationOptions = [
  { value: "1h", label: "1 Hour" },
  { value: "6h", label: "6 Hours" },
  { value: "1d", label: "1 Day" },
  { value: "3d", label: "3 Days" },
  { value: "7d", label: "1 Week" },
  { value: "30d", label: "1 Month" },
];

// Currency options
const currencyOptions = [
  { value: "usdc", label: "USDC", icon: "💵" },
  { value: "eth", label: "ETH", icon: "Ⓔ" },
  { value: "matic", label: "MATIC", icon: "🟣" },
];

// Sample NFT/Token options for token-gating
const tokenOptions = [
  {
    value: "bored-apes",
    label: "Bored Ape Yacht Club",
    type: "NFT",
    icon: "🐵",
  },
  { value: "cryptopunks", label: "CryptoPunks", type: "NFT", icon: "👾" },
  { value: "uni", label: "Uniswap Token", type: "Token", icon: "🦄" },
  { value: "link", label: "Chainlink", type: "Token", icon: "🔗" },
];

export default function Giveaway() {
  const navigate = useNavigate();
  const { userAddress, userENS, disconnectWallet } = useWallet();

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    totalAmount: "",
    currency: "usdc",
    winners: "",
    reason: "",
    duration: "1d",
    eligibility: "public", // public, private, token-gated
    password: "",
    selectedToken: "",
    minimumTokens: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canProceedToStep2 =
    formData.totalAmount &&
    formData.winners &&
    formData.reason &&
    formData.duration;
  const canProceedToStep3 =
    formData.eligibility === "public" ||
    (formData.eligibility === "private" && formData.password) ||
    (formData.eligibility === "token-gated" && formData.selectedToken);

  const handleCreateGiveaway = () => {
    setShowConfirmation(true);
  };

  const handleConfirmGiveaway = () => {
    console.log("Creating giveaway:", formData);
    setShowConfirmation(false);
    navigate("/dashboard");
  };

  const getCurrentCurrency = () => {
    return (
      currencyOptions.find((c) => c.value === formData.currency) ||
      currencyOptions[0]
    );
  };

  const getSelectedToken = () => {
    return tokenOptions.find((t) => t.value === formData.selectedToken);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold">Create Giveaway</h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Settings className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleDisconnect}
              className="text-xs sm:text-sm px-2 sm:px-4"
            >
              <LogOut className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Disconnect</span>
              <span className="sm:hidden">Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 ${
                      currentStep > step ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Setup */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2">
                <Gift className="w-5 sm:w-6 h-5 sm:h-6" />
                Giveaway Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Total Amount */}
              <div className="space-y-3">
                <Label htmlFor="totalAmount" className="text-sm sm:text-base">
                  Total Giveaway Amount
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="totalAmount"
                    type="text"
                    placeholder="0.00"
                    value={formData.totalAmount}
                    onChange={(e) =>
                      updateFormData({ totalAmount: e.target.value })
                    }
                    className="text-lg sm:text-xl h-12 sm:h-14 text-center font-bold flex-1"
                  />
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      updateFormData({ currency: value })
                    }
                  >
                    <SelectTrigger className="w-24 sm:w-28 h-12 sm:h-14">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span className="text-base">{option.icon}</span>
                            <span className="font-semibold">
                              {option.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Number of Winners */}
              <div className="space-y-3">
                <Label htmlFor="winners" className="text-sm sm:text-base">
                  Number of Winners
                </Label>
                <Input
                  id="winners"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.winners}
                  onChange={(e) => updateFormData({ winners: e.target.value })}
                  className="h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>

              {/* Reason */}
              <div className="space-y-3">
                <Label htmlFor="reason" className="text-sm sm:text-base">
                  What's this giveaway for?
                </Label>
                <Input
                  id="reason"
                  type="text"
                  placeholder="e.g., Community celebration, Product launch..."
                  value={formData.reason}
                  onChange={(e) => updateFormData({ reason: e.target.value })}
                  className="h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label htmlFor="duration" className="text-sm sm:text-base">
                  Duration
                </Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => updateFormData({ duration: value })}
                >
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Continue Button */}
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToStep2}
                className="w-full h-12 sm:h-14 text-sm sm:text-base"
                size="lg"
              >
                Set Eligibility
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Eligibility */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
            {/* Summary Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <p className="text-lg sm:text-xl">
                    <span className="font-bold">
                      {formData.totalAmount} {getCurrentCurrency().label}
                    </span>{" "}
                    giveaway
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {formData.winners} winners •{" "}
                    {
                      durationOptions.find((d) => d.value === formData.duration)
                        ?.label
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Options */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">
                  Who can participate?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {/* Public Option */}
                <div
                  onClick={() => updateFormData({ eligibility: "public" })}
                  className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.eligibility === "public"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 sm:w-6 h-5 sm:h-6 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">
                        Public
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Anyone can join
                      </p>
                    </div>
                    {formData.eligibility === "public" && (
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    )}
                  </div>
                </div>

                {/* Private Option */}
                <div
                  onClick={() => updateFormData({ eligibility: "private" })}
                  className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.eligibility === "private"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-warning/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-warning" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">
                        Private
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Requires password
                      </p>
                    </div>
                    {formData.eligibility === "private" && (
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    )}
                  </div>
                  {formData.eligibility === "private" && (
                    <div className="mt-4">
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) =>
                          updateFormData({ password: e.target.value })
                        }
                        className="h-10 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>

                {/* Token-Gated Option */}
                <div
                  onClick={() => updateFormData({ eligibility: "token-gated" })}
                  className={`p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.eligibility === "token-gated"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-commerce/10 rounded-full flex items-center justify-center">
                      <Coins className="w-5 sm:w-6 h-5 sm:h-6 text-commerce" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">
                        Token-Gated
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        NFT or Token holders only
                      </p>
                    </div>
                    {formData.eligibility === "token-gated" && (
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    )}
                  </div>
                  {formData.eligibility === "token-gated" && (
                    <div className="mt-4 space-y-3">
                      <Select
                        value={formData.selectedToken}
                        onValueChange={(value) =>
                          updateFormData({ selectedToken: value })
                        }
                      >
                        <SelectTrigger className="h-10 sm:h-12">
                          <SelectValue placeholder="Select NFT/Token" />
                        </SelectTrigger>
                        <SelectContent>
                          {tokenOptions.map((token) => (
                            <SelectItem key={token.value} value={token.value}>
                              <div className="flex items-center gap-2">
                                <span className="text-base">{token.icon}</span>
                                <div>
                                  <p className="font-semibold">{token.label}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {token.type}
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.selectedToken &&
                        getSelectedToken()?.type === "Token" && (
                          <Input
                            type="number"
                            placeholder="Minimum tokens required"
                            value={formData.minimumTokens}
                            onChange={(e) =>
                              updateFormData({ minimumTokens: e.target.value })
                            }
                            className="h-10 sm:h-12 text-sm sm:text-base"
                          />
                        )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1 h-12 sm:h-14 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3}
                className="flex-1 h-12 sm:h-14 text-sm sm:text-base"
              >
                Review & Create
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl">
                  Review Your Giveaway
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Giveaway Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Total Amount:
                    </span>
                    <span className="font-bold text-sm sm:text-base">
                      {formData.totalAmount} {getCurrentCurrency().label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Winners:
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {formData.winners} people
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Per Winner:
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {(
                        parseFloat(formData.totalAmount) /
                        parseFloat(formData.winners)
                      ).toFixed(2)}{" "}
                      {getCurrentCurrency().label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Duration:
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {
                        durationOptions.find(
                          (d) => d.value === formData.duration
                        )?.label
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Eligibility:
                    </span>
                    <div className="text-right">
                      <span className="font-semibold text-sm sm:text-base capitalize">
                        {formData.eligibility}
                      </span>
                      {formData.eligibility === "token-gated" &&
                        getSelectedToken() && (
                          <p className="text-xs text-muted-foreground">
                            {getSelectedToken()?.label}
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Jazzicon
                      address={userAddress || ""}
                      size={32}
                      className="sm:w-10 sm:h-10"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        Created by {userENS}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {formatAddress(userAddress || "")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-xs sm:text-sm text-center text-muted-foreground">
                    By creating this giveaway, {formData.totalAmount}{" "}
                    {getCurrentCurrency().label} will be transferred to a secure
                    smart contract. Winners will be selected randomly when the
                    giveaway ends.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1 h-12 sm:h-14 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleCreateGiveaway}
                className="flex-1 h-12 sm:h-14 text-sm sm:text-base"
              >
                🎉 Create Giveaway
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Final Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-sm sm:max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Confirm Giveaway Creation
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              This action will transfer funds to the giveaway smart contract.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <p className="font-bold text-lg">
                {formData.totalAmount} {getCurrentCurrency().label}
              </p>
              <p className="text-sm text-muted-foreground">
                Will be distributed to {formData.winners} winners
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmGiveaway}
              className="flex-1 sm:flex-none"
            >
              ✅ Confirm & Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
