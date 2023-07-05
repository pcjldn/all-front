const {defineConfig} = require('@vue/cli-service')
// import { defineConfig1 } from 'vite'
// import VueSetupExtend from 'vite-plugin-vue-setup-extend'
module.exports = defineConfig({
    transpileDependencies: true,
    // plugins: [ VueSetupExtend() ],
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/css/vars.scss";`,
            },
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                },
            ],
        },
    }
})
