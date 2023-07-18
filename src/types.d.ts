type Account = {
  _id: string;
  id: number;
  name: string;
  default: boolean;
  funds: number;
  profitLoss: number;
  accountType: string;
  isDemo: boolean;
  currency: string;
};

type Totals = {
  total: number;
  count: number;
  skip: number;
  max: number;
};

type AccountType = {
  _id: string;
  id: string;
  title: string;
};
