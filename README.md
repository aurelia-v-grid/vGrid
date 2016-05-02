Rebuilding branch
----------------------------------


[Demo with grid using viewslots](http://vegarringdal.github.io/vGrid/viewSlotsDemo001/)

---

This branch Im rebuilding a lot, will keep it as a own project since I will do breaking changes, suggestions are welcome




#### More info
Using som icons/classes from bootstrap:

Included used classes/icons, no need to install bootstrap for it to work, huge thanks to http://glyphicons.com/ for giving bootstrap those amazing icons

---

How to use: (no plugin yet):

1: Copy the files under vgrid folder to you src folder, and move font and spinner image to styles folder

2: Add to main.js
```
.plugin("vGrid/plugin");
```

* todo, show more when Ive renamed a few tings/ and cleaned up more

----

#### < v-grid > attributes:
* **v-current-entity**: - optional, link you inputs etc to this
* **v-grid-context** - optional, default 50
* **v-row-height** - optional, default 50
* **v-header-height** - optional, default 50
* **v-footer-height** - optional, default 0
* **v-resizable-headers** - optional, default false
* **v-resize-also-rows** - optional, default false
* **v-multi-select** - optional, default none
* **v-sortable-headers** - optional, default false
* **v-request-animation-frame** - optional, default true
* **v-render-on-scrollbar-scroll** - optional, default true
* **v-header-filter** - optional, default false
* **v-header-filter-top** - optional, default true
* **v-header-filter-not-to** - optional, default ""  sample:"att1,att2" 
* **v-sort-on-header-click** - optional, default false
* **v-sort-not-on-header** - optional, default ""  sample:"att1,att2" 
* **v-row-on-draw** - optional, default ""


----

#### < v-grid-col > attributes:
* **v-col-width** - optional, default 100
* **v-col-attribute** -mandatory
* **v-col-header** -mandatory
* **v-col-read-only** - optional, default false
* **v-col-css** - optional
* **v-col-type** - optional (image, checkbox), default normal input
* **v-col-default-filter** - optional
* **v-col-filter-on-key** - optional, default false
* **v-col-formater** -optional name of the valueformater (must have toView and fromView)
* **v-col-edit-raw** -optional, defaul = false, used when editing numbers where you want to edit the raw value
----

#### How to use in html:

from whats used in the sample
```
<v-grid
          style="position:absolute;top:70px;bottom:0px;right: 25px;left:25px"
          v-row-height="40"
          v-header-height="50"
          v-resize-also-rows="true"
          v-resizable-headers="true"
          v-header-filter="true"
          v-header-filter-not-to="images"
          v-header-filter-top="true"
          v-sortable-headers="true"
          v-sort-on-header-click="true"
          v-multi-select="true"
          v-format-handler="myFormatHandler"
          v-current-entity.bind=myCurrentEntity
          v-collection.bind=myCollection
          v-grid-context.bind=myGrid>
          <v-grid-col v-col-width="70" v-col-attribute="index" v-col-header="Index" v-col-default-filter=">=" v-col-read-only="true"></v-grid-col>
          <v-grid-col v-col-width="100" v-col-attribute="name" v-col-filter-on-key="true" v-col-header="name" v-col-default-filter="*"></v-grid-col>
          <v-grid-col v-col-width="180" v-col-attribute="images" v-col-header="image" v-col-type="image" v-col-css="border-radius: 50%;width:50%;margin-left:25%;" v-col-default-filter="=*"></v-grid-col>
          <v-grid-col v-col-width="70" v-col-attribute="bool" v-col-header="bool" v-col-type="checkbox" v-col-default-filter="=" ></v-grid-col>
          <v-grid-col v-col-width="80" v-col-attribute="number" v-col-header="Number" v-col-formater="numberFormat" v-col-edit-raw="true" v-col-css="text-align:right; padding-right:5px" v-col-default-filter=">="></v-grid-col>
          <v-grid-col v-col-width="180" v-col-attribute="date" v-col-header="date" v-col-date-picker.bind=onDatePickerCreate v-col-formater="dateFormat" v-col-default-filter=">="></v-grid-col>
          <v-grid-col v-col-width="160" v-col-attribute="color" v-col-header="Color" v-col-default-filter="=*" ></v-grid-col>
        </v-grid>
      </div>
```
