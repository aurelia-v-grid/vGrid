export class ArrayGrouping {
  private gID: any;
  private groups: any;
  private grouping: any;
  private expanded: Set<any>;

  constructor() {
    this.gID = 0;
    this.grouping = [];
    this.expanded = new Set([]);


  }


  // @params grouping : ["attribute", "attribute2"  etc etc ])
  public group(arrayToGroup: Array<any>, grouping: Array<any>, keepExpanded?: boolean) {

    if (grouping.length > 0) {


      // temp holder for groups as we create them
      if (!keepExpanded) {
        this.expanded = new Set([]);
      }

      let groups = [];

      grouping.forEach((groupBy, groupNo) => {

        if (groupNo === 0) {

          // create main group and add to groups array
          let mainGroup = this.groupMain(arrayToGroup, groupBy, groupNo);
          groups.push(mainGroup);

        } else {

          // get last group created, and group children
          let childGroupArray = groups[groups.length - 1];
          let newSubGroup = this.groupChildren(childGroupArray, groupBy, groupNo);
          groups.push(newSubGroup);

        }

      });

      this.groups = groups;
      this.grouping = grouping;
      if (!keepExpanded) {
        return groups[0];
      } else {
        return this.expand(null, this.expanded);
      }
    } else {
      arrayToGroup.forEach((row) => {
        row.__groupLvl = 0;
      });
      this.grouping = [];
      return arrayToGroup;
    }

  }


  public getGrouping() {
    return this.grouping;
  }


  public expand(id: string, array?: Set<any>) {
    let all = id ? false : true; // if no id, then all
    if (!id) {
      if (array) {
        all = false;
      }
    }

    if (!array) {
      array = new Set([]);
    }
    let subGroup;
    let collection = [];
    let mainGroups = this.groups[0];

    // lopp children
    subGroup = (g: any) => {
      g.__groupChildren.forEach((sg) => {
        collection.push(sg);
        switch (true) {
          case all:
          case sg.__groupID === id:
          case array.has(sg.__groupID):
          case sg.__groupID !== id && sg.__groupExpanded:
            if (sg.__groupChildren) {
              sg.__groupExpanded = true;
              this.expanded.add(sg.__groupID);
              subGroup(sg);
            }
            break;
            default:
            // need anything here ?
          break;
        }

      });
    };

    // loop main groups
    mainGroups.forEach((g: any) => {
      collection.push(g);
      switch (true) {
        case all:
        case g.__groupID === id:
        case array.has(g.__groupID):
        case g.__groupID !== id && g.__groupExpanded:
          g.__groupExpanded = true;
          this.expanded.add(g.__groupID);
          if (g.__groupChildren) {
            subGroup(g);
          }
          break;
          default:
            // need anything here ?
          break;
      }
    });

    return collection;
  }


  public collapse(id: string) {
    let all = id ? false : true; // if no id, then all
    id = id === undefined ? null : id;
    let subGroup;
    let collection = [];
    let mainGroups = this.groups[0];

    // lopp children
    subGroup = (g: any) => {
      g.__groupChildren.forEach((sg) => {

        switch (true) {
          case all:
            if (sg.__groupChildren) {
              sg.__groupExpanded = false;
              this.expanded.delete(sg.__groupID);
              subGroup(sg);
            }
            break;
          case sg.__groupID === id:
            collection.push(sg);
            this.expanded.delete(sg.__groupID);
            sg.__groupExpanded = false;
            break;
          default:
            collection.push(sg);
            if (sg.__groupChildren && sg.__groupExpanded) {
              subGroup(sg);
            }
            break;
        }
      });
    };

    // loop main groups
    mainGroups.forEach((g: any) => {
      collection.push(g);
      switch (true) {
        case all:
          g.__groupExpanded = false;
          this.expanded.delete(g.__groupID);
          if (g.__groupChildren) {
            subGroup(g);
          }
          break;
        case g.__groupID === id:
          g.__groupExpanded = false;
          this.expanded.delete(g.__groupID);
          break;
        default:
          if (g.__groupChildren && g.__groupExpanded) {
            subGroup(g);
          }
          break;
      }
    });

    return collection;
  }

    private groupMain(array: Array<any>, groupBy: string, groupNo: number) {
    let tempGroupArray = [];
    let curGroup: any = {};
    let tempValue = null;

    // first level, here we use array
    array.forEach((element, i) => {
      this.gID++;
      if (element[groupBy] !== tempValue) {
        curGroup = {
          __groupName: element[groupBy] || 'blank',
          __group: true,
          __groupID: element[groupBy],
          __groupLvl: groupNo,
          __groupChildren: [element],
          __groupTotal: 1,
          __groupExpanded: false
        };
        element.__groupLvl = groupNo + 1;
        tempValue = element[groupBy];
        tempGroupArray.push(curGroup);
      } else {
        element.__groupLvl = groupNo + 1;
        curGroup.__groupChildren.push(element);
        curGroup.__groupTotal++;
      }
    });

    return tempGroupArray;
  }


  private groupChildren(childGroupArray: Array<any>, groupBy: string, groupNo: number) {
    let tempGroupArray = [];

    let curGroup: any = {};

    // loop groups
    childGroupArray.forEach((element: any, i: number) => {
      let tempValue = null;
      // loop children
      let rebuiltChildrenArray = [];
      element.__groupChildren.forEach((child: any) => {
        this.gID++;
        if (child[groupBy] !== tempValue) {
          let gidm = child[groupBy] || 'blank';
          let gidc = element.__groupID || 'blank';
          curGroup = {
            __groupName: child[groupBy],
            __groupID: gidm + '-' + gidc,
            __group: true,
            __groupLvl: groupNo,
            __groupChildren: [child],
            __groupTotal: 1,
            __groupExpanded: false
          };
          child.__groupLvl = groupNo + 1;

          tempValue = child[groupBy];
          rebuiltChildrenArray.push(curGroup);
          tempGroupArray.push(curGroup);
        } else {
          child.__groupLvl = groupNo + 1;
          curGroup.__groupChildren.push(child);
          curGroup.__groupTotal++;

        }
      });

      // replace children with new groups
      element.__groupChildren = rebuiltChildrenArray;
    });

    return tempGroupArray;
  }

}
