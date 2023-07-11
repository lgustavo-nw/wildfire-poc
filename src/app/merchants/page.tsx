/* eslint-disable @next/next/no-img-element */

const MerchantsPage: React.FC = async () => {
  const featuredMerchantsId = await fetch('https://www.wildlink.me/data/3/featured-merchant/1')
    .then(r => r.json())
    .then(data => data.find((list: any) => list.Name === "Priority")?.MerchantIDs ?? []);

  const merchants = await fetch('https://www.wildlink.me/data/3/merchant/1')
    .then(r => r.json())
    .then((merchant: any) => merchant.filter((merchant: any) => featuredMerchantsId.includes(merchant.ID)));

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-8 text-xl font-bold">Merchants Page</h1>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {merchants.map((merchant: any) => (
          <li className="h-44 rounded-lg overflow-hidden" key={merchant.ID}>
            <a href={`/merchants/coupons/${merchant.ID}`}>
              <img className="w-full h-full bg-gray-300 object-cover" src={merchant.Images?.[0]?.URL} alt={merchant.Name} />
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default MerchantsPage;