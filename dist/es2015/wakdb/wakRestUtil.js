define(["require", "exports"], function (require, exports) {
    var WakRestUtil = (function () {
        function WakRestUtil() {
        }
        WakRestUtil.prototype.orderByArgsToString = function (orderby) {
            var retString = '';
            if (typeof orderby === 'string') {
                return orderby;
            }
            if (orderby.length > 0) {
                retString = orderby[0];
            }
            for (var i = 1; i < orderby.length; i++) {
                retString += ',' + orderby[i];
            }
            return retString;
        };
        ;
        WakRestUtil.prototype.generateRestString = function (url, options) {
            var addAmpersand = url.indexOf('?') !== -1;
            var needToAddQuaestionMark = !addAmpersand;
            var queryString = '';
            if (options.skip) {
                queryString += (!addAmpersand ? '$skip=' : '&$skip=') + options.skip;
                addAmpersand = true;
            }
            if (options.top) {
                queryString += (!addAmpersand ? '$top=' : '&$top=') + options.top;
                addAmpersand = true;
            }
            if (options.filter) {
                queryString += (!addAmpersand ? '$filter=' : '&$filter=') + encodeURIComponent("'" + options.filter + "'");
                addAmpersand = true;
            }
            if (options.params) {
                queryString += (!addAmpersand ? '$params=' : '&$params=') + encodeURIComponent("'" + JSON.stringify(options.params) + "'");
                addAmpersand = true;
            }
            if (options.method) {
                queryString += (!addAmpersand ? '$method=' : '&$method=') + options.method;
                addAmpersand = true;
            }
            if (options.asArray) {
                queryString += (!addAmpersand ? '$asArray=' : '&$asArray=') + 'true';
                addAmpersand = true;
            }
            if (options.metadata) {
                queryString += (!addAmpersand ? '$metadata=' : '&$metadata=') + options.metadata;
                addAmpersand = true;
            }
            if (options.distinct) {
                queryString += (!addAmpersand ? '$distinct=' : '&$distinct=') + options.distinct;
                addAmpersand = true;
            }
            if (options.findKey != null) {
                queryString += (!addAmpersand ? '$findKey=' : '&$findKey=') + encodeURIComponent('' + options.findKey);
                addAmpersand = true;
            }
            if (options.queryPlan) {
                queryString += (!addAmpersand ? '$queryplan=true&querypath=true' : '&$queryplan=true&querypath=true');
                addAmpersand = true;
            }
            if (options.progressInfo) {
                queryString += (!addAmpersand ? '$progressinfo=' : '&$progressinfo=') + encodeURIComponent(options.progressInfo);
                addAmpersand = true;
            }
            if (options.timeout) {
                queryString += (!addAmpersand ? '$timeout=' : '&$timeout=') + options.timeout;
                addAmpersand = true;
            }
            if (options.savedQueryString) {
                queryString += (!addAmpersand ? '$savedfilter=' : '&$savedfilter=') + encodeURIComponent("'" + options.savedQueryString + "'");
                addAmpersand = true;
            }
            if (options.savedOrderby) {
                queryString += (!addAmpersand ? '$savedorderby=' : '&$savedorderby=') + options.savedOrderby;
                addAmpersand = true;
            }
            if (options.refreshOnly) {
                queryString += (!addAmpersand ? '$refresh=' : '&$refresh=') + options.refreshOnly;
                addAmpersand = true;
            }
            if (options.atOnce) {
                queryString += (!addAmpersand ? '$atOnce=' : '&$atOnce=') + options.atOnce;
                addAmpersand = true;
            }
            if (options.retainPositions) {
                queryString += (!addAmpersand ? '$retainPositions=' : '&$retainPositions=') + options.retainPositions;
                addAmpersand = true;
            }
            if (options.removeAtPos != null) {
                queryString += (!addAmpersand ? '$removeFromSet=' : '&$removeFromSet=') + options.removeAtPos;
                addAmpersand = true;
            }
            if (options.removeReferenceOnly != null) {
                queryString += (!addAmpersand ? '$removeRefOnly=' : '&$removeRefOnly=') + options.removeReferenceOnly;
                addAmpersand = true;
            }
            if (options.filterAttributes != null) {
                queryString += (!addAmpersand ? '$attributes=' : '&$attributes=') + encodeURIComponent(options.filterAttributes);
                addAmpersand = true;
            }
            if (options.addToSet != null) {
                queryString += (!addAmpersand ? '$addToSet=' : '&$addToSet=') + encodeURIComponent("'" + JSON.stringify(options.addToSet) + "'");
                addAmpersand = true;
            }
            if (options.fromSelection != null) {
                queryString += (!addAmpersand ? '$fromSel=' : '&$fromSel=') + encodeURIComponent("'" + JSON.stringify(options.fromSelection) + "'");
                addAmpersand = true;
            }
            if (options.keepSelection != null) {
                queryString += (!addAmpersand ? '$keepSel=' : '&$keepSel=') + encodeURIComponent("'" + JSON.stringify(options.keepSelection) + "'");
                addAmpersand = true;
            }
            if (options.orderby) {
                if (options.orderby.length) {
                    if (!addAmpersand) {
                        queryString += '$orderby=' + this.orderByArgsToString(options.orderby);
                    }
                    else {
                        queryString += '&$orderby=' + this.orderByArgsToString(options.orderby);
                    }
                    addAmpersand = true;
                }
            }
            if (options.subOrderby != null) {
                queryString += (!addAmpersand ? '$subOrderby=' : '&$subOrderby=') + encodeURIComponent(options.subOrderby);
                addAmpersand = true;
            }
            if (options.attributesExpanded !== undefined) {
                if (options.attributesExpanded.length > 0) {
                    var expandString = '';
                    if (!addAmpersand) {
                        queryString += '$expand=';
                    }
                    else {
                        queryString += '&$expand=';
                    }
                    addAmpersand = true;
                    for (var i = 0; i < options.attributesExpanded.length; i++) {
                        if (expandString === '') {
                            expandString += options.attributesExpanded[i];
                        }
                        else {
                            expandString += ',' + options.attributesExpanded[i];
                        }
                    }
                    queryString += expandString;
                }
            }
            if (options.autoExpand != null && options.autoExpand !== '') {
                if (!addAmpersand) {
                    queryString += '$expand=';
                }
                else {
                    queryString += '&$expand=';
                }
                addAmpersand = true;
                queryString += options.autoExpand;
            }
            if (options.autoSubExpand != null && options.autoSubExpand !== '') {
                if (!addAmpersand) {
                    queryString += '$subExpand=';
                }
                else {
                    queryString += '&$subExpand=';
                }
                addAmpersand = true;
                queryString += options.autoSubExpand;
            }
            if (queryString !== '') {
                if (needToAddQuaestionMark) {
                    url += '?';
                }
                url += queryString;
            }
            return url;
        };
        return WakRestUtil;
    }());
    exports.WakRestUtil = WakRestUtil;
});

//# sourceMappingURL=WakRestUtil.js.map
