import Button from '@/components/core/button';
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
      <div className="flex justify-between gap-3">
        <Button
          buttonProps={{ onClick: onConnectWalletCancel }}
          className="flex-1"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          buttonProps={{ onClick: handleConnectWallet, disabled: isLoading }}
          className="flex-1"
        >
          Connect {isLoading && '...'}
        </Button>
      </div>
    </div>
  );
};

export default ConnectWallet;
