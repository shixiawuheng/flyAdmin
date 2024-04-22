import {VbenColumns} from "@vben/vbencomponents/src/table";
import {useUserStore} from "@/store/user";
import {api_status} from "@/apis/user";

export const Levels = useUserStore().getLevels;
export let Status = {};

(async () => {
    Status = await api_status();
    console.log(Levels, Status)
})()
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
        showOverflow: true,
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
        formatter: ({cellValue}) => {
            return Levels[String(cellValue)]
        }
    },
    {
        field: 'status',
        title: '用户状态',
        align: 'center',
        width: '8%',
        formatter: ({cellValue}) => {
            return Status[String(cellValue)]
        }
    },
    {
        field: 'money',
        title: '余额',
        align: 'center',
        width: '8%',
        formatter: ({cellValue}) => {
            return String(cellValue || 0)
        }
    },
    {
        field: 'accrue',
        title: '累积消费',
        align: 'center',
        width: '8%',
        formatter: ({cellValue}) => {
            return String(cellValue || 0)
        }
    },
    {
        field: 'notice',
        title: '通知接口',
        align: 'center',
        formatter: ({cellValue}) => {
            return cellValue || '无'
        }
    },
    {
        field: 'note',
        title: '备注',
        align: 'center',
        formatter: ({cellValue}) => {
            return cellValue || '无'
        }
    },
    {
        field: 'action',
        title: '操作',
        align: 'center',
        slots: {default: 'action'},
    }
]