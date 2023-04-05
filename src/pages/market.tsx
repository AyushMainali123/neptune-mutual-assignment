import Card from '@/components/core/card';
import Logo from '@/components/core/icon/logo';
import CoinExchangeForm from '@/components/feature/coin-exchange-form';

const Market = () => {
  return (
    <main className="grid min-h-screen place-content-center bg-gray-50 text-stone-950">
      {/* Container Div */}
      <div>
        <center className="mb-12">
          <Logo />
        </center>

        {/* Content Div */}
        <Card className="w-[96vw] max-w-sm">
          <CoinExchangeForm />
        </Card>
      </div>
    </main>
  );
};

export default Market;
