export class InvalidCommandError extends Error {
  constructor(readonly message: string) {
    super();
  }
}
