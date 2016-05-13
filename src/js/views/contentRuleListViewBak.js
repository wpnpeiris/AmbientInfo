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
		'click #saveBtn': 'saveContentRule',
		'click #resetBtn': 'resetContentRuleForm',
		'click #cancelBtn': 'cancelContentRuleForm'
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
			typeaheadlist:[{
			    name: 'tags_manufacturer',
			    displayKey: 'value',
			    valueKey: 'value',
			    //source: ambient.predic.util.tagMatcher(ambient.predic.tags.MANUFACTURER),
			    source: ambient.predic.tags.MANUFACTURER.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">Manufacturers</h3>'
			      }
			  },
			  {
			    name: 'tags_product',
			    displayKey: 'value',
			    valueKey: 'value',
			   // source: ambient.predic.util.tagMatcher(ambient.predic.tags.PRODUCT),
			    source: ambient.predic.tags.PRODUCT.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">Products</h3>'
			      }
			  },
			  {
			    name: 'tags_model',
			    displayKey: 'value',
			    valueKey: 'value',
			    //source: ambient.predic.util.tagMatcher(ambient.predic.tags.MODELS),
			    source: ambient.predic.tags.MODELS.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">Models</h3>'
			      }
			  },
			  {
			    name: 'tags_other',
			    displayKey: 'value',
			    valueKey: 'value',
			    source: ambient.predic.tags.OTHER.ttAdapter(),
			    templates: {
			        header: '<h3 class="tag-header">User Defined</h3>'
			      }
			  }]
		});
		
		
		
//		$('#ref_tags').tagsinput({
//			typeaheadjs:
//			  {
//			    name: 'tags_other',
//			    displayKey: 'name',
//			    valueKey: 'name',
//			    //source: ambient.predic.util.tagMatcher(ambient.predic.source.TAGS),
//			    source: ambient.predic.tags.OTHER.ttAdapter(),
//			    templates: {
//			        header: '<h3 class="tag-header">User Defined</h3>'
//			      }
//			  }
//		});
		
		
	},
	
	saveContentRule: function(event) {
		console.log("Save Content Rule");
		
		var id = $("#ref_id").val();
		var url = $("#ref_url").val();
		var desc = $("#ref_desc").val();
		var category = $("#ref_category").val();
		var lang = $("#ref_lang").val();
		var contentType = $("#ref_content_type").val();
		var contnt = $("#ref_content").val();
		var tags = $("#ref_tags").tagsinput('items');
		var type = $("#ref_type").val(); //"URL"
		var rel = $("#rel_ref").val();// -1
		
		var region = $("#apt_region").val();
		var level = $("#apt_level").val();
		var gender = $("#apt_gender").val();
		var age = $("#apt_age").val();
		
		
		if(id == '' || url == '' || tags == '') {
			alert("URL or ID cannot be blank");
		} else {
			var content = new ambient.predic.models.Content({
				ref_id: id,
				ref_desc: desc,
				ref_uri: url,
				ref_content: contnt,		
				ref_lang: lang,		
				ref_content_type: contentType,	
				ref_type: type,
				ref_category: category,
				rel_ref: rel,
			
				apt_gender: gender,
				apt_region: region,
				apt_level: level,
				apt_age: age,
			
				tags: tags
			});
		
			content.save();
			this.collection.clearAll();
			this.collection.fetch();
		}
		
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
		$("#ref_url").val($(event.target).data('refuri'));
		$("#ref_desc").val($(event.target).data('refdesc'));
		$('#ref_category').selectpicker('val', $(event.target).data('refcategory'));
		$('#ref_lang').selectpicker('val', $(event.target).data('reflang'));
		$('#ref_content').selectpicker('val', $(event.target).data('refcontent'));
		$('#ref_content_type').selectpicker('val', $(event.target).data('refcontenttype'));
		
		$('#apt_region').selectpicker('val', $(event.target).data('aptregion'));
		$('#apt_level').selectpicker('val', $(event.target).data('aptlevel'));
		$('#apt_gender').selectpicker('val', $(event.target).data('aptgender'));
				
		$("#ref_tags").tagsinput('removeAll');
		$("#ref_tags").tagsinput('add', $(event.target).data('tags'));
		
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
		$("#ref_url").val("");
		$("#ref_desc").val("");
		$('#ref_category').selectpicker('val', 'Tips');
		$('#ref_lang').selectpicker('val', 'English');
		$('#ref_content_type').selectpicker('val', 'video');
		$('#ref_content').selectpicker('val', 'Youtube');
		
		$('#apt_region').selectpicker('val', 'Global');
		$('#apt_level').selectpicker('val', 'Normal');
		$('#apt_gender').selectpicker('val', 'Any');
				
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

