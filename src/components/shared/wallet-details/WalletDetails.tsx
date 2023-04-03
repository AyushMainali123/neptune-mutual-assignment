import Button from '@/components/core/button';
import WalletStatusModal from '@/components/feature/modal/wallet-status';
import { useState } from 'react';

const WalletDetails = () => {
  const [isConnectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  return (
    <>
      <Button
        buttonProps={{ onClick: () => setConnectWalletModalOpen(true) }}
        className="w-full"
      >
        Wallet details
      </Button>
      <WalletStatusModal
        isOpen={isConnectWalletModalOpen}
        onClose={() => setConnectWalletModalOpen(false)}
      />
    </>
  );
};

export default WalletDetails;
