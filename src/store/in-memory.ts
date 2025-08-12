import { AccountDomainEvent } from "../domain/index.js";

type EventStoreEntry = {
  stream: string;
  streamId: string;
  event: AccountDomainEvent;
};

export type EventStore = {
  save: (
    stream: string,
    streamId: string,
    event: AccountDomainEvent
  ) => Promise<void>;
  get: (take: number, from: number) => Promise<AccountDomainEvent[]>;
  head: () => Promise<number>;
};

// Although this does not need to be async, it will save a lot of time and rework if we plug in a different data store.
export const createAsyncInMemoryEventStore = (): EventStore => {
  const store: EventStoreEntry[] = [];

  const save = async (
    stream: string,
    streamId: string,
    event: AccountDomainEvent
  ) => {
    store.push({ stream, streamId, event });
  };

  // only supports one stream at the moment
  const get = async (take: number, from: number) => {
    return store.slice(from, from + take).map((entry) => entry.event);
  };

  const head = async () => store.length;

  return {
    save,
    get,
    head,
  };
};
