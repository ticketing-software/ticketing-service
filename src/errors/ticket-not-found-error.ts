import { CustomError } from "./custom-error";

class TicketNotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, TicketNotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export default TicketNotFoundError;
