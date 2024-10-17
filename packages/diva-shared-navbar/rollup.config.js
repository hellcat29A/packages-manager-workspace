import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import external from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import { nextui } from "@nextui-org/react";



const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve({
        ignoreGlobal: false,
        include: ['node_modules/**'],
        skip: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: true, 
        minimize: true,
      }),
      terser(),
      copy({
        targets: [
          { src: 'public/*', dest: 'dist/public' }, // Copy all files from 'public' to 'dist/public'
        ],
      }),
      nextui() // Add any necessary NextUI configurations here

    ],
    external: ['react', 'react-dom', '@headlessui/react', '@heroicons/react',    '@nextui-org/react'],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
  {
    input: "src/style.css",
    output: [{ file: "dist/index.css", format: "es" }],
    plugins: [
        
        postcss({
            plugins: [
                require('tailwindcss'),
                require('autoprefixer')
            ],
            extract: true,
            minimize: true,
        }),
    ],
    },
    
];
