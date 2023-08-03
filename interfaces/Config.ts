import { Method } from 'axios'

export default interface Config {
    endpoint: string
    method: Method
    data?: unknown
}