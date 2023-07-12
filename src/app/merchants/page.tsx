/* eslint-disable @next/next/no-img-element */

import { getFeaturedMerchants } from "@/service/merchant";

const MerchantsPage: React.FC = async () => {
  const merchants = await getFeaturedMerchants();

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-8 text-xl font-bold">Merchants Page</h1>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {merchants.map((merchant) => (
          <li className="h-44 rounded-lg overflow-hidden" key={merchant?.ID.toString()}>
            <a href={`/merchants/${merchant?.Name}`}>
              <img className="w-full h-full bg-gray-300 object-cover" src={merchant?.Images?.[0]?.URL} alt={merchant?.Name} />
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default MerchantsPage;