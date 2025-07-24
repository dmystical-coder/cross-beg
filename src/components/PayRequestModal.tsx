import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Jazzicon } from '@/components/Jazzicon';
import { CheckCircle, Loader2 } from 'lucide-react';

interface PayRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
  amount: number;
  token: string;
  recipientAddress: string;
}

export function PayRequestModal({
  isOpen,
  onClose,
  recipient,
  amount,
  token,
  recipientAddress
}: PayRequestModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('USDC-polygon');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setIsConfirmed(true);
    
    // Auto close after success
    setTimeout(() => {
      setIsConfirmed(false);
      onClose();
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <CheckCircle className="w-16 h-16 text-success mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Sent!</h3>
            <p className="text-sm text-muted-foreground">
              Successfully paid ${amount} {token} to {recipient}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay Request</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="text-center p-6 rounded-lg bg-muted/50 border">
            <div className="flex items-center justify-center mb-4">
              <Jazzicon address={recipientAddress} size={48} />
            </div>
            <h3 className="font-semibold mb-2">
              You are paying
            </h3>
            <p className="text-2xl font-bold text-primary mb-2">
              ${amount} {token}
            </p>
            <p className="text-sm text-muted-foreground">
              to {recipient}
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pay with:</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDC-polygon">USDC on Polygon</SelectItem>
                <SelectItem value="USDC-ethereum">USDC on Ethereum</SelectItem>
                <SelectItem value="USDT-polygon">USDT on Polygon</SelectItem>
                <SelectItem value="DAI-ethereum">DAI on Ethereum</SelectItem>
                <SelectItem value="ETH-ethereum">ETH on Ethereum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fee Information */}
          <div className="p-4 rounded-lg border bg-card space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium">${amount} {token}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Network Fee</span>
              <span className="text-sm font-medium">~$0.25</span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-bold">${(amount + 0.25).toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePay}
              disabled={isLoading}
              variant="success"
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Approve & Pay'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}