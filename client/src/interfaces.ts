export interface TaskCartInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  id: string
}

export interface ColumnItemsInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  id: string
}

export interface ColumnInterface {
  name: string
  id: string
  items: ColumnItemsInterface[]
}

export interface KanbanColumnInterface {
  column: ColumnInterface
  setColumns: (value: (prevColumns: any) => any[]) => any
}
