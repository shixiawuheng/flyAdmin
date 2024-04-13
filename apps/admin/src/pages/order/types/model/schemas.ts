import {VbenFormSchema} from '@vben/vbencomponents/src/form'
import {levels} from '../schemas'

export const menuAddSchema: VbenFormSchema[] = [
    {
        field: 'name',
        label: '名称',
        component: 'Input',
        required: true,
        gridItemProps: {
            span: 24,
        },
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
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
                            value: item,
                        }
                    })
                    resolve({options})
                })
            }
        },
    },
    {
        field: 'money',
        label: '单价',
        component: 'InputNumber',
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
        },
    },
    {
        field: 'script',
        label: '脚本',
        component: 'InputTextArea',
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
        },
    },
    {
        field: 'notify',
        label: '订单通知接口',
        component: 'Input',
        required: false,
        gridItemProps: {
            span: 24,
        },
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
        },
    },
    {
        field: 'web_uri',
        label: '外链',
        component: 'Input',
        required: false,
        gridItemProps: {
            span: 24,
        },
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
        },
    },
    {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        gridItemProps: {span: 24},
        required: false,
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            placeholder: '请输入',
        },
    }
]
