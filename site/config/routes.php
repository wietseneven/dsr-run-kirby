<?php

use Kirby\Http\Remote;
use Kirby\Filesystem\F;

function parsePlacemark($placemark, $index = null): array
{
	$geometry = parseGeometry($placemark);

	$properties = [
		'name' => (string) $placemark->name,
		'description' => (string) $placemark->description,
		'index' => $index,
		// Estrai ulteriori informazioni, come timestamp o ExtendedData se necessario
	];

	return [
		'type' => 'Feature',
		'properties' => $properties,
		'geometry' => $geometry
	];
}

function parseGeometry($placemark): array
{
	// Gestione Point
	if (isset($placemark->Point)) {
		$coordinates = explode(',', trim((string) $placemark->Point->coordinates));
		return [
			'type' => 'Point',
			'coordinates' => array_map('floatval', $coordinates)
		];
	}

	// Gestione LineString
	if (isset($placemark->LineString)) {
		$coordinatesList = explode(PHP_EOL, trim((string) $placemark->LineString->coordinates));
		$coordinates = array_map(function ($coord) {
			$parts = explode(',', $coord);
			// only keep the first two parts
			// return array_slice($parts, 0, 2);

			return array_map('floatval', array_slice($parts, 0, 2));
		}, $coordinatesList);

		// remove empty coordinates, or with a value of 0
		// $coordinates = array_filter($coordinates, function ($coord) {
		// 	if (count($coord) !== 3) {
		// 		return false;
		// 	}
		// 	return $coord[0] !== 0 && $coord[1] !== 0;
		// });

		return [
			'type' => 'LineString',
			'coordinates' => $coordinates
		];
	}

	// Gestione MultiGeometry
	if (isset($placemark->MultiGeometry)) {
		$multiLineCoordinates = [];
		foreach ($placemark->MultiGeometry->children() as $childGeometry) {
			if ($childGeometry->getName() == 'LineString') {
				$lineCoordinates = parseLineStringCoordinates($childGeometry);
				if (!empty($lineCoordinates)) {
					$multiLineCoordinates[] = $lineCoordinates;
				}
			}
		}
		return [
			'type' => 'MultiLineString',
			'coordinates' => $multiLineCoordinates
		];
	}

	if (isset($placemark->Polygon)) {
		$coordinatesList = explode(PHP_EOL, trim((string) $placemark->Polygon->outerBoundaryIs->LinearRing->coordinates));
		$coordinates = array_map(function ($coord) {
			$parts = explode(',', $coord);

			return array_map('floatval', array_slice($parts, 0, 2));
		}, $coordinatesList);

		return [
			'type' => 'Polygon',
			'coordinates' => [$coordinates]
		];
	}

	return [];
}

function parseLineStringCoordinates($lineString): array
{
	$coordinatesList = explode(' ', trim((string) $lineString->coordinates));
	return array_map(function ($coord) {
		$parts = explode(',', trim($coord));
		return array_map('floatval', $parts);
	}, $coordinatesList);
}

return [
	[
		'pattern' => '/mymaps/(:any)/gpx',
		'action'  => function ($mid) {
			// do something here
			// when the URL matches the pattern above
			$mapsUrl = 'https://www.google.com/maps/d/u/0/viewer?mid=' . $mid;
			$response = Remote::get($mapsUrl);
			if ($response->code() === 200) {
				$content = $response->content();

				// Zoek alle <script> tags en filter degene die var _pageData bevat. De Javascript array die hier in zit wil je hebben.
				preg_match_all('/<script.*?>.*?<\/script>/s', $content, $matches);
				$scripts = $matches[0];

				// Zoek het script met de _pageData Javascript array en haal de waarden uit.
				$script = array_filter($scripts, function ($script) {
					return strpos($script, '_pageData') !== false;
				});
				$script = reset($script);

				// Haal de waarden uit de _pageData variable. Dit is een erg lange en complexe Javascript array.
				preg_match_all('/_pageData\s?=\s?\\"(\[.*?\])"/s', $script, $matches);
				$arr = $matches[1][0];
				// the array is a string, so we need to decode it, it also include a lot of backslashes
				$pageData = json_decode(str_replace('\\"', '"', $arr));

				$layers = $pageData[1][6];
			}
		}
	],
	[
		'pattern' => '/mymaps/(:any)/kmz',
		'action'  => function ($mid) {
			$targetPage = page('informatie/routes');
			$fileLocation = $targetPage->root() . '/' . $mid . '.kmz';
			$klmFileLocation = $targetPage->root() . '/' . $mid . '.kml';
			$fileExists = F::exists($fileLocation);
			$klmFileExists = F::exists($klmFileLocation);

			if (!$fileExists || !$klmFileExists || true) {
				// do something here
				$url = 'https://www.google.com/maps/d/u/0/kml?mid=' . $mid . '&resourcekey';
				$response = Remote::get($url);
				F::write($fileLocation, $response->content());

				// uncompress the kmz file, this is a zip file. Then store the location of a kml file in the page
				exec('unzip -p ' . $fileLocation . ' doc.kml > ' . $klmFileLocation);
			}

			// read the kml file
			$kmlFile = F::read($klmFileLocation);

			// parse the kml file
			$xml = simplexml_load_string($kmlFile);

			// get the coordinates of the first point
			$folders = [];
			foreach ($xml->Document->Folder as $folder) {
				$marks = [];
				$features = [];
				$featureIndex = 0;
				foreach ($folder->Placemark as $placemark) {
					$featureIndex++;
					$marks[] = array(
						'name' => (string)$placemark->name,
					);
					$features[] = parsePlacemark($placemark, $featureIndex);
				}
				$folders[] = array(
					'name' => (string)$folder->name,
					'type' => 'FeatureCollection',
					'features' => $features
				);
			}

			if (get('name')) {
				$folders = array_filter($folders, function ($folder) {
					return $folder['name'] === get('name');
				});
				$folders = reset($folders);
			}

			return $folders;
		}
	]
];
