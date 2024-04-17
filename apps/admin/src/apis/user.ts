import {request} from '@vben/request'
import {ErrorMessageMode} from "@vben/types";

export interface UserData {
    id: number;
    account: string;
    name: string;
    status: number;
    level: number;
    money: number;
    notice: string;
    create_time: string;
    update_time: string;
    note: string;
}

export interface CreateParams {
    account: string;
    money: number;
    level: number;
    name?: string;
    notice?: string;
    note?: string;
}

export function api_create(
    data: CreateParams,
    mode: ErrorMessageMode = 'modal',
) {
    return request.post<UserData>(
        {
            url: '/user/create',
            data,
        }, {
            errorMessageMode: mode,
        })
}