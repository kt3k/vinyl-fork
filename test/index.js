const test = require('tape')
const fork = require('../')
const gulp = require('gulp')
const concat = require('concat-stream')
const rename = require('gulp-rename')
const through2 = require('through2')

const clone = () => through2.obj((file, enc, cb) => cb(null, file.clone()))

test('vinyl-fork forks the input stream', t => {
  t.plan(3)

  gulp.src('test/fixture/foo.md')
    .pipe(fork(
      pipe => pipe(clone()).pipe(rename({extname: '.html'})),
      pipe => pipe(clone())
    ))
    .pipe(concat(files => {
      t.equal(files.length, 2)
      files.sort((x, y) => x.path.length - y.path.length)

      t.equal(files[0].relative, 'foo.md')
      t.equal(files[1].relative, 'foo.html')
    }))
})
