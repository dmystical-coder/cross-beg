import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Jazzicon } from "@/components/Jazzicon";
import { CheckCircle, Wallet } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recipientAddress: string;
  recipientENS: string;
  amount: string;
  currency: string;
  reason: string;
}

const paymentOptions = [
  {
    value: "eth-usdc",
    label: "USDC on Ethereum",
    chain: "Ethereum",
    balance: "$2,450.20",
    icon: "🇪🇹",
  },
  {
    value: "polygon-usdc",
    label: "USDC on Polygon",
    chain: "Polygon",
    balance: "$1,200.50",
    icon: "🟣",
  },
  {
    value: "eth-eth",
    label: "ETH on Ethereum",
    chain: "Ethereum",
    balance: "1.25 ETH",
    icon: "🇪🇹",
  },
  {
    value: "bsc-bnb",
    label: "BNB on BSC",
    chain: "BSC",
    balance: "5.5 BNB",
    icon: "🟡",
  },
];

export function PaymentModal({
  isOpen,
  onClose,
  onConfirm,
  recipientAddress,
  recipientENS,
  amount,
  currency,
  reason,
}: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("eth-usdc");

  const handleConfirmPayment = () => {
    // Here you would integrate with your blockchain logic
    console.log("Processing payment:", {
      recipient: recipientENS,
      amount,
      currency,
      paymentMethod: selectedPaymentMethod,
      reason,
    });
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Wallet className="w-4 sm:w-5 h-4 sm:h-5" />
            Approve Payment
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Review the payment details and select your preferred payment method.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4">
          {/* Recipient Info */}
          <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg">
            <Jazzicon
              address={recipientAddress}
              size={32}
              className="sm:w-12 sm:h-12"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-lg truncate">
                {recipientENS}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {recipientAddress.slice(0, 8)}...{recipientAddress.slice(-6)}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm sm:text-base text-muted-foreground">
                Amount:
              </span>
              <span className="font-bold text-sm sm:text-xl">
                {amount} {currency}
              </span>
            </div>
            {reason && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm sm:text-base text-muted-foreground">
                  For:
                </span>
                <span className="font-semibold text-sm sm:text-base truncate max-w-[60%]">
                  "{reason}"
                </span>
              </div>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Pay with:</label>
            <Select
              value={selectedPaymentMethod}
              onValueChange={setSelectedPaymentMethod}
            >
              <SelectTrigger className="h-auto min-h-[50px] sm:min-h-[60px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2 sm:gap-3 w-full py-1">
                      <span className="text-base sm:text-lg">
                        {option.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Balance: {option.balance}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fee Information */}
          <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-success" />
              <span className="text-xs sm:text-sm font-medium">
                Cross-chain bridge included
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Network fee:</span>
                <span>~$2.50</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Bridge fee:</span>
                <span>~$1.00</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none h-10 sm:h-12 text-sm sm:text-base"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            className="flex-1 sm:flex-none h-10 sm:h-12 text-sm sm:text-base"
          >
            ✅ Approve & Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
