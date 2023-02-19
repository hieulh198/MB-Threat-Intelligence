require('dotenv').config();

const config = {
  port:  process.env.PORT || 8080,
  splunk_host:  process.env.splunk_host || "localhost",
  splunk_user:  process.env.splunk_user || "admin",
  splunk_password:  process.env.splunk_password || 12345678,
  splunk_port:  process.env.splunk_port || 8089,
  splunk_collection_name:  process.env.splunk_collection_name || "MB_TEST"
};

module.exports = config;
