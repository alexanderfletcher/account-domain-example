import { AccountCommand, WithdrawMoneyCommand } from "./commands.js";
import { AccountDomainEvent, MoneyWithdrawnEvent } from "./events.js";

const INITIAL_ACCOUNT_BALANCE = 1000;

export type Account = InitialAccount | CreatedAccount;
type InitialAccount = {};
type CreatedAccount = {
  accountId: string;
  balance: number;
};

const createAccount = (accountId: string): CreatedAccount => {
  return {
    accountId,
    balance: INITIAL_ACCOUNT_BALANCE,
  };
};

const isAccountCreated = (account: Account): account is CreatedAccount => {
  return Object.hasOwn(account, "balance");
};

const withdraw = (
  account: CreatedAccount,
  command: WithdrawMoneyCommand
): MoneyWithdrawnEvent => {
  return {
    type: "MoneyWithdrawnEvent",
    payload: {
      accountId: account.accountId,
      amount: command.amount,
    },
  };
};

export const handle = (
  account: Account,
  command: AccountCommand
): AccountDomainEvent => {
  if (!(command instanceof WithdrawMoneyCommand)) {
    throw new Error("Unsupported command");
  }

  const createdAccount = isAccountCreated(account)
    ? account
    : createAccount(command.accountId);

  const event = withdraw(createdAccount, command);

  return event;
};
