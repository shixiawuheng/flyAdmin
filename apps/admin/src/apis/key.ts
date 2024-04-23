import {request} from '@vben/request'
import {ErrorMessageMode} from "@vben/types";

export interface Key {
    id: number;
    uid: number;
    key: string;
    status: number;
    money: number;
    ip: string;
    created_at: string;
    updated_at: string;
    note: string;
}

export interface MakeParams {
    count: number;
    money: number;
    note: string;
}

export function api_make(
    data: MakeParams,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<Key[]>(
        {
            url: '/key/make',
            data
        },
        {
            errorMessageMode: mode,
        })
}

export function api_list(
    data: MakeParams,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<Key[]>(
        {
            url: '/key/list',
            data
        },
        {
            errorMessageMode: mode,
        })
}