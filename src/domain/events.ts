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
    accountId: string;
  };
};

export type AccountDomainEvent = MoneyWithdrawnEvent | InsufficientFundsEvent;
