define([
    "jquery",
    "underscore",
    "moment",
    "tile",
    "text!../tiles/weather.html"
    ],
    function(
        $,
        _,
        moment,
        tileJs,
        tmpl
    ){
        var _stored,
            _prefs,
            _configs,
            _tmpl,
            _cObj,
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
                
                _cObjLoad();

                if (_stored["weather"] && _stored["weather"][index] && !oldData(_stored["weather"][index])) {
                    //there's old data that's still good
                    _tileStyler(_stored["weather"][index], index);
                    _changer();
                } else {
                    var url = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=a77b08a6d315fb4d974c16345ae1ba70";
                    if (_configs["weather"] && _configs["weather"][index] && _configs["weather"][index]["country"]) {
                        //the user has assigned values
                        if (_configs["weather"][index]["zipcode"]) {
                            url += "&zip=" + _configs["weather"][index]["zipcode"] + "," + _configs["weather"][index]["country"];
                        } else if (_configs["weather"][index]["city"]) {
                            url += "&q=" + _configs["weather"][index]["city"] + "," + _configs["weather"][index]["country"];
                        } else {
                            //lets go with malibu
                            url += "&zip=90210,us";
                        }
                        _apiCall(url, index);
                    } else if (_configs["weather"] && _configs["weather"][index] && _configs["weather"][index]["current"]) {
                        if (!_configs["weather"][index]["lat"] || !_configs["weather"][index]["lon"]) {
                            navigator.geolocation.getCurrentPosition(function(location) {
                                var lat = location.coords.latitude,
                                    long = location.coords.longitude;
                                url += "&lat="+lat+"&lon="+long;
                                _configs["weather"][index]["lat"] = lat;
                                _configs["weather"][index]["lon"] = long;
                                _dataStore({"configs": _configs});
                                _apiCall(url, index);
                            });
                        } else {
                            url += "&lat="+_configs["weather"][index]["lat"]+"&lon="+_configs["weather"][index]["lon"];
                            _apiCall(url, index);
                        }
                    } else {
                        //lets go with malibu
                        url += "&zip=90210,us";
                        _apiCall(url, index);
                    }
                }

                function oldData(dataWT) {
                    if (!dataWT.hasOwnProperty("time")) {
                        return true;
                    } else {
                        var now = moment(),
                            old = moment(dataWT["time"], "YYYY-MM-DD-HH-mm");
                        return (now.diff(old, "minutes") > 30);
                    }
                }
            },
            _changer = function changer() {
                $(".weather .back input.country").off("keyup").on("keyup", function(e) {
                    if ($(e.currentTarget).val().length != 0) {
                        var text = $(e.currentTarget).val();
                        _autoComplete($(e.currentTarget), text);
                    }
                });
                $(".weather .back .fa-location-arrow").on("click", _currentLocation);
            },
            _tileStyler = function _tileStyler(wData, index, errorData) {
                var tile = $(_tmpl);
                if (wData) {
                    //Load tile's top stuff
                    tile.find(".location").text(wData["name"]+", "+wData["sys"]["country"]);
                    tile.find(".conditions").text(wData["weather"][0]["description"]);
                    tile.find(".clouds").text("Cloud Cover: " + wData["clouds"]["all"] +"%");
                    var condSrc = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/";
                    condSrc += wData["weather"][0]["icon"] + ".png";
                    tile.find("img.condition").attr("src", condSrc);
                    //Load tile's bottom left
                    var fB = tile.find(".front .bottom");
                    fB.find(".temp").html(_tempConvert(wData["main"]["temp"]));
                    fB.find(".high").html(_tempConvert(wData["main"]["temp_max"])+"<br/>High");
                    fB.find(".low").html(_tempConvert(wData["main"]["temp_min"])+"<br/>Low");

                    if (_prefs["unit"] == "imperial"){
                        fB.find(".wind").text("Wind: " + (2.23694 * wData["wind"]["speed"]).toPrecision(2) +
                            "mph " + _windDir(wData["wind"]["deg"]));
                        fB.find(".visibility").text("Visibility: "+(wData["visibility"]*0.000621371).toPrecision(3) +"mi");
                        fB.find(".pressure").text("Pressure: "+(wData["main"]["pressure"]*0.02953).toPrecision(4) +"inHg");
                    } else {
                        fB.find(".wind").text("Wind: " + wData["wind"]["speed"].toPrecision(2) + "m/s " +
                            _windDir(wData["wind"]["deg"]));
                        fB.find(".visibility").text("Visibility: "+(wData["visibility"]/1000).toPrecision(3) +"km");
                        fB.find(".pressure").text("Pressure: "+ Math.round(wData["main"]["pressure"]) +"mb");
                    }
                    if (wData["rain"]) {
                        fB.find(".rain").text();
                    }
                    if (wData["snow"]) {
                        fB.find(".snow").text();
                    }
                    fB.find(".humidity").text("Humidity: "+wData["main"]["humidity"] +"%");

                    if (_prefs["dark"] == true) {
                        tile.find(".weather").addClass("dark");
                    }
                    // fB.find(".feel").html("Feels Like: " +
                        // realFeel(wData["main"]["temp"], wData["main"]["humidity"]));
                    tileJs.init(tile, index);
                } else {
                    tileJs.init(tile, index, errorData);
                }
                _remover(index);
            },
            _tempConvert = function _tempConvert(temp) {
                if (_prefs["unit"] == "imperial") {
                    //let's assume F bc i'm american
                    return (1.8 * (temp - 273) + 32).toPrecision(3) + " &#8457;";
                } else {
                    return (temp - 273.15).toPrecision(2) + " &#8451;";
                }
            },
            _windDir = function _windDir(dir) {
                dir = Math.round(dir/27.5);
                // there are 27.5 degrees separating each of the depth 3 direction
                var dirArr = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
                return dirArr[dir % dirArr.length];
            },
            _realFeel = function _realFeel(t, h) {
                // source https://en.wikipedia.org/wiki/Heat_index
                t = parseFloat(_tempConvert(t));
                if (_prefs["unit"] == "imperial") {
                    return ((-42.379+(2.04901523*t)+(10.1433127*h)+(-0.22475541*t*h) +
                        (-6.83783*Math.pow(10, -3)*t*t)+(-5.481717*Math.pow(10,-2)*h*h)+
                        (1.22874*Math.pow(10,-3)*t*t*h)+(8.5282*Math.pow(10,-4)*t*h*h)+
                        (-1.99*Math.pow(10,-6)*t*t*h*h)).toPrecision(3) + " &#8457;");
                }
            },
            _apiCall = function _apiCall(url, index) {
                $.ajax({
                    url: url,
                    type: "GET"
                }).done(function(wData) {
                    wData["time"] = moment().format("YYYY-MM-DD-HH-mm");
                    var newObj = {"weather": {}};
                    newObj["weather"][index] = wData;

                    if (!_stored["weather"]) {
                        _stored["weather"] = {};
                    }
                    _stored["weather"][index] = wData;

                    _dataStore({"weather": _stored["weather"]});
                    _tileStyler(wData, index);
                    _changer();
                }).fail(function() {
                    _tileStyler(undefined, index, _configs["weather"][index]);
                    _changer();
                });
            },
            _currentLocation = function _currentLocation(e) {
                var tile = $(e.currentTarget).parents(".tile"),
                    tileIndex = tile.data("index");

                tile.find("input").attr("disabled", "disabled");
                tile.find(".fa").off("click").css("cursor", "default");

                delete _stored["weather"][tileIndex];
                delete _stored["configs"]["weather"][tileIndex];
                delete _configs["weather"][tileIndex];
                _configs["weather"][tileIndex] = {"current": true};
                _init(tileIndex, _stored, _prefs, _configs);
            },
            _autoComplete = function _autoComplete(targ, text) {
                targ.parent().find(".options").remove();
                var rData = _.filter(_cObj, function(elem) {
                    return (elem["name"].toLowerCase().indexOf(text.toLowerCase()) != -1);
                });
                if (rData.length != 0) {
                    var dH = "<div class='options'>";
                    rData.forEach( function(element, index) {
                        dH += "<div class='option' data-code='"+element["code"]+"'>" + element["name"] + "</div>";
                    });
                    dH += "</div>";
                    targ.after(dH);

                    if (targ.parent().find(".zipcode").length != 0) {
                        targ.parent().find(".zipcode").prev().remove();
                        targ.parent().find(".zipcode").remove();
                    } else if (targ.parent().find(".city").length != 0) {
                        targ.parent().find(".city").prev().remove();
                        targ.parent().find(".city").remove();
                    }

                    targ.parent().find(".save").remove();

                    targ.parent().find(".options .option").on("click", function(e) {
                        var code = $(e.currentTarget).data("code"),
                            usH = '<div class="inpCountry"><div class="subtitle">Zipcode</div>\
                                    <input type="text" class="zipcode">\
                                    <button class="save" type="save">Save</button></div>',
                            oH = '<div class="inpCountry"><div class="subtitle city">City</div>\
                                    <input type="text" class="city">\
                                    <button class="save" type="save">Save</button></div>';
                        targ.val(code);
                        targ.parent().find(".options").remove();

                        code == "US" ? targ.parent().after(usH) : targ.parent().after(oH);

                        $(".weather .back button").off("click").on("click", newSaver);
                        $(".weather .back input.city, .weather .back input.zipcode").on("keypress", function(e) {
                            if (e.keyCode == 13 && $(e.currentTarget).val().length != 0) {
                                newSaver(e);
                                $(".weather .back input").off("keypress");
                            }
                        });
                    });
                }
                function newSaver(e) {
                    var parent = $(e.currentTarget).parents(".tile"), 
                        ind = parent.data("index"),
                        zip = parent.find("input.zipcode").val(),
                        city = parent.find("input.city").val(),
                        count = parent.find("input.country").val();

                    if ((zip != "" || city != "") && count != "") {
                        _configs["weather"][ind] = {};
                        zip ?
                            _configs["weather"][ind]["zipcode"] = zip :
                            _configs["weather"][ind]["city"] = city;

                        _configs["weather"][ind]["country"] = count;
                        _stored["weather"][ind] = {};
                        
                        _dataStore({"configs": _configs});
                        _init(ind, _stored, _prefs, _configs);
                    }
                }
            },
            _remover = function _remover(index) {
                var tile = $(".tile[data-index='"+index+"']"),
                    tileInd = tile.data("index");

                tile.find(".fa-trash-o").on("click", function() {
                    var i = tileInd;
                    
                    while (_stored["configs"]["weather"].hasOwnProperty(i+1)) {
                        _stored["configs"]["weather"][i] = _stored["configs"]["weather"][i+1];
                        _stored["weather"][i] = _stored["weather"][i+1];
                        i++;
                    }

                    delete _stored["weather"][i];
                    delete _stored["configs"]["weather"][i];
                    //need to delete the last one as the rest have shifted up

                    _stored["tiles"].splice(tileInd, 1);
                    //the array of the tile types
                    _dataStore(_stored);

                    $(tile).remove();
                });
            },
            _dataStore = function _dataStore(obj) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                });
            },
            _cObjLoad = function _cObjLoad() {
                _cObj = [ 
                    {"name": "Afghanistan", "code": "AF"}, {"name": "Albania", "code": "AL"}, 
                    {"name": "Algeria", "code": "DZ"}, {"name": "American Samoa", "code": "AS"}, 
                    {"name": "Andorra", "code": "AD"}, {"name": "Angola", "code": "AO"}, 
                    {"name": "Anguilla", "code": "AI"}, {"name": "Antigua and Barbuda", "code": "AG"}, 
                    {"name": "Argentina", "code": "AR"}, {"name": "Armenia", "code": "AM"}, 
                    {"name": "Aruba", "code": "AW"}, {"name": "Australia", "code": "AU"}, 
                    {"name": "Austria", "code": "AT"}, {"name": "Azerbaijan", "code": "AZ"}, 
                    {"name": "Bahamas", "code": "BS"}, {"name": "Bahrain", "code": "BH"}, 
                    {"name": "Bangladesh", "code": "BD"}, {"name": "Barbados", "code": "BB"}, 
                    {"name": "Belarus", "code": "BY"}, {"name": "Belgium", "code": "BE"}, 
                    {"name": "Belize", "code": "BZ"}, {"name": "Benin", "code": "BJ"}, 
                    {"name": "Bermuda", "code": "BM"}, {"name": "Bhutan", "code": "BT"}, 
                    {"name": "Bolivia", "code": "BO"}, {"name": "Bosnia and Herzegovina", "code": "BA"}, 
                    {"name": "Botswana", "code": "BW"}, {"name": "Bouvet Island", "code": "BV"}, 
                    {"name": "Brazil", "code": "BR"}, {"name": "British Indian Ocean Territory", "code": "IO"}, 
                    {"name": "Brunei Darussalam", "code": "BN"}, {"name": "Bulgaria", "code": "BG"}, 
                    {"name": "Burkina Faso", "code": "BF"}, {"name": "Burundi", "code": "BI"}, 
                    {"name": "Cambodia", "code": "KH"}, {"name": "Cameroon", "code": "CM"}, 
                    {"name": "Canada", "code": "CA"}, {"name": "Cape Verde", "code": "CV"}, 
                    {"name": "Cayman Islands", "code": "KY"}, {"name": "Central African Republic", "code": "CF"}, 
                    {"name": "Chad", "code": "TD"}, {"name": "Chile", "code": "CL"}, 
                    {"name": "China", "code": "CN"}, {"name": "Christmas Island", "code": "CX"}, 
                    {"name": "Cocos (Keeling) Islands", "code": "CC"}, {"name": "Colombia", "code": "CO"}, 
                    {"name": "Comoros", "code": "KM"}, {"name": "Congo", "code": "CG"}, 
                    {"name": "Congo, The Democratic Republic of the", "code": "CD"}, {"name": "Cook Islands", "code": "CK"}, 
                    {"name": "Costa Rica", "code": "CR"}, {"name": "Cote D\"Ivoire", "code": "CI"}, 
                    {"name": "Croatia", "code": "HR"}, {"name": "Cuba", "code": "CU"}, 
                    {"name": "Cyprus", "code": "CY"}, {"name": "Czech Republic", "code": "CZ"}, 
                    {"name": "Denmark", "code": "DK"}, {"name": "Djibouti", "code": "DJ"}, 
                    {"name": "Dominica", "code": "DM"}, {"name": "Dominican Republic", "code": "DO"}, 
                    {"name": "Ecuador", "code": "EC"}, {"name": "Egypt", "code": "EG"}, 
                    {"name": "El Salvador", "code": "SV"}, {"name": "Equatorial Guinea", "code": "GQ"}, 
                    {"name": "Eritrea", "code": "ER"}, {"name": "Estonia", "code": "EE"}, 
                    {"name": "Ethiopia", "code": "ET"}, {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
                    {"name": "Faroe Islands", "code": "FO"}, {"name": "Fiji", "code": "FJ"}, 
                    {"name": "Finland", "code": "FI"}, {"name": "France", "code": "FR"}, 
                    {"name": "French Guiana", "code": "GF"}, {"name": "French Polynesia", "code": "PF"}, 
                    {"name": "French Southern Territories", "code": "TF"}, {"name": "Gabon", "code": "GA"}, 
                    {"name": "Gambia", "code": "GM"}, {"name": "Georgia", "code": "GE"}, {"name": "Germany", "code": "DE"}, 
                    {"name": "Ghana", "code": "GH"}, {"name": "Gibraltar", "code": "GI"}, {"name": "Greece", "code": "GR"}, 
                    {"name": "Greenland", "code": "GL"}, {"name": "Grenada", "code": "GD"}, {"name": "Guadeloupe", "code": "GP"}, 
                    {"name": "Guam", "code": "GU"}, {"name": "Guatemala", "code": "GT"}, {"name": "Guernsey", "code": "GG"}, 
                    {"name": "Guinea", "code": "GN"}, {"name": "Guinea-Bissau", "code": "GW"}, {"name": "Guyana", "code": "GY"}, 
                    {"name": "Haiti", "code": "HT"}, {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
                    {"name": "Holy See (Vatican City State)", "code": "VA"}, {"name": "Honduras", "code": "HN"}, 
                    {"name": "Hong Kong", "code": "HK"}, {"name": "Hungary", "code": "HU"}, {"name": "Iceland", "code": "IS"}, 
                    {"name": "India", "code": "IN"}, {"name": "Indonesia", "code": "ID"}, 
                    {"name": "Iran, Islamic Republic Of", "code": "IR"}, {"name": "Iraq", "code": "IQ"}, 
                    {"name": "Ireland", "code": "IE"}, {"name": "Isle of Man", "code": "IM"}, 
                    {"name": "Israel", "code": "IL"}, {"name": "Italy", "code": "IT"}, {"name": "Jamaica", "code": "JM"},
                    {"name": "Japan", "code": "JP"}, {"name": "Jersey", "code": "JE"}, {"name": "Jordan", "code": "JO"}, 
                    {"name": "Kazakhstan", "code": "KZ"}, {"name": "Kenya", "code": "KE"}, {"name": "Kiribati", "code": "KI"}, 
                    {"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, {"name": "Korea, Republic of", "code": "KR"}, 
                    {"name": "Kuwait", "code": "KW"}, {"name": "Kyrgyzstan", "code": "KG"}, 
                    {"name": "Lao People\"S Democratic Republic", "code": "LA"}, {"name": "Latvia", "code": "LV"}, 
                    {"name": "Lebanon", "code": "LB"}, {"name": "Lesotho", "code": "LS"}, {"name": "Liberia", "code": "LR"}, 
                    {"name": "Libyan Arab Jamahiriya", "code": "LY"}, {"name": "Liechtenstein", "code": "LI"}, 
                    {"name": "Lithuania", "code": "LT"}, {"name": "Luxembourg", "code": "LU"}, {"name": "Macao", "code": "MO"}, 
                    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, {"name": "Madagascar", "code": "MG"}, 
                    {"name": "Malawi", "code": "MW"}, {"name": "Malaysia", "code": "MY"}, {"name": "Maldives", "code": "MV"}, 
                    {"name": "Mali", "code": "ML"}, {"name": "Malta", "code": "MT"}, {"name": "Marshall Islands", "code": "MH"}, 
                    {"name": "Martinique", "code": "MQ"}, {"name": "Mauritania", "code": "MR"}, {"name": "Mauritius", "code": "MU"}, 
                    {"name": "Mayotte", "code": "YT"}, {"name": "Mexico", "code": "MX"}, 
                    {"name": "Micronesia, Federated States of", "code": "FM"}, {"name": "Moldova, Republic of", "code": "MD"}, 
                    {"name": "Monaco", "code": "MC"}, {"name": "Mongolia", "code": "MN"}, {"name": "Montserrat", "code": "MS"}, 
                    {"name": "Morocco", "code": "MA"}, {"name": "Mozambique", "code": "MZ"}, {"name": "Myanmar", "code": "MM"}, 
                    {"name": "Namibia", "code": "NA"}, {"name": "Nauru", "code": "NR"}, {"name": "Nepal", "code": "NP"}, 
                    {"name": "Netherlands", "code": "NL"}, {"name": "Netherlands Antilles", "code": "AN"}, 
                    {"name": "New Caledonia", "code": "NC"}, {"name": "New Zealand", "code": "NZ"}, {"name": "Nicaragua", "code": "NI"}, 
                    {"name": "Niger", "code": "NE"}, {"name": "Nigeria", "code": "NG"}, {"name": "Niue", "code": "NU"}, 
                    {"name": "Norfolk Island", "code": "NF"}, {"name": "Northern Mariana Islands", "code": "MP"}, 
                    {"name": "Norway", "code": "NO"}, {"name": "Oman", "code": "OM"}, 
                    {"name": "Pakistan", "code": "PK"}, {"name": "Palau", "code": "PW"}, 
                    {"name": "Palestinian Territory, Occupied", "code": "PS"}, {"name": "Panama", "code": "PA"}, 
                    {"name": "Papua New Guinea", "code": "PG"}, {"name": "Paraguay", "code": "PY"}, {"name": "Peru", "code": "PE"}, 
                    {"name": "Philippines", "code": "PH"}, {"name": "Pitcairn", "code": "PN"}, {"name": "Poland", "code": "PL"}, 
                    {"name": "Portugal", "code": "PT"}, {"name": "Puerto Rico", "code": "PR"}, {"name": "Qatar", "code": "QA"}, 
                    {"name": "Reunion", "code": "RE"}, {"name": "Romania", "code": "RO"}, {"name": "Russian Federation", "code": "RU"}, 
                    {"name": "Rwanda", "code": "RW"}, {"name": "Saint Helena", "code": "SH"}, {"name": "Saint Kitts and Nevis", "code": "KN"}, 
                    {"name": "Saint Lucia", "code": "LC"}, {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
                    {"name": "Saint Vincent and the Grenadines", "code": "VC"}, {"name": "Samoa", "code": "WS"}, 
                    {"name": "San Marino", "code": "SM"}, {"name": "Sao Tome and Principe", "code": "ST"}, 
                    {"name": "Saudi Arabia", "code": "SA"}, {"name": "Senegal", "code": "SN"}, {"name": "Serbia and Montenegro", "code": "CS"}, 
                    {"name": "Seychelles", "code": "SC"}, {"name": "Sierra Leone", "code": "SL"}, {"name": "Singapore", "code": "SG"}, 
                    {"name": "Slovakia", "code": "SK"}, {"name": "Slovenia", "code": "SI"}, {"name": "Solomon Islands", "code": "SB"}, 
                    {"name": "Somalia", "code": "SO"}, {"name": "South Africa", "code": "ZA"}, 
                    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, {"name": "Spain", "code": "ES"}, 
                    {"name": "Sri Lanka", "code": "LK"}, {"name": "Sudan", "code": "SD"}, {"name": "Suri", "code": "SR"}, 
                    {"name": "Svalbard and Jan Mayen", "code": "SJ"}, {"name": "Swaziland", "code": "SZ"}, 
                    {"name": "Sweden", "code": "SE"}, {"name": "Switzerland", "code": "CH"}, {"name": "Syrian Arab Republic", "code": "SY"}, 
                    {"name": "Taiwan, Province of China", "code": "TW"}, {"name": "Tajikistan", "code": "TJ"}, 
                    {"name": "Tanzania, United Republic of", "code": "TZ"}, {"name": "Thailand", "code": "TH"}, 
                    {"name": "Timor-Leste", "code": "TL"}, {"name": "Togo", "code": "TG"}, {"name": "Tokelau", "code": "TK"}, 
                    {"name": "Tonga", "code": "TO"}, {"name": "Trinidad and Tobago", "code": "TT"}, {"name": "Tunisia", "code": "TN"}, 
                    {"name": "Turkey", "code": "TR"}, {"name": "Turkmenistan", "code": "TM"}, {"name": "Turks and Caicos Islands", "code": "TC"}, 
                    {"name": "Tuvalu", "code": "TV"}, {"name": "Uganda", "code": "UG"}, {"name": "Ukraine", "code": "UA"}, 
                    {"name": "United Arab Emirates", "code": "AE"}, {"name": "United Kingdom", "code": "GB"}, 
                    {"name": "United States", "code": "US"}, {"name": "United States Minor Outlying Islands", "code": "UM"}, 
                    {"name": "Uruguay", "code": "UY"}, {"name": "Uzbekistan", "code": "UZ"}, {"name": "Vanuatu", "code": "VU"}, 
                    {"name": "Venezuela", "code": "VE"}, {"name": "Viet Nam", "code": "VN"}, {"name": "Virgin Islands, British", "code": "VG"}, 
                    {"name": "Virgin Islands, U.S.", "code": "VI"}, {"name": "Wallis and Futuna", "code": "WF"}, 
                    {"name": "Western Sahara", "code": "EH"}, {"name": "Yemen", "code": "YE"}, 
                    {"name": "Zambia", "code": "ZM"}, {"name": "Zimbabwe", "code": "ZW"} 
                ];
            };

        return {
            init: _init
        };
});