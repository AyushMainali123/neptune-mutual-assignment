export interface ICurrency {
  name: "NEP" | "BUSD";
  value: number;
}

export interface IConverterDatas {
  standardValue: number;
  currency: ICurrency[];
}

export const converterDatas: IConverterDatas = {
  standardValue: 1, // It is a standard constant value. Every values in the currency array is relative to this value.
  currency: [
    {
      name: "NEP",
      value: 1, // It is the exchange rate in relative to standard value. Here, value 1 indicates 1 NEP = 1 standardValue
    },
    {
      name: "BUSD",
      value: 3, // It is the exchange rate in relative to standard value. Here, value 1 indicates 3 BUSD = 1 standardValue
    },
  ],
};
