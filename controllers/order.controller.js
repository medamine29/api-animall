import OrderService from "../services/order.service"

export const addOrder = async (req, res) => {
    const order = await OrderService.createOrder(req.body)
    return res.status(201).json(order)
}

export const getAllOrders = async (req, res) => {
    const orders = await OrderService.getOrders()
    return res.json(orders)
}

export const getOrderDetails = async (req, res) => {
    const order = await OrderService.getOrderDetails(req.params.orderId)
    return res.json(order)
}

export const cancelOrder = async (req, res) => {
    await OrderService.cancelOrder(req.params.orderId)
    return res.sendStatus(204)
}

export const changeOrderStatus = async (req, res) => {
    await OrderService.updateOrderStatus(req.params.orderId, req.body.status)
    return res.sendStatus(204)
}