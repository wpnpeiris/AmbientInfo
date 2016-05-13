
function loginWithGoogle() {
	var myParams = {
		'clientid' : '828354648034-u1t6skdn9et6ursvckqn6aktanc8a519.apps.googleusercontent.com',
		'cookiepolicy' : 'single_host_origin',
		'callback' : 'loginCallback',
		'approvalprompt' : 'force',
		'scope' : 'profile email'
		//'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
	};
	gapi.auth.signIn(myParams);
}

function loginCallback(result) {
	if (result['status']['signed_in']) {
		var request = gapi.client.plus.people.get({
			'userId' : 'me'
		});
		request.execute(function(resp) {
					
			console.log('gender: ' + resp.gender);
			console.log('displayName: ' + resp.displayName); 
			console.log('language: ' + resp.language);
			console.log('language: ' + resp.language);
			console.log('image : ' + resp.image.url);

			var primaryEmail = ''; 
			for ( var i = 0; i < resp.emails.length; i++) { 
				if (resp.emails[i].type === 'account') {
					primaryEmail = resp.emails[i].value; 
				}
			}
			console.log('primaryEmail: ' + primaryEmail);
			

			var form = $('<form action="index.html" method="get">' +
							'<input type="text" name="displayName" value="' + resp.displayName + '" />' +
							'<input type="text" name="primaryEmail" value="' + primaryEmail + '" />' +
							'<input type="text" name="language" value="' + resp.language + '" />' +
							'<input type="text" name="gender" value="' + resp.gender + '" />' +
							'<input type="text" name="image" value="' + resp.image.url + '" />' +
			  			'</form>');
			$('body').append(form);
			form.submit();
			
			
		});

	}

}