vGrid - Custom Element for Aurelia
----------------------------------


[Demo](http://vegarringdal.github.io/vGrid/demo001/)

##### Using som icons/classes from bootstrap:
* Included used classes/icons, no need to install bootstrap for it to work, huge thanks to http://glyphicons.com/ for giving bootstrap those amazing icons


##### How to use: (no plugin yet):
1: Copy the files under vgrid folder to you src folder, and move font and spinner image to styles folder

2: Add require to the css and element:

```
<require from="vGrid/v-grid.css"></require>
<require from="vGrid/v-grid.js"></require>
```

3: Add the grid element with columns (same as demo)

```
<v-grid
        style="position:relative;margin-left:25px;width:%; height:500px"
        row-height="25"
        header-height="50"
        resizable-headers="true"
        sortable-headers="true"
        sort-on-header-click="true"
        header-filter="true"
        header-filter-onkeydown="true"
        header-filter-not-to="phone"
        header-filter-top="true"
        multi-select="true"
        config="current-entity.bind:myCurrentEntity; collection.bind:myCollection ">
    <v-grid-row>
        <v-grid-col col-width="150" attribute="index"   header="Index"    default-filter=">=" read-only="true"></v-grid-col>
        <v-grid-col col-width="150" attribute="name"    header="Name"     default-filter="*="                 ></v-grid-col>
        <v-grid-col col-width="160" attribute="country" header="Country"  default-filter="="                  ></v-grid-col>
        <v-grid-col col-width="150" attribute="email"   header="Email"    default-filter="*"                  ></v-grid-col>
        <v-grid-col col-width="160" attribute="color"   header="Color"    default-filter="=*"                 ></v-grid-col>
    </v-grid-row>
</v-grid>
```

4: Add the vars for the current entity and collection you added under config attribute in html

```
  myCollection = [];
  myCurrentEntity = {};
```


----------------------------------

### < v-grid > attributes:
* config -> 
* row-height
* header-height
* footer-height
* resizable-headers
* resize-also-rows
* multi-select
* sortable-headers
* request-animation-frame
* render-on-scrollbar-scroll
* locked-columns
* header-filter
* header-filter-top
* header-filter-onkeydown
* header-filter-not-to
* sort-on-header-click
* sort-not-on-header
* row-on-dblclick
* row-on-draw
* cell-on-draw
* format-handler

----
### < v-grid-col > attributes:
* col-width
* attribute
* header
* read-only
* col-css
* default-filter



----
##### < v-grid > Attributes details:

###### "config"
* current-entity -> current entity, thats where you link all you inputs etc
* collection -> collection you want grid to use, grid will add a __sgKey property to this and use a internal clone for filtering/sorting
* grid-context -> if you want to access the grid function/manual set attibutes without using html, all attributes can be set here, replace line with uppercase : row-height = rowHeight

###### "row-height"
Default: 50, set the height of the row
###### "header-height"
Default :0, sets the height of the header
###### "footer-height"
Default :0, sets the height of the footer
###### "resizable-headers"
Default :false, enables resizing of header
###### "resize-also-rows"
Default: false, if active with "resizable-headers" the row columns also resize, else its just the header, and the grid renders columns after
###### "multi-select"
Default: undefined, undefined = none, false = single, true = multi select
###### "sortable-headers"
Default = false: enables sorting of headers columns, (drag/drop)
###### "request-animation-frame"
Default = true: if false it does not request animation frame
###### "render-on-scrollbar-scroll"
Default = true: if false it does not try to render if there is to much scrolling up/down with scrollbar
###### "locked-columns"
Default = 0, this can be very slow, but its x columns from left.
* This is really slow / laggy in Edge

###### "header-filter"
Default = false, adds filter to header, you need to set height if header higher now because the filter tried to use 50% of the column height
###### "header-filter-top"
Default = false, set to tru if you want filter above the header labels
###### "header-filter-onkeydown"
Default = false, when false you need to press "enter" to activate filtering
###### "header-filter-not-to"
Default = "", here you can add columns attibute names you dont want filter for, like  this "index,name"
###### "sort-on-header-click"
Default = false, setting this to true will activate multisort on header clicks
###### "sort-not-on-header"
Default = "", here you can add columns attibute names you dont want have sorting/sort icon for, like  this "image1,documents"

###### "row-on-draw"
Default = undefined, string name of function callback when row gets drawn, here you can edit the row data before displaying


###### "row-on-dblclick"
Default = undefined, callback when user double click a row, returns row number of the collection you have set in config attribute, not the actual row in grid

###### "format-handler"
Default = undefined, callback before edit, after edit and before filter, se bottom of readme for more info


---

##### < v-grid-col > Attributes details:

###### "col-width"
This is the width in pixe, default value is 100

###### "attribute"
This is the attibute you want it to display

###### "header"
This is the header text

###### "col-css"
Style that will be added to input style attribute

###### "col-type"
use this id you want to use image  col-type="image"


###### "read-only"
Default value is false/undefined, setting it to tru will stopp cell editing

###### "default-filter"
You cant combine there, but with it is set to equal to or begin with you can use "*" as wildcard.
These can be used:
* __"="__: "equal",
* __"<="__: "less than or eq",
* __">="__: "greater than or eq",
* __"<"__: "less than",
* __">"__: "greater than",
* __"*"__: "contains",
* __"!="__: "not equal to",
* __"!*"__: "does not contain",
* __"*="__: "begin with",
* __"=*"__: "end with"



##### Config-> Attributes in more details:

```
config="current-entity.bind:myCurrentEntity; collection.bind:myCollection">
row-on-dblclick="onDblClick"
row-on-draw="onRowDraw"
format-handler="myFormatHandler"
cell-on-draw="onCellDraw"

```

```
myCollection = [];
myCurrentEntity = {};

onRowDraw (data, dataCollection) {
    //edits to datacollection will stay in collection, while edits to data it just there and then...
    if (data) {
      if (data.country === "Angola") {
        data.myCustomColor = "rgba(150,72,230, 0.3)"
      }
    }
  }

onDblClick (row) {
    console.log("dblclick row:"+row)
  }
  
myFormatHandler(type, obj){

//types are :afterEdit, onFilter, beforeEdit
//to set in other value in the before edit, set the new value to obj.newValue
//you need to return the obj else it break atm,will improve this later
}


onCellDraw (data) {
    if (data) {
  
      //single click on a image, or another cell..
      if(data.attributeName === "images"){
        data.div.lastChild.type ="button";
        data.div.lastChild.onclick = function(e){
          console.log("clicked")
        }.bind({that:this, data:data})
      }
      
      //if adding checkbox, if you have it disable, use before edit to set disable to false
      if(data.attributeName === "bool"){
        data.div.lastChild.type ="checkbox";
        data.div.lastChild.style.height = "15px";
        data.div.lastChild.style.width = "15px";
        data.div.lastChild.style.left = "20%";
        data.div.lastChild.checked = data.rowdata.bool
        data.div.lastChild.disabled = "true"
      }
    }
  }

```


__ctx__ is also added to the gridContext if its used, from here you have access to grids internal function, like endable/disable filters/ resizable header, set row height etc etc, (these have not been tested after rebuild)

```
//functions to edit after its created/utillity function

//locked
this.myGrid.ctx.setLockedColumns(0);


//header filter
this.myGrid.ctx.disableHeaderFilter();
this.myGrid.ctx.enableHeaderFilter();
this.myGrid.ctx.setHeaderFilterAtBottom();
this.myGrid.ctx.setHeaderFilterAtTop();


//sorting
this.myGrid.ctx.disableHeaderSort();
this.myGrid.ctx.enableHeaderSort();



//get rows that is in the grid at the moment (if filtered etc)
this.myGrid.ctx.getGridRows();


//report, takes filtered rows and generates downloads with the column (csv file, delimiter = ";"
this.myGrid.ctx.createReport()


//resiable columns
this.myGrid.ctx.enableResizableColumns();
this.myGrid.ctx.enableResizableColumns(true);
this.myGrid.ctx.disableResizableColumns();


//sortable columns
this.myGrid.ctx.disableSortableColumns();
this.myGrid.ctx.enableSortableColumns();


//selection (todo: write more about each one)
this.myGrid.ctx.disableSelection();
this.myGrid.ctx.setSingleSelection();
this.myGrid.ctx.setMultiSelection();
this.myGrid.ctx.selection.setMode(option) false = single, true = multi, undefined = none
this.myGrid.ctx.selection.isSelected(row)
this.myGrid.ctx.selection.isSelectedMainCollection(row)
this.myGrid.ctx.selection.select(rowSelect, addToSelection)
this.myGrid.ctx.selection.selectMainCollection(rowSelect, addToSelection)
this.myGrid.ctx.selection.selectRange(start, end)
this.myGrid.ctx.selection.selectRangeMainCollection(start, end)
this.myGrid.ctx.selection.reset()
this.myGrid.ctx.selection.resetFilteredOnly()
this.myGrid.ctx.selection.getSelectedRows()
this.myGrid.ctx.selection.getSelectedRowsMainCollection()
this.myGrid.ctx.selection.setSelectedRows(newRowsArray)
this.myGrid.ctx.selection.setSelectedRowsMainCollection(newRowsArray)


//footer/row/header height
this.myGrid.ctx.setFooterHeight(x)
this.myGrid.ctx.setHeaderHeight(x)
this.myGrid.ctx.setRowHeight(x);


//redraw grid, if you have it inside a dialog thats display "none" then you will need to call this to fix the grid
this.myGrid.ctx.redrawGrid()


//not tested after all chnages Ive done
this.myGrid.ctx.getColumns()
this.myGrid.ctx.setColumns(paramObj)
//you need to call this after setting new ones:
this.myGrid.ctx.rebuildColumns();


//call this before adding if you want grid to scroll to bottom after 1 is added
//new is always added to bottom (will afdd option for active sorting/filter later)
this.myGrid.ctx..scrollBottomNext

```



To use the dummy data generator:
```
//import it
import {dummyDataGenerator} from 'data/dummyDataGenerator'


//inject it
static inject = [dummyDataGenerator];


constructor(element, dummyDataGenerator) {

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(100, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });

  }

```