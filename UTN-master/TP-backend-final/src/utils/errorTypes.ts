export class AppError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation Error') {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication Error') {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access Forbidden') {
    super(message, 403);
  }
}