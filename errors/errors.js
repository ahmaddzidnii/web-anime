export class AppError extends Error {
  constructor(name, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;

    Error.captureStackTrace(this);
  }
}
// export class AppError extends Error {
//   constructor(name, httpCode, description, isOperational) {
//     super(description);

//     Object.setPrototypeOf(this, new.target.prototype);

//     this.name = name;
//     this.httpCode = httpCode;
//     this.isOperational = isOperational;

//     Error.captureStackTrace(this);
//   }
// }
