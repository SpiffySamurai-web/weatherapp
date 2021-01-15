// Navbar
let weatherlist = document.getElementById("weatherlist");
let navService = {
    navItems: document.getElementsByClassName("nav-item"),
    navSearch: document.getElementById("citySearchInput"),
    searchBtn: document.getElementById("citySearchBtn"),
    pages: document.getElementById("pages").children,
    activateItem: function(item){
        for (let navItem of this.navItems) {
            navItem.classList.remove("active");
        }
        item.classList.add("active");
    },
    showPage: function(page){
        for (let pageElement of this.pages) {
            pageElement.style.display = "none";
        }
        page.style.display = "block";
    }, 
    registerNavListeners: function(){
        for(let i = 0; i < this.navItems.length; i++){
            this.navItems[i].addEventListener("click", function(){
                navService.activateItem(this);
                navService.showPage(navService.pages[i]);
            })
        }
        this.searchBtn.addEventListener("click", function(e){
            weatherlist.innerHTML = ""
            e.preventDefault();
            weatherService.city = navService.navSearch.value;
            console.log(weatherService.city)
            weatherService.getData();            
        })
        
    }
}
// Navbar

let avgTempDisplay = document.getElementById("average-temp")

let weatherService = {
    apiKey: "025bfaaf5e5a20e0ead9087d88282bec",
    city: "none",
    apiUrl: "https://api.openweathermap.org/data/2.5/forecast",
    getData: function(){
        $.ajax({
            url: `${this.apiUrl}?q=${this.city}&units=metric&APPID=${this.apiKey}`,
            success: function (response) {
                console.log('The request succeeded!');
                console.log(response);
                getMaxStatistics(response);
                weatherlistdisplay(response)                
            }, 
            error: function(response){
                console.log('The request failed!');
                console.log(response.responseText);
            }
        });
    }
}

function getMaxStatistics(response){
    let maxTemp = response.list.reduce((result, measurement) => {
        if(measurement.main.temp > result){
            result = measurement.main.temp;
            return result;
        } 
        return result;
    }, -Infinity)
    console.log(`The MAX is ${maxTemp}`);
}

function weatherlistdisplay(response){
    console.log(response)
    let hours = response.list;
    
    
    for (let hour  of hours) {
        //  let hours = response.list;

        weatherlist.innerHTML +=
       `      
            <div class = "row">

            <div class="col-md-2"><img src="http://openweathermap.org/img/w/${hour.weather[0].icon}.png"</img></div>
            <div class="col-md-2"><h4>${hour.weather[0].description}</h4></div>
            <div class="col-md-2"><h4>${hour.dt_txt}</h4></div>
            <div class="col-md-2"><h4>${hour.main.temp}</h4></div>
            <div class="col-md-2"><h4>${hour.main.humidity}</h4></div>
            <div class="col-md-2"><h4>${hour.wind.speed}</h4></div> 

            </div>       
        `
    }
}



navService.registerNavListeners();
