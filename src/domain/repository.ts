import { Account } from "./account.js";
import { AccountDomainEvent } from "./events.js";

export type AccountRepository = {
  store: (event: AccountDomainEvent) => Promise<void>;
  getAccount: (accountId: string) => Promise<Account>;
};
