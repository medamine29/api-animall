import AppError from './appError'

export default class BadRequestError extends AppError {
  constructor(message) {
    super(400, 'BAD_REQUEST', message || 'bad_request')
  }
}
