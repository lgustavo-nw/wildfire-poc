type Coupon = {
  ID: number;
  Description: string;
  Code: string;
  MerchantID: number;
  Countries: string[];
  Exclusions: string;
  StartDate: string;
  EndDate: string;
  Disabled: boolean;
};


export const getAllCoupons = async (): Promise<Coupon[]> => {
  const res = await fetch('https://www.wildlink.me/data/3/coupon/1').then(r => r.json())

  return res
}

export const getCouponsByMerchantId = async (merchantId: number): Promise<Coupon[]> => {
  const coupons = await getAllCoupons()

  return coupons.filter((coupon) => coupon.MerchantID === merchantId)
}

