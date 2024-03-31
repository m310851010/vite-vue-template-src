# vite-vue-template-src

使`vuejs`的`template`标签支持`src`属性,用来加载外部的模板文件，例如`<template src="./my-template.html"></template>`

Let the `template` tag of `vuejs` support the `src` attribute, which is used to load external template files, such as `<template src="./my-template.html"></template>`


## 安装 (install)

```
npm install vite-vue-template-src -D
```

> 插件基于vite 5开发,，其他版本自行测试。

## 使用 (use)

- 配置 (configuration)

```ts
// vite.config.js
import VueTemplateSrc from 'vite-vue-template-src'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    VueTemplateSrc()
  ]
})
```

- 在vuejs文件中使用 (in vuejs file)

```vue
// test.vue

<template src="./test.html"></template>

<script setup>
  // import MyComponent from './my-component.vue'
</script>

```

```html
// test.html

<!--<MyComponent></MyComponent>-->

```

## 提示 (tip)

`src`属性目前只支持静态文件路径，暂不支持动态绑定！

The `src` attribute currently only supports static file paths and does not support dynamic binding yet!

## License

MIT