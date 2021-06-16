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
			'/users/userinfo/',
			'?username=',
			username,
		);
		return fetch(userinfopg, {
			method: 'GET'
		}).then((res) => res.json());
	},
	logoutUser(token){
		var userlogout = beurl.concat(
			'/users/logout/',
			'?Token=',
			token
		);
		return fetch(userlogout, {
			method: 'GET'
		}).then((res) => res.json());
	},
	useravail(username){
		var useravail = beurl.concat(
			'/users/usernamecheck/',
			'?username=',
			username
		);
		return fetch(useravail, {
			method: 'GET'
		}).then((res) => res.json());
	},
	createUser(infolist){
		var userform = beurl.concat('/users/signup/');
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
		var deleteacc = beurl.concat('/users/delete_account/')
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
	makeQueue(username, name, desc, lati, longi){
		var makeQ = beurl.concat('/queues/business/create_queue/')
		var formsubmit = new FormData();
		formsubmit.append('username', username);
		formsubmit.append('name', name);
		formsubmit.append('desc', desc);
		formsubmit.append('lati', lati);
		formsubmit.append('longi', longi);
		return fetch(makeQ,	{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: formsubmit
		}).then((res) => res.json());
	},
	//makeQueue will be used to create a queue with data, responds with queue ID(not needed)
	listMadeQueues(username){
		var listMadeQ = beurl.concat('/queues/business/list_queue/')
		var fs = new FormData();
		fs.append('username', username);
		return fetch(listMadeQ, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//listMadeQueues will require you to submit a username, responds with a list of dictionaries with info about all queues you created
	getQueueInfo(queue_id){
		var furl = beurl.concat('/queues/business/my_queue/')
		var fs = new FormData();
		fs.append({'queue_id': queue_id});
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//getQueueInfo will require you to submit a queue id, responds with the queue info in a dictionary

};

module.exports = api;
