//var beurl = 'http://10.0.2.2:8000'
var beurl = 'http://projectunplug.co:8000'

var api = {
	beurl(){
		return(beurl)
	},
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
	makeQueue(username, name, desc, lati, longi, image){
		var makeQ = beurl.concat('/queues/business/create_queue/')
		var formsubmit = new FormData();
		formsubmit.append('username', username);
		formsubmit.append('name', name);
		formsubmit.append('desc', desc);
		formsubmit.append('lati', lati);
		formsubmit.append('longi', longi);
		formsubmit.append('file', image);
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
		fs.append('queue_id', queue_id);
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
	advanceQueue(queue_id){
		var furl = beurl.concat('/queues/business/advance_queue/')
		var fs = new FormData();
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//advanceQueue will require you to submit a queue id, responds with next user
	endQueue(queue_id){
		var furl = beurl.concat('/queues/business/end_queue/')
		var fs = new FormData();
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//endQueue will require queue id, ends the queue, no important response
	userJoinQueue(username, queue_id){
		var furl = beurl.concat('/queues/user/join_queue/')
		var fs = new FormData();
		fs.append('username', username);
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//no critical response info
	userLeaveQueue(username, queue_id){
		var furl = beurl.concat('/queues/user/leave_queue/')
		var fs = new FormData();
		fs.append('username', username);
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//no critical response info
	nearbyQueues(lati, longi){
		var furl = beurl.concat('/queues/user/get_nearby_queues/')
		var fs = new FormData();
		fs.append('lati', lati);
		fs.append('longi', longi);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//submit coords of where u are and receive list of queue info(name, lati, longi, queue_id)
	userQueuedInfo(username){
		var furl = beurl.concat('/queues/user/get_queue/')
		var fs = new FormData();
		fs.append('username', username);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	//submit username, receive list of all queue info of the queues user is in
	userQueueInfo(username, queue_id){
		var furl = beurl.concat('/queues/user/get_queue_info/')
		var fs = new FormData();
		fs.append('username', username);
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	userQueueDetails(username, queue_id){
		var furl = beurl.concat('/queues/user/get_queue_details/')
		var fs = new FormData();
		fs.append('username', username);
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	pushbackQueue(username, queue_id){
		var furl = beurl.concat('/queues/user/pushback_queue/')
		var fs = new FormData();
		fs.append('username', username);
		fs.append('queue_id', queue_id);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	},
	searchQueue(searchterm){
		var furl = beurl.concat('/queues/user/search_queue/')
		var fs = new FormData();
		fs.append('search_terms', searchterm);
		return fetch(furl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: fs
		}).then((res) => res.json());
	}
};

module.exports = api;
