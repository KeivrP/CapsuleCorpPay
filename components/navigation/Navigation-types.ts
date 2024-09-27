/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TabBarButtonProps {
    isFocused: boolean,
    label: string,
    routeName: TabRoute,
    color: string,
    key?: string,
    onPress?: () => void,
    onLongPress?: () => void
    routes?: any[]
    index?: number
}

export enum TabRoute {
    home = 'home',
    profile = 'profile',
    location = 'location',
    finance = 'finance',
    scanQR = 'scanQR',
}