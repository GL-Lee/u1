exports.tudou = {
	siteName:  'tudou',
	url: 'http://www.tudou.com/',
	charset: 'GBK',
	wrapper: '.sec-hot:eq(0)',
	item: '.pack',
	a: '.caption a',
	img: '.pic img'
}