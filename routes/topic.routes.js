import catchErrors from '../middlewares/catchErrors';
import { authorize } from '../middlewares/auth';
import { Roles } from '../models/enums'
import { Router } from 'express';
import { getAllTopics, addTopic, addCommentToTopic, deleteComment, deleteTopic, getTopicDetails } from '../controllers/topic.controller';

const { USER, ADMIN } = Roles
const router = Router();

router.post('/add',  catchErrors(addTopic))
router.get('/all', catchErrors(getAllTopics))
router.get('/details/:topicId', catchErrors(getTopicDetails))
router.put('/:topicId',  catchErrors(addCommentToTopic))
router.delete('/:topicId/comment/:commentId', catchErrors(deleteComment))
router.delete('/:topicId', catchErrors(deleteTopic))

export default router;