init();

$('#save_new').live('click', function(){
    if($('#DeckNameInput').val() === '' || $('#DeckCurrent .card').length === 0){
        alert('Do no evil.');        
        return;
    }
    var params = {
        'deckName': $('#DeckNameInput').val(),
        'charm_hash': {}
    };
    $('#DeckCurrent .card').each(function(){
        var eid = $(this).attr('id').replace(/DeckCard/, '');
        var ecount = $("#DeckCardCount"+eid).html();
        params["charm_hash"][eid] = ecount;
    });
    
    var gearId = localStorage["gear_id_incre"] || 0;
    gearId = parseInt(gearId) + 1;
    localStorage["gear_id_incre"] = gearId;

    var playerId = $('a[href^="/character/achievement/index/id/"]').attr('href').split('/').pop();
    
    var gearNames = localStorage["gear_names_"+playerId] || "{}";
    gearNames = eval("("+gearNames+")");
    gearNames[gearId] = $('#DeckNameInput').val();
    localStorage["gear_names_"+playerId] = $.toJSON(gearNames);

    localStorage["estiah_gear_"+gearId] = $.toJSON(params);

    $('#DeckSaveAlert').hide();
    $('.decklist .highlight:last').after('<div class="deck highlight"><div class="name"><a class="gae_gear nolink BV_deck_change" onclick="return false;" href="'+gearId+'">'+$('#DeckNameInput').val()+'</a></div><a href="'+gearId+'" class="delete func_sec BV_deck_status lhp c2" onclick="return false;">[Delete]</a></div>');
});

$('.gae_gear').live('click', function(){
    localStorage["current_gae_gear"] = $(this).attr('href');

    var gearInfo = localStorage["estiah_gear_"+$(this).attr('href')];
    gearInfo = eval("("+gearInfo+")");

    var deckCardList = [];
    $.each(gearInfo["charm_hash"], function(id, count){
        deckCardList.push({'id':id, 'count':count});
    });

    var params = {'DeckName': gearInfo["deckName"],
        'DeckId': $('.decklist .highlight:eq(0) .nolink').attr('href').split('/').pop(),
        'DeckCardlist':deckCardList
    }
    $.ajax({
        async: false,
        type: "POST",
        data: {'json': $.toJSON(params)},
        url: "http://www.estiah.com/json/character/deck/save",
        success: function(data){
            
        }
    });

    location.href = 'http://www.estiah.com/character/deck/index/id/'+$('.decklist .highlight:eq(0) .nolink').attr('href').split('/').pop();
});

$('#save_old').click(function(){
    if($(this).attr('href') === '')
        return;

    if($('#DeckNameInput').val() === '' || $('#DeckCurrent .card').length === 0){
        alert('Do no evil.');        
        return;
    }
    var params = {
        'deckName': $('#DeckNameInput').val(),
        'charm_hash': {}
    };
    $('#DeckCurrent .card').each(function(){
        var eid = $(this).attr('id').replace(/DeckCard/, '');
        var ecount = $("#DeckCardCount"+eid).html();
        params["charm_hash"][eid] = ecount;
    });
    
    var gearId = $(this).attr('href');
    var playerId = $('a[href^="/character/achievement/index/id/"]').attr('href').split('/').pop();
    
    var gearNames = localStorage["gear_names_"+playerId] || "{}";
    gearNames = eval("("+gearNames+")");
    gearNames[gearId] = $('#DeckNameInput').val();
    localStorage["gear_names_"+playerId] = $.toJSON(gearNames);

    localStorage["estiah_gear_"+gearId] = $.toJSON(params);
    alert('success');

    $(this).attr('href','');
    localStorage["current_gae_gear"] = '';

    $('#DeckSaveAlert').hide();
    $('.deck .gae_gear[href^='+gearId+']').text($('#DeckNameInput').val());
});

$('.deck .delete').live('click', function(){
    var gearId = $(this).attr('href');
    var playerId = $('a[href^="/character/achievement/index/id/"]').attr('href').split('/').pop();
    
    var gearNames = localStorage["gear_names_"+playerId] || "{}";
    gearNames = eval("("+gearNames+")");
    gearNames[gearId] = void(0);
    
    localStorage["gear_names_"+playerId] = $.toJSON(gearNames);
    localStorage.removeItem("estiah_gear_"+gearId);
    
    $(this).parents('.deck').remove();
});

$('#export').click(function(){
    var params = {
        'deckName': $('#DeckNameInput').val(),
        'charm_hash': {}
    };
    $('#DeckCurrent .card').each(function(){
        var eid = $(this).attr('id').replace(/DeckCard/, '');
        var ecount = $("#DeckCardCount"+eid).html();
        params["charm_hash"][eid] = ecount;
    });
    $('#import_textarea').show();
    $('#import_textarea').val($.toJSON(params));
});

$('#import').click(function(){
    $('#import_textarea').show();
    $(this).hide();$('#import_save').show();    
});

$('#import_save').click(function(){
    var gearInfo = eval("("+$('#import_textarea').val()+")");

    var deckCardList = [];
    $.each(gearInfo["charm_hash"], function(id, count){
        deckCardList.push({'id':id, 'count':count});
    });

    var params = {'DeckName': gearInfo["deckName"],
        'DeckId': $('.decklist .highlight:eq(0) .nolink').attr('href').split('/').pop(),
        'DeckCardlist':deckCardList
    }
    $.ajax({
        async: false,
        type: "POST",
        data: {'json': $.toJSON(params)},
        url: "http://www.estiah.com/json/character/deck/save",
        success: function(data){
            if(data['success']){
                var gearId = localStorage["gear_id_incre"] || 0;
                gearId = parseInt(gearId) + 1;
                localStorage["gear_id_incre"] = gearId;

                var playerId = $('a[href^="/character/achievement/index/id/"]').attr('href').split('/').pop();
    
                var gearNames = localStorage["gear_names_"+playerId] || "{}";
                gearNames = eval("("+gearNames+")");
                gearNames[gearId] = $('#DeckNameInput').val();
                localStorage["gear_names_"+playerId] = $.toJSON(gearNames);

                localStorage["estiah_gear_"+gearId] = $('#import_textarea').val();

                $('#DeckSaveAlert').hide();
                $('.decklist .highlight:last').after('<div class="deck highlight"><div class="name"><a class="gae_gear nolink BV_deck_change" onclick="return false;" href="'+gearId+'">'+$('#DeckNameInput').val()+'</a></div><a href="'+gearId+'" class="delete func_sec BV_deck_status lhp c2" onclick="return false;">[Delete]</a></div>');
                
                $('#import').show();$('#import_save').hide();$('#import_textarea').hide();
            }
            else alert('Something is wrong.');
        }
    });
});

function init(){
    generateButtons();
    generateSavedGears();
    $('#import_save, #import_textarea').hide();

    if(localStorage["current_gae_gear"] !== ''){
        $('.gae_gear, .deck .nolink').removeClass('c2');
        $('a[href="'+localStorage["current_gae_gear"]+'"]').addClass('c2');
    }
}

function generateButtons(){
    var gaeGear = localStorage["current_gae_gear"] || '';
    $('#DeckStatus .button_c6:eq(1)').after('<div class="button button_c1"><a id="save_old" href="'+gaeGear+'" class="button_inner button_ic1 BV_deck_save" onclick="return false;">Save Local</a></div><div id="save_new" class="button button_c1"><a href="Save New" class="button_inner button_ic1 BV_deck_save" onclick="return false;">New Local</a></div><div id="import" class="button button_c1"><a href="Import" class="button_inner button_ic1 BV_deck_save" onclick="return false;">Import</a></div><div id="import_save" class="button button_c1"><a href="Import Save" class="button_inner button_ic1 BV_deck_save" onclick="return false;">Save Import</a></div><div id="export" class="button button_c1"><a href="Export" class="button_inner button_ic1 BV_deck_save" onclick="return false;">Export</a></div><textarea id="import_textarea" style="width: 345px; height: 90px"></textarea>');
}

function generateSavedGears(){
    var playerId = $('a[href^="/character/achievement/index/id/"]').attr('href').split('/').pop();
    var savedGears = localStorage["gear_names_"+playerId] || "{}";
    savedGears = eval("("+savedGears+")");
    $.each(savedGears ,function(id, gearName){
        $('.decklist .highlight:last').after('<div class="deck highlight"><div class="name"><a class="gae_gear nolink BV_deck_change" onclick="return false;" href="'+id+'">'+gearName+'</a></div><a href="'+id+'" class="delete func_sec BV_deck_status lhp c2" onclick="return false;">[Delete]</a></div>');
    });
}
