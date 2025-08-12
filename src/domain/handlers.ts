import { WithdrawMoneyCommand } from "./commands.js";
import { AccountRepository } from "./repository.js";
import * as domain from "./account.js";

export type WithdrawMoneyCommandHandler = (
  command: WithdrawMoneyCommand
) => Promise<void>;
export type GetBalanceQueryHandler = (accountId: string) => Promise<number>;

export const createWithdrawMoneyCommandHandler = (
  repo: AccountRepository
): WithdrawMoneyCommandHandler => {
  const handler: WithdrawMoneyCommandHandler = async (
    command: WithdrawMoneyCommand
  ) => {
    const account = await repo.getAccount(command.accountId);
    console.log(
      `WithdrawnMoneyCommand of amount: ${
        command.amount
      } submitted on account ${command.accountId} on account ${JSON.stringify(
        account
      )}`
    );
    const event = await domain.handle(account, command);
    await repo.store(event);
    console.log(`Event ${JSON.stringify(event)} saved`);
  };

  return handler;
};

export const createGetBalanceQueryHandler = (
  accountRepository: AccountRepository
): GetBalanceQueryHandler => {
  return async (accountId: string): Promise<number> => {
    // Debated, but elected not to rehandle the "initial balance is 1000" requirement here
    // as the repository definition ensures it gives us an account with a a balance.
    // But I do think it could be argued that it should be built in here as well
    return (await accountRepository.getAccount(accountId)).balance;
  };
};
