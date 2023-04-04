import Button from '@/components/core/button';
import { ToastContainer, toast } from '@/components/core/toast';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

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
      toast.success('Successfully copied to clipboard', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
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
      <ToastContainer limit={3} />
    </>
  );
};

export default CopyWalletAddress;
