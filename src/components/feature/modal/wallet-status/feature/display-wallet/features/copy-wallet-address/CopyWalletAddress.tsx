import Button from '@/components/core/button';
import { toast } from '@/components/core/toast';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ToastContainer = dynamic(() => import('@/components/core/toast'), {
  ssr: false,
});
interface ICopyWalletAddressProps {
  walletAddress: `0x${string}`;
}

const CopyWalletAddress = ({ walletAddress }: ICopyWalletAddressProps) => {
  const [, copyFn] = useCopyToClipboard();
  const [isCopiedToClipboard, setCopiedToClipboard] = useState(false);
  const handleCopyTextToClipboard = () => {
    copyFn(walletAddress)
      .then(() => {
        setCopiedToClipboard(true);
        const intervalId = setTimeout(() => {
          setCopiedToClipboard(false);
          clearInterval(intervalId);
        }, 500);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isCopiedToClipboard) {
      toast.dismiss();
      toast.success('Successfully copied to clipboard');
    }
  }, [isCopiedToClipboard]);

  return (
    <>
      <Button
        className="grid place-content-center rounded-[4px] p-1"
        buttonProps={{
          'aria-label': 'Copy to clipboard',
          onClick: () => handleCopyTextToClipboard(),
        }}
      >
        <Icon icon="material-symbols:content-copy" width={'12px'} />
      </Button>
      <ToastContainer
        limit={3}
        position="top-center"
        autoClose={3000}
        theme="light"
        className={'z-[99999]'}
      />
    </>
  );
};

export default CopyWalletAddress;
