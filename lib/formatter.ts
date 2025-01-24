import { Formatter } from "@/schemas/common";

export const defaultFormatter: Formatter = {
  format: (value) => value,
  parse: (value) => value,
};

export const numberFormatter: () => Formatter<number> = () => {
  return {
    format: (value: number) => {
      return value.toString();
    },
    parse: (value: string) => {
      return parseInt(value, 10) || 0;
    },
  };
};
