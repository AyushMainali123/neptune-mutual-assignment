export interface IDisplayWalletComponentProps {
  walletAddress: `0x${string}`;
  onDisconnect: () => void;
}

export interface ISingleTableComponentProps {
  leftElement: React.ReactNode;
  rightElement: React.ReactNode;
  containerClassName?: string;
}
