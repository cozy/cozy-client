const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const path = require('path')
const chalk = require('chalk')

const defaultInputOptions = {
  plugins: [
    babel({
      sourceMap: true,
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              browsers: ['last 2 versions', 'IE >= 11']
            }
          }
        ]
      ],
      plugins: [
        'external-helpers', // See https://github.com/rollup/rollup-plugin-babel#configuring-babel
        'transform-object-rest-spread',
        'transform-class-properties'
      ]
    })
  ]
}

const defaultOutputOptions = {
  sourcemap: true
}

const bundles = [
  {
    name: 'cozy-stack-link',
    global: 'CozyStackLink'
  }
]

async function buildBundle(desc) {
  const inputOptions = Object.assign({}, defaultInputOptions, {
    input: path.resolve(__dirname, `../packages/${desc.name}/src/index.js`)
  })
  const outputOptions = Object.assign({}, defaultOutputOptions, {
    file: path.resolve(__dirname, `../packages/${desc.name}/dist/${desc.name}.js`),
    format: 'umd',
    name: desc.global
  })
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
    console.log(`${chalk.bgGreen.black(' COMPLETE ')} ${logName}\n`);
  }
}

build()
