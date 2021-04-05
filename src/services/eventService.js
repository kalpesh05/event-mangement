const { eventModel } = require("../models");
const { mongoId } = require("../helpers/commonFunction");
const moment = require("moment-timezone");
const { welcomeMailSend } = require("../helpers/mailSendUsingTemplateId");

class eventService {
  async getAllWhere(where = {}) {
    // console.log(">>", where);
    return eventModel.find(where).sort("-created_at");
  }

  async getOne(id) {
    return eventModel.findOne({ _id: id });
  }

  async getOneWhere(where) {
    return eventModel.findOne(where);
  }

  async create(model) {
    model._id = mongoId("event");
    return eventModel.create(model);
  }

  async remove(model) {
    return eventModel.findOneAndUpdate(
      { _id: model._id },
      {
        deleted_at: moment().format("YYYY-MM-DD")
      }
    );
  }

  async update(id, model) {
    return eventModel.findOneAndUpdate({ _id: id }, model, {
      new: true
    });
  }
}

module.exports = new eventService();
