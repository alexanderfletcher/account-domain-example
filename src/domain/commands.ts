import { InvalidCommandError } from "./error.js";

// We use a class over a plain type here so we can ensure the validation was run
export class WithdrawMoneyCommand {
  constructor(readonly accountId: string, readonly amount: number) {
    if (!Number.isInteger(amount)) {
      throw new InvalidCommandError("Withdraw amount must be an integer");
    }

    if (!Number.isSafeInteger(amount)) {
      throw new InvalidCommandError(
        "Withdraw amount must be a precision safe number"
      );
    }
    if (amount < 0) {
      throw new InvalidCommandError("Withdraw amount must be positive");
    }
  }
}

export type AccountCommand = WithdrawMoneyCommand;
