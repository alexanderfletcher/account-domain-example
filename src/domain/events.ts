export type MoneyWithdrawnEvent = {
  type: "MoneyWithdrawnEvent";
  payload: {
    accountId: string;
    amount: number;
  };
};

export type InsufficientFundsEvent = {
  type: "InsufficientFundsEvent";
  payload: {
    attemptedWithdrawAmount: number;
  };
};

export type AccountDomainEvent = MoneyWithdrawnEvent | InsufficientFundsEvent;
