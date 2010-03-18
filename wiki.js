$('a[href^="/card"], a[href^="/item"]').live('click', function(){
    var effect = /^\/card\/effect\/\d*$/,
        text = $(this).text();
    if(text === '[Sell]' || text === '[+]' || text === '[-]' || effect.test($(this).attr('href')))
        return;
    window.open("http://www.progenitor-softworks.com/ew/index.php?title="+generateUrl($(this).text()));
});

function generateUrl(text){
    return text.replace(/\s/g, "_").replace(/[\[\]]/g, "");
}
