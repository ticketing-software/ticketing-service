import { CustomError } from "./custom-error";

class PathNotFoundException extends CustomError {
  statusCode = 404;

  constructor(public message: string, public path?: string) {
    super(message);

    Object.setPrototypeOf(this, PathNotFoundException.prototype);
  }

  serializeErrors() {
    return [
      { message: this.path ? `Path Not found ${this.path}` : this.message },
    ];
  }
}

export { PathNotFoundException };
