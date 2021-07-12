(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"+FjN":function(e,t,a){"use strict";var n=a("QbLZ"),r=a.n(n),l=a("jo6Y"),i=a.n(l),s=a("cDcd"),c=a.n(s),o=a("17x9"),u=a.n(o),m=a("MGin"),d=a("YZNL"),p=a("OEX3");a("CTui");function h(e){var t=e.cardTitle,a=e.title,n=e.detail,l=e.buttonText,s=e.buttonClass,o=e.primaryCard,u=e.link,h=i()(e,["cardTitle","title","detail","buttonText","buttonClass","primaryCard","link"]);return c.a.createElement(m.Link,r()({className:"base-card",to:u},h),c.a.createElement(d.a,{layer:o?3:2,active:!0,title:t},c.a.createElement("h3",{className:"base-card-title",title:a},a),c.a.createElement("div",{className:"base-card-detail text-content"},n),l&&c.a.createElement(p.b,{className:s},l)))}h.propTypes={cardTitle:u.a.string,title:u.a.oneOfType([u.a.string,u.a.element]).isRequired,detail:u.a.oneOfType([u.a.string,u.a.element]).isRequired,buttonText:u.a.string,buttonClass:u.a.string,primaryCard:u.a.bool,link:u.a.string},h.defaultProps={buttonClass:"ui-btn-line-primary",primaryCard:!1},t.a=h},"1zwt":function(e,t,a){"use strict";a.r(t),a.d(t,"makePlaylistChallengesProps",function(){return k}),a.d(t,"mapDispatchToProps",function(){return E});var n=a("/MKj"),r=a("fvjX"),l=a("peh1"),i=a("J2m7"),s=a.n(i),c=a("Wt1U"),o=a.n(c),u=a("alL8"),m=a("p7rj"),d=a("eOGF"),p=a("MHAo"),h=a("0SFc"),g=a("WkQb"),f=a("lRgy"),v=a("7Gqb"),b=function(e){return e.community.profile},y=Object(l.createSelector)([function(e,t){return t.appUtil.location}],function(e){return Object(d.s)(e).filters}),k=function(){return Object(l.createSelector)([b,v.c,h.f,y],function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},r=t.challenges.map(function(e){return a[e]}),l=Object(v.e)(r,n),i=s()(l,function(e){return!e.solved});return{profile:e,firstUnsolvedChallenge:i,challenges:o()(l,i),filters:n,totalChallenges:l.length,listType:p.a.PLAYLIST,currentPlaylist:t}})},E=function(e){return{challengeActions:Object(r.b)(g.a,e)}};t.default=Object(r.d)(m.a,u.b,Object(n.b)(k(),E))(f.a)},"2qh1":function(e,t,a){"use strict";a.r(t);var n=a("cDcd"),r=a.n(n),l=a("17x9"),i=a.n(l);a("7X7v");var s=function(){return r.a.createElement("section",{className:"interview-info-banner",role:"banner"},r.a.createElement("div",{className:"container d-flex justify-content-between banner-wrapper"},r.a.createElement("div",{className:"banner-block"},r.a.createElement("h2",{className:"banner-heading"},"Learnings from 1000+ Companies"),r.a.createElement("p",{className:"banner-text"},"We have carefully curated these challenges to help you prepare in the most comprehensive way possible.")),r.a.createElement("div",{className:"banner-block"},r.a.createElement("h2",{className:"banner-heading"},"Key Concepts"),r.a.createElement("p",{className:"banner-text"},"Challenges are organised around core concepts commonly tested during Interviews.")),r.a.createElement("div",{className:"banner-block"},r.a.createElement("h2",{className:"banner-heading"},"How to prepare"),r.a.createElement("p",{className:"banner-text"},"Try to solve as many challenges from this list as possible.",r.a.createElement("br",null),"If you are stuck, use the Discussion and Editorial sections for hints and solutions."))))},c=a("f6by"),o=a("yerp");a("6gnb");function u(e){var t=e.playlistSlug;return r.a.createElement(n.Fragment,null,r.a.createElement(s,null),r.a.createElement(c.default,{playlistSlug:t}),r.a.createElement(o.a,{featureId:3,align:"left",className:"feature-feedback-bottom-right-fixed",popoverClassName:"popover-bottom-right-fixed",coordinate:{right:"73px",bottom:"10px"},theme:"theme-m"}))}u.propTypes={playlistSlug:i.a.string};t.default=u},"6gnb":function(e,t,a){},"7X7v":function(e,t,a){},B7ER:function(e,t,a){},CTui:function(e,t,a){},"L+7j":function(e,t,a){"use strict";var n=a("Yz+Y"),r=a.n(n),l=a("iCc5"),i=a.n(l),s=a("V7oC"),c=a.n(s),o=a("FYw3"),u=a.n(o),m=a("mRg0"),d=a.n(m),p=a("cDcd"),h=a.n(p),g=a("17x9"),f=a.n(g),v=a("/MKj"),b=a("MGin"),y=a("TSYQ"),k=a.n(y),E=a("alL8"),C=a("p7rj"),N=a("o14C"),T=a("tVtT"),w=(a("l3J6"),function(e){function t(){return i()(this,t),u()(this,(t.__proto__||r()(t)).apply(this,arguments))}return d()(t,e),c()(t,[{key:"renderMultiDomainTabs",value:function(){var e=this.props,t=e.badgeTracks,a=e.appUtil,n=e.badgeType;if(t&&t.length>1)return h.a.createElement("ul",{className:"multi-domain-tabs"},t.map(function(e){var t=e.trackSlug,r=e.trackName,l="/domains/"+t;return h.a.createElement("li",{key:t,className:"domain-tab"},h.a.createElement(b.Link,{to:l,"data-analytics":"MultiDomainTabLink","data-attr1":t,"data-attr2":n,className:k()("track-link",{active:a.isRouteActive(l)})},r))}))}},{key:"render",value:function(){var e=this.props,t=e.track,a=e.abTest.isBadgeVariant();return h.a.createElement("header",{className:"challenge-list-header clearfix"},a?this.renderMultiDomainTabs():h.a.createElement("h3",{className:"track-label"},t.name),!a&&h.a.createElement("div",{className:"social-share-wrap"},h.a.createElement(T.a,{slug:t.slug,name:t.name,page:"domain"})))}}]),t}(p.PureComponent));w.propTypes={track:f.a.object.isRequired,abTest:f.a.object.isRequired,appUtil:f.a.object.isRequired,badgeTracks:f.a.array,badgeType:f.a.string};w=Object(v.b)(function(e,t){var a=t.appUtil.params,n=a.trackSlug,r=a.chapterSlug,l=e.community,i=l.badges,s=l.domains,c=Object(N.h)({trackSlug:n,chapterSlug:r},i.trackChapterBadgeMapping),o=i.badge[c];return!o||o&&"HackerBadge::MultiDomain"!==o.badge_category?{}:{badgeTracks:i.badgeToTracksMap[c].map(function(e){return{trackSlug:e,trackName:s.dict[e].name}}),badgeType:c}})(w),w=Object(E.b)(w),w=Object(C.a)(w),t.a=w},O4p5:function(e,t,a){},Oexu:function(e,t,a){},R9RG:function(e,t,a){"use strict";a.r(t),a.d(t,"PurePlaylistVideos",function(){return p});var n=a("cDcd"),r=a.n(n),l=a("17x9"),i=a.n(l),s=a("/MKj"),c=a("fvjX"),o=a("p7rj"),u=a("YZNL"),m=a("oLDs"),d=a("7Gqb");a("xeE/");function p(e){var t=e.videos;return r.a.createElement("div",{className:"playlist-videos container"},r.a.createElement("div",{className:"videos-wrap"},t.map(function(e){var t=e.title,a=e.duration,n=e.youtube_id;return r.a.createElement(u.a,{key:n,layer:2,className:"video-tip-card"},r.a.createElement(m.a,{title:t,duration:a,youtubeId:n,analyticsKey:"PlaylistVideo"}),r.a.createElement("h3",{className:"video-title"},t))})))}p.propTypes={videos:i.a.arrayOf(i.a.object).isRequired},t.default=Object(c.d)(o.a,Object(s.b)(function(e,t){return{videos:Object(d.c)(e,t).videos}}))(p)},f6by:function(e,t,a){"use strict";a.r(t);var n=a("cDcd"),r=a.n(n),l=a("17x9"),i=a.n(l),s=a("fvjX"),c=a("/MKj"),o=a("peh1"),u=a("UfWW"),m=a.n(u),d=a("p7rj"),p=a("7Gqb"),h=a("QbLZ"),g=a.n(h),f=a("KJde"),v=a.n(f),b=a("TSYQ"),y=a.n(b),k=a("+FjN");a("r9Oc");function E(e){var t=e.parentPlaylist,a=e.playlist,n=e.primary,l=e.className,i=e.appUtil,s=e.profile,c=a.name,o=a.description,u=a.slug,m=a.challenges_count,d=void 0===m?0:m,p=a.solved_count,h=void 0===p?0:p,f=i.location,b=d&&d===h,E=r.a.createElement(v.a,{text:c,maxLine:"2",title:c,basedOn:"letters"}),C=r.a.createElement(v.a,{text:o,maxLine:"3",title:o,basedOn:"letters"}),N={"data-analytics":"PlaylistCardItem","data-attr1":u,"data-attr2":t.slug};return r.a.createElement("div",{className:y()("playlist-card",{"playlist-card__completed":b},l)},!!s.username&&!!d&&r.a.createElement("span",{className:"playlist-card-score text-content"},"(",h,"/",d,")"),r.a.createElement(k.a,g()({primaryCard:n,title:E,detail:C,link:function(e,t){var a=t.pathname,n=e.playlist_count,r=e.videos_count,l=e.slug;return n?a+"/"+l:r?a+"/"+l+"/videos":a+"/"+l+"/challenges"}(a,f),buttonText:function(e){var t=e.playlist_count,a=e.videos_count,n=e.challenges_count,r=e.solved_count;return t?"View Details":a?"View":n===r?"Review Challenges":"See Challenges"}(a),buttonClass:y()("playlist-card-btn",n?"ui-btn-primary":"ui-btn-line-primary")},N)))}E.propTypes={primary:i.a.bool,className:i.a.string,parentPlaylist:i.a.object.isRequired,playlist:i.a.shape({name:i.a.string.isRequired,slug:i.a.string.isRequired,description:i.a.string.isRequired,playlist_count:i.a.number.isRequired,videos_count:i.a.number.isRequired,challenges_count:i.a.number.isRequired,solved_count:i.a.number.isRequired}).isRequired,appUtil:i.a.object.isRequired,profile:i.a.object.isRequired},E.defaultProps={primary:!1};var C=Object(s.d)(d.a,Object(c.b)(function(e){return{profile:e.community.profile}}))(E);a("o70H");function N(e){var t=e.childPlaylists,a=e.currentPlaylist,n=m()(t,function(e){return!e.videos_count});return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"playlist d-flex flex-wrap"},t.map(function(e,t){return r.a.createElement(C,{key:t,primary:t===n,parentPlaylist:a,playlist:e})})))}a.d(t,"makeChildPlaylistsProps",function(){return T}),a.d(t,"PurePlaylist",function(){return N}),N.propTypes={childPlaylists:i.a.array.isRequired,playlistSlug:i.a.string};var T=function(){return Object(o.createSelector)([p.b,p.c],function(e,t){var a=t.playlists.reduce(function(t,a){return t.push(e[a]),t},[]);return{childPlaylists:Object(p.g)(a),currentPlaylist:t}})};t.default=Object(s.d)(d.a,Object(c.b)(T()))(N)},l3J6:function(e,t,a){},lRgy:function(e,t,a){"use strict";var n=a("/f1G"),r=a.n(n),l=a("Yz+Y"),i=a.n(l),s=a("iCc5"),c=a.n(s),o=a("V7oC"),u=a.n(o),m=a("FYw3"),d=a.n(m),p=a("mRg0"),h=a.n(p),g=a("cDcd"),f=a.n(g),v=a("17x9"),b=a.n(v),y=a("TSYQ"),k=a.n(y),E=a("t8Fj"),C=a.n(E),N=a("xNbf"),T=a("n9NW"),w=a("PAiI"),j=a("gDS+"),S=a.n(j),_=a("YEIV"),O=a.n(_),x=a("QbLZ"),P=a.n(x),R=a("GQeE"),F=a.n(R),L=a("eOGF"),A=a("W6q9"),q=a("alL8"),I=a("p7rj"),D=a("OJx6"),M=a.n(D);a("v9Tw");function B(e){return F()(e).reduce(function(t,a){return t[a]=e[a].reduce(function(e,t){return e[t]=!0,e},{}),t},{})}var Y=function(e){function t(){var e,a,n,r;c()(this,t);for(var l=arguments.length,s=Array(l),o=0;o<l;o++)s[o]=arguments[o];return a=n=d()(this,(e=t.__proto__||i()(t)).call.apply(e,[this].concat(s))),n.onFilter=function(e,t,a){var r=n.state.filters,l=n.props,i=l.onChange,s=l.appUtil,c=s.location,o=s.router,u=P()({},r,O()({},e,t.filter(function(e){return e.checked}).map(function(e){return e.value})));if(n.setState({filters:u,filtersMap:B(u)}),M.a.track("Click","ChallengeListFilter",{attribute1:a.value,attribute2:a.checked,attribute3:e,attribute4:S()(u[e]),attribute5:S()(u)}),i)i(u);else{var m=Object(L.s)(c);m.filters=u,o.push(Object(L.b)(c.pathname,m))}},r=a,d()(n,r)}return h()(t,e),u()(t,[{key:"getDifficultyOptions",value:function(){var e=this.state.filtersMap;return["Easy","Medium","Hard"].map(function(t){var a=t.toLowerCase();return{label:t,value:a,checked:(e.difficulty||{})[a]}})}},{key:"getStatusOptions",value:function(){var e=this.state.filtersMap;return["Solved","Unsolved"].map(function(t){var a=t.toLowerCase();return{label:t,value:a,checked:(e.status||{})[a]}})}},{key:"getSubdomains",value:function(){var e=this.props.subdomains,t=void 0===e?[]:e,a=this.state.filtersMap;return t.map(function(e){return{label:e.name,value:e.slug,checked:!!(a.subdomains||{})[e.slug]}})}},{key:"render",value:function(){var e=this.props,t=e.isTutorial,a=e.abTest.isBadgeVariant(),n=this.getDifficultyOptions(),r=this.getStatusOptions(),l=this.getSubdomains(),i=f.a.createElement("div",{className:"filter-group"},f.a.createElement("div",{className:"group-label"},"Status"),f.a.createElement("div",{className:"filters"},f.a.createElement(A.a,{list:r,onChange:this.onFilter.bind(this,"status")})));return f.a.createElement("section",{className:"challenge-list-filter"},a&&i,!t&&f.a.createElement("div",{className:"filter-group"},f.a.createElement("div",{className:"group-label"},"Difficulty"),f.a.createElement("div",{className:"filters"},f.a.createElement(A.a,{list:n,onChange:this.onFilter.bind(this,"difficulty")}))),!a&&i,!t&&l.length>0&&f.a.createElement("div",{className:"filter-group"},f.a.createElement("div",{className:"group-label"},"Subdomains"),f.a.createElement("div",{className:"filters"},f.a.createElement(A.a,{list:l,onChange:this.onFilter.bind(this,"subdomains")}))))}}],[{key:"getDerivedStateFromProps",value:function(e){var t=e.filters,a=void 0===t?{}:t;return{filters:a,filtersMap:B(a)}}}]),t}(g.Component);Y.propTypes={subdomains:b.a.arrayOf(b.a.object),isTutorial:b.a.bool,appUtil:b.a.object,onChange:b.a.func,filters:b.a.object};Y=Object(q.b)(Y);var H=Y=Object(I.a)(Y),U=a("upHb"),V=a.n(U),K=a("0SFc"),G=a("m1cH"),W=a.n(G),Q=a("OnOE"),z=a.n(Q),Z=a("MGin"),X=a("sm6v"),J=a("4TY7"),$=a("OEX3"),ee=a("uVuI"),te=a("MHAo"),ae=(a("7zrl"),function(e){function t(){var e,a,n,r;c()(this,t);for(var l=arguments.length,s=Array(l),o=0;o<l;o++)s[o]=arguments[o];return a=n=d()(this,(e=t.__proto__||i()(t)).call.apply(e,[this].concat(s))),n.onTimerEnd=function(){var e=n.props,t=e.challenge;e.challengeActions.updateChallenge({challengeSlug:t.slug,clientOnly:!0,changes:{can_be_viewed:!0,has_started:!0,active:!0}})},r=a,d()(n,r)}return h()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.showFullChallenge,a=e.challengeActions,n=e.challenge,r=n.slug,l=n.contest_slug;t&&!n.body_html&&a.getChallengeDetail({challengeSlug:r,contestSlug:l})}},{key:"generateAnalyticsStub",value:function(){var e=this.props,t=e.challenge,a=e.currentPlaylist,n=e.listType===te.a.PLAYLIST;return{"data-attr1":t.slug,"data-attr2":a.slug,"data-attr3":t.kind,"data-attr4":t.solved,"data-attr5":t.attempted,"data-attr7":t.factor,"data-attr-10":t.difficulty,"data-attr11":n}}},{key:"isHiddenTutorialChallenge",value:function(){var e=this.props,t=e.trackSlug,a=e.challenge;return"tutorials"===t&&!a.can_be_viewed}},{key:"showDifficulty",value:function(){var e=this.props,t=e.challenge,a=e.contest;return!a||"acm"!==a.kind&&!a.hide_difficulty&&!a.hide_leaderboard&&-1===["mcq","article"].indexOf(t.kind)}},{key:"renderBookmarksIcon",value:function(){var e=this.props.challenge;return f.a.createElement("span",{key:"bookmark-cta",className:"bookmark-cta"},f.a.createElement(ee.a,{challenge:e,className:"js-bookmark"}))}},{key:"renderDetailItem",value:function(e,t,a){return f.a.createElement("span",{key:e,className:k.a.apply(void 0,W()(t).concat(["detail-item"]))},a)}},{key:"renderCardDetails",value:function(){var e=this.props.challenge,t=e.difficulty_name,a=e.max_score,n=e.total_count,r=e.solved_count,l=[];return this.showDifficulty()&&l.push(this.renderDetailItem("difficulty",["difficulty",t.toLowerCase()],""+Object(L.c)(t))),l.push(this.renderDetailItem("max-score",["max-score"],"Max Score: "+a)),l.push(this.renderDetailItem("success-ratio",["success-ratio"],"Success Rate: "+(n>0?(r/n*100).toFixed(2)+"%":"0.0%"))),f.a.createElement("div",{className:"card-details pmT"},l)}},{key:"renderChallengeName",value:function(){var e=this.props.challenge,t=e.preferred_challenge_name,a=e.name;return t&&t.trim()?t:a}},{key:"renderChallengeTitle",value:function(){return f.a.createElement("div",{className:"challenge-name-details "},f.a.createElement("div",{className:k()("pull-left inline-block")},f.a.createElement("h4",{className:"challengecard-title"},this.renderChallengeName(),this.renderCardDetails())))}},{key:"renderActionButtons",value:function(){var e=this.props,t=e.challenge,a=e.showFullChallenge,n=e.listType,r=e.primary,l=n===te.a.PLAYLIST,i="";if(i=r?"ui-btn-primary":"ui-btn-line-primary",t.can_be_viewed||l){var s=t.attempted||t.solved;s&&!a&&(i="mcq"===t.kind?"btn disabled":"ui-btn-line"),t.solved&&(i="ui-btn-line-primary");var c={className:"primary-cta "+i,icon:"",iconAlignment:"right"},o="Solve Challenge";return t.solved?(o="Solved",c.icon="ui-icon-check-circle",c.iconAlignment="left"):s&&(o="Try Again"),o=f.a.createElement($.b,P()({key:"solve-button-cta"},c),o),f.a.createElement("div",{className:"challenge-submit-btn"},o)}}},{key:"renderCountdownTimer",value:function(){var e=this.props.challenge;return f.a.createElement($.b,{role:"link",className:"ui-btn-line",disabled:!0},f.a.createElement("span",{className:"timer-width-v2"},"Unlocks in"),f.a.createElement("span",{className:"timer-width-v2"},f.a.createElement(X.a,{finishTimeMs:1e3*e.epoch_starttime,onTimerEnd:this.onTimerEnd})))}},{key:"renderCtas",value:function(){var e=this.props.showBookmarks,t=this.isHiddenTutorialChallenge();return f.a.createElement(g.Fragment,null,!t&&e&&this.renderBookmarksIcon(),f.a.createElement("div",{className:k()("cta-container")},f.a.createElement("div",{className:"ctas"},!t&&this.renderActionButtons(),t&&this.renderCountdownTimer())))}},{key:"renderPreviewBody",value:function(){var e=this.props.challenge,t=e.preview,a=e.body_html;return t?f.a.createElement("div",{className:"preview-content"},t):a?f.a.createElement("div",{className:"preview-content",dangerouslySetInnerHTML:{__html:a}}):f.a.createElement("div",{className:"preview-content"},f.a.createElement(J.a,{height:"100px",width:"100%"}))}},{key:"renderChallengePreview",value:function(){return f.a.createElement("div",{className:"preview-box"},this.renderPreviewBody(),this.renderCtas())}},{key:"renderBody",value:function(){var e=this.props,t=e.challenge,a=e.showFullChallenge;return this.isHiddenTutorialChallenge()?f.a.createElement("div",{className:"content--list_body challenge-locked"},f.a.createElement("header",{className:"content--list_header-v2"},f.a.createElement("div",{className:"challenge-name-details "},f.a.createElement("h4",{className:"challengecard-title"},f.a.createElement("a",null,this.renderChallengeName()),f.a.createElement("div",{className:"challenge-unavailable-text"},f.a.createElement("i",{className:"ui-icon-lock"})," The challenge is not available yet."))),this.renderCtas())):f.a.createElement("div",{className:"content--list_body"},f.a.createElement("header",{className:"content--list_header-v2"},this.renderChallengeTitle(),!a&&this.renderCtas()),a&&this.renderChallengePreview(),!t.can_be_viewed&&t.has_started&&f.a.createElement("p",null,t.requirements_description||""))}},{key:"render",value:function(){var e=this.props,t=e.appUtil.location.pathname,a=e.challenge,n=e.isCTCIChallenge,r=e.index,l=Object(K.k)(t,a),i=this.generateAnalyticsStub();return f.a.createElement(Z.Link,P()({to:l,className:"js-track-click challenge-list-item","data-analytics":"ChallengeListChallengeName","data-js-track":"Challenge-Title"},i),f.a.createElement("div",{className:k()("single-item challenges-list-view-v2",{"first-challenge":0===r,cursor:!this.isHiddenTutorialChallenge()})},f.a.createElement("div",{id:"contest-challenges-problem",className:k()({"individual-challenge-card-v2":!0,"content--list-v2 track_content":!n})},this.renderBody()),f.a.createElement(z.a,{effect:"solid"})))}}]),t}(f.a.Component));ae.propTypes={challenge:b.a.object.isRequired,isCTCIChallenge:b.a.bool,showFullChallenge:b.a.bool,listType:b.a.string,currentPlaylist:b.a.object},ae.defaultProps={isCTCIChallenge:!1,listType:te.a.TRACK,currentPlaylist:{}};var ne=ae=Object(I.a)(ae),re=a("LDJX"),le=a("oLDs"),ie=a("yerp"),se=(a("O4p5"),function(e){function t(){c()(this,t);var e=d()(this,(t.__proto__||i()(t)).call(this));return e.reloadChallengeList=function(){window.HR.softlyReloadPage()},e.state={showDetailsModal:!1,loadingChallengeList:!1},e}return h()(t,e),u()(t,[{key:"renderChallengeList",value:function(){var e=this.props,t=e.challenges,a=e.showBookmarks,n=e.track,r=e.chapter,l=e.currentPage,i=e.filters,s=e.challengeActions,c=e.appUtil,o=e.listType,u=e.currentPlaylist,m=this.state.loadingChallengeList,d=n.slug;if(!t||t.length<1)return f.a.createElement("div",{className:"no-challenge-list"},f.a.createElement("p",{className:"no-challenge-content mlA plT text-center"},Object(K.o)(i,o)));if("cracking-the-coding-interview"===r.slug){var p={},h=[];t.forEach(function(e){if(e.section_association){var t=e.section_association.section.id;p[t]||(h.push(t),p[t]=[]),p[t].push(e)}});var v=parseInt(c.location.query.autoopen||-1,10);return f.a.createElement(g.Fragment,null,f.a.createElement("div",{className:"section-wise challenges-list-view mdB"},h.map(function(e){var t=p[e][0].section_association;return f.a.createElement("div",{key:e,className:"full-section"},f.a.createElement("div",{className:"section-head"},f.a.createElement("span",null,t.section.name),"challenge"===t.entity_type&&f.a.createElement("span",{className:"pull-right"},f.a.createElement("span",{className:"mmR"},t.section.entity_size),f.a.createElement("span",null,1===t.section.entity_size?"Challenge":"Challenges"))),f.a.createElement("div",{className:"section-group mdB"},"video_group"===t.entity_type&&p[e].map(function(e){return f.a.createElement("div",{key:e.slug,className:"video-section-2 pmL pmR"},e.videos.map(function(e,t){return f.a.createElement("div",{key:e.youtube_id,className:"video-item pmL pmR psT psB"},f.a.createElement(le.a,{autoOpen:t+1===v,title:e.title,duration:e.duration,youtubeId:e.youtube_id,contestSlug:"master"}),f.a.createElement("div",{className:"video-title-text pmT"},e.title))}))}),"challenge"===t.entity_type&&p[e].map(function(t,n){return f.a.createElement("div",{key:t.slug},f.a.createElement(ne,{challenge:t,showBookmarks:a,trackSlug:d,isCTCIChallenge:!0,currentPage:l,filters:i,challengeActions:s,listType:o,currentPlaylist:u}),n!==p[e].length-1&&f.a.createElement("hr",{className:"section-divide-line"}))})))}),m&&f.a.createElement("div",{className:"text-center"},f.a.createElement(N.a,{className:"challenge-list-loader",diameter:60}))))}return t.map(function(e,t){return f.a.createElement(ne,P()({key:e.slug},{challenge:e,showBookmarks:a,trackSlug:d,currentPage:l,filters:i,challengeActions:s,index:t,listType:o,currentPlaylist:u}))})}},{key:"renderChapterIntorductoryText",value:function(){var e=this.props.chapter.slug,t="linkedin-placements"===e,a="10-days-of-javascript"===e,n="";return"cracking-the-coding-interview"===e?n=f.a.createElement("span",null,"Ace your next interview by solving these code challenges, which cover important concepts for any coding interview. Each challenge includes a video tutorial to help you learn how to solve it."):t?n=f.a.createElement("span",null,"Practice by solving these code challenges, which are similar to the coding questions in the actual LinkedIn Placements test. Note that the actual test will also contain multiple choice questions on topics like math, probability and aptitude."):a||(n=f.a.createElement("span",null,f.a.createElement("i",{className:"icon-clock txt-alt-grey"}),f.a.createElement("span",{className:"aside"},"We will unlock a new challenge daily at 9am."))),n?f.a.createElement("div",{className:"confirmation plB"},n):null}},{key:"renderTutorialSignupView",value:function(){var e=this.props.chapter;return f.a.createElement(re.a,{currentChapter:e,afterSignup:this.reloadChallengeList})}},{key:"renderChallengeListView",value:function(){var e=this.props,t=e.track,a=e.chapter,n=t.slug,r="cracking-the-coding-interview"===a.slug;return f.a.createElement(g.Fragment,null,"tutorials"===n&&this.renderChapterIntorductoryText(),f.a.createElement("div",{className:k()("challenges-list",{"section-wise":r})},this.renderChallengeList()))}},{key:"renderMetaTags",value:function(){var e=this.props,t=e.chapter,a=e.track,n=e.listType,r=e.currentPlaylist.name,l=void 0===r?"":r;switch(n){case te.a.BOOKMARK:return f.a.createElement(V.a,null,f.a.createElement("title",null,"Your Saved Challenges | HackerRank"));case te.a.PLAYLIST:var i=l+" Prepare for you upcoming programming interview with HackerRank's\n        Ultimate Interview Preparation Kit",s=l+" | The HackerRank Interview Preparation Kit | HackerRank";return f.a.createElement(V.a,null,f.a.createElement("title",null,s),f.a.createElement("meta",{id:"meta-og-title",property:"og:title",content:"Solve "+s}),f.a.createElement("meta",{id:"meta-og-description",property:"og:description",content:i}));default:return f.a.createElement(V.a,null,f.a.createElement("title",null,"tutorial"===a.slug?"Solve "+t.name+" Questions | "+a.name+" | HackerRank":"Solve "+a.name+" | HackerRank"),f.a.createElement("meta",{id:"meta-og-title",property:"og:title",content:"Solve "+a.name+" Code Challenges"}),f.a.createElement("meta",{id:"meta-og-description",property:"og:description",content:t.tagline||a.descriptions}))}}},{key:"render",value:function(){var e=this.props,t=e.chapter,a=e.track,n=e.listType,r=t.tutorial_signed_up;return f.a.createElement(g.Fragment,null,this.renderMetaTags(),"tutorials"!==a.slug||r?this.renderChallengeListView():this.renderTutorialSignupView(),n===te.a.PLAYLIST&&f.a.createElement(ie.a,{featureId:3,align:"left",className:"feature-feedback-bottom-right-fixed",popoverClassName:"popover-bottom-right-fixed",coordinate:{right:"73px",bottom:"10px"},theme:"theme-m"}))}}]),t}(f.a.Component));se.propTypes={chapter:b.a.object,track:b.a.object,filters:b.a.object,showBookmarks:b.a.bool,challenges:b.a.array.isRequired,challengeActions:b.a.object.isRequired,listType:b.a.string.isRequired,contest:b.a.object,currentPlaylist:b.a.object},se.defaultProps={chapter:{},track:{},contest:{slug:"master"},currentPlaylist:{}};var ce=se=Object(I.a)(se),oe=a("L+7j");a("B7ER");a.d(t,"a",function(){return me});var ue=function(e){function t(){c()(this,t);var e=d()(this,(t.__proto__||i()(t)).call(this));return e.loadChallengeList=function(){var t=e.props.loadChallenges,a=e.state.loadingChallenges;t&&!a&&(e.setState({loadingChallenges:!0}),t().always(function(){e.setState({loadingChallenges:!1})}))},e.state={},e}return h()(t,e),u()(t,[{key:"showFilters",value:function(){var e=this.props,t=e.chapter;return"tutorials"!==e.track.slug||t.tutorial_signed_up}},{key:"renderFilters",value:function(){var e=this,t=this.props,a=t.chapters,n=t.track,r=t.filters;if(this.showFilters()){var l="tutorials"===n.slug;return f.a.createElement(g.Fragment,null,f.a.createElement(w.a,null,f.a.createElement("section",{className:"filter-section col-md-3"},f.a.createElement(C.a,{top:20,bottomBoundary:"#new-challenge-list"},f.a.createElement("div",{ref:function(t){e.filterWrap=t},className:"filter-wrap"},f.a.createElement(H,{subdomains:a,isTutorial:l,filters:r}))))),f.a.createElement(w.b,null))}}},{key:"renderList",value:function(){var e=this.props,t=e.currentChallengesCount,a=e.chapter,n=e.track,r=e.challenges,l=e.challengeActions,i=e.totalChallenges,s=e.abTest,c=e.firstUnsolvedChallenge,o=e.listType,u=e.filters,m=e.contest,d=e.loadChallenges,p=e.currentPlaylist,h=this.state.loadingChallenges,g=!!d&&t<i&&!h&&this.showFilters(),v=1===i&&!!c;return f.a.createElement("section",{className:k()("list-container",this.showFilters()?"col-md-9":"col-md-12")},s.isBadgeVariant()&&c&&this.renderRecommendedChallenge(),!v&&f.a.createElement(T.a,{scrollContainer:"body",threshold:1e3,loadMore:this.loadChallengeList,enabled:g},f.a.createElement(ce,{chapter:a,track:n,challenges:r,challengeActions:l,showBookmarks:!0,totalChallenges:i,listType:o,filters:u,contest:m,currentPlaylist:p})),h&&f.a.createElement("div",{className:"text-center"},f.a.createElement(N.a,{className:"challenge-list-loader"})))}},{key:"renderRecommendedChallenge",value:function(){var e=this.props,t=e.firstUnsolvedChallenge,a=e.track,n=e.chapter,r=e.challengeActions,l=e.listType,i=e.currentPlaylist,s=t.preview;return f.a.createElement("div",{className:"recommended-challenge pjB"},f.a.createElement(ne,{challenge:t,showFullChallenge:!!s,showBookmarks:!0,trackSlug:a.slug,chapterSlug:n.slug,challengeActions:r,listType:l,primary:!0,currentPlaylist:i}))}},{key:"render",value:function(){var e=this,t=this.props,a=t.track,n=t.listType,r=n===te.a.TRACK,l=n===te.a.BOOKMARK;return f.a.createElement("div",{id:"new-challenge-list",className:k()("b4 new-challenge-list",{"bookmark-list":l})},f.a.createElement("div",{className:"container"},r&&f.a.createElement(oe.a,{track:a}),f.a.createElement("div",{className:"row content-container",ref:function(t){e.container=t}},this.renderList(),this.renderFilters())))}}]),t}(g.Component);ue.propTypes={challenges:b.a.arrayOf(b.a.object).isRequired,currentChallengesCount:b.a.number,totalChallenges:b.a.number.isRequired,chapters:b.a.arrayOf(b.a.object),profile:b.a.object.isRequired,filters:b.a.object,chapter:b.a.object,contest:b.a.object,track:b.a.object,abTest:b.a.object.isRequired,firstUnsolvedChallenge:b.a.object,loadChallenges:b.a.func,listType:b.a.oneOf(r()(te.a)),currentPlaylist:b.a.object},ue.defaultProps={chapter:{},track:{},contest:{slug:"master"},currentChallengesCount:0,listType:te.a.TRACK,currentPlaylist:{}};var me=ue},n2qa:function(e,t,a){},o70H:function(e,t,a){},r9Oc:function(e,t,a){},v9Tw:function(e,t,a){},xHnZ:function(e,t,a){"use strict";var n=a("ZaSc"),r=a("oKxo"),l=a("O3Rp"),i={incrementSeenCount:function(e,t){return function(){return Object(n.g)({url:Object(l.f)("seenFeedback",{apiPrefix:""+t,id:""+e}),loadingMessage:!1})}},disable:function(e){return{type:r.b.FEATURE_FEEDBACK.DISABLE,data:{featureId:e}}}};t.a=i},"xeE/":function(e,t,a){},yerp:function(e,t,a){"use strict";var n=a("Yz+Y"),r=a.n(n),l=a("iCc5"),i=a.n(l),s=a("V7oC"),c=a.n(s),o=a("FYw3"),u=a.n(o),m=a("mRg0"),d=a.n(m),p=a("cDcd"),h=a.n(p),g=a("17x9"),f=a.n(g),v=a("EA6I"),b=a("/MKj"),y=a("fvjX"),k=a("TSYQ"),E=a.n(k),C=a("p7rj"),N=a("alL8"),T=a("ZaSc"),w=a("z2kT"),j=a("xHnZ"),S=a("O3Rp"),_=(a("n2qa"),function(e){function t(e){i()(this,t);var a=u()(this,(t.__proto__||r()(t)).call(this,e));return a.toggleFeedback=function(e){a.setState({feedbackOpen:!a.state.feedbackOpen,target:e.currentTarget})},a.onClose=function(){a.setState({feedbackOpen:!1})},a.onSeen=function(e){return Object(T.g)({url:Object(S.f)("seenFeedback",{apiPrefix:""+a.props.apiPrefix,id:""+e}),loadingMessage:!1})},a.onSubmit=function(e){a.submitTimeout=setTimeout(function(){a.setState({feedbackOpen:!1}),a.props.featureFeedbackActions.disable(e)},3e3)},a.renderFeatureFeedback=function(){var e=a.props,t=e.featureId,n=e.apiPrefix,r=e.appUtil,l=e.title,i=e.description,s=e.feature,c=e.popoverClassName,o=e.align,u=e.coordinate,m=e.theme,d=a.state.target;if(s){var p=r.assetPath,g=l||s.heading||"Love our new upgrade?",f=i||s.description||"Let us know what you feel about it.";return h.a.createElement(v.a,{className:c,target:d,align:o,open:!0,coordinate:u,onClose:a.onClose,showTip:!0},h.a.createElement(w.a,{featureId:t,title:g,desc:f,theme:m,onSeen:a.onSeen,onClose:a.onClose,onSubmit:a.onSubmit,assetPath:p,isStandalone:!0,postUrl:Object(S.f)("updateFeedback",{apiPrefix:n,id:t})}))}},a.state={feedbackOpen:!1,target:void 0},a}return d()(t,e),c()(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.submitTimeout)}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.className;return h.a.createElement(p.Fragment,null,!!this.renderFeatureFeedback()&&h.a.createElement("span",{"data-balloon":"Share your feedback with us","data-balloon-pos":"left",className:E()("feature-feedback cursor-pointer",a),onClick:this.toggleFeedback},t||h.a.createElement("i",{className:"ui-icon-thumbs-up-light"})),this.state.feedbackOpen&&this.renderFeatureFeedback())}}]),t}(h.a.Component));_.propTypes={featureId:f.a.number.isRequired,title:f.a.string,description:f.a.string,className:f.a.string,popoverClassName:f.a.string,align:f.a.string,coordinate:f.a.object,theme:f.a.string};_=Object(b.b)(function(e,t){var a=t.featureId,n="hackerrank"===e.metadata.productNamespace?"rest":"x/api/v1";return{feature:e.featureFeedback.featureLists[a],apiPrefix:n}},function(e){return{featureFeedbackActions:Object(y.b)(j.a,e)}})(_),_=Object(C.a)(_),_=Object(N.b)(_),t.a=_},z2kT:function(e,t,a){"use strict";var n=a("Yz+Y"),r=a.n(n),l=a("iCc5"),i=a.n(l),s=a("V7oC"),c=a.n(s),o=a("FYw3"),u=a.n(o),m=a("mRg0"),d=a.n(m),p=a("cDcd"),h=a.n(p),g=a("17x9"),f=a.n(g),v=a("2VWb"),b=a("TSYQ"),y=a.n(b),k=a("ZaSc"),E=a("eOGF");a("Oexu");Object(E.K)(["feedback/feedback.*.svg"]);var C=[{text:"Awesome, tell us more!",rating:1,icon:"like",title:"Like it"},{text:"Tell us more",rating:2,icon:"cantsay",title:"Maybe"},{text:"Tell us what went wrong",rating:3,icon:"no",title:"No"}],N=function(e){var t=e.selected,a=(e.clickHandler,e.title),n=e.icon,r=e.assetPath;return h.a.createElement("li",{className:y()("rating",{selected:t},n),onClick:function(){e.clickHandler(e.idxVal)}},h.a.createElement("div",{className:"feedback-img"},h.a.createElement("span",{className:"overlay"}),h.a.createElement("img",{src:r("feedback/feedback-"+n+".svg"),className:"feedback-icon"})),h.a.createElement("div",{className:"feedback-title"},a))},T=function(e){function t(e){i()(this,t);var a=u()(this,(t.__proto__||r()(t)).call(this,e));return a.updateSelection=function(e){a.setState({selectedRating:e},function(){a.submitForm()})},a.updateComment=function(e){a.setState({comment:e.target.value})},a.submitForm=function(e){e&&a.setState({submitting:!0});var t=a.state,n=t.selectedRating,r=t.comment,l=a.props,i=l.postUrl,s=l.onSubmit,c=l.featureId;Object(k.g)({url:i,data:{rating:n+1,description:r},loadingMessage:!1,success:function(){e&&(a.setState({submitted:!0}),s&&s(c))},error:function(){a.setState({submitting:!1})}})},a.renderFeedbackContainer=function(){var e=a.props,t=e.className,n=e.theme,r=a.state.submitted;return h.a.createElement("div",{className:y()("feedback-modal",t,n)},r?a.renderThanks():a.renderFeedBack())},a.state={selectedRating:"",comment:"",submitted:!1,submitting:!1},a}return d()(t,e),c()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.featureId,a=e.onSeen;a&&a(t)}},{key:"renderFeedBack",value:function(){var e=this,t=this.props,a=t.assetPath,n=t.title,r=t.name,l=t.desc,i=t.onClose,s=t.theme,c=this.state,o=c.selectedRating,u=c.comment,m=(c.submitted,c.submitting),d="theme-m"===s?"ui-btn ui-btn-primary":y()("btn btn-primary btn-flat",{disabled:m}),p="theme-m"===s?"ui-icon-cross":"icon-cancel-small";return h.a.createElement("div",null,h.a.createElement("div",{className:"cancel-icon",onClick:i},h.a.createElement("i",{className:p})),h.a.createElement("div",{className:"banner-img"},h.a.createElement("img",{src:a("feedback/feedback-banner-"+r+".svg"),className:"feedback-banner"})),h.a.createElement("h1",{className:"feedback-main-title mdT mdB"},n),l&&h.a.createElement("div",{className:"msT msB feedback-description-light"},l),h.a.createElement("div",{className:"ratings"},h.a.createElement("ul",null,C.map(function(t,n){return h.a.createElement(N,{onClick:e.updateSelection,title:t.title,className:C[o],icon:t.icon,key:n,idxVal:n,clickHandler:e.updateSelection,assetPath:a,selected:t.rating===o+1})}))),h.a.createElement("div",{className:"selected-rating"},C[o]&&C[o].text),"number"==typeof o&&h.a.createElement("div",{className:"submit-form"},h.a.createElement("div",{className:"input-area"},h.a.createElement("textarea",{className:"txt-area",placeholder:"Write a comment (optional)",onChange:this.updateComment,value:u})),h.a.createElement("button",{className:d,onClick:this.submitForm.bind(null,!0)},m?"Submitting..":"Submit")))}},{key:"renderThanks",value:function(){return h.a.createElement("div",{className:"feedback-thanks"},h.a.createElement("div",{className:"thanks-icon"},h.a.createElement("i",{className:"icon-thumbs-up"})),h.a.createElement("div",{className:"thanks-title"},"Thanks for your feedback!"))}},{key:"render",value:function(){var e=this.props,t=e.onClose,a=e.isStandalone;return h.a.createElement("div",null,a?this.renderFeedbackContainer():h.a.createElement(v.a,{open:!0,onClose:t,modalClass:"feedback-modal-wrapper"},this.renderFeedbackContainer()))}}]),t}(h.a.Component);T.defaultProps={title:"Love our new upgrade?",name:"default"},T.propTypes={onClose:f.a.func,featureId:f.a.number.isRequired,postUrl:f.a.string.isRequired,theme:f.a.string},t.a=T}}]);
//# sourceMappingURL=https://staging.hackerrank.net/assets/sourcemaps/hackerrank_r_interview-98c105d11067da878f72.js.map