import { existsSync, readFileSync } from 'fs';
import { extname, dirname, resolve } from 'path';
import { type PluginOption, normalizePath } from 'vite';
const htmlVueMap = new Map<string, string>();

export default function VueTemplateSrc(): PluginOption {
  return {
    name: 'vite:template-src',
    enforce: 'pre',
    transform(html, filePath) {
      if (extname(filePath) !== '.vue') {
        return html;
      }

      for (const [k, v] of htmlVueMap) {
        if (v === filePath) {
          htmlVueMap.delete(k);
        }
      }

      return html.replace(/<template\s+src="([^"]+)"\s*>/, (match, src) => {
        const htmlPath = normalizePath(resolve(dirname(filePath), src));
        if (!existsSync(htmlPath)) {
          throw `file "${src}" not exists in "${filePath}"`;
        }
        htmlVueMap.set(htmlPath, filePath);
        const htmlContent = readFileSync(htmlPath, 'utf-8');
        return `<template>${htmlContent}`;
      });
    },
    handleHotUpdate(ctx) {
      const { file, server } = ctx;
      if (extname(file) !== '.html') return;

      const relationId = htmlVueMap.get(file)!;
      if (!relationId) {
        return;
      }
      const modules = server.moduleGraph.getModulesByFile(relationId);
      if (!modules) {
        return;
      }
      const relationModule = [...modules][0];
      server.hot.send({
        type: 'update',
        updates: [
          {
            type: 'js-update',
            path: relationModule.file!,
            acceptedPath: relationModule.file!,
            timestamp: Date.now()
          }
        ]
      });
      return [...modules, relationModule];
    }
  };
}
