export var MATCH = function () {
    var href = window.location.href;
    // New Topic URL
    var newListPath = NEW_LIST.pathname;
    var newDetailPath = NEW_DETAIL.pathname;
    var newMatch = href.includes(newListPath) || href.includes(newDetailPath);
    // Legacy Topic Match
    var legacyListPath = LEGACY_LIST.pathname;
    var legacyListMoocPath = LEGACY_LIST_MOOC.pathname;
    var legacyDetailPath = LEGACY_DETAIL.pathname;
    var legacyDetailMoocPath = LEGACY_DETAIL_MOOC.pathname;
    var legacyMatch = href.includes(legacyListPath) || href.includes(legacyListMoocPath) || href.includes(legacyDetailPath) || href.includes(legacyDetailMoocPath);
    return newMatch || legacyMatch;
};
export var LEGACY_LIST = new URL("https://mooc1.chaoxing.com/bbscircle/grouptopic");
export var LEGACY_LIST_MOOC = new URL("https://mooc1.chaoxing.com/mooc-ans/bbscircle/grouptopic");
export var LEGACY_DETAIL = new URL("https://mooc1.chaoxing.com/bbscircle/gettopicdetail");
export var LEGACY_DETAIL_MOOC = new URL("https://mooc1.chaoxing.com/mooc-ans/bbscircle/gettopicdetail");
export var NEW_LIST = new URL("https://groupweb.chaoxing.com/course/topic/topicList");
export var NEW_DETAIL = new URL("https://groupweb.chaoxing.com/course/topic/v3/bbs");
