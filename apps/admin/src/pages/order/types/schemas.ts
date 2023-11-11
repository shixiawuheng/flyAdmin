import {VbenColumns} from '@vben/vbenComponents/src/table'
import {api_levels} from '@/apis/order'


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
        field: 'name',
        title: '名称',
        align: 'center',
    },
    {
        field: 'level',
        title: '等级',
        width: '8%',
        sortable: true,
        align: 'center',
        formatter: function ({cellValue}) {
            return levels[cellValue]
        }
    },
    {
        field: 'money',
        title: '单价',
        align: 'center',
        width: '8%',
    },
    {
        field: 'script',
        title: '脚本',
        align: 'center',
        showOverflow: true,
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

export const levels = await api_levels()

