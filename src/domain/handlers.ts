import { WithdrawMoneyCommand } from "./commands.js";
import { AccountRepository } from "./repository.js";
import * as domain from "./account.js";

type WithdrawMoneyCommandHandler = (
  command: WithdrawMoneyCommand
) => Promise<void>;

export const createWithdrawMoneyCommandHandler = (
  repo: AccountRepository
): WithdrawMoneyCommandHandler => {
  const handler: WithdrawMoneyCommandHandler = async (
    command: WithdrawMoneyCommand
  ) => {
    const account = await repo.getAccount(command.accountId);
    const events = await domain.handle(account, command);
    await repo.store(events);
  };

  return handler;
};
