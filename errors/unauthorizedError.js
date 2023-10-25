import AppError from './appError'

export default class UnauthorizedError extends AppError {
  constructor(message) {
    super(401, 'UNAUTHORIZED', message || 'unauthorized')
  }
}
