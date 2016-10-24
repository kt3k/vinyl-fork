
const Transform = require('stream').Transform
const merge = require('merge-stream')
const duplexer = require('duplexer2')

/**
 * Maps the given array-like object with the given callback.
 * @param {Array} arrayLike The array-like object
 * @param {Function} callback The callback
 */
const map = (arrayLike, callback) => {
  return Array.prototype.map.call(arrayLike, callback)
}

const objectMode = true

/**
 * Returns a transform which forks the input into the given branches of transform and join them after transformed.
 * @param {Function[]} arguments The transforms
 */
const fork = function () {
  const input = new Transform({
    objectMode,
    transform (chunk, enc, cb) {
      cb(null, chunk)
    }
  })

  return duplexer({objectMode}, input, merge(map(arguments, transformCreator => transformCreator(t => input.pipe(t)))))
}

module.exports = fork
