import {LAYOUT} from '@vben/router/src/routes/basic'

const dashboard: RouteRecordItem = {
    path: '/order',
    name: 'order_index',
    redirect: '/order/index',
    component: LAYOUT,
    meta: {
        orderNo: 1,
        icon: 'mdi:monitor-dashboard',
        title: 'routes.order.index',
        root: true,
    },
    children: [
        {
            path: 'index',
            name: 'order_order',
            component: () => import('@/pages/order/order/index.vue'),
            meta: {
                icon: 'icon-park-outline:analysis',
                title: 'routes.order.order',
            },
        },
    ],
}

export default dashboard
