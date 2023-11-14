import {VbenFormSchema} from '@vben/vbencomponents/src/form'
import {types} from '../schemas'

export const menuAddSchema: VbenFormSchema[] = [
    {
        field: 'type',
        label: '类型',
        component: 'Select',
        required: true,
        gridItemProps: {span: 24},
        componentProps: {
            api: () => {
                return new Promise((resolve, _) => {
                    const options = types.map(item => {
                        return {
                            label: item.name,
                            value: item.id,
                        }
                    })
                    resolve({options})
                })
            },
        },
    },
    {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        gridItemProps: {span: 24},
        componentProps: {
            placeholder: '请输入',
        },
    },
    {
        field: 'body',
        label: '提交数据',
        component: 'InputTextArea',
        gridItemProps: {span: 24},
        required: true,
        componentProps: {
            placeholder: '请输入或拖动文件到此处',
        },
    }
]
