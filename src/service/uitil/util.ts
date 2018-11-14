import Vue from 'vue';
import axios from "axios";

export default class Util extends Vue {
    private HOST = 'http://10.0.88.2:800/api';
    private POST_HOST = 'http://10.0.88.2:800/api';



    post(url: any, data: any, options: any = {}) {
        return axios.post(this.POST_HOST + url, data, {
            auth: {
                username: 'admin',
                password: 'admin'
            }
            // headers: {
            //     Authorization: 'Basic ' + Base64.encode('admin:admin'),
            //     'Access-Control-Allow-Origin': '*'
            // },
            // emulateHTTP: true,
            // emulateJSON: true
        });
    }

    get(url: any, data: any = {}, options: any = {}) {
        // let Base64 = require('js-base64').Base64;
        // return this.$http.get(this.HOST + url, data, {
        //     headers: {
        //         Authorization: 'Basic ' + Base64.encode('admin:admin'),
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     emulateHTTP: true,
        //     emulateJSON: true
        // });
        return axios.get(this.HOST + url, data ={
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
    }

    dir_get(url:any){
        return axios.get(this.HOST + url, data={
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
    }
}

export let util = new Util();
