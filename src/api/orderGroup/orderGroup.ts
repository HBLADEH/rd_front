import Http from "../../utils/http"
import format from 'date-fns/format'

export function getOrderGroupsByDate(startDate: Date, endDate: Date) {
  return Http.get('/api/orderGroups/main', {
    params: {
      startTime: format(startDate, "yyyy-MM-dd"),
      endTime: format(endDate, "yyyy-MM-dd")
    }
  })
}