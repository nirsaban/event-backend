export class DBError extends Error {
  public error: any;
  constructor(error: any, message?) {
    super(message);
    this.error = error;
  }
}
