import {request} from '@vben/request'
import {ErrorMessageMode} from "@vben/types";


export interface device_online {
    online: number,
    max: number
}

export interface EntryData {
    device_online: device_online,
    order_wait: any[]
}

export function api_entry(
    params,
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<EntryData>(
        {
            url: '/home/entry',
            params
        },
        {
            errorMessageMode: mode,
        },
    )
}