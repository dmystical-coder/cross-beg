import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Jazzicon } from "@/components/Jazzicon";
import {
  ArrowLeft,
  MessageCircle,
  Search,
  Plus,
  Settings,
  LogOut,
  Send,
  Phone,
  Video,
} from "lucide-react";

// Dummy conversation data
const dummyConversations = [
  {
    id: 1,
    participant: "amaka.eth",
    participantAddress: "0x1234567890123456789012345678901234567890",
    lastMessage: "Hey! Thanks for the quick payment 😊",
    timestamp: "2 mins ago",
    unread: true,
    online: true,
  },
  {
    id: 2,
    participant: "trulyo.eth",
    participantAddress: "0x2345678901234567890123456789012345678901",
    lastMessage: "The jollof rice was amazing! 🍚",
    timestamp: "1 hour ago",
    unread: false,
    online: true,
  },
  {
    id: 3,
    participant: "david.eth",
    participantAddress: "0x3456789012345678901234567890123456789012",
    lastMessage: "Can you send me the concert details?",
    timestamp: "3 hours ago",
    unread: false,
    online: false,
  },
  {
    id: 4,
    participant: "chef_maya.eth",
    participantAddress: "0x4567890123456789012345678901234567890123",
    lastMessage: "Order confirmed! Ready in 30 minutes ⏰",
    timestamp: "1 day ago",
    unread: true,
    online: false,
  },
];

export default function Inbox() {
  const navigate = useNavigate();
  const { userAddress, userENS, disconnectWallet } = useWallet();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const filteredConversations = dummyConversations.filter((conv) =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-lg sm:text-xl font-bold">Messages</h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]">
          {/* Conversations List */}
          <div
            className={`lg:col-span-1 ${
              selectedConversation ? "hidden lg:block" : "block"
            }`}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl">
                    Conversations
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <Plus className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">New</span>
                  </Button>
                </div>

                {/* Search */}
                <div className="relative mt-3 sm:mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 sm:h-10 text-sm"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`flex items-center gap-3 p-3 sm:p-4 cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? "bg-muted"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="relative">
                        <Jazzicon
                          address={conversation.participantAddress}
                          size={32}
                          className="sm:w-10 sm:h-10"
                        />
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm sm:text-base truncate">
                            {conversation.participant}
                          </p>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p
                          className={`text-xs sm:text-sm truncate ${
                            conversation.unread
                              ? "font-medium text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {conversation.lastMessage}
                        </p>
                      </div>

                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div
            className={`lg:col-span-2 ${
              selectedConversation ? "block" : "hidden lg:block"
            }`}
          >
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3 sm:pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden h-8 w-8"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>

                    <div className="relative">
                      <Jazzicon
                        address={selectedConversation.participantAddress}
                        size={32}
                        className="sm:w-10 sm:h-10"
                      />
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">
                        {selectedConversation.participant}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {selectedConversation.online ? "Online" : "Offline"} •{" "}
                        {formatAddress(selectedConversation.participantAddress)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Area */}
                <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4">
                  <div className="space-y-4">
                    {/* Sample messages */}
                    <div className="flex justify-start">
                      <div className="max-w-[80%] sm:max-w-[70%]">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm">
                            Hey! I saw your request for the concert tickets.
                            Still need them?
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-[80%] sm:max-w-[70%]">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3">
                          <p className="text-sm">
                            Yes! Are they still available? 🎵
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                          1 hour ago
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[80%] sm:max-w-[70%]">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm">
                            Perfect! I'll send you the payment request now.
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          30 mins ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-3 sm:p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      className="flex-1 h-9 sm:h-10 text-sm"
                    />
                    <Button size="sm" className="h-9 sm:h-10 px-3 sm:px-4">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              /* Empty State */
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-8 sm:py-12">
                  <MessageCircle className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    No conversation selected
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Choose a conversation from the list to start messaging
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Conversation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Demo Features Info */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-accent/5 rounded-lg border border-accent/20">
          <h3 className="font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
            <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-accent" />
            Messaging Features (Demo)
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div>
              <p className="font-medium mb-1">• Real-time messaging</p>
              <p className="font-medium mb-1">• Payment integration</p>
              <p className="font-medium mb-1">• Transaction history</p>
            </div>
            <div>
              <p className="font-medium mb-1">• Voice & video calls</p>
              <p className="font-medium mb-1">• File sharing</p>
              <p className="font-medium mb-1">• Group conversations</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
