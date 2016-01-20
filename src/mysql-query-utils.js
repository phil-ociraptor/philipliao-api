var MysqlQueryUtils = function () {
    var escapeIfString = function (str) {
        var isString = (typeof str === "string");
        return isString ? "\"" + str + "\"" : str;
    };
    
     var prepareFields = function (fields, entity) {
         return fields.filter((field) => entity[field] !== undefined).join(', ');
     }
     
     var prepareValues = function (fields, entity) {
        return fields.filter((field) => entity[field] !== undefined)
            .map((field) => entity[field])
            .map(escapeIfString)
            .join(', ');
     }
     
     var prepareFieldsToValues = function (fields, entity) {
         return fields
            .filter((field) => entity[field] !== undefined)
            .map((field) => field + "=" + escapeIfString(entity[field]))
            .join(', ');
     }
    
    return {
        escapeIfString: escapeIfString,
        prepareFields: prepareFields,
        prepareValues: prepareValues,
        prepareFieldsToValues: prepareFieldsToValues
    }
}

module.exports = MysqlQueryUtils();