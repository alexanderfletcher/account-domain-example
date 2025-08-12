// Integration tests for the application

import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";
import {
  WithdrawMoneyCommand,
  AccountRepository,
  createWithdrawMoneyCommandHandler,
  WithdrawMoneyCommandHandler,
} from "../../src/domain/index.js";
import { createAsyncInMemoryEventStore } from "../../src/store/in-memory.js";
import { createAccountRepository } from "../../src/repositories/in-memory.js";

describe(`GIVEN account a-1 has had no events`, () => {
  let withdrawCommandHandler: WithdrawMoneyCommandHandler;
  let accountRepositoryProjection: AccountRepository;
  beforeEach(() => {
    const eventStore = createAsyncInMemoryEventStore();
    accountRepositoryProjection = createAccountRepository(eventStore);
    withdrawCommandHandler = createWithdrawMoneyCommandHandler(
      accountRepositoryProjection
    );
  });

  const accountId = "a-1";
  test(`WHEN I submit a WithdrawMoneyCommand for account a-1 of 500 credits
        THEN I submit a WithdrawMoneyCommand for account a-1 of 250 credits
        THEN the balance of account a-1 from the projection is 250`, async () => {
    const firstCommand = new WithdrawMoneyCommand(accountId, 500);
    const secondCommand = new WithdrawMoneyCommand(accountId, 250);

    await withdrawCommandHandler(firstCommand);
    await withdrawCommandHandler(secondCommand);

    const account = await accountRepositoryProjection.getAccount(accountId);
    const expectedAccountBalance = 250;

    assert.strictEqual(account.balance, expectedAccountBalance);
  });

  test(`WHEN I submit a WithdrawMoneyCommand for account a-1 of 500 credits
        THEN I submit a WithdrawMoneyCommand for account a-1 of 750 credits
        THEN the balance of account a-1 from the projection is 500`, async () => {
    const firstCommand = new WithdrawMoneyCommand(accountId, 500);
    const secondCommand = new WithdrawMoneyCommand(accountId, 750);

    await withdrawCommandHandler(firstCommand);
    await withdrawCommandHandler(secondCommand);

    const account = await accountRepositoryProjection.getAccount(accountId);
    const expectedAccountBalance = 500;

    assert.strictEqual(account.balance, expectedAccountBalance);
  });

  test(`WHEN I submit a WithdrawMoneyCommand for account a-1 of -500 credits
        THEN the balance of account a-1 from the projection is 1000`, async () => {
    try {
      const firstCommand = new WithdrawMoneyCommand(accountId, -500);
      await withdrawCommandHandler(firstCommand);
    } catch (e) {}

    const account = await accountRepositoryProjection.getAccount(accountId);
    const expectedAccountBalance = 1000;

    assert.strictEqual(account.balance, expectedAccountBalance);
  });
});
