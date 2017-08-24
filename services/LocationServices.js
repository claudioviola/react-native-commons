import Qs from 'qs';
import { Platform } from 'react-native';

const GOOGLE_API_KEY = 'YOUR_KEY';

function getGooglePlaces(baseUrl, query) {
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    const request = new XMLHttpRequest();
    request.timeout = 10000;
    request.ontimeout = ()=>{
        console.log('timeout');
    };
    const url = baseUrl + Qs.stringify(query);
    request.open('GET', url);
    request.send();

    return new Promise((resolve, reject) => {
        function success(data){
            resolve(data);
        }
        function error(error){
            reject('ERROR: ' + error.code + ': ' + error.message);
        }
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const responseJSON = JSON.parse(request.responseText);
                if (typeof responseJSON.results !== 'undefined') {
                    results = responseJSON.results;
                    success(results);
                }
                if (typeof responseJSON.error_message !== 'undefined') {
                    console.warn('google places autocomplete: ' + responseJSON.error_message);
                    error(responseJSON.error_message);
                }
            } else {
                console.warn("google places autocomplete: request could not be completed or has been aborted");
            }
        };
    });
}

export function getGooglePlacesFromCoords(coords) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
    const query = {
        latlng: coords.latitude + ',' + coords.longitude,
        key: GOOGLE_API_KEY,
        language: 'en',
    };
    return getGooglePlaces(url, query);
}

export function getGooglePlacesFromPlaceId(placeId) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
    const query = {
        placeId: placeId,
        key: GOOGLE_API_KEY,
        language: 'en',
    };
    return getGooglePlaces(url, query);
}

export function getCurrentPosition() {
    let options = (Platform.OS === 'android') ? {
        enableHighAccuracy: false,
        timeout: 20000
    } : {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
    };
    return new Promise((resolve, reject) => {
        function positionSuccess(position){
            resolve(position);
        }
        function positionError(error){
            reject('ERROR: ' + error.code + ': ' + error.message);
        };
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError, options);
    });
}


export function getRegionForCoordinates(location) {
    // points should be an array of { latitude: X, longitude: Y }
    /*const typesZoom17 = ['route', 'street_address', 'street_number', 'premise', 'point_of_interest', 'art_gallery','atm','bakery','bank','bar','beauty_salon','bicycle_store','book_store','bowling_alley','cafe','car_dealer','car_rental','car_repair','car_wash','casino','church','city_hall','clothing_store','convenience_store','courthouse','dentist','department_store','doctor','electrician','electronics_store','embassy','establishment','finance','fire_station','florist','food','funeral_home','furniture_store','gas_station','general_contractor','grocery_or_supermarket','gym','hair_care','hardware_store','health','hindu_temple','home_goods_store','insurance_agency','jewelry_store','laundry','lawyer','library','liquor_store','locksmith','lodging','meal_delivery','meal_takeaway','mosque','movie_rental','movie_theater','moving_company','museum','night_club','painter','park','parking','pet_store','pharmacy','physiotherapist','plumber','police','post_office','real_estate_agency','restaurant','roofing_contractor','rv_park','shoe_store','shopping_mall','storage','store','subway_station','synagogue','taxi_stand','train_station','transit_station','travel_agency','veterinary_care','zoo',];
    const typesZoom15 = ['establishment','finance', 'airport','aquarium','bus_station','accounting','amusement_park','campground','cemetery','hospital','local_government_office','school','spa','stadium','university',];
    const typesZoom12 = ['locality', 'political', 'country', 'neighborhood'];

    let delta = 0;
    let type0 = types[0];
    let type1 = types[1];

    if(typesZoom17.indexOf(type0) > -1){
        if(typesZoom17.indexOf(type1) > -1){
            delta = 0.5;
        } else if(typesZoom15.indexOf(type1) > -1){
            delta = 1;
        } else if(typesZoom12.indexOf(type1) > -1){
            delta = 3;
        } else {
            delta = 0.5;
        }
    } else if(typesZoom15.indexOf(type0) > -1){
        delta = 1;
    } else if(typesZoom12.indexOf(type0) > -1){
        delta = 3;
    } else {
        delta = 0.5;
    }*/

    let { coordinate, types} = location;

    const earthRadiusInKM = 6371;
    const radiusInKM = 1;
    const aspectRatio = 1;

    let radiusInRad = radiusInKM / earthRadiusInKM;
    let longitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(coordinate.latitude)));
    let latitudeDelta = aspectRatio * rad2deg(radiusInRad);

    return {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    };

    function deg2rad (angle) {
        return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
    }

    function rad2deg (angle) {
        return angle * 57.29577951308232 // angle / Math.PI * 180
    }
}




