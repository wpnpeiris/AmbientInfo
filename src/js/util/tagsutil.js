ambient.predic.util = ambient.predic.util || {};

ambient.predic.util.encodeTags = function(v) {
	var tagList = v.tags;
	var encodedTags;
	if(tagList) {
		encodedTags = encodeURIComponent(JSON.stringify(tagList));
	} else {
		encodedTags = v;
	}
	return encodedTags;
};