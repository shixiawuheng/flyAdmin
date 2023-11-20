import {request} from '@vben/request'
import {ErrorMessageMode, UserInfo} from "@vben/types";


export interface device_online {
    online: number,
    max: number
}

export interface EntryData {
    "device_online": device_online,
}

export function api_entry(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<EntryData>(
        {
            url: '/entry',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export interface Notice {
    id: string | number,
    title: string,
    content: string,
    show?: boolean,
    time: number,
}


export function api_notice(mode: ErrorMessageMode = 'modal'): Promise<Notice[]> {
    return request.get<Notice[]>(
        {
            url: '/home/notice',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export function api_recharge(key: string, mode: ErrorMessageMode = 'modal') {
    return request.post<UserInfo>({
        url: "/home/recharge",
        data: {key}
    }, {errorMessageMode: mode,})
}

export interface NewPwdParams {
    old: string
    new: string
}

export function api_newpwd(data: NewPwdParams, mode: ErrorMessageMode = 'modal') {
    return request.post<null>({
        url: '/home/newpwd',
        data
    }, {errorMessageMode: mode,})
}