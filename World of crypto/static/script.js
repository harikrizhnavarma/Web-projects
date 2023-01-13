$(function(){

    getCryptoNews()
    getCryptoMines()
    searchCryptoInfo()
    getCryptoInfo()
    setInterval(function(){
        getCryptoInfo()
    },60000);

    function getCryptoInfo() {
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
        setInterval(function(){
            let crypDet = $('.crypto-details')
            crypDet.remove()
        }, 60000)
    }

    function getCryptoNews(){
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
    }

    function getCryptoMines(){
        let mineDiv = document.querySelector(".mining-info-inps");
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/getcryptomines",
            dataType: "json",
            success: function(response){
                console.log(response)
                for (i=0; i<response.length; i++) {
                    let tempDiv = `<a href="${response[i].url}" class="info-sections" target="_blank">
                                        <div><img src ="${response[i].img}" alt= "#" class="mine-image"></div>
                                        <div>
                                            <h2>${response[i].title}</h2>
                                            <p>${response[i].price}</p>
                                        </div>
                                    </a>`
                    mineDiv.innerHTML += tempDiv;
                };
            }
        });
    }

    function searchCryptoInfo(){
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
                                searchResults.removeClass('hidden')
                                let tempDiv = `<li class="search-out">${response[i].name}</li>`;
                                del.remove()
                                searchResults.append(tempDiv);
                            };
                        }
                    }
                });
            }
            $('body').on('click',function(){
                del.remove()
                searchResults.addClass('hidden')
            })
        });
    }
});