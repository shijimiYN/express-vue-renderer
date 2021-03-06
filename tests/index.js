// @flow
const test = require('ava');
const ExpressVueRenderer = require('../src');
const Models = require('../src/models');
const path = require('path');

const options = {
    rootPath: path.join(__dirname, '../example/vueFiles')
};

const data = {
    title: 'Express Vue',
    message: 'Hello world',
    uuid: 'farts'
};

const vueOptions = {
    head: {
        title: 'Page Title'
    }
}

const exampleHead = `<head>\n<title>Page Title</title>\n</head>`;
const exampleScript = `<script>
(function () {'use strict';var createApp = function () {return new Vue({mixins: [{methods: {hello: function hello() {
            console.log('Hello');
        },},},],data: function(){return {"title":"Express Vue","message":"Hello world","uuid":"farts"}},methods: {test: function test() {
            console.error('test');
        },},components: {uuid: {props: ["uuid"],data: function(){return {}},template: "<div><h2>Uuid: {{uuid ? uuid : 'no uuid'}}</h2></div>",},uuid2: {props: ["uuid2"],data: function(){return {}},template: "<div><h3>Uuid2: {{uuid2 ? uuid2 : 'no uuid'}}</h3></div>",},},template: "<div><h1>{{title}}</h1><p>Welcome to the {{title}} demo. Click a link:</p><input v-model=\\"message\\" placeholder=\\"edit me\\"><p>{{message}}</p><uuid :uuid=\\"uuid\\"></uuid><uuid2 :uuid2=\\"uuid2\\"></uuid2><button type=\\"button\\" name=\\"button\\" v-on:click=\\"this.hello\\">Test mixin</button> <button type=\\"button\\" name=\\"button\\" v-on:click=\\"this.test\\">Test method</button></div>",})};if (typeof module !== 'undefined' && module.exports) {module.exports = createApp} else {this.app = createApp()}}).call(this);app.$mount('#app');
</script>`

test('renders App object', t => {
    const renderer = new ExpressVueRenderer(options);
    return renderer.createAppObject('main', data, vueOptions)
        .then(app => {
            t.is(app.head, exampleHead);
            t.is(app.script, exampleScript);
        })
        .catch(error => {
            t.fail(error.stack);
        });
});
