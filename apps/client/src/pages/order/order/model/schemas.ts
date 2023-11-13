import {VbenFormSchema} from '@vben/vbencomponents/src/form'
// import {types} from '../schemas'

export const menuAddSchema: VbenFormSchema[] = [
    {
        field: 'type',
        label: '类型',
        component: 'Select',
        required: true,
        gridItemProps: {span: 24},
        componentProps: {
            // api: () => {
            //     return new Promise((resolve, reject) => {
            //         types.then((val) => {
            //             debugger;
            //             console.log(val)
            //             resolve()
            //         }).catch(reject)
            //     })
            //
            // }
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
        componentProps: {
            placeholder: '请输入',
        },
    }
]
