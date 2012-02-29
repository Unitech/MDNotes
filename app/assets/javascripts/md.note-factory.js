
MD.views.NoteFactory = function(note_data) {
    var self = this;
    var note = $(MD.views.template.sidebarNote(note_data));

    note.data('data', note_data);
    
    note.save = function() {
	if (note_data.id == undefined)
	    return;
	var data = MD.views.variables.actualNote.data('data');
	data.content = $('#edit-area').val();
	$.publish('note.save', data);	
    };

    note.select = function() {
	MD.views.singleton.select(note);
    };

    note.changeTitle = function(new_title) {
	if (note_data.id == undefined)
	    return;
	var data = MD.views.variables.actualNote.data('data');
	data.title = new_title;
	MD.views.overrideNoteTitle(new_title, data);
	$.publish('note.save', data);
    };

    note.getTitle = function() {
	return MD.views.variables.actualNote.data('data').title;
    };

    // Note is clicked on the left panel
    note.click(function() {
	note.select();
    });

    return note;
};

MD.views.tutorialFactory = function() {
    var note_data = {
	title : 'MDNotes Tutorial',
	content : ['# Bienvenue sur MDNotes',
		   'Aujourd\'hui grâce à la syntaxe Markdown nous pouvons gagner beaucoup de temps pour structurer des documents.',
		   '## Comment fonctionne MDNotes ?',
		   '- Tout à gauche vous avez votre liste de documents',
		   '- Vous écrivez dans la zone de texte gauche',
		   '- Le résultat du formatage s\'affiche *en live* à droite',
		   '## Grâce au Markdown **notez plus vite**', 
		   'Exemple de liste :',
		   '- l1\n- l2\n- l3\n- l4\n    - l4.1\n    - l4.2',
		   'Exemple de list ordonée :',
		   '1. l1\n1. l2\n1. l3\n1. l4',
		   'Texte en gras : **en GRAS**',
		   'Texte en italique : *italique !*'
		  ].join('\n\n')
    };
    var note = MD.views.NoteFactory(note_data);

    MD.views.appendNote(note);
    note.select();
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

	if (data.id != undefined) {
	    // Bind save and delete button
	    $('#save-btn').unbind().click(function() {
		data.content = $('#edit-area').val();
		$.publish('note.save', data);
	    });
	
	    // If delete
	    $('#delete-btn').unbind().click(function() {
		$.publish('note.delete', data);
	    });
	}
	else {
	    $('#save-btn').unbind();
	    $('#delete-btn').unbind();
	}

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