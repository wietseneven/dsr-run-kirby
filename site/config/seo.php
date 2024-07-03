<?php

return [
	'robots' => [
		'pageSettings' => false
	],
	'canonicalBase' => env("APP_URL"),
	'files' => [
		'parent' => 'site.find("page://images")',
		'template' => 'image'
	],
	'socialMedia' => [
		'twitter' => false,
		'youtube' => false
	],
	'tobimori.seo.lang' => 'nl_NL',
];
