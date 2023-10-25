import { compare, genSalt, hash } from "bcrypt";
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import { Roles } from "../models/enums";
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import UnauthorizedError from '../errors/unauthorizedError';

export default class UserService {

    static async login(body) {
        const user = await User.findOne({ email: body.email }).lean();
        if (!user)
            throw new NotFoundError("there's no account with this email");
        else if (!await compare(body.password, user.password))
            throw new UnauthorizedError("incorrect password");
        else {
            const token = sign({
                role: user.role,
                user: user._id
            }, process.env.SECRET, { expiresIn: '2h' });
            user.token = token;
    
            return user;
        }
    }

    static async signup(body) {

        const user = await User.findOne({ email: body.email });

        if (user)
            throw new NotFoundError('user already exists');
        else {
            const newUser = new User(body);
            const salt = await genSalt(10);
            const hashedPassword = await hash(newUser.password, salt);
            newUser.password = hashedPassword;
    
            if (!newUser.role) newUser.role = Roles.USER;
            await newUser.save();
            return newUser;
        }

    }

    static async getUser(userId) {
        const user = await User.findOne({_id: userId}).lean()
        if(!user) throw new NotFoundError('compte introuvable')
        return user
    }

    static async updateUser(userId, body) {

        if(body.password) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(body.password, salt);
            body.password = hashedPassword;
        }

        const { matchedCount } = await User.updateOne({ _id: userId }, body)
        if (!matchedCount) throw new NotFoundError('compte introuvable')
    }

}