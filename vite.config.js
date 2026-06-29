import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';

export default defineConfig({
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
	},
	plugins: [
		react(),
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
				api: 'modern-compiler',
				silenceDeprecations: ['legacy-js-api']
			}
		},
		modules: {
			generateScopedName: (className, filePath) => {
				const cleanPath = filePath.split('?')[0];
				const fileName = path.basename(
					cleanPath,
					'.module.scss'
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
