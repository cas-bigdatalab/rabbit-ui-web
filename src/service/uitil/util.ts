import Vue from 'vue';

export default class Util extends Vue {
    private HOST = 'http://10.0.88.2:800/api';
    private POST_HOST = 'http://10.0.88.2:800/api';

    post(url: any, data: any, options: any = {}) {
        let Base64 = require('js-base64').Base64;
        return this.$http.post(this.POST_HOST + url, data, {
            headers: {
                Authorization: 'Basic ' + Base64.encode('admin:admin'),
                'Access-Control-Allow-Origin': '*'
            },
            emulateHTTP: true,
            emulateJSON: true
        });
    }

    get(url: any, data: any = {}, options: any = {}) {
        return this.$http.get(this.HOST + url, data, {
            headers: {
                username: 'admin',
                password: 'admin',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'application/json',
            },
            credentials: true,
            emulateHTTP: true,
            emulateJSON: true
        });
    }

    dir_get(url:any){
        return this.$http.get( url, {}, {
            headers: {
                username: 'admin',
                password: 'admin',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'application/json',
            },
            credentials: true,
            emulateHTTP: true,
            emulateJSON: true
        });
    }
}

export let util = new Util();
