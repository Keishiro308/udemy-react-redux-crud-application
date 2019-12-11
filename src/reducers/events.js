import {
  READ_EVENTS,
  DELETE_EVENTS,
 } from '../actions'
import _ from 'lodash'


export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENTS:
      delete events[action.id]
      return { ...events }
    default:
      return events
  }
}
