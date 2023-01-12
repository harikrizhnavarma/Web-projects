$(function(){

    let CoinTargetDiv = document.querySelector(".latest-trend");
    $.ajax({

        type: "GET",
        url: "http://127.0.0.1:5000/getcryptoinfo",
        dataType: "json",
        success: function(response) {
            for (i = 0; i< response.length; i++) {
                let tempDiv = `<div class="crypto-details">
                                <p>${response[i].name}</p><p>${response[i].market_cap}</p><p>${response[i].value}</p><p>${response[i].volume}</p>
                            </div>`;
                CoinTargetDiv.innerHTML += tempDiv;
            }
        }
    });

    let newsTargetDiv = document.querySelector(".latest-news")
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/getcryptonews",
        dataType: "json",
        success: function(response) {
            for (i=0; i<response.length; i++) {
                let tempDiv = `<a href="${response[i].url}" class="each-news" target= "_blank">
                                <h2 class="${response[i].title}">${response[i].title}</h2>
                                <p>${response[i].posted}</p>
                            </a>`
                newsTargetDiv.innerHTML += tempDiv;
            }
        }
    });

    $("#search-bar").keyup(function(e){
        var del = $("li")
        let searchbarDiv = $("#search-bar").val();
        let searchResults = $(".search-results");
        if (e.keyCode === 8) {
            del.remove()
            searchResults.addClass('hidden')

        } else {
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:5000/getcryptoinfo",
                dataType: "json",
                success: function(response) {
                    for (i=0;i<response.length;i++){
                        if (response[i].name.toLowerCase().includes(searchbarDiv.toLowerCase())){
                            del.remove()
                            searchResults.removeClass('hidden')
                            let tempDiv = `<li class="search-out">${response[i].name}</li>`;
                            searchResults.append(tempDiv);
                        };
                    }
                }
            });
        }
    })

    $(".search-out").onclick(function(){})
})