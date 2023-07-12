import { getCouponsByMerchantId } from "@/service/coupon";
import {getFeaturedMerchantByName, getFeaturedMerchants} from "@/service/merchant";

export async function generateStaticParams() {
  const merchants = await getFeaturedMerchants();

  return merchants.map((item) => ({
    name: item?.Name
  }))
}

interface Props {
  params: {
    name: string
  }
}

const CouponsByMerchantName: React.FC<Props> = async ({params}) => {
  const merchant = await getFeaturedMerchantByName(decodeURI(params.name));

  if (!merchant) {
    return <h1>Merchant not found</h1>
  }

  const coupons = await getCouponsByMerchantId(merchant?.ID);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {
        merchant?.Images?.[0]?.URL && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="w-40 h-40 mb-8 object-cover rounded-lg" src={merchant?.Images?.[0]?.URL} alt={merchant?.Name} />
        )
      }

      <h1 className="text-lg font-bold mb-8">Coupons by {merchant.Name}</h1>

      {coupons.length === 0 ? (
        <p className="text-base">No coupons found for this merchant.</p>
      ) : (
        <ul className="flex flex-col max-w-3xl">
        {coupons.map((coupon) => (
          <li className="flex flex-col border p-2 mb-4 rounded-lg" key={coupon.ID.toString()}>
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

export default CouponsByMerchantName;