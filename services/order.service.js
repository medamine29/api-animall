import NotFoundError from '../errors/notFoundError'
import BadRequestError from '../errors/badRequestError'
import Order from '../models/order'
import { OrderStatusEnum } from '../models/enums'

export default class OrderService {

    static async createOrder(body) {
        const order = new Order(body)
        return await order.save()
    }

    static async getOrders() {
        const orders = await Order.find().populate("userId").populate("products.productId").lean()

        const updatedOrders = []
        for (let i = 0; i < orders.length; i++) {
            const orderElem = orders[i];
            const newOrder = {
                _id: orderElem._id,
                totalPrice: orderElem.orderPricing && orderElem.orderPricing.finalAmount,
                redcution: orderElem.orderPricing && orderElem.orderPricing.reductionAmount,
                clientPhone: orderElem.userId && orderElem.userId.phone,
                clientName: orderElem.userId && `${orderElem.userId.firstname} ${orderElem.userId.lastname}`,
                deliveryAddress: orderElem.userId && orderElem.userId.address,
                status: orderElem.status
            }

            const updatedProducts = []
            for (let j = 0; j < orderElem.products.length; j++) {
                const productElem = orderElem.products[j];
                let convertedProduct = `${productElem.productId.title} x${productElem.quantity || 1}`
                if (j != (orderElem.products.length - 1)) convertedProduct = convertedProduct + ', '
                updatedProducts.push(convertedProduct)
            }
            newOrder.products = updatedProducts

            updatedOrders.push(newOrder)
        }
        return updatedOrders
    }

    static async getOrderDetails(orderId) {
        const order = await Order.findOne({ _id: orderId }).lean()
        if(!order) throw new NotFoundError('Commande introuvable')
        return order
    }

    static async cancelOrder(orderId) {
        const { matchedCount } = await Order.updateOne({ _id: orderId }, { status: OrderStatusEnum.CANCELLED })
        if(!matchedCount) throw new BadRequestError("Erreur lors de l'annulation de la commande")
    }


    static async updateOrderStatus(orderId, status) {
        const { matchedCount } = await Order.updateOne({ _id: orderId }, { status })
        if(!matchedCount) throw new BadRequestError("Erreur lors de la modification de la commande")
    }
}