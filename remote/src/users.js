// import {inject} from 'aurelia-framework';
// import {HttpClient} from 'aurelia-fetch-client';
// import 'fetch';
//
// @inject(HttpClient)
// export class Users {
//   heading = 'Github Users';
//   users = [];
//
//   constructor(http) {
//     http.configure(config => {
//       config
//         .useStandardConfiguration()
//         .withBaseUrl('https://api.github.com/');
//     });
//
//     this.http = http;
//   }
//
//   activate() {
//     return this.http.fetch('users')
//       .then(response => response.json())
//       .then(users => this.users = users);
//   }
// }


// <v-grid
//   style="position:absolute;top:70px;bottom:0;right: 25px;left:25px"
//   v-row-height="30"
//   v-header-height="50"
//   v-footer-height="50"
//   v-current-entity.bind=myCurrentEntity
//   v-collection.bind=myCollection
//   v-grid-context.bind=myGrid
//   v-grid-column-config.bind="columnConfig">
// </v-grid>
//
//
//   columnConfig = [
//     {
//       attribute: "name",
//       header: "name",
//       sortable: true,
//       filter: true,
//       type: "text"
//     }, {
//       attribute: "Checkout",
//       header: "Checkout",
//       sortable: true,
//       filter: true,
//       type: "checkbox"
//     }
//   ];


