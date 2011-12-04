
MD.views.NoteFactory = function(note_data) {
    var self = this;
    var note = $(MD.views.template.sidebarNote(note_data));

    note.data('data', note_data);

    note.save = function() {
	var data = MD.views.variables.actualNote.data('data');
	data.content = $('#edit-area').val();
	$.publish('note.save', data);	
    };

    note.select = function() {
	MD.views.singleton.select(note);
    };

    note.changeTitle = function(new_title) {
	var data = MD.views.variables.actualNote.data('data');
	data.title = new_title;
	MD.views.overrideNoteTitle(new_title, data);
	$.publish('note.save', data);
    };

    // Note is clicked on the left panel
    note.click(function() {
	note.select();
    });

    return note;
};

MD.views.singleton = {
    select : function(note) {
	var data = note.data('data');

	// Remove previously selected
	if (MD.views.variables.actualNote != null) {
	    MD.views.variables.actualNote.attr('class', '');
	    MD.views.variables.actualNote.save();
	}

	// Set as selected
	note.attr('class', 'selected');
	
	// Set edit area to the value of the actual note
	$('#edit-area').val(data.content);
	
	// If edit area changed set the traffic light

	// The doc is ready
	MD.traffic.saved();

	// Bind save and delete button
	$('#save-btn').unbind().click(function() {
	    data.content = $('#edit-area').val();
	    $.publish('note.save', data);
	});
	
	// If delete
	$('#delete-btn').unbind().click(function() {
	    $.publish('note.delete', data);
	});

	// Set actual note as actualNote (used for unselection)
	MD.views.variables.actualNote = note;
	
	// Change window title
	MD.views.changeNoteTitle(data.title);
	
	$.publish('note.selected', data);
    }
};

MD.views.variables = {
    actualNote : null
};

MD.views.template = {
    sidebarNote : function(note) {
	var el = '<li><a href="#<%= id %>_<%= title_underscore %>"><%= title %></a></li>';
	var compiled = _.template(el);
	return compiled({id : note.id, title : note.title, title_underscore : note.title.toUnderscore()});
    }
};