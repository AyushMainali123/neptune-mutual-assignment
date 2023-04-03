import Modal from '@/components/shared/modal';
import { useAccount } from 'wagmi';
import { type IConnectWalletProps } from './WalletStatus.types';
import ConnectWallet from './feature/connect-wallet';
import DisplayWallet from './feature/display-wallet';
const WalletModalTitle = () => {
  return <div className="text-2xl">Wallet details</div>;
};

const WalletNotConnectedDescription = () => {
  return (
    // eslint-disable-next-line react/no-unescaped-entities
    <span className="text-red-600">
      Wallet not connected. Please click {`"Connect now"`} button to connect.
    </span>
  );
};

const ConnectWalletModal = ({ isOpen, onClose }: IConnectWalletProps) => {
  const { address } = useAccount();
  console.log({ address });
  return (
    <Modal
      isOpen={isOpen}
      title={<WalletModalTitle />}
      description={<WalletNotConnectedDescription />}
      onClose={onClose}
      ariaLabel="Connect metamask wallet"
      shouldCloseOnOverlayClick={false}
    >
      {!address && <ConnectWallet onConnectWalletCancel={onClose} />}
      {!!address && (
        <DisplayWallet walletAddress={address} onDisconnect={() => onClose()} />
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
