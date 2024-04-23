import {VbenFormSchema} from "@vben/vbencomponents/src/form";
import {levels} from "@/pages/order/types/schemas";
import {Levels, Status, UserColumns} from "@/pages/sys/user/schemas.js";
import {VbenColumns} from "@vben/vbencomponents/src/table/index.js";
import {formatToDateTime} from "@vben/utils";

export const MakeSchemas: VbenFormSchema[] = [
    {
        field: 'money',
        label: '金额',
        component: 'InputNumber',
        required: true,
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入起飞币数量',
            min: 10,
        },
    },
    {
        field: 'count',
        label: '生成数量',
        component: 'InputNumber',
        required: true,
        gridItemProps: {
            span: 24,

        },
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入生成数量',
            min: 1,
        },
    },
    {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        gridItemProps: {span: 24},
        rule: {
            required: false,
        },
        required: false,
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
        },
    }
]

export const TableColumns: VbenColumns = [
    {
        field: 'id',
        title: 'ID',
        align: 'center',
        width: '5%',
        sortable: true,
    },
    {
        field: 'uid',
        title: '用户ID',
        align: 'center',
        width: '5%',
        formatter: ({cellValue}) => {
            return cellValue || '无'
        }
    },
    {
        field: 'key',
        title: '密钥',
        align: 'center',
        width: '300px',
        showOverflow: true,
    },
    {
        field: 'money',
        title: '起飞币',
        align: 'center',
        width: '5%',
    },
    {
        field: 'ip',
        title: '使用IP',
        align: 'center',
        width: '120px',
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
        field: 'createAt',
        title: '生成时间',
        align: 'center',
        width: '160px',
        formatter: ({cellValue}) => {
            return formatToDateTime(cellValue * 1000)
        }
    },
    {
        field: 'updateAt',
        title: '更新时间',
        align: 'center',
        width: '160px',
        formatter: ({cellValue}) => {
            return formatToDateTime(cellValue * 1000)
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