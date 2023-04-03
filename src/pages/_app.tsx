import { type AppType } from 'next/app';

import { api } from '@/utils/api';

import { inter, manrope } from '@/assets/font';
import '@/styles/globals.css';
import { getDefaultProvider } from 'ethers';
import { WagmiConfig, createClient } from 'wagmi';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${inter.variable} ${manrope.variable} font-sans`}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </div>
  );
};

export default api.withTRPC(MyApp);
