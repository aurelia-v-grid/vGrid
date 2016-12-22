// a lot of this is from here:
// https://github.com/Wakanda/WAF/blob/WAK9/Core/Native/Rest.js
// plan to clean up a little more...
export class WakRestUtil {

    constructor() {
        // todo
    }

    public orderByArgsToString(orderby: any): any {
        let retString = '';
        if (typeof orderby === 'string') {
            return orderby;
        }
        if (orderby.length > 0) {
            retString = orderby[0];
        }
        for (let i = 1; i < orderby.length; i++) {
            retString += ',' + orderby[i];
        }

        return retString;
    };

    public generateRestString(url: any, options: any): any {

        let addAmpersand = url.indexOf('?') !== -1;
        let needToAddQuaestionMark = !addAmpersand;

        let queryString = '';
        // $skip and $top
        if (options.skip) {
            queryString += (!addAmpersand ? '$skip=' : '&$skip=') + options.skip;
            addAmpersand = true;
        }
        if (options.top) {
            queryString += (!addAmpersand ? '$top=' : '&$top=') + options.top;
            addAmpersand = true;
        }
        // $filter
        if (options.filter) {
            // tslint:disable-next-line:quotemark
            queryString += (!addAmpersand ? '$filter=' : '&$filter=') + encodeURIComponent("'" + options.filter + "'");
            addAmpersand = true;
        }
        // $params
        if (options.params) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:quotemark
            queryString += (!addAmpersand ? '$params=' : '&$params=') + encodeURIComponent("'" + JSON.stringify(options.params) + "'");
            addAmpersand = true;
        }
        // $method
        if (options.method) {
            queryString += (!addAmpersand ? '$method=' : '&$method=') + options.method;
            addAmpersand = true;
        }
        // $asArray
        if (options.asArray) {
            queryString += (!addAmpersand ? '$asArray=' : '&$asArray=') + 'true';
            addAmpersand = true;
        }
        // $metadata
        if (options.metadata) {
            queryString += (!addAmpersand ? '$metadata=' : '&$metadata=') + options.metadata;
            addAmpersand = true;
        }
        // $distinct
        if (options.distinct) {
            queryString += (!addAmpersand ? '$distinct=' : '&$distinct=') + options.distinct;
            addAmpersand = true;
        }
        // $findKey
        if (options.findKey != null) {
            queryString += (!addAmpersand ? '$findKey=' : '&$findKey=') + encodeURIComponent('' + options.findKey);
            addAmpersand = true;
        }
        if (options.queryPlan) {
            queryString += (!addAmpersand ? '$queryplan=true&querypath=true' : '&$queryplan=true&querypath=true');
            addAmpersand = true;
        }
        if (options.progressInfo) {
            // tslint:disable-next-line:max-line-length
            queryString += (!addAmpersand ? '$progressinfo=' : '&$progressinfo=') + encodeURIComponent(options.progressInfo);
            addAmpersand = true;
        }
        if (options.timeout) {
            queryString += (!addAmpersand ? '$timeout=' : '&$timeout=') + options.timeout;
            addAmpersand = true;
        }
        if (options.savedQueryString) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:quotemark
            queryString += (!addAmpersand ? '$savedfilter=' : '&$savedfilter=') + encodeURIComponent("'" + options.savedQueryString + "'");
            addAmpersand = true;
        }
        if (options.savedOrderby) {
            queryString += (!addAmpersand ? '$savedorderby=' : '&$savedorderby=') + options.savedOrderby;
            addAmpersand = true;
        }
        // $refresh  --> vr note, for refreshing current entityset
        if (options.refreshOnly) {
            queryString += (!addAmpersand ? '$refresh=' : '&$refresh=') + options.refreshOnly;
            addAmpersand = true;
        }
        // $atOnce --> vr note: transaction, usefull for when uploading multible or deleting by query/entityset
        if (options.atOnce) {
            queryString += (!addAmpersand ? '$atOnce=' : '&$atOnce=') + options.atOnce;
            addAmpersand = true;
        }
        // $retainPositions
        if (options.retainPositions) {
            queryString += (!addAmpersand ? '$retainPositions=' : '&$retainPositions=') + options.retainPositions;
            addAmpersand = true;
        }
        // $removeFromSet
        if (options.removeAtPos != null) {
            queryString += (!addAmpersand ? '$removeFromSet=' : '&$removeFromSet=') + options.removeAtPos;
            addAmpersand = true;
        }
        if (options.removeReferenceOnly != null) {
            queryString += (!addAmpersand ? '$removeRefOnly=' : '&$removeRefOnly=') + options.removeReferenceOnly;
            addAmpersand = true;
        }
        // $attributes
        if (options.filterAttributes != null) {
            // tslint:disable-next-line:max-line-length
            queryString += (!addAmpersand ? '$attributes=' : '&$attributes=') + encodeURIComponent(options.filterAttributes);
            addAmpersand = true;
        }
        // $addToSet
        if (options.addToSet != null) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:quotemark
            queryString += (!addAmpersand ? '$addToSet=' : '&$addToSet=') + encodeURIComponent("'" + JSON.stringify(options.addToSet) + "'");
            addAmpersand = true;
        }
        // $fromSel
        if (options.fromSelection != null) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:quotemark
            queryString += (!addAmpersand ? '$fromSel=' : '&$fromSel=') + encodeURIComponent("'" + JSON.stringify(options.fromSelection) + "'");
            addAmpersand = true;
        }
        // $keepSel <-- need to use for keeping selection
        if (options.keepSelection != null) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:quotemark
            queryString += (!addAmpersand ? '$keepSel=' : '&$keepSel=') + encodeURIComponent("'" + JSON.stringify(options.keepSelection) + "'");
            addAmpersand = true;
        }
        // $orderby
        if (options.orderby) {
            if (options.orderby.length) {
                if (!addAmpersand) {
                    queryString += '$orderby=' + this.orderByArgsToString(options.orderby);
                } else {
                    queryString += '&$orderby=' + this.orderByArgsToString(options.orderby);
                }
                addAmpersand = true;
            }
        }
        // $subOrderby
        if (options.subOrderby != null) {
            queryString += (!addAmpersand ? '$subOrderby=' : '&$subOrderby=') + encodeURIComponent(options.subOrderby);
            addAmpersand = true;
        }
        // $expand
        if (options.attributesExpanded !== undefined) {
            if (options.attributesExpanded.length > 0) {
                let expandString = '';
                if (!addAmpersand) {
                    queryString += '$expand=';
                } else {
                    queryString += '&$expand=';
                }
                addAmpersand = true;
                for (let i = 0; i < options.attributesExpanded.length; i++) {
                    if (expandString === '') {
                        expandString += options.attributesExpanded[i];
                    } else {
                        expandString += ',' + options.attributesExpanded[i];
                    }
                }
                queryString += expandString;
            }
        }

        if (options.autoExpand != null && options.autoExpand !== '') {
            if (!addAmpersand) {
                queryString += '$expand=';
            } else {
                queryString += '&$expand=';
            }
            addAmpersand = true;
            queryString += options.autoExpand;
        }

        if (options.autoSubExpand != null && options.autoSubExpand !== '') {
            if (!addAmpersand) {
                queryString += '$subExpand=';
            } else {
                queryString += '&$subExpand=';
            }
            addAmpersand = true;
            queryString += options.autoSubExpand;
        }

        // Adds queryString to url
        if (queryString !== '') {
            if (needToAddQuaestionMark) {
                url += '?';
            }
            url += queryString;
        }

        return url;
    }
}
