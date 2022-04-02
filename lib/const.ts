//

export const httpStatusCodes = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER: 500,
};

export interface ReturnServerError {
	name: string;
	message: string;

	errorData?: { [key: string]: any };
}

export class BaseError extends Error {
	statusCode: number;
	isOperational: boolean;
	errorData?: { [key: string]: any } = {};
	constructor(
		name: string,
		statusCode: number,
		isOperational: boolean,
		description: string,
		errorData?: { [key: string]: any }
	) {
		super(description);

		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.errorData = errorData;
		Error.stackTraceLimit = 30;
		Error.captureStackTrace(this);
	}
}

export class UnknownError extends BaseError {
	constructor(
		name = "Unknown Error",
		statusCode = httpStatusCodes.INTERNAL_SERVER,
		description = "Unknown error occurred!",
		isOperational = true
	) {
		super(name, statusCode, isOperational, description);
	}
}

export class ComplaintNotFound extends BaseError {
	constructor(
		name = "Complaint Not Found",
		statusCode = httpStatusCodes.BAD_REQUEST,
		description = "Given complaint doesn't exist!",
		isOperational = true
	) {
		super(name, statusCode, isOperational, description);
	}
}

export class NotAllowed extends BaseError {
	constructor(
		name = "Action Not Allowed",
		statusCode = httpStatusCodes.FORBIDDEN,
		description = "Action not allowed!",
		isOperational = true
	) {
		super(name, statusCode, isOperational, description);
	}
}
