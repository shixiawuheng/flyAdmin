import {VbenColumns} from '@vben/vbenComponents/src/table'
import {api_status, api_types} from "@/apis/order";

function timeFormatter({cellValue}) {
    return cellValue
}

export interface Data {
    table: {
        items: any[]
        total: number
    }
}

export const baseColumns: VbenColumns = [
    {
        field: 'id',
        title: 'ID',
        align: 'center',
        width: '5%',
        sortable: true,
    },
    {
        field: 'order',
        title: '订单号',
        align: 'center',
    },
    {
        field: 'type',
        title: '类型',
        width: '8%',
        sortable: true,
        align: 'center',
    },
    {
        field: 'status',
        title: '订单状态',
        align: 'center',
        width: '8%',
        // formatter: function ({cellValue}) {
        //     return status[cellValue]
        // },
    },
    {
        field: 'create_at',
        title: '创建时间',
        align: 'center',
        showOverflow: true,
        formatter: timeFormatter,
    },
    {
        field: 'update_at',
        title: '更新时间',
        align: 'center',
        showOverflow: true,
        formatter: timeFormatter,
    },
    {
        field: 'note',
        title: '备注',
        align: 'center',
    },
    {
        field: 'action',
        title: '操作',
        align: 'center',
        slots: {default: 'action'},
    }
]

// export const status = (async function () {
//     return await api_status()
// })()
// export const types = (async function () {
//     return await api_types()
// })()