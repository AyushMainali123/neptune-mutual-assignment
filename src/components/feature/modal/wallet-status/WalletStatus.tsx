import Modal from '@/components/shared/modal';
import { useAccount } from 'wagmi';
import { type IConnectWalletProps } from './WalletStatus.types';
import ConnectWallet from './feature/connect-wallet';
import DisplayWallet from './feature/display-wallet';
const WalletModalTitle = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div className="text-2xl">
      {isConnected ? 'Wallet details' : 'Connect wallet'}
    </div>
  );
};

const WalletNotConnectedDescription = () => {
  return (
    // eslint-disable-next-line react/no-unescaped-entities
    <span className="text-gray-600">
      It seems your wallet is not connected yet. Please click on{' '}
      <span className="text-red-700">Connect </span>
      button to view your wallet details.
    </span>
  );
};

const ConnectWalletModal = ({ isOpen, onClose }: IConnectWalletProps) => {
  const { address, isConnected } = useAccount();
  return (
    <Modal
      isOpen={isOpen}
      title={<WalletModalTitle isConnected={isConnected} />}
      description={!address && <WalletNotConnectedDescription />}
      onClose={onClose}
      ariaLabel="Connect metamask wallet"
      shouldCloseOnOverlayClick={false}
      panelClassName="w-[96vw] max-w-md"
    >
      <div className="mt-8">
        {!address && <ConnectWallet onConnectWalletCancel={onClose} />}
        {!!address && (
          <DisplayWallet
            walletAddress={address}
            onDisconnect={() => onClose()}
          />
        )}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
