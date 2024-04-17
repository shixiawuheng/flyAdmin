import {LAYOUT} from '@vben/router/src/routes/basic'

const dashboard: RouteRecordItem = {
    path: '/sys',
    name: 'sys_index',
    redirect: '/sys/index',
    component: LAYOUT,
    meta: {
        orderNo: 2,
        icon: 'mdi:monitor-dashboard',
        title: 'routes.sys.index',
        root: true,
    },
    children: [
        {
            path: 'user',
            name: 'user',
            component: () => import('@/pages/sys/user/user.vue'),
            meta: {
                icon: 'icon-park-outline:analysis',
                title: 'routes.sys.user',
            },
        },
        {
            path: 'key',
            name: 'key',
            component: () => import('@/pages/sys/key/key.vue'),
            meta: {
                icon: 'icon-park-outline:workbench',
                title: 'routes.sys.key',
            },
        },
    ],
}

export default dashboard
