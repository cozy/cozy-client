const rollup = require('rollup')
const chalk = require('chalk')

const { bundles, getInputOptions, getOutputOptions } = require('./config')

async function buildBundle(desc) {
  const inputOptions = getInputOptions(desc)
  const outputOptions = getOutputOptions(desc)
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

async function build() {
  for (bundle of bundles) {
    const logName = chalk.white.bold(bundle.name)
    console.log(`${chalk.bgYellow.black(' BUILDING ')} ${logName}`)
    try {
      await buildBundle(bundle)
    } catch (error) {
      console.log(`${chalk.bgRed.black(' FAILURE! ')} ${logName}\n`)
      console.error(error.message)
      process.exit(1)
    }
    console.log(`${chalk.bgGreen.black(' COMPLETE ')} ${logName}\n`)
  }
}

build()
