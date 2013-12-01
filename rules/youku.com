exports.youku = {
	siteName:  'yoku',
	url: 'http://www.youku.com/',
	charset: 'UTF8',
	wrapper: '.yk-row-index:eq(0)',
	item: '.ishover',
	a: '.v-link a',
	img: '.v-thumb img'
}