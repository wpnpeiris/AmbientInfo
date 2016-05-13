ambient.predic.views = ambient.predic.views || {};

/**
 * 
 */
ambient.predic.views.ContentRuleListView = Backbone.View.extend({
	el: $( '#contentView' ), 
	
	events: {
		'show.bs.modal #refModal': 'showContent',
		'click #closebtn': 'closeContent',
		'click #btnNew': 'newContentRuleForm',
		'click #editBtn': 'showContentRuleForm',
		//'click #saveBtn': 'saveContentRule',
		'submit #contentRuleForm' :  'saveContentRule',
		'click #resetBtn': 'resetContentRuleForm',
		'click #cancelBtn': 'cancelContentRuleForm'
	},
		
	refreshView: function() {
		this.collection.fetch();
		$("#contentRuleForm").collapse('hide');
	},
	
	initialize: function() {
		console.log('Initialize ContentRuleListView' ); 
		
		this.collection = new ambient.predic.models.ContentList();
		this.listenTo( this.collection, 'reset', this.render );
		
		this.collection.fetch();
		
		ambient.predic.tags.MANUFACTURER.initialize();
		ambient.predic.tags.PRODUCT.initialize();
		ambient.predic.tags.MODELS.initialize();
		ambient.predic.tags.OTHER.initialize();
		
		$('#ref_tags').tagsinput({
			tagClass: function(item) {
			    switch (item.category) {
			      case 'manufacturer'   : return 'tag-label tag-label-category1';
			      case 'producttype'  : return 'tag-label tag-label-category2';
			      case 'model': return 'tag-label tag-label-category3';
			      case 'other'   : return 'tag-label tag-label-category4';
	
			    }
			  },
			  itemValue: 'id',
			  itemText: 'value',
			typeaheadlist:[{
			    name: 'tags_manufacturer',
			    displayKey: 'value',
			    valueKey: 'id',
			    source: ambient.predic.tags.MANUFACTURER.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">Manufacturers</h3>'
			      }
			  },
			  {
			    name: 'tags_product',
			    displayKey: 'value',
			    valueKey: 'id',
			    source: ambient.predic.tags.PRODUCT.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">Products</h3>'
			      }
			  },
			  {
			    name: 'tags_model',
			    displayKey: 'value',
			    valueKey: 'id',
			    source: ambient.predic.tags.MODELS.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">Models</h3>'
			      }
			  },
			  {
			    name: 'tags_other',
			    displayKey: 'value',
			    valueKey: 'id',
			    source: ambient.predic.tags.OTHER.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">User Defined</h3>'
			      }
			  }]
		});
		
		
//		ambient.predic.tags.TEST.initialize();
//		$('#ref_tags').tagsinput({
//			tagClass: function(item) {
//			    switch (item.category) {
//			      case 'MANUFACTURER'   : return 'tag-label tag-label-category1';
//			      case 'PRODUCTTYPE'  : return 'tag-label tag-label-category2';
//			      case 'MODEL': return 'tag-label tag-label-category3';
//			      case 'OTHER'   : return 'tag-label tag-label-category4';
//	
//			    }
//			  },
//			  itemValue: 'id',
//			  itemText: 'value',
//			  typeaheadjs: {
//			    name: 'cities',
//			    displayKey: 'value',
//			    source: ambient.predic.tags.TEST.ttAdapter()
//			  }
//		});
//		

	},
	
	saveContentRule: function(event) {
		console.log("Save Content Rule");
		
		event.preventDefault();
		
		var id = $("#ref_id").val();
		var url = $("#ref_url").val();
		var desc = $("#ref_desc").val();
		var category = $("#ref_category").val();
		
		var community =  $("#ref_community").val();
		var provider =  $("#ref_provider").val();
		
//		var lang = $("#ref_lang").val();
//		var contentType = $("#ref_content_type").val();
		var type = $("#ref_content").val();
//		var tags = $("#ref_tags").tagsinput('items');
		var tags = $("#ref_tags").val().split(",");
//		var type = $("#ref_type").val(); //"URL"
//		var rel = $("#rel_ref").val();// -1
		
		var region = $("#apt_region").val();
		var level = $("#apt_level").val();
		var gender = $("#apt_gender").val();
		var age = $("#apt_age").val();
		
//		A Content can have multiple references for each language
//		TODO: We consider only one language now.
		var conteRefStr = "[ {'id': '" + id + "', 'lang': 'en', 'title': '" + desc + "', 'description': '" + desc + "', 'url': '" + url + "'} ]";
		var contentRefs = eval('(' + conteRefStr + ')');
		
		var version = $("#version").val();
		
		var isnew = true;
		if($("#flag").val() == 'UPDATE') {
			isnew = false;
		}
		

		var content = new ambient.predic.models.Content({
			id: id,
			//ref_desc: [desc],
			//ref_uri: url,
			//ref_content: contnt,		
			//ref_lang: lang,		
			//ref_content_type: contentType,	
			type: type,
			category: category,
			community: community,
			provider: provider,
			//rel_ref: [rel],
		
			apt_gender: gender,
			apt_region: region,
			apt_level: level,
			apt_age: age,
		
			tags: tags,
			contentRefs: contentRefs, 
			version: version
		});
		
		content.save(isnew);
		//this.collection.clearAll();
		//this.collection.fetch();

		
	},
	
	showContent: function(event) {
		var action = $(event.relatedTarget).data('action');
		var refdesc;
		var refuri;
		if(action == "preview"){
			refdesc = "Preview";
			refuri = $("#ref_url").val();
		} else {
			refdesc = $(event.relatedTarget).data('refdesc');
			refuri = $(event.relatedTarget).data('refuri');
		}
		
		
		
		var modal = this.$el.find("#refModal");
		modal.find('.modal-title').text(refdesc);
		modal.find('.modal-body iframe').attr("src", refuri);
		modal.find('.modal-body iframe').attr("height", ($( window ).height() - 300));
	},
	
	closeContent: function() {
		var modal = this.$el.find("#refModal");
		modal.find('.modal-body iframe').removeAttr('src');
	},
	
	showContentRuleForm: function(event) {
		$("#ref_id").val($(event.target).data('refid'));
		$("#version").val($(event.target).data('version'));
		
		$("#ref_url").val($(event.target).data('refuri'));
		$("#ref_desc").val($(event.target).data('refdesc'));
		$('#ref_category').selectpicker('val', $(event.target).data('refcategory'));
		$('#ref_lang').selectpicker('val', $(event.target).data('reflang'));
		$('#ref_content').selectpicker('val', $(event.target).data('refcontent'));
		$('#ref_content_type').selectpicker('val', $(event.target).data('refcontenttype'));
		
		$('#ref_community').selectpicker('val', $(event.target).data('refcommunity'));
		$('#ref_provider').selectpicker('val', $(event.target).data('refprovider'));
		
		$('#apt_region').selectpicker('val', $(event.target).data('aptregion'));
		$('#apt_level').selectpicker('val', $(event.target).data('aptlevel'));
		$('#apt_gender').selectpicker('val', $(event.target).data('aptgender'));
				
		$("#ref_tags").tagsinput('removeAll');
		
//		$(event.target).data('tags') is in the format of "'Sony, Mobile, Z3, Wifi'". 
//		Tags ids in CSV
		var tagValues = $(event.target).data('tags');
		var url = ambient.predic.SERVICE_ENPOINT + '/contenttags/search?tagids=' + tagValues;
		$.getJSON( url, function( data ) {
			$.each( data, function( key, value ) {
				 $("#ref_tags").tagsinput('add', value);
			});
		});
//		var tagValue = JSON.parse(decodeURIComponent($(event.target).data('tags')));
//		$.each( tagValue, function( key, value ) {
//			  $("#ref_tags").tagsinput('add', value);
//		});
		
		$("#flag").val('UPDATE');
		$("#contentRuleForm").collapse('show');
	},
	
	newContentRuleForm: function(event) {
		
		this.resetContentRuleForm(event);
		$("#contentRuleForm").collapse('show');
	},
	
	cancelContentRuleForm: function(event) {
		$("#contentRuleForm").collapse('hide');
	},
	
	resetContentRuleForm: function(event) {
		$("#ref_id").val(ambient.predic.util.generateUUID());
		$("#version").val(null);
		$("#ref_url").val("");
		$("#ref_desc").val("");
		$('#ref_category').selectpicker('val', 'tips');
		$('#ref_lang').selectpicker('val', 'english');
		$('#ref_content_type').selectpicker('val', 'video');
		$('#ref_content').selectpicker('val', 'youtube');
		
		$('#apt_region').selectpicker('val', 'global');
		$('#apt_level').selectpicker('val', 'normal');
		$('#apt_gender').selectpicker('val', 'any');
		$("#flag").val('NEW');
		
		$("#ref_tags").tagsinput('removeAll');
	},
	
	/**
	 * 
	 */
	render: function() {
		this.$el.find('#contentRuleList').empty();
		this.$el.find('#contentRuleListPager').empty();
		
		this.collection.each(function( item ) {
			this.renderLine( item );
		}, this );
		
		ambient.predic.util.Pager($('#contentRuleList'), {pagerSelector:'#contentRuleListPager', showPrevNext:true, hidePageNumbers:false, perPage:8});
	},
	
	/**
	 * 
	 */
	renderLine: function( item ) {
		console.log('Render Rule line'  + item); 
		var ruleView = new ambient.predic.views.ContentRuleView({
			model: item
		});
		this.$el.find('#contentRuleList').append( ruleView.render().el );
	}	
	
});

ambient.predic.views.ContentRuleListView.instance = null;

ambient.predic.views.ContentRuleListView.getInstance = function(){
	console.log('Call ambient.predic.views.ContentRuleListView.getInstance'); 
	if(ambient.predic.views.ContentRuleListView.instance  == null) {	
		console.log('Initiate ambient.predic.views.ContentRuleListView'); 	
		ambient.predic.views.ContentRuleListView.instance = new ambient.predic.views.ContentRuleListView();		
	}
	
	return ambient.predic.views.ContentRuleListView.instance;
}; 

