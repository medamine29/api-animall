import catchErrors from '../middlewares/catchErrors';
import { authorize } from '../middlewares/auth';
import { Roles } from '../models/enums'
import { Router } from 'express';
import { addOrder, getAllOrders, getOrderDetails, cancelOrder, changeOrderStatus } from '../controllers/order.controller';

const { ADMIN, USER } = Roles
const router = Router();

router.post('/add', authorize(ADMIN, USER) ,catchErrors(addOrder))

router.get('/all', catchErrors(getAllOrders))
router.get('/:orderId/details', authorize(ADMIN, USER), catchErrors(getOrderDetails))

router.put('/:orderId/cancel', authorize(USER), catchErrors(cancelOrder))
router.put('/:orderId/status', authorize(ADMIN), catchErrors(changeOrderStatus))

export default router;