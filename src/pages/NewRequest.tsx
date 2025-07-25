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
  Check,
  X,
  User,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

// Currency options with chain information
const currencyOptions = [
  { value: "usdc", label: "USDC", chain: "Multi-chain", icon: "💵" },
  { value: "eth", label: "ETH", chain: "Ethereum", icon: "Ⓔ" },
  { value: "matic", label: "MATIC", chain: "Polygon", icon: "🟣" },
  { value: "bnb", label: "BNB", chain: "BSC", icon: "🟡" },
];

// Dummy contacts for recipient selection
const dummyContacts = [
  {
    address: "0x1234567890123456789012345678901234567890",
    ens: "amaka.eth",
    recent: true,
  },
  {
    address: "0x2345678901234567890123456789012345678901",
    ens: "david.eth",
    recent: true,
  },
  {
    address: "0x3456789012345678901234567890123456789012",
    ens: "vitalik.eth",
    recent: false,
  },
  {
    address: "0x4567890123456789012345678901234567890123",
    ens: "alice.eth",
    recent: false,
  },
];

export default function NewRequest() {
  const navigate = useNavigate();
  const { userAddress, userENS, disconnectWallet } = useWallet();

  // Form state
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usdc");
  const [reason, setReason] = useState("");
  const [recipientInput, setRecipientInput] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  // Validation functions
  const isValidAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const isValidENS = (ens: string) => {
    return /^[a-zA-Z0-9-]+\.eth$/.test(ens);
  };

  const validateRecipient = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return { valid: false, message: "" };

    if (isValidENS(trimmed)) {
      return { valid: true, message: "✅ Valid ENS name" };
    } else if (isValidAddress(trimmed)) {
      return { valid: true, message: "✅ Valid wallet address" };
    } else {
      return { valid: false, message: "❌ Invalid address or ENS name" };
    }
  };

  const validation = validateRecipient(recipientInput);

  const handleContinue = () => {
    if (step === 1 && amount && currency && reason) {
      setStep(2);
    }
  };

  const handleSelectRecipient = (contact: any) => {
    setRecipientInput(contact.ens);
    setSelectedRecipient(contact);
  };

  const handleSendRequest = () => {
    if (validation.valid) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSend = () => {
    console.log("Sending request:", {
      amount,
      currency,
      reason,
      recipient: recipientInput,
    });
    setShowConfirmation(false);
    navigate("/dashboard");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getCurrentCurrency = () => {
    return (
      currencyOptions.find((c) => c.value === currency) || currencyOptions[0]
    );
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
              onClick={() => (step === 1 ? navigate("/dashboard") : setStep(1))}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold">New Request</h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div
              className={`w-8 sm:w-16 h-0.5 ${
                step >= 2 ? "bg-primary" : "bg-muted"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Step 1: Amount & Reason */}
        {step === 1 && (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl sm:text-2xl">
                Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-3">
                <Label htmlFor="amount" className="text-sm sm:text-base">
                  Amount
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    type="text"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-xl sm:text-2xl h-12 sm:h-16 text-center font-bold flex-1"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-28 sm:w-32 h-12 sm:h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span className="text-base">{option.icon}</span>
                            <div>
                              <p className="font-semibold">{option.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {option.chain}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Reason Input */}
              <div className="space-y-3">
                <Label htmlFor="reason" className="text-sm sm:text-base">
                  What is it for?
                </Label>
                <Input
                  id="reason"
                  type="text"
                  placeholder="e.g., Lunch money, Coffee, Split bill..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="text-sm sm:text-base h-10 sm:h-12"
                />
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                disabled={!amount || !currency || !reason}
                className="w-full h-12 sm:h-14 text-sm sm:text-base"
                size="lg"
              >
                Select Recipient
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Recipient Selection */}
        {step === 2 && (
          <div className="max-w-lg mx-auto space-y-6">
            {/* Request Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <p className="text-lg sm:text-xl">
                    Requesting{" "}
                    <span className="font-bold">
                      {amount} {getCurrentCurrency().label}
                    </span>
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    for "{reason}"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recipient Search */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">
                  Select Recipient
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Input */}
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-sm sm:text-base">
                    ENS name or wallet address
                  </Label>
                  <Input
                    id="recipient"
                    type="text"
                    placeholder="amaka.eth or 0x1234..."
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                  {recipientInput && (
                    <div
                      className={`text-xs sm:text-sm flex items-center gap-2 mt-2 ${
                        validation.valid ? "text-success" : "text-destructive"
                      }`}
                    >
                      {validation.valid ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                      {validation.message}
                    </div>
                  )}
                </div>

                {/* Recent Contacts */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Recent Contacts</Label>
                  <div className="space-y-2">
                    {dummyContacts
                      .filter((c) => c.recent)
                      .map((contact) => (
                        <Button
                          key={contact.address}
                          variant="outline"
                          className="w-full justify-start h-auto p-3 sm:p-4"
                          onClick={() => handleSelectRecipient(contact)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <Jazzicon
                              address={contact.address}
                              size={32}
                              className="sm:w-10 sm:h-10"
                            />
                            <div className="text-left flex-1 min-w-0">
                              <p className="font-semibold text-sm sm:text-base">
                                {contact.ens}
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {formatAddress(contact.address)}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </div>

                {/* All Contacts */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">All Contacts</Label>
                  <div className="space-y-2">
                    {dummyContacts
                      .filter((c) => !c.recent)
                      .map((contact) => (
                        <Button
                          key={contact.address}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 sm:p-4"
                          onClick={() => handleSelectRecipient(contact)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <Jazzicon
                              address={contact.address}
                              size={32}
                              className="sm:w-10 sm:h-10"
                            />
                            <div className="text-left flex-1 min-w-0">
                              <p className="font-semibold text-sm sm:text-base">
                                {contact.ens}
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {formatAddress(contact.address)}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSendRequest}
                  disabled={!validation.valid}
                  className="w-full h-12 sm:h-14 text-sm sm:text-base"
                  size="lg"
                >
                  Send Request
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-sm sm:max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Confirm Request
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Review your request details before sending.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm sm:text-base text-muted-foreground">
                Amount:
              </span>
              <span className="font-bold text-sm sm:text-base">
                {amount} {getCurrentCurrency().label}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm sm:text-base text-muted-foreground">
                For:
              </span>
              <span className="font-semibold text-sm sm:text-base">
                "{reason}"
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm sm:text-base text-muted-foreground">
                To:
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {recipientInput}
              </span>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs sm:text-sm text-center text-muted-foreground">
                They will receive a notification and can approve or decline your
                request.
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
            <Button onClick={handleConfirmSend} className="flex-1 sm:flex-none">
              ✅ Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
