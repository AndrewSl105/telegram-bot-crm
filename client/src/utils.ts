import { type ColumnInterface } from './interfaces'

export const findDropColumn = (columns: ColumnInterface[], id: string): ColumnInterface | undefined => {
  return columns.find((el) => el.id === id)
}
