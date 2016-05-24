import {HttpClient, json} from 'aurelia-fetch-client';


export class sample01 {
  static inject = [Element, HttpClient];


  /********************************************************************
   *  grid bindleable/functions
   ********************************************************************/

  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};


  callRemoteServer(filterArray, orderByArray, callback) {

    var sortString = '?sqlOrderby=';
    if (orderByArray) {
      orderByArray.forEach((param)=> {
        if (sortString !== '?sqlOrderby=') {
          sortString = sortString + ','
        }
        sortString = sortString + `${param.attribute} ${param.asc ? "asc" : "desc"}`
      });
    }
    if (filterArray) {
      var filterString = sortString !== '?sqlOrderby=' ? '&sqlQuery=' : '?sqlQuery=';
      filterArray.forEach((param)=> {
        if (filterString.length !== 10) {
          filterString = filterString + ' and '
        }
        switch (param.operator) {
          case "=": //"equals"
            filterString = filterString + `${param.attribute} = "${param.value}"`;
            break;
          case "*": //"contains"
            filterString = filterString + `${param.attribute} LIKE "%${param.value}%"`;
            break;
          case "!=": //"not equal to"
            filterString = filterString + `${param.attribute} IS NOT "${param.value}"`;
            break;
          case "<": //"less than"
            filterString = filterString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case ">": //"greater than"
            filterString = filterString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case "<=": //"less than or eq"
            filterString = filterString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case ">=": //"greater than or eq"
            filterString = filterString + `${param.attribute} ${param.operator} "${param.value}"`;
            break;
          case "*=": //"begins with"
            filterString = filterString + `${param.attribute} LIKE "${param.value}%"`;
            break;
          case "=*": //"ends with"
            filterString = filterString + `${param.attribute} LIKE "%${param.value}"`;
            break;
          case "!*": //"ends with"
            filterString = filterString + `${param.attribute} IS NOT "%${param.value}%"`;
            break;
        }
      });
      var  urlencode = sortString !== '?sqlOrderby=' ? window.encodeURI(sortString + filterString) : window.encodeURI(filterString);
    } else {
      var  urlencode = window.encodeURI(sortString)
    }

    //get data
    this.http.fetch('data/people/' + urlencode)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          callback(data.result);
        } else {
          callback([]);
        }
      });

  }


  onSort(orderByArray, callback) {

    //loop params and build string
    var sortString = '?sqlOrderby=';
    orderByArray.forEach((param)=> {
      if (sortString !== '?sqlOrderby=') {
        sortString = sortString + ','
      }
      sortString = sortString + `${param.attribute} ${param.asc ? "asc" : "desc"}`
    });

    //url encode
    let urlencode = window.encodeURI(sortString);

    //get data
    this.http.fetch('data/people/' + urlencode)
      .then(response => response.json())
      .then(data => {
        callback(data.result);
      });

  }


  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, http) {
    //get this element
    this.element = element;

    //set up data api
    http.configure(config => {
      config
        .withBaseUrl('http://data-nodedataapi.rhcloud.com/')
        .withDefaults({
          credentials: 'same-origin'
        });
    });
    this.http = http;




  }


  /********************************************************************
   * attached
   ********************************************************************/
  attached() {
    this.getMaxRows = this.myGrid.ctx.getMaxRows();
    this.myGrid.ctx.setLoadingOverlay(true);
    this.http.fetch('data/people')
      .then(response => response.json())
      .then(data => {

        this.myCollection = data.result;
        this.myGrid.ctx.setLoadingOverlay(false);
      })

  }


  // test1() {
  //
  //   this.myGrid.ctx.setLoadingOverlay(true);
  //   this.http.fetch('data/people')
  //     .then(response => response.json())
  //     .then(data => {
  //
  //       this.myCollection = data.result;
  //       this.myGrid.ctx.setLoadingOverlay(false);
  //     })
  //
  //
  // }
  //
  // test2() {
  //
  //   let urlencode = window.encodeURI('?sqlQuery=id="55"');
  //
  //   this.http.fetch('data/people/' + urlencode)
  //     .then(response => response.json())
  //     .then(data => {
  //
  //       this.myCollection = data.result;
  //     })
  //
  // }


}
