export type MoneyWithdrawnEvent = {
  type: "MoneyWithdrawnEvent";
  payload: {
    accountId: string;
    amount: number;
  };
};

export type AccountDomainEvent = MoneyWithdrawnEvent;
