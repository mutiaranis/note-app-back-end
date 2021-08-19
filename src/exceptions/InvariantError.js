const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}
// ga perlu menetapkan status code karena default turunan ClientError nilainya 400
module.exports = InvariantError;
