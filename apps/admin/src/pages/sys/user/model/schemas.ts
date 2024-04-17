import {VbenFormSchema} from "@vben/vbencomponents/src/form";
import {levels} from "@/pages/order/types/schemas";

export const AddSchemas: VbenFormSchema[] = [
    {
        field: 'name',
        label: '昵称',
        component: 'Input',
        rule: {
            required: false,
        },
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入昵称',
        },
    },
    {
        field: 'account',
        label: '账号',
        component: 'Input',
        required: true,
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入账号',
        },
    },
    {
        field: 'level',
        label: '等级',
        component: 'Select',
        required: true,
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            // options: Object.keys(levels).map(item => {
            //     return {
            //         label: levels[item],
            //         value: item,
            //     }
            // }),
            api: () => {
                return new Promise((resolve, _) => {
                    const options = Object.keys(levels).map(item => {
                        return {
                            label: levels[item],
                            value: Number(item),
                        }
                    })
                    resolve({options})
                })
            }
        },
    },
    {
        field: 'money',
        label: '初始起飞币',
        component: 'InputNumber',
        required: true,
        gridItemProps: {
            span: 24,
        },
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入起飞币数量',
            min: 1,
        },
    },
    {
        field: 'notice',
        label: '通知接口',
        component: 'Input',
        gridItemProps: {span: 24},
        rule: {
            required: false,
        },
        required: false,
        componentProps: {
            placeholder: '请输入',
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
        componentProps: {
            placeholder: '请输入',
        },
    }
]