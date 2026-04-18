import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin']
			}
		})
	],
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // or "modern"
				silenceDeprecations: ['legacy-js-api']
			}
		},
		modules: {
			/* generateScopedName: '[name]__[local]--[hash:base64:5]'  '[path][name]__[local]--[hash:base64:5]'  '[name]__[local]___[hash:base64:5]' */
			generateScopedName: (className, filePath) => {
				const cleanPath = filePath.split('?')[0];
				const fileName = path.basename(
					cleanPath,
					'.module.scss' /* or '.module.css' for css */
				);
				const hash = crypto
					.createHash('sha256')
					.update(fileName.concat(className))
					.digest('hex')
					.substring(0, 5);
				return `${fileName}-${className}--${hash}`;
			}
		}
	}
});
