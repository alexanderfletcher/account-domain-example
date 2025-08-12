import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";

import {
  AccountRepository,
  createGetBalanceQueryHandler,
  GetBalanceQueryHandler,
} from "../../src/domain/index.js";

describe(`GIVEN a repository has account a-1 with a balance of 500`, () => {
  let getBalanceQueryHandler: GetBalanceQueryHandler;
  const accountId = "a-1";
  beforeEach(() => {
    const dummyRepository: AccountRepository = {
      getAccount: async (accountId: string) => ({
        accountId,
        balance: 500,
      }),
      store: async (event) => {},
    };
    getBalanceQueryHandler = createGetBalanceQueryHandler(dummyRepository);
  });

  test(`WHEN I query the balance of account a-1
        THEN it returns 500`, async () => {
    const balance = await getBalanceQueryHandler(accountId);
    const expectedAccountBalance = 500;
    assert.strictEqual(balance, expectedAccountBalance);
  });
});
