import babel from 'rollup-plugin-babel'
import rollupPrettier from 'rollup-plugin-prettier'
import filesize from 'rollup-plugin-filesize'
import prettier from 'prettier'

const prettierConfig = prettier.resolveConfig.sync(`src/index.js`)

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    babel(),
    rollupPrettier({
      ...prettierConfig,
    }),
    filesize(),
  ],
}
