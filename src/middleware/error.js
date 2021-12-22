import logger from '../services/logger';
import Response from '../services/response';

export default class ErrorHandler {
  static async watch(handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }

  /** Handle invalid route
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Error message
   */
  static notFound(req, res) {
    return Response.send(res, 404, 'Sorry, That route is not here!');
  }

  /** Handle Uncaught exceptions
 *
 * @param {err} err error object
 * @returns Logs the error
 */
  static handleUncaught(err) {
    logger.error(err.stack);
    process.exit(1);
  }

  /** Handle errors
   *
   * @param {object} err error
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Error message
   */
  // eslint-disable-next-line no-unused-vars
  static handleErrors(err, req, res, next) {
    logger.error(err.stack);
    return Response.send(res, err.statusCode || err.status || 500, err.message || 'Something Failed, Please try again');
  }
}
