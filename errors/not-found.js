import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class NotFounderror extends CustomAPIError {
  constructor(message) {
    super(message)
    this.StatusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFounderror
