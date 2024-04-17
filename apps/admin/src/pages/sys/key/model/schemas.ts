import {VbenFormSchema} from "@vben/vbencomponents/src/form";
import {levels} from "@/pages/order/types/schemas";

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