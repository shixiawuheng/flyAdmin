import {request} from '@vben/request'
import {ErrorMessageMode} from "@vben/types";

export interface order_type {
    id?: number,
    note: string,
    money: number,
    level: number | string,
    name: string,
    script: string
}

export enum order_status {
    OrderPending = 1, // 待激活订单
    OrderWait,        // 待执行订单
    OrderRunning,     // 执行中订单
    OrderOk,          // 订单完成
    OrderError,       // 订单异常
    OrderExpire,      // 订单过期
}

// export interface order {
//     id: number,
//     note: string,
//     money: number,
//     level: number | string,
//     name: string,
//     script: string,
//     create_at: number,
//     update_at: number,
// }

export interface order {
    id: number,
    uid: number,
    order: string,
    type: number,
    status: number,
    count: number,
    create_at: number,
    update_at: number,
}

export interface ScriptResult {
    success: string[],
    error: string[],
    count: number,
}

export function api_types(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<order_type[]>(
        {
            url: '/order/types',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_base(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get(
        {
            url: '/order/base',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_status(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<order_type[]>(
        {
            url: '/order/status',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_create(
    type: number,
    body: string,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<order>(
        {
            url: '/order/create?type=' + type,
            data: body,
            headers: {
                ['Content-Type']: "text/plain"
            },
            timeout: 1000000,
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_make(
    data,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<string[]>(
        {
            url: '/order/make',
            data,
            timeout: 1000000,
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_list(
    data,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<order[]>(
        {
            url: '/order/list',
            data
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_getBody(order_id: string, mode: ErrorMessageMode = 'modal') {
    return request.get({
        url: "/order/getBody?id=" + order_id,
    }, {
        errorMessageMode: mode,
        joinTime: false
    })
}