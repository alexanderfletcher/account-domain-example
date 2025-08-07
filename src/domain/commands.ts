export class WithdrawMoneyCommand {
  constructor(readonly accountId: string, readonly amount: number) {
    if (!Number.isInteger(amount)) {
      throw new Error("Withdraw amount must be an integer");
    }

    if (!Number.isSafeInteger(amount)) {
      throw new Error("Withdraw amount must be a precision safe number");
    }
    if (amount < 0) {
      throw new Error("Withdraw amount must be positive");
    }
  }
}

export type AccountCommand = WithdrawMoneyCommand;
