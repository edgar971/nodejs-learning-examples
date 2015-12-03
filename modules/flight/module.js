module.exports = function(info) {
    /*
    Default Values
     */
    var values = {
        number: null,
        origin: null,
        destination: null,
        departs: null,
        arrives: null,
        actualDepart: null,
        actualArrive: null
    };

    /*
    Set the values with info
     */
    for(prop in values) {
        if(values[prop] !== undefined) {
            values[prop] = info[prop];
        }
    }

    /*
    Public API
     */

    return {
        triggerDepart: function() {
            values.actualDepart = Date.now();
        },
        triggerArrive: function() {
            values.actualArrive = Date.now();
        },
        getInformation: function() {
            return values;
        }
    }
};

