import { inter, manrope } from '@/assets/font';
import '@/styles/globals.css';
import { api } from '@/utils/api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { bsc, goerli, mainnet, sepolia } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { type AppType } from 'next/app';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli, sepolia, bsc],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <div className={`${inter.variable} ${manrope.variable} font-sans`}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </div>
      <ReactQueryDevtools />
    </>
  );
};

export default api.withTRPC(MyApp);
