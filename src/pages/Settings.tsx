import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Jazzicon } from "@/components/Jazzicon";
import {
  ArrowLeft,
  User,
  MessageCircle,
  Gift,
  Edit,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { userAddress, userENS, disconnectWallet } = useWallet();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Settings sections
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: Edit,
          label: "Edit Profile",
          description: "Update your display name and bio",
          action: () => console.log("Edit profile"),
        },
        {
          icon: Bell,
          label: "Notifications",
          description: "Manage your notification preferences",
          action: () => console.log("Notifications"),
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: Shield,
          label: "Privacy Settings",
          description: "Control who can see your activity",
          action: () => console.log("Privacy settings"),
        },
        {
          icon: User,
          label: "Blocked Users",
          description: "Manage your blocked users list",
          action: () => console.log("Blocked users"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          description: "Get help and support",
          action: () => console.log("Help center"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold">Profile & Settings</h1>
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Profile Section */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Jazzicon
                address={userAddress || ""}
                size={64}
                className="sm:w-20 sm:h-20"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold mb-1">
                  {userENS}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  {formatAddress(userAddress || "")}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">$1,250.34</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Balance
                    </p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">23</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Transactions
                    </p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">12</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Followers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="cursor-pointer border-2 border-transparent hover:border-primary/20 transition-colors">
            <CardContent
              className="p-4 sm:p-6"
              onClick={() => navigate("/inbox")}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">Inbox</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Direct messages & conversations
                  </p>
                </div>
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer border-2 border-transparent hover:border-commerce/20 transition-colors">
            <CardContent
              className="p-4 sm:p-6"
              onClick={() => navigate("/giveaway")}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-commerce/10 rounded-full flex items-center justify-center">
                  <Gift className="w-5 sm:w-6 h-5 sm:h-6 text-commerce" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Giveaway
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Create token-gated giveaways
                  </p>
                </div>
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4 sm:space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      onClick={item.action}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-muted/50 rounded-full flex items-center justify-center">
                        <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">
                          {item.label}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground shrink-0" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Theme Toggle Section */}
        <Card className="mt-4 sm:mt-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-muted/50 rounded-full flex items-center justify-center">
                  <User className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">Theme</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Disconnect Button */}
        <div className="mt-8 sm:mt-12 pb-6">
          <Button
            variant="destructive"
            onClick={handleDisconnect}
            className="w-full h-12 sm:h-14 text-sm sm:text-base"
          >
            <LogOut className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Disconnect Wallet
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center py-4 sm:py-6 border-t">
          <p className="text-xs sm:text-sm text-muted-foreground">
            CrossBeg v1.0.0 • Social Commerce Platform
          </p>
        </div>
      </main>
    </div>
  );
}
