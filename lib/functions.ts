import C from 'lib/constants'
export const duck = (scope: string, name: string): string => (`${C.APPNAME}/${scope}/${name}`).toUpperCase()