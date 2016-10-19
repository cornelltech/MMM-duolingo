function DuolingoService(){
    var profile;

    function getProfile(username){
        console.log('-- DuolingoService.getProfile()');

        var deferred = Q.defer();

        if(!username){ deferred.reject(); }
        else{
            if(profile){ deferred.resolve(profile); }
            else{
                fetchProfile(username)
                    .then(function(){
                        deferred.resolve(profile);
                    })
                    .catch(function(e){
                        deferred.reject(e);
                    });
            }
        }
        
        return deferred.promise;
    }

    function fetchProfile(username){
        console.log('-- DuolingoService.fetchProfile()');
        var deferred = Q.defer();

        if(!username){ deferred.reject(); }
        else{
            fetch('http://www.duolingo.com/users/' + username)
                .then(function(response) {
                    response.json().then(function(r){
                        profile = r;
                        deferred.resolve();
                    });
                })
                .catch(function(e){
                    deferred.reject(e);
                });
        }

        

        return deferred.promise;
    }

    return{
        getProfile: getProfile,
    }

}

function Chart(){
    function generateChartContainer(){
        var container = document.querySelector( ".container" );
        var node = document.createElement("div");
        node.className += "language-prog-container";
        container.appendChild(node);  
    }

    function generateLanguageDonut(language){
        // setup dom
        var container = document.querySelector( ".language-prog-container" );
        if(!container){
            generateChartContainer();
            container = document.querySelector( ".language-prog-container" );
        }
        
        var chartContainerId = 'lang-' + language.languageKey;
        var node = document.createElement("div");
        node.setAttribute("id", chartContainerId);
        container.appendChild(node);
        
        // generate chart
        var chart = c3.generate({
            bindto: '#' + chartContainerId,
            data: {
                columns: language.dataColumns,
                type : 'donut'
            },
            donut: {
                title: language.title
            }
        });

    }
    
    return {
        generateLanguageDonut: generateLanguageDonut,
    }

}


window.onload = function(){
    console.log("window.onload");

    var d = new DuolingoService()
    d.getProfile('whothat')
        .then(function(profile){
            console.log(profile)
            // we have our data, so now lets generate a chart for the languages
            var c = new Chart();

            for(var lang in profile.language_data){
                var languageData = profile.language_data[lang];

                var title = languageData.language_string;
                var dataColumns = [
                    ['Complete', languageData.level],
                    ['Remaining', languageData.level_left]
                ];

                c.generateLanguageDonut({
                    languageKey: lang,
                    title: title,
                    dataColumns : dataColumns,
                });

            }

        });

};

/*
    stuff i care about
        : username
        : language_data
            : fr 
                : fluency_score
                : language_strength
                : language_string
                : level
                : level_left
                : level_percent
                : level_percent
                : level_progress
                : next_lesson
                    : lesson_number
                    : skill_title
        : num_followers
        : num_following
        : rupees
*/
