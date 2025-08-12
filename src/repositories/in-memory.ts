import {
  Account,
  INITIAL_ACCOUNT_BALANCE,
  AccountDomainEvent,
  MoneyWithdrawnEvent,
  AccountRepository,
} from "../domain/index.js";
import { EventStore } from "../store/in-memory.js";

// Only ended up supporting one stream but still a good habbit to build in from the start
const ACCOUNT_EVENT_STREAM = "account";

// This is used for both the event handling and the projection, in a more complicated scenario it would be good to split these up
// There is a potential that the handler could receieve an older version of the event store with this current iteration
export const createAccountRepository = (
  eventStore: EventStore
): AccountRepository => {
  // Very simple retrieval that will recreate the account state every time it runs. At a certain scale would be good to change into a structure that allows for o(1) retrieval
  const getAccount = async (accountId: string): Promise<Account> => {
    const eventStoreSize = await eventStore.head();
    const allEvents = await eventStore.get(eventStoreSize, 0);
    const accountEvents = allEvents.filter(
      (event) => event.payload.accountId === accountId
    );

    const doesAccountExist = accountEvents.length > 0;
    if (!doesAccountExist) {
      return {
        balance: INITIAL_ACCOUNT_BALANCE,
      };
    }

    const successfulWithDrawnEvents: MoneyWithdrawnEvent[] =
      accountEvents.filter((event) => event.type === "MoneyWithdrawnEvent");
    const accountBalance = successfulWithDrawnEvents.reduce(
      (previous, current) => previous - current.payload.amount,
      INITIAL_ACCOUNT_BALANCE
    );

    return { balance: accountBalance, accountId };
  };
  const store = async (event: AccountDomainEvent) => {
    eventStore.save(ACCOUNT_EVENT_STREAM, event.payload.accountId, event);
  };

  return {
    store,
    getAccount,
  };
};
