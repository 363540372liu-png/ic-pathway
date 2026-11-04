import {defineConfig} from 'vite';
import {previewPlugin} from './tools/preview.mjs';
export default defineConfig({root:'public',server:{host:'0.0.0.0',allowedHosts:['terminal.local']},plugins:[previewPlugin()]});
