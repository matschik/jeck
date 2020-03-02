import buble from "@rollup/plugin-buble";
import replace from "@rollup/plugin-replace";
import size from 'rollup-plugin-size';

const plugins = [
  buble({ exclude: "node_modules/**" }),
  replace({ DEBUG: false }),
  size()
];

const input = "src/index.js";

export default [
  /* esm */
  {
    input,
    plugins,
    output: {
      file: "dist/jeck.es.js",
      format: "es",
      exports: "named",
      sourcemap: true
    }
  },

  /* cjs */
  {
    input,
    plugins,
    output: {
      file: "dist/jeck.cjs.js",
      format: "cjs",
      exports: "default",
      sourcemap: true
    }
  },

  /* umd */
  {
    input,
    plugins,
    output: {
      file: "dist/jeck.umd.js",
      format: "umd",
      exports: "default",
      name: "jeck",
      sourcemap: true
    }
  }
];
