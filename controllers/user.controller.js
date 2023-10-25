import  UserService from '../services/user.service'
import Promotion from '../models/promotion'


export async function login(req, res) {
    const user = await UserService.login(req.body)
    return res.json(user)
}

export async function signup(req, res) {
    const user = await UserService.signup(req.body)
    return res.json(user)
}

export async function getUserInfo(req, res) {
    const user = await UserService.getUser(req.params.userId)
    return res.json(user)
}

export async function updateUser(req, res) {
    const user = await UserService.updateUser(req.params.userId, req.body)
    return res.sendStatus(204)
}

export const addPromotion = async (req, res) => {
    const promotionText = req.body.promotionText

    const promo = await Promotion.findOne({})
    if (!promo) {
        const newPromotion = new Promotion({
            title: promotionText
        })
        const savedPromo = await newPromotion.save()
    
        return res.json(savedPromo)
    } else {
        promo.title = promotionText
        const savedPromo = await promo.save()
    
        return res.json(savedPromo)
        return res.json(savedPromo)
    }
}

export const getPromotion = async (req, res) => {
    const promo = await Promotion.findOne({}).lean()
    return res.json(promo && promo.title || '')
}
    