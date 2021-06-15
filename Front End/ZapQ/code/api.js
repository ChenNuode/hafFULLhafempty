var beurl = 'http://10.0.2.2:8000'

var api = {
	getLogin(username, password){
		var loginpg = beurl.concat('/users/login/');
		return fetch(loginpg, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then((res) => res.json());
	},
	getUserInfo(username){
		var userinfopg = beurl.concat(
			'/user/userinfo/',
			'?username=',
			username,
		);
		return fetch(userinfopg, {
			method: 'GET'
		}).then((res) => res.json());
	},
	logoutUser(token){
		var userlogout = beurl.concat(
			'/user/logout/',
			'?Token=',
			token
		);
		return fetch(userlogout, {
			method: 'GET'
		}).then((res) => res.json());
	},
	useravail(username){
		var useravail = beurl.concat(
			'/user/usernamecheck/',
			'?username=',
			username
		);
		return fetch(useravail, {
			method: 'GET'
		}).then((res) => res.json());
	},
	createUser(infolist){
		var userform = beurl.concat('/user/signup/');
		return fetch(userform, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(infolist)
		}).then((res) => res.json());
	},
	deleteUser(username, token, password){
		var deleteacc = beurl.concat('/user/delete_account/')
		var formsubmit = new FormData();
		formsubmit.append('username', username);
		formsubmit.append('password', password);
		formsubmit.append('Token', token);
		return fetch(deleteacc, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: formsubmit
		}).then((res) => res.json());
	},
};

module.exports = api;
