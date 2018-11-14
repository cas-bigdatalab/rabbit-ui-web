import {util} from '../../uitil/util';

export class HeaderService {

    getUserInfo(uid: any) {
        let url = '/user/userinfo';
        let data = {
            uid: uid,
        }
        return util.get(url, data);
    }
}

export let header_service = new HeaderService();
export let userinfo = {
    ownerurl: 'http://10.0.88.2:800/api/emr/users/1/'
}

