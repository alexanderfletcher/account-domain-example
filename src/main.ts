import {
  WithdrawMoneyCommand,
  createWithdrawMoneyCommandHandler,
} from "./domain/index.js";
import { createAccountRepository } from "./repositories/in-memory.js";
import { createAsyncInMemoryEventStore } from "./store/in-memory.js";

// Small example of an app setup
export const startApp = () => {

  // Might appear like a lot of setup but in my experience and feedback of doing, and reviewing a simiilar excersise dozens of times
  // this allows it to be way easier to read and maintain longer term. 
  const eventStore = createAsyncInMemoryEventStore();
  const accountRepository = createAccountRepository(eventStore);
  const withdrawCommandHandler =
    createWithdrawMoneyCommandHandler(accountRepository);

  const exampleCommand = new WithdrawMoneyCommand("test-1", 100);

  // This is a floating promise but just meant to show as an example
  withdrawCommandHandler(exampleCommand);
};
