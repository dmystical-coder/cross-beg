import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Jazzicon } from '@/components/Jazzicon';
import { PayRequestModal } from '@/components/PayRequestModal';
import { Plus, Send, LogOut, Settings, Clock, CheckCircle, XCircle, ArrowDown, ArrowUp } from 'lucide-react';

interface PaymentRequest {
  id: string;
  type: 'incoming' | 'outgoing';
  from: string;
  to: string;
  amount: number;
  token: string;
  status: 'pending' | 'paid' | 'declined';
  timestamp: Date;
}

const mockRequests: PaymentRequest[] = [
  {
    id: '1',
    type: 'incoming',
    from: 'john.eth',
    to: 'amaka.eth',
    amount: 50,
    token: 'USDC',
    status: 'pending',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    type: 'outgoing',
    from: 'amaka.eth',
    to: 'sarah.eth',
    amount: 25,
    token: 'USDC',
    status: 'pending',
    timestamp: new Date('2024-01-14T15:45:00')
  },
  {
    id: '3',
    type: 'incoming',
    from: 'mike.eth',
    to: 'amaka.eth',
    amount: 100,
    token: 'USDC',
    status: 'paid',
    timestamp: new Date('2024-01-13T09:15:00')
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { userENS, userAddress, disconnectWallet } = useWallet();
  const [requests] = useState<PaymentRequest[]>(mockRequests);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const handleNewRequest = () => {
    navigate('/request');
  };

  const handleSendMoney = () => {
    navigate('/send');
  };

  const incomingRequests = requests.filter(r => r.type === 'incoming' && r.status === 'pending');
  const outgoingRequests = requests.filter(r => r.type === 'outgoing');
  const historyRequests = requests.filter(r => r.status !== 'pending');

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handlePayRequest = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setPayModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Jazzicon address={userAddress || ''} size={40} />
              <div>
                <p className="font-semibold">{userENS}</p>
                <p className="text-sm text-muted-foreground">
                  {formatAddress(userAddress || '')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleDisconnect}
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 shadow-card hover:shadow-glow transition-all cursor-pointer" onClick={handleNewRequest}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">New Request</h3>
                <p className="text-sm text-muted-foreground">Request payment from someone</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-glow transition-all cursor-pointer" onClick={handleSendMoney}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Send Money</h3>
                <p className="text-sm text-muted-foreground">Send payment to someone</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="incoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="incoming">
                  Incoming ({incomingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="outgoing">
                  Outgoing ({outgoingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="history">
                  History ({historyRequests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="incoming" className="space-y-4">
                {incomingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending incoming requests
                  </div>
                ) : (
                  incomingRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ArrowDown className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium">{request.from}</p>
                          <p className="text-sm text-muted-foreground">
                            Requesting ${request.amount} {request.token}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handlePayRequest(request)}
                        >
                          Pay
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="outgoing" className="space-y-4">
                {outgoingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No outgoing requests
                  </div>
                ) : (
                  outgoingRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ArrowUp className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{request.to}</p>
                          <p className="text-sm text-muted-foreground">
                            ${request.amount} {request.token}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className="text-sm capitalize text-muted-foreground">{request.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                {historyRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No transaction history
                  </div>
                ) : (
                  historyRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {request.type === 'incoming' ? (
                          <ArrowDown className="w-5 h-5 text-success" />
                        ) : (
                          <ArrowUp className="w-5 h-5 text-primary" />
                        )}
                        <div>
                          <p className="font-medium">
                            {request.type === 'incoming' ? request.from : request.to}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${request.amount} {request.token}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className="text-sm capitalize text-muted-foreground">{request.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Pay Request Modal */}
        {selectedRequest && (
          <PayRequestModal
            isOpen={payModalOpen}
            onClose={() => {
              setPayModalOpen(false);
              setSelectedRequest(null);
            }}
            recipient={selectedRequest.from}
            amount={selectedRequest.amount}
            token={selectedRequest.token}
            recipientAddress="0x1234567890123456789012345678901234567890"
          />
        )}
      </main>
    </div>
  );
}