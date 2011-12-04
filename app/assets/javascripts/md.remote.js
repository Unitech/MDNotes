
MD.remote = function(urls) {
    this.urls = urls;
};

MD.remote.prototype.getNotes = function(callback) {
    var self = this;

    $.ajax({
	type : 'GET',
	processData : false,
	contentType : 'application/json',
	url : self.urls.read,
	data : {
	    'authenticity_token' : window._token
	},
	dataType : 'json',
	success : function(data) {
	    callback(data);
	}
    });
};

MD.remote.prototype.updateNote = function(note, callback) {
    var self = this;
    var dt = JSON.stringify({ 
	note : note,
	'authenticity_token' : window._token
    }); // We must stringify our content

    $.ajax({
	url : self.urls.read + '/' + note.id,
	type : 'PUT',
	processData : false,
	contentType : 'application/json',
	dataType : 'json',
	data : dt,
	complete : function() {
	    MD.traffic.saved();
	}
    });

};

MD.remote.prototype.createNote = function(note, callback) {
    var self = this;
    var dt = JSON.stringify({ 
	note : note,
	'authenticity_token' : window._token
    });

    $.ajax({
	url : self.urls.create,
	type : 'POST',
	processData : false,
	contentType : 'application/json',
	dataType : 'json',
	data : dt,
	success : function(data) {
	    $.extend(note, data);
	    MD.traffic.saved();
	}
    });
};

MD.remote.prototype.deleteNote = function(note, callback) {
    var self = this;
    
    var dt = JSON.stringify({	
	'authenticity_token' : window._token
    });
    $.ajax({
	url : self.urls.delete + '/' + note.id,
	type : 'DELETE',
	processData : false,
	contentType : 'application/json',
	dataType : 'json',
	data : dt,
	complete : function(data) {
	    MD.views.deleteNote(note);
	}
    });

};