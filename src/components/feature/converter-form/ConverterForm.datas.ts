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
      value: 3, // The value 3 indicates, 3 Standard Value = 1 NEP Value
    },
    {
      name: "BUSD",
      value: 1, // The value 1 indicates, 1 standard value  = 1 BUSD value
    },
  ],
};
