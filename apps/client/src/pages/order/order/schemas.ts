import {VbenColumns} from '@vben/vbenComponents/src/table'
import {api_base, order_type, order_status} from "@/apis/order";
import dayjs from "dayjs";

function timeFormatter({cellValue}) {
    return dayjs(cellValue * 1000).format("YYYY-MM-DD HH:mm:ss")
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
        formatter: function ({cellValue}) {
            const t = types.find((item) => item.id == cellValue)
            if (t) {
                return t.name
            }
            return "未知类型!请刷新网页重试"
        },
    },
    {
        field: 'status',
        title: '订单状态',
        align: 'center',
        width: '8%',
        sortable: true,
        formatter: function ({cellValue}) {
            return status[cellValue]
        },
    },
    {
        field: 'count',
        title: '数量',
        width: '8%',
        sortable: true,
        align: 'center',
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

// export let status = new Proxy({}, {
//     get: async function (target, property) {
//         if (Object.keys(target).length < 1) await GetStatus()
//         return target[property]
//     }
// });
export let status = {}

export let types: order_type[] = []

export async function Base() {
    const base = await api_base()
    types = base.list
    status = base.status
}

Base()