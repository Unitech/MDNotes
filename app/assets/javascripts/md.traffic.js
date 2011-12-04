
MD.traffic = {};

MD.traffic.init = function() {
    this.green = $('#green-light');
    this.red = $('#red-light');
    this.red.css({'opacity' : 0.1});
    this.green.css({'opacity' : 0.1});
};

MD.traffic.mustSave = function() {
    this.red.css({'opacity' : 1});
    this.green.css({'opacity' : 0.1});
};

MD.traffic.saved = function() {
    this.red.css({'opacity' : 0.1});
    this.green.css({'opacity' : 1});
};