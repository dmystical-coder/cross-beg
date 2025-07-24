import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Jazzicon } from '@/components/Jazzicon';
import { CheckCircle, Loader2 } from 'lucide-react';

interface ReviewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
  amount: string;
  token: string;
  recipientAddress: string;
}

export function ReviewRequestModal({
  isOpen,
  onClose,
  recipient,
  amount,
  token,
  recipientAddress
}: ReviewRequestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
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
            <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
            <p className="text-sm text-muted-foreground">
              Your payment request has been sent to {recipient}
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
          <DialogTitle>Review Request</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Request Summary */}
          <div className="text-center p-6 rounded-lg bg-muted/50 border">
            <div className="flex items-center justify-center mb-4">
              <Jazzicon address={recipientAddress} size={48} />
            </div>
            <h3 className="font-semibold mb-2">
              You are about to request
            </h3>
            <p className="text-2xl font-bold text-primary mb-2">
              ${amount} {token}
            </p>
            <p className="text-sm text-muted-foreground">
              from {recipient}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ({recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)})
            </p>
          </div>

          {/* Network Fee */}
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Network Fee</span>
              <span className="text-sm font-medium">~$0.50 USDC</span>
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
              onClick={handleSendRequest}
              disabled={isLoading}
              variant="hero"
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Request'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}