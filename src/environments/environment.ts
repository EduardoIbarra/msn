// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB7l5cIu6b7OGahxBtZWhER3vqV6xU6-lA',
    authDomain: 'msnp-fdd0e.firebaseapp.com',
    databaseURL: 'https://msnp-fdd0e.firebaseio.com',
    projectId: 'msnp-fdd0e',
    storageBucket: 'msnp-fdd0e.appspot.com',
    messagingSenderId: '368905821941'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
