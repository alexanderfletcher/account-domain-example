import test, { describe } from "node:test";
import assert from "node:assert";

import * as accountDomain from "../../src/domain/index.js";

describe(`GIVEN account a-1 is empty`, () => {
  const account: accountDomain.Account = {
    balance: 1000,
  };
  test(`Withdrawing 500 credits from account a-1 returns a MoneyWithdrawnEvent`, () => {
    const command = new accountDomain.WithdrawMoneyCommand("a-1", 500);
    const events = accountDomain.handle(account, command);

    const expectedEvents: accountDomain.AccountDomainEvent = {
      type: "MoneyWithdrawnEvent",
      payload: {
        accountId: "a-1",
        amount: 500,
      },
    };

    assert.deepStrictEqual(events, expectedEvents);
  });

  test(`Withdrawing 1500 credits from account a-1 returns an InsufficientFundsEvent`, () => {
    const command = new accountDomain.WithdrawMoneyCommand("a-1", 1500);
    const events = accountDomain.handle(account, command);

    const expectedEvents: accountDomain.AccountDomainEvent = {
      type: "InsufficientFundsEvent",
      payload: {
        attemptedWithdrawAmount: 1500,
        accountId: "a-1",
      },
    };

    assert.deepStrictEqual(events, expectedEvents);
  });
});
