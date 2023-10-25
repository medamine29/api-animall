import AppError from '../errors/appError';

/**
* Error handler.
*/

export default function handler(err, req, res, next) {

  console.log(err)
  if (err instanceof AppError) return res.status(err.status).json(err.toJson())
  
  // default to 500 server error
  res.status(500).json({
    code: 'internal_server_error',
    message: err.message,
  });

  next();
  return false;
}
