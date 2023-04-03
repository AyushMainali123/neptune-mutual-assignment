import { useEffect } from 'react';
import { useBalance, useDisconnect, useNetwork } from 'wagmi';
import { type IDisplayWalletComponentProps } from './DisplayWallet.types';

const DisplayWallet = ({
  walletAddress,
  onDisconnect,
}: IDisplayWalletComponentProps) => {
  const {
    data,
    // isError,
    // isLoading: isCheckingBalance,
  } = useBalance({
    address: walletAddress,
    staleTime: 100_000,
  });

  const {
    disconnect,
    isLoading: isDisconnecting,
    isSuccess: isSuccessfullyDisconnected,
  } = useDisconnect();

  const { chain } = useNetwork();

  useEffect(() => {
    if (isSuccessfullyDisconnected) {
      onDisconnect();
    }
  }, [isSuccessfullyDisconnected, onDisconnect]);

  return (
    <div>
      <div>Account</div>
      <div>{walletAddress.slice(0, 5) + '...' + walletAddress.slice(-4)}</div>
      <div>Wallet Balance:</div>
      <div>
        {data?.value._hex} {data?.symbol}
      </div>
      <br />
      ChainID: {chain?.id}
      <button onClick={() => disconnect()} disabled={isDisconnecting}>
        Disconnect {isDisconnecting ? '...' : ''}
      </button>
    </div>
  );
};

export default DisplayWallet;
