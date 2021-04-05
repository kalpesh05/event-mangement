const { userService, eventService } = require("../../services");
const {
  DUPLICATE_SLUG,
  DATABASE_INTERNAL,
  EVENT_NOT_FOUND
} = require("../constants/errorMessages");
class eventController {
  /**
   * Get All event
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    let query = req.query ? req.query : {};

    try {
      const events = await eventService.getAllWhere(query);
      return res.json({
        message: "",
        data: events
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one event
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { event_id } = req.params;
    try {
      const event = await eventService.getOneWhere({ _id: event_id });
      return res.json({
        message: "",
        data: event
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one event admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOneAdmin(req, res, next) {
    let { event_id } = req.params;
    try {
      const event = await eventService.getOne(event_id);
      return res.json({
        message: "",
        data: event
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create event
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    let { getOneWhere, create } = eventService;
    try {
      /**
       * Add event
       **/
      body.created_by = req.user._id;
      body.updated_by = req.user._id;
      let eventSave = await create(body);

      if (eventSave.error) throw new Error(DATABASE_INTERNAL);

      let event = await getOneWhere({
        _id: eventSave._id,
        deleted_at: null
      });

      return res.json({
        message: "",
        data: event
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update event
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = eventService;
    try {
      /**
       * Check valid event
       */
      let eventExist = await getOneWhere({
        _id: params.event_id,
        deleted_at: null
      });

      if (!eventExist) throw new Error(EVENT_NOT_FOUND);

      /**
       * upate event data
       */
      body.updated_by = req.user._id;

      let eventUpdate = await update(params.event_id, body);

      /**
       * find event after update
       */

      let event = await getOneWhere({
        _id: params.event_id,
        deleted_at: null
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: event
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete event
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async delete(req, res, next) {
    let { params } = req;
    let { getOneWhere, remove } = eventService;

    try {
      /**
       * Check valid event
       */
      let eventExist = await getOneWhere({
        _id: params.event_id,
        deleted_at: null
      });

      if (!eventExist) throw new Error(EVENT_NOT_FOUND);

      /**
       * Delete event
       */
      let eventRemove = await remove({
        _id: params.event_id,
        deleted_at: null
      });

      /**
       * API response
       */

      return res.send({
        message: "",
        data: eventRemove
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new eventController();
