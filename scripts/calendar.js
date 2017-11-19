define([
    "jquery",
    "underscore",
    "moment",
    "tile",
    "text!../tiles/calendar.html",
    "calendarCall"
    ],
    function(
        $,
        _,
        moment,
        tileJs,
        tmpl,
        calCall
    ){
        var _stored,
            _prefs,
            _configs,
            _tmpl,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init(index, stored, prefs, configs) {
                _stored = stored;
                _prefs = prefs;
                _configs = configs;
                _tmpl = tmpl;


                if (!_stored["calendar"]) {
                    _stored["calendar"] = {"index": {}};
                }

                _tileStyler(_stored["calendar"][index]);

                _client();

            },
            _tileStyler = function _tileStyler(wData, index) {
                var tile = $(_tmpl),
                    tF = tile.find(".top .front");
                if (_configs && _configs["calendar"]) {

                }
                tileJs(tile, index);
            },
            _client = function _client() {
                // Client ID and API key from the Developer Console
                var CLIENT_ID = '382168100457-j538h3lcvrhn350gc1hl7vjfp52k8fr8.apps.googleusercontent.com';
                var API_KEY = '1Bmgk1-66_62jNxtC28x6GKJ';

                // Array of API discovery doc URLs for APIs used by the quickstart
                var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

                // Authorization scopes required by the API; multiple scopes can be
                // included, separated by spaces.
                var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

                var authorizeButton = document.getElementById('authorize-button');
                var signoutButton = document.getElementById('signout-button');

                handleClientLoad();

                /**
                 *  On load, called to load the auth2 library and API client library.
                 */

                  /**
                   *  Initializes the API client library and sets up sign-in state
                   *  listeners.
                   */
                function initClient() {
                    gapi.client.init({
                        apiKey: API_KEY,
                        clientId: CLIENT_ID,
                        discoveryDocs: DISCOVERY_DOCS,
                        scope: SCOPES
                    }).then(function () {
                        // Listen for sign-in state changes.
                        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                        // Handle the initial sign-in state.
                        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                        authorizeButton.onclick = handleAuthClick;
                        signoutButton.onclick = handleSignoutClick;
                    });
                }

                /**
                 *  Called when the signed in status changes, to update the UI
                 *  appropriately. After a sign-in, the API is called.
                 */
                function updateSigninStatus(isSignedIn) {
                    if (isSignedIn) {
                        authorizeButton.style.display = 'none';
                        signoutButton.style.display = 'block';
                        listUpcomingEvents();
                    } else {
                        authorizeButton.style.display = 'block';
                        signoutButton.style.display = 'none';
                    }
                }

                function handleClientLoad() {
                    gapi.load('client:auth2', initClient);
                }

                  /**
                   *  Sign in the user upon button click.
                   */
                function handleAuthClick(event) {
                    gapi.auth2.getAuthInstance().signIn();
                }

                  /**
                   *  Sign out the user upon button click.
                   */
                function handleSignoutClick(event) {
                    gapi.auth2.getAuthInstance().signOut();
                }

                /**
                 * Append a pre element to the body containing the given message
                 * as its text node. Used to display the results of the API call.
                 *
                 * @param {string} message Text to be placed in pre element.
                 */
                function appendPre(message) {
                    var pre = document.getElementById('content');
                    var textContent = document.createTextNode(message + '\n');
                    pre.appendChild(textContent);
                }

                /**
                 * Print the summary and start datetime/date of the next ten events in
                 * the authorized user's calendar. If no events are found an
                 * appropriate message is printed.
                 */
                function listUpcomingEvents() {
                    gapi.client.calendar.events.list({
                        'calendarId': 'primary',
                        'timeMin': (new Date()).toISOString(),
                        'showDeleted': false,
                        'singleEvents': true,
                        'maxResults': 10,
                        'orderBy': 'startTime'
                    }).then(function(response) {
                        var events = response.result.items;
                        appendPre('Upcoming events:');

                        if (events.length > 0) {
                            for (i = 0; i < events.length; i++) {
                                var event = events[i];
                                var when = event.start.dateTime;
                                if (!when) {
                                    when = event.start.date;
                                }
                                appendPre(event.summary + ' (' + when + ')')
                            }
                        } else {
                            appendPre('No upcoming events found.');
                        }
                    });
                }
            },
            _dataStore = function _dataStore(obj, index) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                    console.log("STORED: "+obj+" and "+index);
                });
            };

    return {
        init: _init
    }
});