import test from "node:test";
import assert from "node:assert";
import {
  WithdrawMoneyCommand,
  InvalidCommandError,
} from "../../src/domain/index.js";

test(`Creating a WithdrawMoneyCommand with a negative amount throws an error`, () => {
  const raiseCommand = () => {
    new WithdrawMoneyCommand("a-1", -1000);
  };
  assert.throws(raiseCommand, InvalidCommandError);
});

test(`Creating a WithdrawMoneyCommand with a postive amount does not throw an error`, () => {
  const raiseCommand = () => {
    new WithdrawMoneyCommand("a-1", 1000);
  };
  assert.doesNotThrow(raiseCommand, InvalidCommandError);
});

test(`Creating a WithdrawMoneyCommand with a float amount of credits throws an error`, () => {
  const raiseCommand = () => {
    new WithdrawMoneyCommand("a-1", 500.5);
  };
  assert.throws(raiseCommand, InvalidCommandError);
});

test(`Creating a WithdrawMoneyCommand with a precision unsafe number throws an error`, () => {
  const raiseCommand = () => {
    new WithdrawMoneyCommand("a-1", 2 ** 53);
  };
  assert.throws(raiseCommand, InvalidCommandError);
});
