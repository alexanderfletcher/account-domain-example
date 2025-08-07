import test from "node:test";
import assert from "node:assert";
import { WithdrawMoneyCommand } from "../../src/domain/commands.js";

test(`Creating a WithdrawMoneyCommand with a negative amount throws an error`, () => {
  const raiseCommand = () => {
    new WithdrawMoneyCommand("a-1", -1000);
  };
  assert.throws(raiseCommand, Error);
});

test(`Creating a WithdrawMoneyCommand with a postive amount does not throw an error`, () => {
  const raiseCommand = () => {
    new WithdrawMoneyCommand("a-1", 1000);
  };
  assert.doesNotThrow(raiseCommand, Error);
});
