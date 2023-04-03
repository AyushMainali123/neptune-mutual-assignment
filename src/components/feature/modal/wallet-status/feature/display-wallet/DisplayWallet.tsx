import Button from '@/components/core/button';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Popover } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBalance, useDisconnect, useNetwork } from 'wagmi';
import {
  type IDisplayWalletComponentProps,
  type ISingleTableComponentProps,
} from './DisplayWallet.types';
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
  const [, copyFn] = useCopyToClipboard();

  const {
    data,
    // isError,
    // isLoading: isCheckingBalance,
  } = useBalance({
    address: walletAddress,
    staleTime: 100_000,
  });

  const [isCopiedToClipboard, setCopiedToClipboard] = useState(false);

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

  const handleCopyTextToClipboard = () => {
    copyFn(walletAddress)
      .then(() => {
        setCopiedToClipboard(true);
        const intervalId = setTimeout(() => {
          setCopiedToClipboard(false);
          clearInterval(intervalId);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

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
            <Popover className="relative">
              <Popover.Button as={'div'}>
                <Button
                  className="grid h-5 w-5 place-content-center rounded-[4px] p-0"
                  buttonProps={{
                    'aria-label': 'Copy to clipboard',
                    onClick: () => handleCopyTextToClipboard(),
                  }}
                >
                  <Icon icon="material-symbols:content-copy" width={'12px'} />
                </Button>{' '}
              </Popover.Button>

              <Popover.Panel className="absolute right-[-20px] z-10 w-[200px] rounded-sm bg-white p-4 text-center shadow-md">
                {isCopiedToClipboard ? 'Copied to clipboard' : 'Copy text'}
              </Popover.Panel>
            </Popover>
          </div>
        }
      />
      <SingleTableElement leftElement={'ChainID'} rightElement={chain?.id} />
      <SingleTableElement
        leftElement={'Wallet Balance'}
        rightElement={
          <div>
            {data?.value._hex} {data?.symbol}
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
