var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
var KEY = 'AIzaSyA3IHL73MF00WFjgxdwzg57nI1CwW4dybQ';
var USERSEARCHTERM = '';

function getDataFromApi(searchTerm, callback) {
	var query = {
		part: 'snippet',
		key: KEY,
		maxResults: 6,
		type: 'video',
		q: searchTerm
	}
	$.getJSON(YOUTUBE_URL, query, callback);
}




var thisIsDefNotTheRightWayToDoThisButJustAHint; 
var loadNext = setInterval(function(){
	var fakeQuery = {
		part: 'snippet',
		key: KEY,
		maxResults: 6,
		type: 'video',
		q: 'dog',
		pageToken:thisIsDefNotTheRightWayToDoThisButJustAHint,
	}


	console.log($.getJSON(YOUTUBE_URL, fakeQuery, displayYoutubeSearchData))
},3000)



alert('lets look up dogs. press space to stop ');
$(document).keyup(function(evt) {
	if (evt.keyCode == 32) {
		clearInterval(loadNext)
		alert('sit puppy!');
	
	}
})



function getNextPageData(searchTerm, nextPage, callback) {
	var query = {
		part: 'snippet',
		key: KEY,
		maxResults: 6,
		nextPageToken: nextPage,
		type: 'video',
		q: searchTerm
	}
	$.getJSON(YOUTUBE_URL, query, callback);
}

function displayYoutubeSearchData(data) {
	console.log(data);
	var resultsHTML = '<div class="row">';
	data.items.forEach(function (item) {
		resultsHTML = (resultsHTML + '<div class="search-item col s12 m6"><div class="card small hoverable">' +
			'<div class="card-image">' +
			'<iframe src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>' +
			'</div>' +
			'<div class="card-content">' +
			'<p class="truncate">' + item.snippet.title + '</p>' +
			'</div>' +
			'<div class="card-action">' +
			'<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">View more from '+ item.snippet.channelTitle + '</a>' +
			'</div>' + 
			'</div></div>')
	});

	resultsHTML = resultsHTML + '</div>';

	$('.search-results').html(resultsHTML);
	
	console.log(data.nextPageToken);
	$('.next-page').removeClass('hidden');
	$('.next-page').click(function(e) {
		e.preventDefault();
		getNextPageData(USERSEARCHTERM, data.nextPageToken, displayYoutubeSearchData);
	});
	thisIsDefNotTheRightWayToDoThisButJustAHint = data.nextPageToken;
}

function watchSubmit() {
	$('form[name="user-search"]').submit(function(e) {
		e.preventDefault();
		USERSEARCHTERM = $(this).find('.user-search-input').val();
		getDataFromApi(USERSEARCHTERM, displayYoutubeSearchData); 
	});
}

$(document).ready(function () {
	watchSubmit();
})
