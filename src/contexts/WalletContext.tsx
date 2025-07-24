import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  isConnected: boolean;
  userAddress: string | null;
  userENS: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userENS, setUserENS] = useState<string | null>(null);

  const connectWallet = async () => {
    // Mock wallet connection - in real app this would use ethers/viem
    setIsConnected(true);
    setUserAddress('0x1234567890123456789012345678901234567890');
    setUserENS('amaka.eth');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setUserAddress(null);
    setUserENS(null);
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      userAddress,
      userENS,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}