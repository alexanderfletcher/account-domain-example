export class WithdrawMoneyCommand {
  constructor(readonly amount: number) {
    if (amount < 0) {
      throw new Error("Cannot create a negative withdrawal command");
    }
  }
}
