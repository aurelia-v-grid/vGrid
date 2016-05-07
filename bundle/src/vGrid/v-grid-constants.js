//not in use, just thinking this could maybe simplify it by adding it as a descorator to a few of the classes that set this.vGrid =vGrid
//should I just use a descorator so I dont haveto write this.vGrid. xxx?

export function VGridConstants() {
  return function (xVgrid) {
    var target = xVgrid.prototype;

    Object.defineProperty(target, 'vGridCellHelper', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridCellHelper;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridSelection', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridSelection;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridConfig', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridConfig;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridElement', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.element;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });


    Object.defineProperty(target, 'vGridFilter', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridFilter;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridSort', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridSort;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridSortable', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridSortable;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridResizable', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridResizable;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(target, 'vGridGenerator', {
      get: function () {
        if (this.vGrid) {
          return this.vGrid.vGridGenerator;
        } else {
          return null;
        }
      },
      configurable: true,
      enumerable: true
    });


    return xVgrid;
  }
};


