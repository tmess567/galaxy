if (Meteor.isClient){
	Template.signupForm.events({
		'submit #signup-form':function(e,t) {
			// body...
			e.preventDefault();

			Accounts.createUser({
				username:t.find('#signup-username').value,
				password:t.find('#signup-password').value,
				email:t.find('#signup-email').value,
				profile:{
					fullname:t.find('#signup-name').value
				}	

			},function(err){
				if (error) {
					alert("Account is not created");
				}
			});
		}

});
			Template.logoutForm.events({
				'submit #logout-form':function(e,t){
					e.preventDefault();

					Meteor.logout(function(error){
						if(error)
						{
							alert("Unable to logout from the application");
						}
					})
				}
			});

			Template.loginForm.events({
				'submit #login-form':function(e,t){
					e.preventDefault();

					var unam=t.find("#login-username").value;
					var password=t.find("#login-password").value;

					Meteor.loginWithPassword(unam,password,function(error){
						if(error)
						{
							alert("Wrong Credentials!");
						}
					});
				}
	});

	Template.recovery.helpers({
		'resetPassword':function(){
			return false;
		}
	});

	Template.recovery.events({
		'submi t #recovery-form':function(e,t){
			e.preventDefault();
			var email=t.find('#recovery-email').value;
			Accounts.forgotPassword({email:email},function(error){
				if(error){
					alert("Unable to send Reset Link");
				}

				else
				{
					alert("password reset link sent");
				}
			})
		}
	})
}

if(Meteor.isServer){
	Meteor.startup(function() {
	  process.env.MAIL_URL = 'smtp://postmaster%40sandboxcee2816333bc4a748a9df7c6a4f251dc.mailgun.org:3afd01e9291a0e91cc454958bb2ec290@smtp.mailgun.org:587';	
	  Accounts.emailTemplates.from="Verification Link";

	   Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
	});
} 	