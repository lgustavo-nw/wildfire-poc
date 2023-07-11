interface Props {
  params: {
    id: string | number;
  }
}

const DomainPage: React.FC<Props> = async ({params}) => {
  const coupons = await fetch(`https://www.wildlink.me/data/3/coupon/1`)
    .then(r => r.json())
    .then(data => data.filter((coupon: any) => coupon.MerchantID == params.id))
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-lg font-bold mb-8">Coupons Page</h1>

      {coupons.length === 0 ? (
        <p className="text-base">No coupons found for this merchant.</p>
      ) : (
        <ul className="flex flex-col">
        {coupons.map((coupon: any) => (
          <li className="flex flex-col border p-2 mb-4" key={coupon.ID}>
            <span className="text-sm mb-2">ID: {coupon.ID}</span>
            <p className="text-base">{coupon.Description}</p>
            <p className="text-base">CODE: {coupon.Code || "--"}</p>
          </li>
        ))}
      </ul>
      )}
    </main>
  );
}

export default DomainPage;