import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReviewRequestModal } from '@/components/ReviewRequestModal';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Jazzicon } from '@/components/Jazzicon';

export default function NewRequest() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('USDC');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [addressValidation, setAddressValidation] = useState<{
    isValid: boolean;
    ens?: string;
    address?: string;
  } | null>(null);

  const validateAddress = (input: string) => {
    if (!input) {
      setAddressValidation(null);
      return;
    }

    // Mock validation - in real app would use ethers/viem
    if (input.endsWith('.eth')) {
      setAddressValidation({
        isValid: true,
        ens: input,
        address: '0x1234567890123456789012345678901234567890'
      });
    } else if (input.startsWith('0x') && input.length === 42) {
      setAddressValidation({
        isValid: true,
        address: input,
        ens: input === '0x1234567890123456789012345678901234567890' ? 'friend.eth' : undefined
      });
    } else {
      setAddressValidation({
        isValid: false
      });
    }
  };

  const handleRecipientChange = (value: string) => {
    setRecipient(value);
    validateAddress(value);
  };

  const isFormValid = recipient && amount && addressValidation?.isValid;

  const handleReviewRequest = () => {
    if (isFormValid) {
      setReviewModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">New Payment Request</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Request Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipient Field */}
            <div className="space-y-2">
              <Label htmlFor="recipient">To: (ENS Name or Address)</Label>
              <Input
                id="recipient"
                placeholder="vitalik.eth or 0x..."
                value={recipient}
                onChange={(e) => handleRecipientChange(e.target.value)}
                className={
                  addressValidation?.isValid === false 
                    ? 'border-destructive focus:border-destructive'
                    : addressValidation?.isValid === true
                    ? 'border-success focus:border-success'
                    : ''
                }
              />
              
              {/* Address Validation */}
              {addressValidation && (
                <div className="p-4 rounded-lg border bg-card">
                  {addressValidation.isValid ? (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Jazzicon 
                            address={addressValidation.address || ''} 
                            size={32} 
                          />
                          <div>
                            <p className="font-medium">
                              {addressValidation.ens || 'Valid Address'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {addressValidation.address && 
                                `${addressValidation.address.slice(0, 6)}...${addressValidation.address.slice(-4)}`
                              }
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-success">✓ Address is valid</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <p className="text-sm text-destructive">
                        Invalid address format. Please enter a valid ENS name or Ethereum address.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="flex gap-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                />
                <Select value={token} onValueChange={setToken}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="MATIC">MATIC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Review Button */}
            <Button
              onClick={handleReviewRequest}
              disabled={!isFormValid}
              variant="hero"
              size="lg"
              className="w-full"
            >
              Review Request
            </Button>

            {/* Network Fee Info */}
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm text-muted-foreground">
                <strong>Network Fee:</strong> ~$0.50 USDC (estimated)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Fees may vary based on network congestion
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Review Request Modal */}
        {addressValidation?.isValid && (
          <ReviewRequestModal
            isOpen={reviewModalOpen}
            onClose={() => {
              setReviewModalOpen(false);
              navigate('/dashboard');
            }}
            recipient={recipient}
            amount={amount}
            token={token}
            recipientAddress={addressValidation.address || ''}
          />
        )}
      </main>
    </div>
  );
}