import ConnectWalletModal from '@/components/feature/modal/wallet-status';
import { useState } from 'react';

const WalletDetails = () => {
  const [isConnectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setConnectWalletModalOpen(true)}>
        Wallet details
      </button>
      <ConnectWalletModal
        isOpen={isConnectWalletModalOpen}
        onClose={() => setConnectWalletModalOpen(false)}
      />
    </>
  );
};

export default WalletDetails;
