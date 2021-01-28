// TODO: add env keys here to use in selector
const ENV_VARIABLE_NAMES = [] as const

type EnvVariable = typeof ENV_VARIABLE_NAMES[number]

const selectVariable = (key: EnvVariable): string => {
    const variable = process.env[key]
    if (!variable) throw new Error(`Invalid variable ${key}`)
    return variable
}

// TODO: setup env
export const SITE_TITLE = ''
export const BASE_DOMAIN = ''

export const PROJECT_ID = ''
export const API_KEY = ''
export const AUTH_DOMAIN = ''
export const DATABASE_URL = ''
