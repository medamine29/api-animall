import { Roles } from '../models/enums'
import  TopicService from '../services/topic.service'

export const getAllTopics = async (req, res) => {
    const topics = await TopicService.getTopics()
    return res.json(topics)
}

export const addTopic = async (req, res) => {
    const topic = await TopicService.createTopic(req.body)
    return res.status(201).json(topic)
}

export const addCommentToTopic = async (req, res) => {
    await TopicService.addCommentToTopic(req.params.topicId, req.body.message, req.body.userId)
    return res.sendStatus(204)
}

export const deleteComment = async (req, res) => {
    const isAdmin = req.role === Roles.ADMIN
    console.log(req.params.commentId)
    await TopicService.deleteComment(req.params.topicId, req.params.commentId, req.userId, isAdmin)
    return res.sendStatus(204)
}

export const deleteTopic = async (req, res) => {
    const isAdmin = req.role === Roles.ADMIN
    await TopicService.deleteTopic(req.params.topicId, req.userId, isAdmin)
    return res.sendStatus(204)
}

export const getTopicDetails = async (req, res) => {
    const topicId = req.params.topicId
    const topic = await TopicService.getTopicDetails(topicId)
    return res.json(topic)
}