$('.BV_system_gui').remove();

var exchangeRate = {};

$('.entry:eq(2) .row:gt(9)').each(function(){
    exchangeRate[$(this).find('.left').text().replace(/[\W|\s]/g, '')] = parseFloat($(this).find('.right').text().replace(/%/, ''));
});

$('.PT_picker_all').each(function(){
    var kind = $('#SystemInfoItem' + $(this).attr('id').replace(/\D/g,'') + ' .title').text().split(':')[0].replace(/\s/g, '');
    $(this).find('.functions strong').before('<a style="color: '+ getColor(exchangeRate[kind]) +'">('+ exchangeRate[kind] +'%)</a>&nbsp;&nbsp;&nbsp;');
});

//This method is from AllinOne by Sheira
function getColor(rate){
    var red, green, blue;
	if (rate <= 90)
		red = 0;
	else
	{
		if (rate >= 110)
			red = 255;
		else
			red = Math.floor((rate - 90)*255/20);
	}
	if ((rate <= 50) || (rate >= 130))
		green = 0;
	else
	{
		if ((rate >= 70) && (rate <= 110))
			green = 255;
		else
			green = Math.floor((40 - Math.abs(90 - rate))*255/20);
	}
	if (rate <= 70)
		blue = 255;
	else
	{
		if (rate >= 90)
			blue = 0;
		else
			blue = Math.floor((90 - rate)*255/20);
	}
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
