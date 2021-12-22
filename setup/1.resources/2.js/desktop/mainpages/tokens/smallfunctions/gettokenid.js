function gettokenid() {
    url = window.location.href;
    tokenid = url.substring(url.indexOf("=") + 1);
    return tokenid;
}