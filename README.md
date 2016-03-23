vGrid - Custom Element for Aurelia
----------------------------------


[Demo](http://vegarringdal.github.io/vGrid/demo001/)



##### How to use: (no plugin yet):
1: Copy the files under vgrid folder to you src folder

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