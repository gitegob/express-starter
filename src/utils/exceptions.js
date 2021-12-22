export class CustomException extends Error {
  constructor(message, name, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class BadRequestException extends Error {
  constructor(message) {
    super(message || 'Bad Request');
    this.name = 'BadRequestException';
    this.statusCode = 400;
  }
}

export class UnauthorizedException extends Error {
  constructor(message) {
    super(message || 'Unauthorized');
    this.name = 'UnauthorizedException';
    this.statusCode = 401;
  }
}

export class ForbiddenException extends Error {
  constructor(message) {
    super(message || 'Forbidden');
    this.name = 'ForbiddenException';
    this.statusCode = 403;
  }
}

export class NotFoundException extends Error {
  constructor(message) {
    super(message || 'Not Found');
    this.name = 'NotFoundException';
    this.statusCode = 404;
  }
}

export class ConflictException extends Error {
  constructor(message) {
    super(message || 'Conflict');
    this.name = 'ConflictException';
    this.statusCode = 409;
  }
}

export class TooManyRequestsException extends Error {
  constructor(message) {
    super(message || 'Too Many Requests');
    this.name = 'TooManyRequestsException';
    this.statusCode = 429;
  }
}

export class ServerErrorException extends Error {
  constructor(message) {
    super(message || 'Server Error');
    this.name = 'ServerErrorException';
    this.statusCode = 500;
  }
}

export class BadGatewayException extends Error {
  constructor(message) {
    super(message || 'Bad Gateway');
    this.name = 'BadGatewayException';
    this.statusCode = 502;
  }
}
