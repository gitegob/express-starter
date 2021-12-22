export default class Response {
/** Send a success response
 *
 * @param {object} res response object
 * @param {number} status Status code
 * @param {string} message Message
 * @param {object} data Data to send
 * @returns {object} response
 */
  static send(res, status, message, data) {
    return res.status(status).json({
      message,
      data: data || null,
    });
  }
}
