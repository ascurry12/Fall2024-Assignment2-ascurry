/*

API key 1: 9dd006c27d3f4e0fbcb7d48a7b567d13
endpoint url: https://api.bing.microsoft.com/v7.0/search?

*/

var background = true;
var search = false;
var lucky = false;

function searchButtonClick() {
    search = true;
    apiSearch(search, lucky);
    search = false;
}

function luckyButtonClick() {
    lucky = true;
    apiSearch(search, lucky);
    lucky = false;
}

function timeButtonClick() {
    const d = new Date;
    var formatted = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    var time = `<p><span class="ui-icon ui-icon-clock" style="float:left; margin:0 7px 50px 0;"></span>${formatted}</p>`;
    $('#time').html(time);
    $('#time').dialog({ height: 90 });
    $('#time').css('visibility', 'visible');
}

function theLostCity() {
    window.open("https://en.wikipedia.org/wiki/Atlantis:_The_Lost_Empire");
}

function changeBackground() {
    if (!background) {
        $("#searchBody").css("background-image", "url(\"./images/jellyfish.jpg\")");
    }
    else {
        $("#searchBody").css("background-image", "url(\"./images/underwater.jpg\")");
    }

    background = !background;
}

function apiSearch(search, lucky) {
    var params = {
        'q': $('#query').val(),
        'count': 10,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '9dd006c27d3f4e0fbcb7d48a7b567d13'
        }
    })
        .done(function (data) {
            if (search) {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a> <br> ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').css('visibility', 'visible');
            }

            if (lucky) {
                window.open(data.webPages.value[0].url);
            }

        })
        .fail(function () {
            alert('error');
        });
}

