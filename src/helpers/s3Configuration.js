const AWS = require("aws-sdk");

const s3Client = new AWS.S3({
  accessKeyId: process.env.S3_AWS_ACCESS_KEY,
  secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_AWS_REGION
});

const uploadParams = {
  Bucket: process.env.S3_AWS_USER_CODE_BUCKET,
  Key: "", // pass key
  Body: null // pass file body
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;
