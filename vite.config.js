import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

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
		},
		{
			name: 'inline-critical-css',
			apply: 'build',
			closeBundle() {
				const distDir = path.resolve(__dirname, 'dist');
				const htmlPath = path.resolve(distDir, 'index.html');

				if (!fs.existsSync(htmlPath)) {
					return;
				}

				let html = fs.readFileSync(htmlPath, 'utf-8');

				const cssLinkRegex = /<link[^>]*rel="stylesheet"[^>]*href=["']([^"']+)["'][^>]*>/g;
				let match;
				const cssFiles = [];

				while ((match = cssLinkRegex.exec(html)) !== null) {
					cssFiles.push(match[1]);
				}

				if (cssFiles.length === 0) return;

				const inlineStyles = cssFiles
					.map(href => {
						const cssPath = path.resolve(distDir, href.replace(/^\//, ''));
						if (!fs.existsSync(cssPath)) return null;
						const cssContent = fs.readFileSync(cssPath, 'utf-8');
						return `<style>${cssContent}</style>`;
					})
					.filter(Boolean)
					.join('\n');

				let result = html;
				result = result.replace(cssLinkRegex, '');
				result = result.replace('</head>', `${inlineStyles}\n</head>`);

				fs.writeFileSync(htmlPath, result, 'utf-8');
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
