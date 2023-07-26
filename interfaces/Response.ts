export default interface Response<T = unknown> {
    data: T
    error: any | null
}