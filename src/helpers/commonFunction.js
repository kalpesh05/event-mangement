/**
 * Common function
 */
const crypto = require("crypto");
const moment = require("moment-timezone");

exports.cryptoPassword = function(userSalt, password) {
  let salt = `${Math.round(new Date().valueOf() * Math.random())}`;

  if (userSalt) {
    salt = userSalt;
  }

  const newPassword = crypto
    .createHmac("sha1", salt)
    .update(password)
    .digest("hex");

  return {
    salt,
    password: newPassword
  };
};

exports.generateKeyPair = function() {
  let { generateKeyPair } = crypto;
  return generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem"
    }
  });
};

exports.randomString = function(length) {
  const token = crypto.randomBytes(length).toString("hex");

  return token;
};

exports.mongoId = function(model) {
  let token = crypto.randomBytes(12).toString("hex");

  switch (model) {
    case "user":
      token = `usr_${token}`;
      break;

    case "language":
      token = `lan_${token}`;
      break;

    case "employer":
      token = `emp_${token}`;
      break;

    case "epic":
      token = `epi_${token}`;
      break;

    case "workspace":
      token = `wrk_${token}`;
      break;

    case "role":
      token = `rol_${token}`;
      break;

    case "product":
      token = `pro_${token}`;
      break;

    case "user_product":
      token = `upr_${token}`;
      break;

    case "product_backlog":
      token = `prb_${token}`;
      break;

    case "product_roadmap":
      token = `prm_${token}`;
      break;

    case "sprint":
      token = `spr_${token}`;
      break;

    case "sprint_story":
      token = `ssr_${token}`;
      break;

    case "sprint_story_ticket":
      token = `sst_${token}`;
      break;

    case "submission":
      token = `sub_${token}`;
      break;

    case "ticket":
      token = `tic_${token}`;
      break;

    case "token":
      token = `tok_${token}`;
      break;

    case "extra_fields":
      token = `ext_${token}`;
      break;

    case "chat":
      token = `cht_${token}`;
      break;

    case "chat_message":
      token = `msg_${token}`;
      break;

    case "email":
      token = `eml_${token}`;
      break;

    case "doc":
      token = `doc_${token}`;
      break;

    case "topic":
      token = `tpc_${token}`;
      break;

    case "section":
      token = `sec_${token}`;
      break;

    case "section_tab":
      token = `sct_${token}`;
      break;

    case "tool":
      token = `tls_${token}`;
      break;

    case "skill":
      token = `skl_${token}`;
      break;

    case "skillHistory":
      token = `skh_${token}`;
      break;

    default:
      token = token;
      break;
  }

  return token;
};

exports.addTime = function(time, type) {
  const date = new Date(Date.parse(moment().add(time, type)));

  return date;
};
