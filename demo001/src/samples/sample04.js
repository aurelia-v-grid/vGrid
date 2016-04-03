
export class G{
  title='G';
  selectedRow = {};

  data=[
    {namefirst:'Jason',namelast:'Willis',selected:false,rowaction:''},
    {namefirst:'X.',namelast:'Willis',selected:false,rowaction:''},
    {namefirst:'A.',namelast:'Willis',selected:false,rowaction:''},
    {namefirst:'J.',namelast:'Willis',selected:false,rowaction:''}
  ];
  selectRow(e,i){
    //alert(i);
    switch(e.target.value){
      case 'e':
        //edit
        this.selectedRow = this.data[i];
        break;
      case 'c':
        //copy
        this.selectedRow = this.data[i];
        break;
      default:
        break;
    }
    //this.selectedRow = this.data[e.target.value];
    //this.selectedRow.index = e.target.value;
  }
  selectAllRows(e){
    for (var i = 0; i < this.data.length; i++) {
      if(this.data[i].selected == false){
        this.data[i].selected = true;
      }else{
        this.data[i].selected = false;
      }

    };
  }
}
