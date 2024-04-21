import {VbenColumns} from "@vben/vbencomponents/src/table";

export const UserColumns: VbenColumns = [
    {
        field: 'id',
        title: 'ID',
        align: 'center',
        width: '5%',
        sortable: true,
    },
    {
        field: 'name',
        title: '昵称',
        align: 'center',
        width: '8%',
    },
    {
        field: 'account',
        title: '用户名',
        align: 'center',
        width: '10%',
    },
    {
        field: 'level',
        title: '用户等级',
        align: 'center',
        width: '8%',
    },
    {
        field: 'level',
        title: '用户状态',
        align: 'center',
        width: '8%',
    },
    {
        field: 'money',
        title: '余额',
        align: 'center',
        width: '8%',
    },
    {
        field: 'notice',
        title: '通知接口',
        align: 'center',
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