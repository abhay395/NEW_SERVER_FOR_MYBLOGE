import authRoute from './Auth.routes.js';
import userRoute from './User.routes.js';
import blogRoute from './Bloge.routes.js';
import commentRoute from './Comment.routes.js';
import express from 'express'

const router = express.Router();
const routes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/bloge',
        route: blogRoute
    },
    // {
    //     path: '/contact',
    //     route: contactRoute
    // },
    {
        path: '/comment',
        route: commentRoute
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router