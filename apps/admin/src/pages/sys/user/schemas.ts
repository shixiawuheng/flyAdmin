import {VbenColumns} from "@vben/vbencomponents/src/table";
import {useUserStore} from "@/store/user";
import {api_status} from "@/apis/user";
import {VbenFormSchema} from "@vben/vbencomponents/src/form/index.js";


export const Levels = useUserStore().getLevels;
export let Status = {};

(async () => {
    Status = await api_status();
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
        title: '状态',
        align: 'center',
        width: '8%',
        formatter: ({cellValue}) => {
            return Status[String(cellValue)]
        }
    },
    {
        field: 'rebate',
        title: '折扣',
        align: 'center',
        width: '8%',
        formatter: ({cellValue}) => {
            return String(cellValue || 0)
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

export const CreateFormSchemas: VbenFormSchema[] = [
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
                    const options = Object.keys(Levels).map(item => {
                        return {
                            label: Levels[item],
                            value: Number(item),
                        }
                    })
                    resolve({options})
                })
            }
        },
    },
    {
        field: 'rebate',
        label: '折扣',
        component: 'InputNumber',
        gridItemProps: {
            span: 24,
        },
        rule: {
            required: false,
        },
        required: false,
        componentProps: {
            placeholder: '请输入折扣',
            step: 0.1,
        },
    },
    {
        field: 'money',
        label: '起飞币',
        component: 'InputNumber',
        gridItemProps: {
            span: 24,
        },
        rule: {
            required: false,
        },
        required: false,
        componentProps: {
            placeholder: '请输入起飞币数量',
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

export const EditFormSchemas: VbenFormSchema[] = [
    // {
    //     field: 'id',
    //     label: 'ID',
    //     component: 'InputNumber',
    //     rule: {
    //         required: true,
    //     },
    //     gridItemProps: {span: 24},
    //     // labelProps: {
    //     //     labelPlacement: 'left',
    //     // },
    //     componentProps: {
    //         placeholder: '请输入昵称',
    //         disabled: true,
    //     },
    // },
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
                    const options = Object.keys(Levels).map(item => {
                        return {
                            label: Levels[item],
                            value: Number(item),
                        }
                    })
                    resolve({options})
                })
            }
        },
    },
    {
        field: 'status',
        label: '用户状态',
        component: 'Select',
        required: true,
        gridItemProps: {span: 24},
        // labelProps: {
        //     labelPlacement: 'left',
        // },
        componentProps: {
            api: async () => {
                const options = Object.keys(Status).map(item => {
                    return {
                        label: Status[item],
                        value: Number(item),
                    }
                })
                return {options}
            }
        },
    },
    {
        field: 'rebate',
        label: '折扣',
        component: 'InputNumber',
        gridItemProps: {
            span: 24,
        },
        rule: {
            required: false,
        },
        required: false,
        componentProps: {
            placeholder: '请输入起飞币数量',
            step: 0.1,
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