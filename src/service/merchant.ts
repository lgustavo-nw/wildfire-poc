type Category = {
  ID: number;
  Name: string;
  ParentID: number;
};

type Image = {
  ID: number;
  Kind: string;
  Ordinal: number;
  ImageID: number;
  URL: string;
  Width: number;
  Height: number;
};

type Merchant = {
  ID: number;
  Name: string;
  PaysNewCustomersOnly: boolean;
  ShareAndEarnDisabled: boolean;
  SERPInjectionDisabled: boolean;
  BrowserExtensionDisabled: boolean;
  Categories: Category[];
  Countries: string[];
  Images: Image[];
  Score: number;
  PrimaryCategoryID: number;
};

export const getAllMerchants = async (): Promise<Merchant[]> => {
  const res = await fetch('https://www.wildlink.me/data/3/merchant/1')

  return await res.json()
}

export const getFeaturedMerchantIds = async (): Promise<number[]> => {
  const ids = await fetch('https://www.wildlink.me/data/3/featured-merchant/1')
    .then((res: any) => res.json())
    .then((data: any) => data.find((list: any) => list.Name === "Priority")?.MerchantIDs ?? []);

  return ids
}

export const getFeaturedMerchants = async (): Promise<(Merchant)[]> => {
  const [
    featuredMerchantIds,
    featuredMerchants,
  ] = await Promise.all([getFeaturedMerchantIds(), getAllMerchants()])

  // @ts-expect-error
  return featuredMerchantIds.map((id: number) =>
    featuredMerchants.find((merchant) => merchant.ID === id)
  ).filter(Boolean)
}

export const getFeaturedMerchantByName = async (name: string) => {
  const featuredMerchants = await getFeaturedMerchants()

  return featuredMerchants.find((merchant) => merchant?.Name === name)
}

export const getFeaturedMerchantById = async (id: number) => {
  const featuredMerchants = await getFeaturedMerchants()

  return featuredMerchants.find((merchant) => merchant?.ID === id)
}
