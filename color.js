var color = {
    "Adventurer": '<lable style="color: white">W</lable>',
    "Fighter": '<lable style="color: red">R</lable>',
    "Novice": '<lable style="color: blue">Bl</lable>',
    "Scout": '<lable style="color: green">G</lable>',
    "Recruit": '<lable style="color: brown">Br</lable>',
    "Mercenary": '<lable style="color: red">R</lable>',
    "Wizard": '<lable style="color: red">R</lable>',
    "Monk": '<lable style="color: blue">Bl</lable>',
    "Sage": '<lable style="color: blue">Bl</lable>',
    "Rogue": '<lable style="color: green">G</lable>',
    "Shaman": '<lable style="color: green">G</lable>',
    "Guard": '<lable style="color: brown">Br</lable>',
    "Cleric": '<lable style="color: brown">Br</lable>',
    "Berserker": '<lable style="color: red">R</lable>  <lable style="color: brown">Br</lable>',
    "Deathknight": '<lable style="color: green">G</lable>  <lable style="color: red">R</lable>',
    "Champion": '<lable style="color: blue">Bl</lable>  <lable style="color: red">R</lable>',
    "Pyromaniac": '<lable style="color: red">R</lable>  <lable style="color: blue">Bl</lable>',
    "Assassin": '<lable style="color: green">G</lable>  <lable style="color: blue">Bl</lable>',
    "Warden": '<lable style="color: green">G</lable>  <lable style="color: brown">Br</lable>',
    "Paladin": '<lable style="color: brown">Br</lable>  <lable style="color: blue">Bl</lable>',
    "Hierarch": '<lable style="color: blue">Bl</lable>  <lable style="color: brown">Br</lable>',
    "Summoner": '<lable style="color: brown">Br</lable>  <lable style="color: red">R</lable>',
    "Slayer": '<lable style="color: blue">Bl</lable>  <lable style="color: green">G</lable>',
    "Inquisitor": '<lable style="color: red">R</lable>  <lable style="color: green">G</lable>',
    "Warlord": '<lable style="color: brown">Br</lable>  <lable style="color: green">G</lable>'
};



$('#VsFormPagination').bind('DOMNodeRemoved', function(){
    $('.BV_system_highlight').each(function(){
        var playerId = $(this).find('.BV_system_file').attr('href').split('/').pop();
        var estiahClass = $('#SystemInfoCharacter'+playerId).find('strong:eq(1)').text();
        $(this).find('.name').append(color[estiahClass]);
    });
});

$('.BV_system_highlight').each(function(){
    var playerId = $(this).find('.BV_system_file').attr('href').split('/').pop();
    var estiahClass = $('#SystemInfoCharacter'+playerId).find('strong:eq(1)').text();
    $(this).find('.name').append(color[estiahClass]);
});
