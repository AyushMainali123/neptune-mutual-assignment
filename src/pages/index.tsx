import Card from '@/components/core/card';
import Logo from '@/components/core/icon/logo';
import ConverterForm from '@/components/feature/converter-form';
import WalletDetails from '@/components/shared/wallet-details';
import { type NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen place-content-center bg-gray-50 text-stone-950">
        {/* Container Div */}
        <div>
          <center className="mb-12">
            <Logo />
          </center>

          {/* Content Div */}
          <Card className="w-[96vw] max-w-sm">
            <ConverterForm />
            <div className="mt-6">
              <WalletDetails />
            </div>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Home;
