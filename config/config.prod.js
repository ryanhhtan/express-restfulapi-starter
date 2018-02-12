const port = process.env.PORT || 80

module.exports = {
  dbCredentials: {
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD
  },

  port
}; 
