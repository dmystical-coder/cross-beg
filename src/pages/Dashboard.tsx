import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Jazzicon } from "@/components/Jazzicon";
import { PaymentModal } from "@/components/PaymentModal";
import {
  Plus,
  Eye,
  MessageCircle,
  Settings,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  User,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  UserPlus,
  Heart,
  MessageSquare,
  Share,
  DollarSign,
  Star,
} from "lucide-react";

// Rich social commerce activity feed
const dummyActivity = [
  {
    id: 1,
    type: "commerce_post",
    seller: "somto.eth",
    productName: "Grillish Platter Small Chops",
    price: "$25 USDC",
    image: "/food-platter.jpg",
    description:
      "Fresh grilled small chops platter perfect for sharing! Includes suya, chicken, and plantain.",
    likes: 23,
    comments: 8,
    time: "45 mins ago",
    avatar: "0x1234567890123456789012345678901234567890",
    recommended: true,
    recommender: "trulyo.eth",
  },
  {
    id: 2,
    type: "request_received",
    from: "amaka.eth",
    amount: "$15",
    reason: "Coffee Money",
    time: "1 hour ago",
    avatar: "0x2345678901234567890123456789012345678901",
  },
  {
    id: 3,
    type: "payment_received",
    from: "trulyo.eth",
    amount: "$5 USDC",
    reason: "tip for helping",
    time: "2 hours ago",
    avatar: "0x3456789012345678901234567890123456789012",
  },
  {
    id: 4,
    type: "follow",
    user: "mubytan.eth",
    time: "4 hours ago",
    avatar: "0x4567890123456789012345678901234567890123",
  },
  {
    id: 5,
    type: "commerce_post",
    seller: "chef_maya.eth",
    productName: "Homemade Jollof Rice Bowl",
    price: "$12 USDC",
    image: "/jollof-rice.jpg",
    description:
      "Authentic Nigerian jollof rice with chicken and plantain. Available for pickup today!",
    likes: 41,
    comments: 15,
    time: "6 hours ago",
    avatar: "0x5678901234567890123456789012345678901234",
    recommended: false,
  },
  {
    id: 6,
    type: "payment_sent",
    to: "david.eth",
    amount: "$8 USDC",
    reason: "lunch split",
    time: "1 day ago",
    avatar: "0x6789012345678901234567890123456789012345",
  },
];

const dummyTransactions = [
  {
    id: 1,
    type: "sent",
    to: "david.eth",
    amount: "$25",
    currency: "USDC",
    reason: "Coffee",
    time: "1 hour ago",
    avatar: "0x2345678901234567890123456789012345678901",
  },
  {
    id: 2,
    type: "received",
    from: "alice.eth",
    amount: "$50",
    currency: "USDC",
    reason: "Dinner split",
    time: "1 day ago",
    avatar: "0x4567890123456789012345678901234567890123",
  },
  {
    id: 3,
    type: "sent",
    to: "eve.eth",
    amount: "$75",
    currency: "ETH",
    reason: "Concert tickets",
    time: "3 days ago",
    avatar: "0x7890123456789012345678901234567890123456",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { userAddress, userENS, disconnectWallet } = useWallet();

  // Payment modal state
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    request?: any;
  }>({ isOpen: false });

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const handlePayRequest = (request: any) => {
    setPaymentModal({
      isOpen: true,
      request,
    });
  };

  const handlePaymentConfirm = () => {
    console.log("Payment confirmed for:", paymentModal.request);
    setPaymentModal({ isOpen: false });
    // Here you would handle the actual payment logic
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "paid":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "declined":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const renderActivityItem = (item: any) => {
    switch (item.type) {
      case "commerce_post":
        return (
          <div className="p-3 sm:p-4 border rounded-lg bg-commerce/5">
            <div className="flex items-start gap-2 sm:gap-3 mb-3">
              <Jazzicon
                address={item.avatar}
                size={32}
                className="sm:w-10 sm:h-10"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm sm:text-base truncate">
                    {item.seller}
                  </span>
                  {item.recommended && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-commerce/10 text-commerce border-commerce/20 hidden sm:inline-flex"
                    >
                      ⭐ Recommended by {item.recommender}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm sm:text-lg text-commerce">
                  {item.price}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-1">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/image.jpg"
                    alt="food"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <h3 className="font-bold text-base sm:text-lg mb-2">
                  {item.productName}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                      <span className="hidden sm:inline">Message</span>
                      <span className="sm:hidden">Msg</span>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-commerce hover:bg-commerce/90 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <DollarSign className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "payment_received":
        return (
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg bg-success/5">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-success/10 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="w-4 sm:w-5 h-4 sm:h-5 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{item.from}</span> sent you{" "}
                <span className="font-semibold text-success">
                  {item.amount}
                </span>
                {item.reason && <span> for "{item.reason}"</span>}
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm sm:text-lg text-success">
                +{item.amount}
              </p>
            </div>
          </div>
        );

      case "request_received":
        return (
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg">
            <Jazzicon
              address={item.avatar}
              size={32}
              className="sm:w-10 sm:h-10"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{item.from}</span> sent you a
                request for{" "}
                <span className="font-semibold">"{item.reason}"</span>
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm sm:text-lg">{item.amount}</p>
              <Button
                size="sm"
                className="mt-1 text-xs px-2 sm:px-3"
                onClick={() =>
                  handlePayRequest({
                    from: item.from,
                    amount: item.amount,
                    reason: item.reason,
                    avatar: item.avatar,
                    currency: "USDC",
                  })
                }
              >
                Pay
              </Button>
            </div>
          </div>
        );

      case "payment_sent":
        return (
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                You paid <span className="font-semibold">{item.to}</span>{" "}
                <span className="font-semibold">{item.amount}</span>
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          </div>
        );

      case "follow":
        return (
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg bg-accent/5">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <UserPlus className="w-4 sm:w-5 h-4 sm:h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{item.user}</span> followed you
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-xl sm:text-2xl font-bold">CrossBeg</h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/inbox")}
              className="relative h-8 w-8 sm:h-10 sm:w-10"
            >
              <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
              <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-commerce rounded-full border border-background"></div>
            </Button>
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Profile Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4">
            <Jazzicon
              address={userAddress || ""}
              size={64}
              className="sm:w-20 sm:h-20"
            />
            <div>
              <p className="font-bold text-xl sm:text-2xl">{userENS}</p>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                {formatAddress(userAddress || "")}
              </p>
              <div className="px-4 py-2 bg-muted/50 rounded-lg inline-block">
                <p className="text-2xl sm:text-3xl font-bold">$1,250.34</p>
                <p className="text-sm text-muted-foreground">Total Balance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            size="lg"
            className="flex-1 h-12 sm:h-16 text-sm sm:text-lg"
            onClick={() => navigate("/request")}
          >
            <Plus className="w-4 sm:w-6 h-4 sm:h-6 mr-1 sm:mr-2" />
            Request
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-12 sm:h-16 text-sm sm:text-lg"
            onClick={() => navigate("/requests")}
          >
            <Eye className="w-4 sm:w-6 h-4 sm:h-6 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">View Requests</span>
            <span className="sm:hidden">Requests</span>
          </Button>
        </div>

        {/* Tabbed Feed Section */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
            <TabsTrigger value="activity" className="text-sm sm:text-base">
              Activity
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-sm sm:text-base">
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="activity"
            className="space-y-3 sm:space-y-4 mt-4 sm:mt-6"
          >
            {dummyActivity.map((item) => (
              <div key={item.id}>{renderActivityItem(item)}</div>
            ))}
          </TabsContent>

          <TabsContent
            value="transactions"
            className="space-y-3 sm:space-y-4 mt-4 sm:mt-6"
          >
            {dummyTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg"
              >
                <div
                  className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center ${
                    tx.type === "sent" ? "bg-destructive/10" : "bg-success/10"
                  }`}
                >
                  {tx.type === "sent" ? (
                    <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 text-destructive" />
                  ) : (
                    <ArrowDownLeft className="w-4 sm:w-5 h-4 sm:h-5 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base">
                    {tx.type === "sent" ? `To ${tx.to}` : `From ${tx.from}`}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {tx.reason}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold text-sm sm:text-lg ${
                      tx.type === "sent" ? "text-destructive" : "text-success"
                    }`}
                  >
                    {tx.type === "sent" ? "-" : "+"}
                    {tx.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.currency}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Payment Modal */}
      {paymentModal.request && (
        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={() => setPaymentModal({ isOpen: false })}
          onConfirm={handlePaymentConfirm}
          recipientAddress={paymentModal.request.avatar}
          recipientENS={paymentModal.request.from}
          amount={paymentModal.request.amount.replace("$", "")}
          currency={paymentModal.request.currency}
          reason={paymentModal.request.reason}
        />
      )}
    </div>
  );
}
