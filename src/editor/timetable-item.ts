import { TimetableItemDTO } from './dto'

export class TimetableItem {
  constructor(public readonly title: string, public readonly description: string, public readonly extras: {[key: string]: any} = {}) {
    this.title = title
    this.description = description
    this.extras = extras
  }

  static fromDTO(dto: TimetableItemDTO): TimetableItem {
    return new TimetableItem(dto.title, dto.description, dto.extras)
  }
}

const nextGridId = (id => () => ++id)(0)

export class TimetableItemGrid {
  readonly id: number
  item: TimetableItem
  x = 0
  y = 0
  w = 1
  h = 1
  moved = false

  constructor(item: TimetableItem) {
    this.id = nextGridId()
    this.item = item
  }

  get i(): string {
    return `item[${this.id}]`
  }

  private static readonly cache = new WeakMap<TimetableItem, TimetableItemGrid>()

  static getOrCreate(item: TimetableItem): TimetableItemGrid {
    const cachedValue = TimetableItemGrid.cache.get(item)
    if (cachedValue instanceof TimetableItemGrid) {
      return cachedValue
    }

    const grid = new TimetableItemGrid(item)
    TimetableItemGrid.cache.set(item, grid)
    return grid
  }
}
