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
    data: balance,
    error: balanceError,
    isLoading: isCheckingBalance,
  } = useBalance({
    address: walletAddress,
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
        containerClassName="text-zinc-950 font-medium border-t-[1px]"
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
      <SingleTableElement
        leftElement={'ChainID'}
        rightElement={chain ? chain.id : 'No chain found'}
      />
      <SingleTableElement
        leftElement={'Wallet Balance'}
        rightElement={
          <div>
            {/* This is the loading skeleton shown when the balance is in loading state */}
            {isCheckingBalance && (
              <div className="text-bg-slate-700  h-6 w-12 animate-pulse rounded-sm bg-slate-400"></div>
            )}

            {/* This is shown when there is error in checking balance */}
            {balanceError && <>{balanceError.message}</>}

            {/* This is the balance when the balance is available */}
            {!!balance && (
              <>
                {balance?.formatted} {balance?.symbol}
              </>
            )}
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
