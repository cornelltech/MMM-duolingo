/* global Module */

/* Magic Mirror
 * Module: Duolingo
 *
 * By Adrian Vatchinsky
 * MIT Licensed.
 */


Module.register("duolingo",{

	// Default module config.
	defaults: {
		username: "",
        duolingoUserUri: "http://www.duolingo.com/users/",
	},

    getStyles: function() {
        return [
            'c3/c3.css',
            'duolingo.css',
        ]
    },

    getScripts: function() {
        return [
            'q/q.js',
            'https://d3js.org/d3.v3.js',
            'c3/c3.js',
        ]
    },
 
    start: function() {
        Log.log(this.name + ' started!');

        Log.log('Look at me!');

        // this.fetchProfile('whothat')
        //     .then(function(profile){
        //         console.log("update");
        //         console.log(profile);
        //         self.updateDom();
        //     })
        //     .catch(function(e){
        //         console.log(e);
        //     });
    },

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.username;
		return wrapper;
	},

    // Helpers
    fetchProfile(username){
        console.log('-- fetchProfile()');
        var deferred = Q.defer();

        if(!username){ deferred.reject(); }
        else{
            fetch( this.duolingoUserUri + username)
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
    
});