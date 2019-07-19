import { Timespan, Time } from './time'
import { TimetableItem, TimetableItemGrid } from './timetable-item'
import { TimetableDTO, TimetableItemDTO } from './dto'
import { range } from './array'

export class TimetableModel {
  readonly tracks: number
  readonly timespans: Timespan[]
  readonly items: TimetableItem[]
  readonly grids: TimetableItemGrid[]

  private constructor(tracks: number, timespans: Timespan[], items: TimetableItem[], grids: TimetableItemGrid[]) {
    this.tracks = tracks
    this.timespans = timespans
    this.items = items
    this.grids = grids
  }

  static create(tracks: number, timespans: Timespan[], items: TimetableItem[]): TimetableModel {
    const grids = items.map(TimetableItemGrid.getOrCreate)
    return new TimetableModel(tracks, timespans, items, grids)
  }

  static fromDTO(dto: TimetableDTO): TimetableModel {
    const tracks = Math.max(...dto.items.map(i => i.trackIds.length))
    const timespans = dto.timespans.map(Timespan.fromDTO)
    const items = dto.items.map(TimetableItem.fromDTO)

    const getTimespanRange = (timespan: Timespan) => {
      let i = 0
      let begins = 0
      let ends = 0
      for (const targetTimespan of timespans) {
        if (timespan.includes(targetTimespan)) {
          if (begins === 0) begins = i
          ends = i
        } else if (begins !== 0) {
          break
        }
        i++
      }

      return range(begins, ends)
    }

    const grids = dto.items.map((itemDTO, i) => {
      const timespan = Timespan.fromDTO(itemDTO.timespan)
      const timespanRange = Array.from(getTimespanRange(timespan))

      const item = items[i]
      const grid = TimetableItemGrid.getOrCreate(item)
      grid.x = itemDTO.trackIds[0] - 1
      grid.y = timespanRange[0]
      grid.w = itemDTO.trackIds.length
      grid.h = timespanRange.length

      return grids
    })

    return new TimetableModel(tracks, timespans, items, grids)
  }

  toDTO(): TimetableDTO {
    const items = this.grids.map(grid => {
      const beginsTimespan = this.timespans[grid.y]
      const endsTimespan   = this.timespans[grid.y+grid.h-1]

      let mergedTimespan: Timespan
      if (beginsTimespan.equals(endsTimespan)) {
        mergedTimespan = beginsTimespan
      } else {
        mergedTimespan = new Timespan(beginsTimespan.beginsTime, endsTimespan.endsTime)
      }

      const trackIds = Array.from(range(grid.x + 1, grid.x + grid.w))

      return {
        ...grid.item,
        timespan: mergedTimespan,
        trackIds
      }
    })

    return {
      tracks: this.tracks,
      timespans: this.timespans,
      items
    }
  }
}
