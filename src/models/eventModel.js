const mongoose = require("mongoose");

const schema = {
  _id: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  image_url: {
    type: String,
    default: ""
  },
  type: {
    type: String
  },
  ticket_price: {
    type: Number,
    default: null
  },
  type_of_seats: {
    type: String,
    default: null
  },
  gallery: {
    type: Array,
    default: []
  },
  location: {
    type: Object,
    default: { lat: null, lon: null }
  },
  is_own_event: {
    type: Boolean,
    default: false
  },
  updated_by: {
    type: String,
    default: null
  },
  created_by: {
    type: String,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
};
const options = {
  versionKey: false,
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {}
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
};

const eventSchema = new mongoose.Schema(schema, options);
// eventSchema.virtual("skills", {
//   ref: "skill",
//   localField: "acquired_skills",
//   foreignField: "slug",
//   a  ;
eventSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("event", eventSchema);
