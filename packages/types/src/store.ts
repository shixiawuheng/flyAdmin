// Lock screen information

export interface LockInfo {
    // Password required
    pwd?: string | undefined
    // Is it locked?
    isLock?: boolean
}

export interface RoleInfo {
    roleName: string
    value: string
}

export interface UserInfo {
    id: number
    account: string
    name: string
    money: number
    rebate: number
    desc?: string
    homePath?: string
}

export interface UserState {
    userInfo: Nullable<UserInfo>
    accessToken?: string
    roles: RoleInfo[]
    levels: Object
    sessionTimeout?: boolean
    lastUpdateTime: number
}
