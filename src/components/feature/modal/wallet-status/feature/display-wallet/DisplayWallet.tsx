import Button from '@/components/core/button';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBalance, useDisconnect, useNetwork } from 'wagmi';
import {
  type IDisplayWalletComponentProps,
  type ISingleTableComponentProps,
} from './DisplayWallet.types';
import CopyWalletAddress from './features/copy-wallet-address';
const SingleTableElement = ({
  leftElement,
  rightElement,
  containerClassName,
}: ISingleTableComponentProps) => {
  return (
    <>
      <div
        className={twMerge(
          'flex items-center justify-between border-b-[1px] py-2 font-normal  text-gray-600',
          containerClassName
        )}
      >
        <div>{leftElement}</div>
        <div className="text-right">{rightElement}</div>
      </div>
    </>
  );
};

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
      <SingleTableElement
        leftElement={'Key'}
        rightElement={'value'}
        containerClassName="text-zinc-950 border-t-[1px]"
      />
      <SingleTableElement
        leftElement={'Account'}
        rightElement={
          <div className="flex items-center gap-2">
            <div>
              {walletAddress.slice(0, 5) + '...' + walletAddress.slice(-4)}
            </div>
            <div>
              <CopyWalletAddress walletAddress={walletAddress} />
            </div>
          </div>
        }
      />
      <SingleTableElement leftElement={'ChainID'} rightElement={chain?.id} />
      <SingleTableElement
        leftElement={'Wallet Balance'}
        rightElement={
          <div>
            {data?.formatted} {data?.symbol}
          </div>
        }
        containerClassName="border-b-0"
      />

      <Button
        buttonProps={{ onClick: () => disconnect() }}
        isLoading={isDisconnecting}
        className="mt-8 w-full border-red-600 bg-red-600 hover:bg-red-700"
      >
        Disconnect
      </Button>
    </div>
  );
};

export default DisplayWallet;
