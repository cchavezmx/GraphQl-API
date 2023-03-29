const bcrypt = require('bcrypt')

const validateToken = async (token, SECRET) => {
  return bcrypt.compare(token, SECRET, function (err, result) {
    if (err) {
      throw new Error('No autorizado')
    }

    if (!result) {
      throw new Error('No autorizado')
    }
    return result
  })
}

module.exports = {
  validateToken
}
