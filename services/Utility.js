import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFetchBlob from 'react-native-fetch-blob';
import API from '../services/Api';

export function getIdHash() {
	const suffix = Platform === 'android' ? 'AND' : 'APP';
    return suffix + DeviceInfo.getUniqueID();
};

export function getContentType(fileName){
    //return 'image/jpeg';
    let ext = fileName.split('.').pop();
    switch(ext){
        case 'jpg':
            return 'image/jpeg';
            break;
        case 'gif':
            return 'image/gif';
            break;
        case 'png':
            return 'image/png';
            break;
    }
}
export async function makeUpload(urlUpload, picture){
    return RNFetchBlob.fetch('PUT', urlUpload, {
        'Content-Type' : getContentType(picture.fileName),
        //'mimeType': getContentType(picture.fileName),
    }, RNFetchBlob.wrap(picture.path))
    // listen to upload progress event
        .uploadProgress((written, total) => {
            console.log('uploaded', written / total)
        })
        // listen to download progress event
        .progress((received, total) => {
            console.log('progress', received / total)
        })
        .then((resp) => {
            console.log(resp);
            return '/' + getToday() + '/' + picture.fileName;
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
};

export async function fixImageName(picture){
    const newfileName = generateUUID() + '.jpg';
    const src = picture.path;
    const dest = src.substring(0, src.lastIndexOf('/')) + '/' + newfileName;
    RNFetchBlob.fs.cp(src, dest)
        .then(() => {
            RNFetchBlob.fs.unlink(src)
                .then(() => {
                    picture.fileName = newfileName;
                    picture.path = dest;
                    return picture
                })
                .catch((err) => {
                    return null;
                })
        })
        .catch(() => {
            return null;
        })
}


/*

export async function imageUpload(urlDestination, fileImage, fileName, today){
    console.debug('makeUpload');
    let contentType = getContentType(fileName);
    let serverUrlRef = today + '/' + fileName;
    let ft = new FileTransfer();
    let uri = urlDestination;
    let options = new FileUploadOptions();
    options.httpMethod= 'PUT';
    options.chunkedMode= false;
    options.headers={'Content-Type':contentType};
    options.mimeType='image/jpeg';
    console.log(options);
    ft.upload(fileImage, uri, (r)=>{
        console.debug('upload success');
        if(_currentSotrageKey){
            FileManagerService.removeFile(_currentSotrageKey, fileImage).then( (rslt)=> {
                q.resolve('/' + serverUrlRef);
            },(e)=>{
                console.error(e);
                q.resolve('/' + serverUrlRef);
            });
        } else {
            q.resolve('/' + serverUrlRef);
        }
    }, (e)=>{
        console.error(e);
        q.reject(e);
    }, options);
    return q.promise;
};
*/


export async function getUrlUpload(idKeyUser, pic) {
    const params= {
        pic,
        id_key_user: idKeyUser,
        id_hash: getIdHash(),
    };
    const api = API.create();
    const d = await api.uploadGcloud(params);
    return d.data.url;
};

export function getToday() {
    let d = new Date();
    let month = d.getMonth()+1;
    month= month < 10 ? '0'+month : month;
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    let today = d.getFullYear() + '' + month + '' + day;
    return today;
};


export default function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


export function urlDecode(input) {
    return input ? window.decodeURIComponent(input.replace(/&amp;/g, "&")) : '';
}

