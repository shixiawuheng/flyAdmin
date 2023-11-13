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

export interface order {
    id: number,
    order: string,
    type: number,
    status: number,
    count: number,
    create_at: number,
    update_at: number,
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

export function api_status(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<order_type[]>(
        {
            url: '/order/levels',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_create(
    type: string,
    body: string,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<null>(
        {
            url: '/order/create',
            params: {type},
            data: body,
        },
        {
            errorMessageMode: mode,
        },
    )
}
