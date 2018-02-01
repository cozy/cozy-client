const rollup = require('rollup')
const chalk = require('chalk')

const { bundles, getInputOptions, getOutputOptions } = require('./config')

const watchers = []

function watchBundle(desc) {
  const watchOptions = {
    ...getInputOptions(desc),
    output: getOutputOptions(desc),
    watch: {
      chokidar: false
    }
  }
  const watcher = rollup.watch(watchOptions)
  watcher.on('event', function(event) {
    switch (event.code) {
      case 'START':
        console.log(`${chalk.bgYellow.black(' BUILDING ')}`)
        return
      case 'END':
        console.log(`${chalk.bgGreen.black(' COMPLETE ')}`)
        return
      case 'ERROR':
        console.log(`${chalk.bgRed.black(' ERROR! ')}\n`)
        console.log(event)
        return
      case 'FATAL':
        console.log(`${chalk.bgRed.black(' FATAL ERROR! ')}\n`)
        console.log(event)
        stopWatch()
        return
    }
  })
  watchers.push(watcher)
}

function stopWatch() {
  for (watcher of watchers) {
    watcher.close()
  }
}

function watch() {
  console.log(chalk.white.bold('Watching...'))
  for (bundle of bundles) {
    watchBundle(bundle)
  }
}

watch()


