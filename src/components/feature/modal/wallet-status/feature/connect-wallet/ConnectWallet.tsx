import { useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { type IConnectWalletComponentProps } from './ConnectWallet.types';

const ConnectWallet = ({
  onConnectWalletCancel,
}: IConnectWalletComponentProps) => {
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });

  const handleConnectWallet = () => {
    connect();
  };

  return (
    <div>
      <div className="flex justify-between">
        <button onClick={handleConnectWallet} disabled={isLoading}>
          Connect {isLoading && '...'}
        </button>
        <button onClick={onConnectWalletCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConnectWallet;
