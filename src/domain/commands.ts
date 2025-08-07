export class WithdrawMoneyCommand {
  constructor(readonly accountId: string, readonly amount: number) {
    if (amount < 0) {
      throw new Error("Cannot create a negative withdrawal command");
    }
  }
}

export type AccountCommand = WithdrawMoneyCommand;
