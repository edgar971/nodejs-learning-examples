var Flight = function() {
    /*
     Default Values
     */
    this.data = {
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
    this.fill = function(info) {
        for(prop in this.data) {
            if(this.data[prop] !== 'undefined') {
                this.data[prop] = info[prop];
            }
        }
    };

    //Setters
    this.triggerDepart = function() {
        this.data.actualDepart = Date.now();
    };

    this.triggerArrive = function() {
        this.data.actualArrive = Date.now();
    };

    this.getInformation = function() {
        return this.data;
    };



};

//Export as a factory

module.exports = function(info) {
    var instance = new Flight();
    instance.fill(info);

    return instance;
};

