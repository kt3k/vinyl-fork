# vinyl-fork v0.1.0

[![Circle CI](https://circleci.com/gh/kt3k/vinyl-fork.svg?style=svg)](https://circleci.com/gh/kt3k/vinyl-fork)
[![codecov](https://codecov.io/gh/kt3k/vinyl-fork/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/vinyl-fork)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Fork a vinyl stream.

# Getting started

First install it:

    npm install vinyl-fork

or

    yarn add vinyl-fork

Then use it like the below:

```js
const gulp = require('gulp')
const fork = require('vinyl-fork')

gulp.src('src/**/*.md')
  .pipe(fork(
    pipe => pipe(transform1()),
    pipe => pipe(transform2())
  ))
  .pipe(gulp.dest('dest/'))
```

The above is equal to the following:

```js
gulp.src('src/**/*.md')
  .pipe(transform1())
  .pipe(gulp.dest('dest/'))

gulp.src('src/**/*.md')
  .pipe(transform2())
  .pipe(gulp.dest('dest/'))
```

## More complex construction

You can chain multiple transforms (duplexes) inside the fork:

```js
gulp.src('src/**/*.md')
  .pipe(fork(
    pipe => pipe(transform0())
      .pipe(transform1())
      .pipe(transform2()),
    pipe => pipe(transform3())
      .pipe(transform4())
      .pipe(transform5())
  ))
  .pipe(gulp.dest('dest/'))
```

## Fork more

You can fork any number of forks inside the fork:

```js
gulp.src('**/*.md')
  .pipe(fork(
    pipe => pipe(transform0()),
    pipe => pipe(transform1()),
    pipe => pipe(transform2()),
    pipe => pipe(transform3()),
    ...
  ))
  .pipe(gulp.dest('dest/')
```

## Fork inside a fork

You can nest forks:

```js
gulp.src('**/*.md')
  .pipe(fork(
    pipe => pipe(transform0())
      .pipe(fork(
        pipe => pipe(transform1()),
        pipe => pipe(transform2())
      )),
    pipe => pipe(transform3())
  ))
  .pipe(gulp.dest('dest/')
```

The above is equivalent of:

```js
gulp.src('**/*.md')
  .pipe(transform0())
  .pipe(transform1())
  .pipe(gulp.dest('dest/')

gulp.src('**/*.md')
  .pipe(transform0())
  .pipe(transform2())
  .pipe(gulp.dest('dest/')

gulp.src('**/*.md')
  .pipe(transform3())
  .pipe(gulp.dest('dest/')
```

# History

- 2016-10-xx   v1.0.0   Initial release

# License

MIT
