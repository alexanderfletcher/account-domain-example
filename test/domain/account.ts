import test, { describe } from "node:test";
import assert from "node:assert";
import { WithdrawMoneyCommand } from "../../src/domain/commands.js";
import * as accountDomain from "../../src/domain/account.js";
import { AccountDomainEvent } from "../../src/domain/events.js";

describe(`GIVEN account a-1 is empty`, () => {
  const account: accountDomain.Account = {};
  test(`Withdrawing 500 credits from account a-1 returns a MoneyWithdrawnEvent`, () => {
    const command = new WithdrawMoneyCommand("a-1", 500);
    const events = accountDomain.handle(account, command);

    const expectedEvents: AccountDomainEvent = {
      type: "MoneyWithdrawnEvent",
      payload: {
        accountId: "a-1",
        amount: 500,
      },
    };

    assert.deepStrictEqual(events, expectedEvents);
  });

  test(`Withdrawing 1500 credits from account a-1 returns an InsufficientFundsEvent`, () => {
    const command = new WithdrawMoneyCommand("a-1", 1500);
    const events = accountDomain.handle(account, command);

    const expectedEvents: AccountDomainEvent = {
      type: "InsufficientFundsEvent",
      payload: {
        attemptedWithdrawAmount: 1500,
      },
    };

    assert.deepStrictEqual(events, expectedEvents);
  });
});
