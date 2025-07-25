import React, { createContext, useContext, useState } from "react";

interface WalletContextType {
  isConnected: boolean;
  userAddress: string | null;
  userENS: string | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chainId: number) => Promise<void>;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userENS, setUserENS] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      // Mock wallet connection
      const mockAddress = "0x1234567890123456789012345678901234567890";
      const mockENS = "demo.eth";

      setUserAddress(mockAddress);
      setUserENS(mockENS);
      setChainId(1); // Ethereum mainnet
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setUserAddress(null);
    setUserENS(null);
    setChainId(null);
    setIsConnected(false);
  };

  const switchChain = async (targetChainId: number) => {
    try {
      setChainId(targetChainId);
    } catch (error) {
      console.error("Error switching chain:", error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        userAddress,
        userENS,
        chainId,
        connectWallet,
        disconnectWallet,
        switchChain,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
