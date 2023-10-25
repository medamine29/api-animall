import catchErrors from '../middlewares/catchErrors';
import { Roles } from '../models/enums'
import { authorize } from '../middlewares/auth';
import { Router } from 'express';
import { login, signup, getUserInfo, updateUser, addPromotion, getPromotion } from '../controllers/user.controller';

const router = Router();

router.post('/login', catchErrors(login))
router.post('/signup', catchErrors(signup))
router.post('/promotions/add', catchErrors(addPromotion))

router.get('/promotions', catchErrors(getPromotion))
router.get('/profile/:userId', catchErrors(getUserInfo))

router.put('/profile/:userId', catchErrors(updateUser))


export default router;