// import axios from "axios"; // axios 설치해도... ERROR가 발생한다-_-


const form = document.querySelector("form")! as HTMLFormElement;
form.addEventListener("submit", searchAddressHandler);

const addressInput = document.querySelector("#address")! as HTMLInputElement;

/*
  # Google > Geocoding API
   @see https://console.cloud.google.com/google/maps-apis/overview?project=sincere-burner-366411
   @see DOC
   https://developers.google.com/maps/documentation/geocoding/overview
*/


const GOOGLEL_GEOCODING_API_KEY = 'AIzaSyDzRGOHHubNK_N7Cn6d6j6G6Yha0NFC8wU';

type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location:{
        lat: number;
        lng: number;
      }
    }
  }[],
  status: 'OK' | 'ZERO_RESULTS';
}

declare const google : any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  
  const enteredAddress = addressInput.value;
  
  const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&language=ko&key=${GOOGLEL_GEOCODING_API_KEY}}`;
  
  fetch(apiURL).then (function( res):void {
    console.log(res);
    // ! npm package들이 강의시점에 의거하여..... 옛날버전이라서 그런지...
    //  axios 및 다른 library들이 작동하지 않는다-_-
    //  일단 그럼에도 불구하고 완주하겠다.
    // if(res.status !== 'OK') {
    //   throw new Error('Could not fetch location!');
    //
    // } else {
    //
    // }
    // 제대로 fetch api가 작동된다면 response에서 검색한 주소의 좌표값을 얻을 수 있다.
    // const coordinates = res.data.reseults[0].geometry.location;
    // ! google api에 대한 response type 및 method들에 대한 정보를
    //  runtime에서 오류를 잡기 위해,
    //  Typescript에게 전달하려면??
    //  ***** npm에서  @types/[패키지이름]으로 검색해본다
    //  $ npm i -D @types/googlemaps
    
    const coordinates = {lat: 35.159184, lng: 129.124585}
    const map = new google.maps.Map(document.getElementById("map"), {
      center:coordinates ,
      zoom: 8
    })
    new google.maps.Marker({
      position:coordinates,
      map:map
    })
  }).catch(err =>{
    console.log(err);
    alert(err.message);
  })
}


