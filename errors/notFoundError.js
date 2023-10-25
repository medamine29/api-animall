import AppError from './appError'

export default class NotFoundError extends AppError {
  constructor(message) {
    super(404, 'NOT_FOUND', message || 'not_found')
  }
}
