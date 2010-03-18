init();

$('#export').click(function(){
    var gearName = $('#export_gear_name').val();
    if(gearName === ''){
        alert('Please input gear name.');
        return; 
    }
    
    var params = {
        'deckName': gearName,
        'charm_hash': {}
    };
    
    var counts = $('.section_text.format').text().replace(/\D/g,'');
    $('.section_text.format a[href^=/card/]').each(function(index){
        var eid = $(this).attr('href').split('/').pop();
        var ecount = counts.substring(index, index+1);
        params["charm_hash"][eid] = ecount;
    });
    
    $('.section_text.format').append('<textarea id="import_textarea" style="width: 345px; height: 90px"></textarea>');
    $('#import_textarea').val($.toJSON(params));
    $('#export_gear_name, #export').remove();
});

function init(){
    $('.section_text.format').append('<input id="export_gear_name" type="text" /><div class="button button_c1"><a id="export" class="button_inner button_ic1 BV_deck_save" onclick="return false;">Export</a></div>')
}
