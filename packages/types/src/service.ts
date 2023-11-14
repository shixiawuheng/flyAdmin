export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
    // 将请求参数拼接到url
    joinParamsToUrl?: boolean
    // 格式化请求参数时间
    formatDate?: boolean
    // 是否处理请求结果
    isTransformResponse?: boolean
    // 是否返回本机响应标头
    // 例如：当您需要获取响应标头时，请使用此属性
    isReturnNativeResponse?: boolean
    // 接口地址，如果保留为空，请使用默认的apiUrl
    apiUrl?: string | (() => string)
    // E错误消息提示类型
    errorMessageMode?: ErrorMessageMode
    // Whether to add a timestamp
    joinTime?: boolean
    ignoreCancelToken?: boolean
    // Whether to send token in header
    withToken?: boolean
}

export interface RequestResult<T = any> {
    code: number
    type: 'success' | 'error' | 'warning'
    message: string
    result: T
}
