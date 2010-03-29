$('#VsForm option:selected').attr('selected', '');
$('#VsForm option:first').attr('selected', 'selected');

var load = "<div class='decks'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id='load_local_gear'><option value='-1'>Please select...</option>";

var playerId = $('a[href^="/character/achievement/index/id/"]').attr('href').split('/').pop();
var savedGears = localStorage["gear_names_"+playerId] || "{}";
savedGears = eval("("+savedGears+")");

$.each(savedGears ,function(id, gearName){
    load += '<option value="'+id+'">'+gearName+'</option>';
});
load += '</select></div>'

$(".dungeon_room .submit").after(load);

$('#load_local_gear').change(function(){
    if($(this).val() === "-1")
        return;
    
    var gearInfo = localStorage["estiah_gear_"+$(this).val()];
    gearInfo = eval("("+gearInfo+")");

    var deckCardList = [];
    $.each(gearInfo["charm_hash"], function(id, count){
        deckCardList.push({'id':id, 'count':count});
    });

    var params = {'DeckName': gearInfo["deckName"],
        'DeckId': $("#VsForm select:eq(0)").val(),
        'DeckCardlist':deckCardList
    }
    $.ajax({
        async: false,
        type: "POST",
        data: {'json': $.toJSON(params)},
        url: "http://www.estiah.com/json/character/deck/save",
        success: function(data){
            if(data["success"] === true){
                $("#VsForm select:eq(0) option:selected").text(gearInfo["deckName"]);
                $("#VsForm select:eq(0) option:selected").attr('selected', 'selected');
            }else alert("Something is wrong.");
        }
    });
});
