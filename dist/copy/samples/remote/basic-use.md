
#####info
* To see what the "connector to dummy data does"

```javascript

import {HttpClient, json} from 'aurelia-fetch-client';


export class RemoteData {


  constructor(baseUrl, dataApi){
    this.http = new HttpClient();
    this.baseUrl = baseUrl;
    this.dataApi = dataApi;
    this.queryString = null;
    this.orderbyString = null;
    this.limit = null;
    this.offset = null;
    this.length = null;
    this.configureHttp()
  }


  /*
   configure http with base url
   */
  configureHttp(){
    this.http.configure(config => {
      config
        .withBaseUrl(this.baseUrl)
        .withDefaults({
          credentials: 'same-origin'
        });
    });
  }


  /*
   Get data from remote
   */
  getData(){
    return new Promise((resolve, reject)=>{

      var params = '';

      if(this.queryString){
        params = '?'+this.queryString

      }

      if(this.orderbyString){
        var op = params ? '&':'?';
        params = params + op + this.orderbyString;
      }

      if(this.limit){
        var op = params ? '&':'?';
        params = params + op + 'sqlLimit=' + this.limit;
      }

      if(this.offset){
        var op = params ? '&':'?';
        params = params + op + 'sqlOffset=' + this.offset;
      }

      console.log('request params:' + params);

      var encodedString = params !== '' ? window.encodeURI(params):'';

      this.http.fetch(this.dataApi + encodedString)
        .then(response => response.json())
        .then(data => {

          if(data.success = true){
            this.length = data.length;
            resolve({col:data.result, length:data.length, limit:40});
          } else {
            this.length = 0;
            reject({error:data.error});
          }
        })
    })
  }

  setLimit(x){
    this.limit = x || 40;
  }

  setOffset(x){
    this.offset = x || 0;
  }

  /*
   create orderby string
   */
  createOrderByString(orderByArray){
    if(orderByArray){
      var sortString = null;
      orderByArray.forEach((param, index)=> {
        if (index === 0) {
          sortString = 'sqlOrderby='
        } else {
          sortString = sortString + ','
        }
        sortString = sortString + `${param.attribute} ${param.asc ? "asc" : "desc"}`
      });
      this.orderbyString = sortString;
    } else {
      this.orderbyString = null;
    }
  }


  /*
   create query string
   */
  createQueryString(queryArray){
    if (queryArray) {
      var queryString = null;
      queryArray.forEach((param, index)=> {
        if (index === 0) {
          queryString = 'sqlQuery=';
        } else {
          queryString = queryString + ' and '
        }
        switch (param.operator) {
          case "=": //"equals"
            queryString = queryString + `${param.attribute} = "${param.value}"`;
            break;
          case "*": //"contains"
            queryString = queryString + `${param.attribute} LIKE "%${param.value}%"`;
            break;
          case "!=": //"not equal to"
            queryString = queryString + `${param.attribute} IS NOT "${param.value}"`;
            break;
          case "<": //"less than"
            queryString = queryString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case ">": //"greater than"
            queryString = queryString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case "<=": //"less than or eq"
            queryString = queryString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case ">=": //"greater than or eq"
            queryString = queryString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case "*=": //"begins with"
            queryString = queryString + `${param.attribute} LIKE "${param.value}%"`;
            break;
          case "=*": //"ends with"
            queryString = queryString + `${param.attribute} LIKE "%${param.value}"`;
            break;
          case "!*": //"ends with"
            queryString = queryString + `${param.attribute} IS NOT "%${param.value}%"`;
            break;
        }
      });
      this.queryString = queryString;
    } else {
      this.queryString = null;
    }
  }







}






```
