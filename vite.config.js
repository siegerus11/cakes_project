import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'inject-process',
			transform(code, id) {
				if (id.includes('react-draggable') && !code.includes('var process')) {
					return {
						code: `var process = { env: { NODE_ENV: 'development' } };\n${code}`,
						map: null
					};
				}
				return null;
			}
		}
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules/leaflet') || id.includes('node_modules/@react-leaflet')) {
						return 'leaflet';
					}
					if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
						return 'router';
					}
					if (id.includes('node_modules/@reduxjs') || id.includes('node_modules/react-redux')) {
						return 'redux';
					}
				}
			}
		}
	},
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
