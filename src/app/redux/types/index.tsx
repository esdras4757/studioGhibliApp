

export interface configurationState {
    theme:string,
    language:'es'
}

export interface utilsState {
    isLoading:boolean
    update:boolean
}

export interface appState{
    configuration:configurationState
    utils:utilsState
}

export const changeTheme = 'changeTheme'

interface changeThemeAction{
    type: typeof changeTheme,
    payload:'light' | 'dark'
}

export type configurationActionTypes = changeThemeAction