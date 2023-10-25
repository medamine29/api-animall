import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";
import UnauthorizedError from "../errors/unauthorizedError"
import Topic from "../models/topic";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default class UserService {

    static async getTopics() {
        const topics = await Topic.find().populate("userId").populate("comments.userId").lean()

        const updatedTopics = []
        for (let i = 0; i < topics.length; i++) {
            const topicElem = topics[i];
            
            const updatedTopic = {
                _id: topicElem._id,
                ownerId: topicElem.userId && topicElem.userId._id,
                ownerName: `${topicElem.userId && topicElem.userId.firstname} ${topicElem.userId && topicElem.userId.lastname}`,
                createdAt: format(topicElem.created_at, 'd MMMM yyyy à HH:mm', { locale: fr }),
                title: topicElem.title,
                description: topicElem.description,
                comments: []
            }

            for (let j = 0; j < topicElem.comments.length; j++) {
                const commentElem = topicElem.comments[j];
                
                const updatedComment = {
                    commentId: commentElem._id,
                    userId: commentElem.userId && commentElem.userId._id,
                    username: `${commentElem.userId && commentElem.userId.firstname} ${commentElem.userId && commentElem.userId.lastname}`,
                    date: format(commentElem.date, 'd MMMM yyyy à HH:mm', { locale: fr }),
                    message: commentElem.message
                }

                updatedTopic.comments.push(updatedComment)
            }

            updatedTopics.push(updatedTopic)
        }

        return updatedTopics
    }

    static async getTopicDetails(topicId) {
        const topic = await Topic.findOne({ _id: topicId}).populate("userId").populate("comments.userId").lean()
            
        const updatedTopic = {
            _id: topic._id,
            ownerId: topic.userId && topic.userId._id,
            ownerName: `${topic.userId && topic.userId.firstname} ${topic.userId && topic.userId.lastname}`,
            createdAt: format(topic.created_at, 'd MMMM yyyy à HH:mm', { locale: fr }),
            title: topic.title,
            description: topic.description,
            comments: []
        }

        for (let j = 0; j < topic.comments.length; j++) {
            const commentElem = topic.comments[j];
            
            const updatedComment = {
                commentId: commentElem._id,
                userId: commentElem.userId && commentElem.userId._id,
                username: `${commentElem.userId && commentElem.userId.firstname} ${commentElem.userId && commentElem.userId.lastname}`,
                date: format(commentElem.date, 'd MMMM yyyy à HH:mm', { locale: fr }),
                message: commentElem.message
            }

            updatedTopic.comments.push(updatedComment)
        }

        return updatedTopic
    }

    static async createTopic(body) {
        const topic = new Topic(body)
        return await topic.save()
    }

    static async addCommentToTopic(topicId, message, userId) {
        const comment = {
            message,
            userId
        }
        const { matchedCount } = await Topic.updateOne({ _id: topicId }, { $push: { comments: comment }})
        if(!matchedCount) throw new BadRequestError("Erreur lors du l'ajout d'un commentaire")
    }

    static async deleteComment(topicId, commentId, userId, isAdmin) {
        const topic = await Topic.findOne({ _id: topicId }).lean()
        if(!topic) throw new NotFoundError('Topic introuvable')

        const comment = topic.comments && topic.comments.find( comment => comment._id.toString() === commentId.toString())
        if(!comment) throw new NotFoundError('Commentaire introuvable')

        //if(!isAdmin && (comment && comment.userId.toString() !== userId.toString())) throw new UnauthorizedError("Vous ne pouvez pas supprimer un commentaire qui ne vous appartient pas")

        const { matchedCount } = await Topic.updateOne({ _id: topicId }, { $pull: { comments: { _id: commentId } } })
        if(!matchedCount) throw new BadRequestError("Erreur lors de la suppression d'un commentaire")
    }

    static async deleteTopic(topicId, userId, isAdmin) {
        const topic = await Topic.findOne({ id: topicId }).lean()
        if(!topic) throw new NotFoundError('Topic introuvable')

        //if(!isAdmin && topic.userId.toString !== userId.toString()) throw new UnauthorizedError("Vous ne pouvez pas supprimer un topic qui ne vous appartient pas")

        await Topic.deleteOne({ _id: topicId })
    }

}