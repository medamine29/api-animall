import { verify } from 'jsonwebtoken';
import UnauthorizedError from "../errors/unauthorizedError";

export const authorize = (...roles) => async (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers.authorization
    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length)

    try {
        if(!token) throw new UnauthorizedError('token is missing')

        let decodedToken
        try {
            decodedToken = verify(token, process.env.SECRET);
        } catch (e) {
            if(e.message == 'jwt expired') throw new UnauthorizedError('token is expired, please login again')
            else throw new UnauthorizedError('invalid token')
        }

        if(decodedToken && decodedToken.role){
            
            if(!roles.includes(decodedToken.role)) throw new UnauthorizedError("you don't have authorization over this resource")
            else{
                req.userId = decodedToken.user
                req.role = decodedToken.role
                next()
            }
        }
    } catch (e) {
        next(e)
    }
  
}