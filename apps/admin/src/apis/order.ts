import {request} from '@vben/request'
import {ErrorMessageMode} from "@vben/types";

export interface order_type {
    id?: number,
    note: string,
    money: number,
    level: number | string,
    name: string,
    notify: string
    web_uri: string
    script: string
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

export async function api_levels(
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

export async function api_addType(
    params: order_type,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<null>(
        {
            url: '/order/addType',
            params,
        },
        {
            errorMessageMode: mode,
        },
    )
}

export async function api_editType(
    params: order_type,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<null>(
        {
            url: '/order/editType',
            params,
        },
        {
            errorMessageMode: mode,
        },
    )
}