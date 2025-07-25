import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Jazzicon } from "@/components/Jazzicon";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  LogOut,
} from "lucide-react";

// Dummy data for received requests
const dummyReceivedRequests = [
  {
    id: 1,
    from: "amaka.eth",
    fromAddress: "0x1234567890123456789012345678901234567890",
    amount: "$15",
    currency: "USDC",
    reason: "Coffee Money",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    from: "trulyo.eth",
    fromAddress: "0x2345678901234567890123456789012345678901",
    amount: "$50",
    currency: "USDC",
    reason: "Dinner split",
    time: "1 day ago",
    status: "pending",
  },
  {
    id: 3,
    from: "david.eth",
    fromAddress: "0x3456789012345678901234567890123456789012",
    amount: "$25",
    currency: "ETH",
    reason: "Concert tickets",
    time: "3 days ago",
    status: "paid",
  },
];

// Dummy data for sent requests
const dummySentRequests = [
  {
    id: 1,
    to: "alice.eth",
    toAddress: "0x4567890123456789012345678901234567890123",
    amount: "$30",
    currency: "USDC",
    reason: "Lunch split",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: 2,
    to: "bob.eth",
    toAddress: "0x5678901234567890123456789012345678901234",
    amount: "$20",
    currency: "USDC",
    reason: "Movie tickets",
    time: "2 days ago",
    status: "declined",
  },
  {
    id: 3,
    to: "eve.eth",
    toAddress: "0x6789012345678901234567890123456789012345",
    amount: "$100",
    currency: "ETH",
    reason: "Birthday gift contribution",
    time: "1 week ago",
    status: "paid",
  },
];

export default function ViewRequests() {
  const navigate = useNavigate();
  const { userAddress, userENS, disconnectWallet } = useWallet();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 sm:w-4 h-3 sm:h-4 text-warning" />;
      case "paid":
        return <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-success" />;
      case "declined":
        return <XCircle className="w-3 sm:w-4 h-3 sm:h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "paid":
        return "bg-success/10 text-success border-success/20";
      case "declined":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handlePayRequest = (request: any) => {
    console.log("Paying request:", request);
    // Here you would integrate with PaymentModal or payment logic
  };

  const handleIgnoreRequest = (request: any) => {
    console.log("Ignoring request:", request);
    // Here you would handle ignoring/declining the request
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold">Payment Requests</h1>
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
            <TabsTrigger value="received" className="text-sm sm:text-base">
              Received (
              {
                dummyReceivedRequests.filter((r) => r.status === "pending")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="sent" className="text-sm sm:text-base">
              Sent ({dummySentRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Received Requests Tab */}
          <TabsContent
            value="received"
            className="space-y-3 sm:space-y-4 mt-4 sm:mt-6"
          >
            {dummyReceivedRequests.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground text-sm sm:text-base">
                  No payment requests received
                </p>
              </div>
            ) : (
              dummyReceivedRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4"
                >
                  {/* Request Header */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Jazzicon
                      address={request.fromAddress}
                      size={32}
                      className="sm:w-10 sm:h-10 mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm sm:text-base truncate">
                          {request.from}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(
                            request.status
                          )}`}
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {formatAddress(request.fromAddress)} • {request.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm sm:text-lg">
                        {request.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {request.currency}
                      </p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm sm:text-base">
                      <span className="text-muted-foreground">For:</span> "
                      {request.reason}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {request.status === "pending" && (
                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleIgnoreRequest(request)}
                        className="flex-1 h-10 sm:h-12 text-xs sm:text-sm"
                      >
                        Ignore
                      </Button>
                      <Button
                        onClick={() => handlePayRequest(request)}
                        className="flex-1 h-10 sm:h-12 text-xs sm:text-sm"
                      >
                        Pay {request.amount}
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>

          {/* Sent Requests Tab */}
          <TabsContent
            value="sent"
            className="space-y-3 sm:space-y-4 mt-4 sm:mt-6"
          >
            {dummySentRequests.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground text-sm sm:text-base">
                  No payment requests sent
                </p>
              </div>
            ) : (
              dummySentRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-3 sm:p-4 space-y-3"
                >
                  {/* Request Header */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Jazzicon
                      address={request.toAddress}
                      size={32}
                      className="sm:w-10 sm:h-10 mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm sm:text-base truncate">
                          To {request.to}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(
                            request.status
                          )}`}
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {formatAddress(request.toAddress)} • {request.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm sm:text-lg">
                        {request.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {request.currency}
                      </p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm sm:text-base">
                      <span className="text-muted-foreground">For:</span> "
                      {request.reason}"
                    </p>
                  </div>

                  {/* Status Info */}
                  {request.status === "pending" && (
                    <div className="text-center py-2">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Waiting for {request.to} to respond...
                      </p>
                    </div>
                  )}

                  {request.status === "paid" && (
                    <div className="text-center py-2">
                      <p className="text-xs sm:text-sm text-success">
                        ✅ Payment received from {request.to}
                      </p>
                    </div>
                  )}

                  {request.status === "declined" && (
                    <div className="text-center py-2">
                      <p className="text-xs sm:text-sm text-destructive">
                        ❌ Request declined by {request.to}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Empty State Actions */}
        <div className="text-center mt-8 sm:mt-12">
          <Button
            onClick={() => navigate("/request")}
            variant="outline"
            className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
          >
            Create New Request
          </Button>
        </div>
      </main>
    </div>
  );
}
