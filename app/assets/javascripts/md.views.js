/*
 * Handle views
 */
MD.views = function() {
    this.noteListingEl = $('#note-listing');
};

/*
 * Public
 */

MD.views.prototype.createAndAppendNotes = function(data) {
    var self = this;

    for (var i = 0; i < data.length; i++) {
	var note = MD.views.NoteFactory(data[i]);
	self.noteListingEl.append(note);
	if (i == 0) {
	    note.select();
	}
    }
};

MD.views.createNewNote = function() {
    var new_data = {
	title : 'New note',
	content : '# ',
	id : 0
    };
    var note = MD.views.NoteFactory(new_data);
    $('#note-listing').append(note);
    
    note.select();

};

MD.views.deleteNote = function(data) {
    $('#note-listing li').each(function(i, el) {
	if (parseInt($(el.children[0]).attr('href').split('_')[0].split('#')[1]) == data.id) {
	    $(el).hide();
	}
    });
};

MD.views.changeNoteTitle = function(title) {
    // 1# Change internal note title & bind click
    $('#inner-title').html(title);
    $('#file-title').unbind().click(function() {
	MD.modal.textfield('Change the title', title);
    });
};

/*
 * /!\ PROBLEM HERE IF WE USE HASHBANG
 * 
 * HASHBANG HERE ARE NOT UPDATED WHEN A TITLE IS MODIFIED
 * we have to regenerate the ELEMENT
 *
 * /!\ EOP
 */
MD.views.overrideNoteTitle = function(new_title, note) {
    // 1# Change internal note title
    MD.views.changeNoteTitle(new_title);

    // 2# Change menu title
    $('#note-listing li').each(function(i, el) {
    	if (parseInt($(el.children[0]).attr('href').split('_')[0].split('#')[1]) == note.id) {
	    $(el.children[0]).html(new_title);
    	}
    });	
};