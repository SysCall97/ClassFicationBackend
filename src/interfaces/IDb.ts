export interface IDb {
    connect(callback: Function): Promise<void>
}