import catchErrors from '../middlewares/catchErrors';
import { authorize } from '../middlewares/auth';
import { Roles } from '../models/enums'
import { Router } from 'express';
const multerConfig = require('../middlewares/multer.config');
import { getProducts, getProductDetails, addProduct, getFilteredProducts } from '../controllers/product.controller';

const { ADMIN } = Roles
const router = Router();

router.post('/add', authorize(ADMIN), multerConfig ,catchErrors(addProduct))
router.get('/all', catchErrors(getProducts))
router.get('/:filter', catchErrors(getFilteredProducts))
router.get('/:productId/details', catchErrors(getProductDetails))

export default router;