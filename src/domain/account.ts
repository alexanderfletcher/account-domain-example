import { AccountCommand, WithdrawMoneyCommand } from "./commands.js";
import { AccountDomainEvent } from "./events.js";

export const INITIAL_ACCOUNT_BALANCE = 1000;

export type Account = InitialAccount | CreatedAccount;

type InitialAccount = {
  balance: typeof INITIAL_ACCOUNT_BALANCE;
};
type CreatedAccount = {
  accountId: string;
  balance: number;
};

export const createAccount = (accountId: string): CreatedAccount => {
  return {
    accountId,
    balance: INITIAL_ACCOUNT_BALANCE,
  };
};

const isAccountCreated = (account: Account): account is CreatedAccount => {
  return Object.hasOwn(account, "accountId");
};

const withdraw = (
  account: CreatedAccount,
  command: WithdrawMoneyCommand
): AccountDomainEvent => {
  if (account.balance < command.amount) {
    return {
      type: "InsufficientFundsEvent",
      payload: {
        attemptedWithdrawAmount: command.amount,
        accountId: account.accountId,
      },
    };
  }

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
