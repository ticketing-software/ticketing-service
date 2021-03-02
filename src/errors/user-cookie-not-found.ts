import { CustomError } from "./custom-error";

class UserCookieNotFound extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UserCookieNotFound.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export default UserCookieNotFound;
