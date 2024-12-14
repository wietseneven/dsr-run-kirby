mapboxgl.accessToken =
	"pk.eyJ1Ijoid2lldHNlbmV2ZW4iLCJhIjoiY2p0d3VicnZ3MTV1aTRlcnRlbXBtYmQ0bSJ9.R96vT_uCERgM4DUOvrcimw"
const map = new mapboxgl.Map({
	container: "map", // container ID
	style: "mapbox://styles/wietseneven/clyj0bkss011501qp6viz410w",
	center: [7.00704, 52.2628], // starting position
	zoom: 18, // starting zoom
	// pitch: 45,
	// bearing: 80.6,
	container: "map",
	antialias: true,
	attributionControl: false
})

map.addControl(new mapboxgl.NavigationControl())

map.on("style.load", () => {
	map.addSource("afzettingen", {
		type: "geojson",
		data: "/mymaps/1QmmMflrnUFI6ERAIJWnJDUD5XLn_bzg/kmz?name=Afzettingen"
	})

	map.addLayer({
		id: "afzettingen",
		metadata: {
			name: "Afgezet gebied",
			labels: {
				"#ff0000": "Wegen",
				"#000": false
			}
		},
		type: "line",
		source: "afzettingen",
		layout: {
			"line-join": "round",
			"line-cap": "round"
		},
		paint: {
			"line-color": "#ff0000",
			"line-width": 35,
			"line-opacity": 0.25
		}
	})

	map.addSource("route", {
		type: "geojson",
		data: "/assets/models/tracks.geojson"
	})

	// Basisbreedte variabele
	const baseWidth = 5

	// Definieer de gemeenschappelijke eigenschappen
	const commonPaint = {
		"line-width": baseWidth
	}

	const commonLayout = {
		// 'line-join': 'round', // Ronde hoeken bij de lijnverbindingen
		"line-cap": "round" // Ronde uiteinden van de lijnen
	}

	// Definieer routes met hun respectievelijke eigenschappen
	const routes = [
		{ id: "route-6km", color: "#000000", filterValue: "Route 6km" },
		{ id: "route-8km", color: "#00b0e3", filterValue: "Route 8km" },
		{ id: "route-14km", color: "#ff8100", filterValue: "Route 14km" },
		{ id: "hoogwater", color: "#00b0e3", filterValue: "Hoogwater" }
	]

	// Voeg dynamische achtergrondlaag met zwarte rand toe
	map.addLayer({
		id: "route-background-border",
		type: "line",
		source: "route",
		layout: {
			...commonLayout
		},
		paint: {
			"line-color": "#000000",
			"line-width": [
				"interpolate",
				["linear"],
				["length", ["get", "lines"]],
				1,
				baseWidth + 2 + 1, // Bij 1 route is de breedte iets groter dan de basisbreedte
				2,
				(baseWidth + 2) * 2 + 1, // Bij 2 routes is de breedte iets groter
				3,
				(baseWidth + 2) * 3 + 1, // Bij 3 routes is de breedte iets groter
				4,
				(baseWidth + 2) * 4 + 1 // Bij maximaal 4 routes is de breedte iets groter
			]
		}
	})

	map.addLayer({
		id: "route-background",
		type: "line",
		source: "route",
		layout: {
			...commonLayout
		},
		paint: {
			"line-color": "#ffffff",
			"line-width": [
				"interpolate",
				["linear"],
				["length", ["get", "lines"]],
				1,
				baseWidth + 2, // Bij 1 route is de breedte 3 keer de basisbreedte
				2,
				(baseWidth + 2) * 2, // Bij 2 routes is de breedte de basisbreedte keer het aantal routes + 1
				3,
				(baseWidth + 2) * 3, // Bij 3 routes is de breedte de basisbreedte keer het aantal routes + 1
				4,
				(baseWidth + 2) * 4 // Bij maximaal 4 routes is de breedte de basisbreedte keer het aantal routes + 1
			]
		}
	})

	const routeIndexExpression = (routeValue) => [
		"index-of",
		routeValue,
		["get", "lines"]
	]

	// Voeg de route lagen toe met behulp van een lus
	routes.forEach((route) => {
		map.addLayer({
			id: route.id,
			type: "line",
			source: "route",
			layout: {
				...commonLayout
			},
			metadata: {
				name: route.name,
				labels: {
					[route.color]: route.filterValue,
					["#00b0e3"]: "Route 8km",
					["#ff8100"]: "Route 14km",
					["#000000"]: "Route 6km"
				}
			},
			paint: {
				...commonPaint,
				"line-color": route.color,
				"line-offset": [
					"interpolate",
					["linear"],
					["length", ["get", "lines"]],
					1,
					0, // Geen offset voor één enkele lijn
					2,
					[
						"*",
						["-", routeIndexExpression(route.filterValue), 0.5],
						baseWidth + 1
					], // Dynamische offset voor 2 routes
					3,
					[
						"*",
						["-", routeIndexExpression(route.filterValue), 1],
						baseWidth + 1
					], // Dynamische offset voor 3 routes
					4,
					[
						"*",
						["-", routeIndexExpression(route.filterValue), 1.5],
						baseWidth + 1
					] // Dynamische offset voor 4 routes
				],
				...(route.id === "hoogwater"
					? { "line-dasharray": [2, 4], "stroke-width": 4 }
					: {})
			},
			filter: [">=", ["index-of", route.filterValue, ["get", "lines"]], 0]
		})
	});

	map.addSource("fietsroute", {
		type: "geojson",
		data: "/mymaps/1QmmMflrnUFI6ERAIJWnJDUD5XLn_bzg/kmz?name=Fietsroute",
	});

	map.addLayer({
		id: "fietsroute",
		type: "line",
		source: "fietsroute",
		layout: {
			...commonLayout
		},
		metadata: {
			name: "Fietsroute",
			// labels: {
			// 	[route.color]: route.filterValue,
			// 	["#00b0e3"]: "Route 8km",
			// 	["#ff8100"]: "Route 14km",
			// 	["#000000"]: "Route 6km"
			// }
		},
		paint: {
			"line-color": "#00ff00",
			"line-width": 2,
		}
	})

	map.addSource("plein-indeling", {
		type: "geojson",
		data: "/assets/models/indeling.geojson"
	})
	map.addLayer({
		id: "plein-indeling",
		type: "fill-extrusion",
		source: "plein-indeling",
		filter: ["!=", "type", "Marker"],
		paint: {
			"fill-extrusion-color": ["get", "fill"],
			"fill-extrusion-height": ["get", "height"],
			// 'fill-extrusion-base': ['get', 'base_height'],
			"fill-extrusion-opacity": 1
		}
	})

	map.addLayer({
		id: "plein-indeling-labels",
		type: "symbol",
		source: "plein-indeling",
		metadata: {
			name: "Plein indeling",
			labels: {
				// '#fff': false,
				// '#000': false,
			}
		},
		filter: ["==", "type", "Marker"],
		layout: {
			"text-field": ["get", "title"],
			"text-allow-overlap": false,
			"text-field": [
				"format",
				["get", "title"],
				{ "font-scale": 1 },
				"\n",
				{},
				["downcase", ["get", "description"]],
				{ "font-scale": 0.8 }
			],
			"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
			"text-line-height": 1.2,
			"text-anchor": "bottom"
		},
		paint: {
			"text-color": "#000",
			"text-halo-color": "#fff",
			"text-halo-width": 2,
			"text-halo-blur": 1
		}
	})

	// map.loadImage(
	// 	"/assets/icons/traffic/traffic-controller-marker.png",
	// 	(error, image) => {
	// 		if (error) throw error
	// 		map.addImage("traffic-controller", image, { sdf: false })
	// 	}
	// )

	// map.loadImage(
	// 	"/assets/icons/traffic/traffic-controller-marker-high-water.png",
	// 	(error, image) => {
	// 		if (error) throw error
	// 		map.addImage("traffic-controller-high-water", image, { sdf: false })
	// 	}
	// )

	map.loadImage("/assets/icons/traffic/c1.png", (error, image) => {
		if (error) throw error
		map.addImage("c1", image, { sdf: false })
	})

	// map.loadImage("/assets/icons/traffic/30.png", (error, image) => {
	// 	if (error) throw error
	// 	map.addImage("speed-30", image, { sdf: false })
	// })

	map.loadImage("/assets/icons/traffic/warning.png", (error, image) => {
		if (error) throw error
		map.addImage("warning", image, { sdf: false })
	})

	map.addSource("traffic-controllers", {
		type: "geojson",
		data: "/assets/models/traffic.geojson"
	})

	map.addLayer({
		id: "traffic-controllers",
		metadata: {
			name: "Verkeersregelaars",
			labels: {
				"traffic-controller-high-water": "Hoogwater verkeersregelaar",
				"traffic-controller": "Verkeersregelaar",
				other: false
			}
		},
		type: "symbol",
		source: "traffic-controllers",
		layout: {
			"icon-image": [
				"match",
				["get", "name"],
				"Hoogwater verkeersregelaar",
				"traffic-controller-marker-high-water",
				"Verkeersregelaar",
				"traffic-controller-marker",
				"Verkeersbord 30km/h",
				"speed-30",
				"Wegafsluiting",
				"c1",
				"warning"
			],
			"icon-size": [
				"match",
				["get", "name"], // Voorbeeld conditie, pas aan naar jouw data
				"Wegafsluiting",
				0.8,
				"Verkeersbord 30km/h",
				0.4,
				"Pionnen",
				0,
				0.5
			],
			"icon-anchor": [
				"match",
				["get", "name"], // Voorbeeld conditie, pas aan naar jouw data
				"Wegafsluiting",
				"center",
				"Verkeersbord 30km/h",
				"center",
				"bottom"
			],
			"icon-allow-overlap": true
		}
	})

	// Voeg een click event toe voor de popups
	map.on("click", "traffic-controllers", (e) => {
		const coordinates = e.features[0].geometry.coordinates.slice()
		const { name, description } = e.features[0].properties

		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(`<strong>${name}</strong><p>${description}</p>`)
			.addTo(map)
	})

	// Verander de cursor naar een pointer wanneer deze over de layer gaat
	map.on("mouseenter", "traffic-controllers", () => {
		map.getCanvas().style.cursor = "pointer"
	})

	// Verander de cursor terug naar normaal wanneer deze niet meer over de layer gaat
	map.on("mouseleave", "traffic-controllers", () => {
		map.getCanvas().style.cursor = ""
	})

	// Voeg een laag toe om "Pionen" paden weer te geven als gestippelde lijnen
	map.addLayer({
		id: "pionnen-paths",
		type: "line",
		source: "traffic-controllers",
		filter: ["in", "name", "Pionnen"],
		layout: {
			"line-join": "round",
			"line-cap": "round"
		},
		paint: {
			"line-color": "#F78803",
			"line-width": 4,
			"line-dasharray": [2, 2],
			"stroke-width": 2,
			stroke: "#000000"
		}
	})

	map.on("click", "pionnen-paths", (e) => {
		const coordinates = e.lngLat
		const { name, description } = e.features[0].properties

		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(`<strong>${name}</strong><p>${description}</p>`)
			.addTo(map)
	})

	map.on("mouseenter", "traffic-controllers-layer", () => {
		map.getCanvas().style.cursor = "pointer"
	})

	map.on("mouseenter", "pionnen-paths", () => {
		map.getCanvas().style.cursor = "pointer"
	})

	map.addSource("obstacles", {
		type: "geojson",
		data: "/mymaps/1QmmMflrnUFI6ERAIJWnJDUD5XLn_bzg/kmz?name=Hindernissen"
	})
	// Voeg een laag toe om de obstacles weer te geven met cirkels
	map.addLayer({
		id: "obstacles-layer",
		type: "circle",
		source: "obstacles",
		paint: {
			"circle-radius": 10,
			"circle-color": "yellow",
			"circle-stroke-width": 1,
			"circle-stroke-color": "#000"
		}
	})

	// Voeg een laag toe om de index van obstacles weer te geven
	map.addLayer({
		id: "obstacles-text-layer",
		type: "symbol",
		source: "obstacles",
		layout: {
			"text-field": ["get", "index"],
			"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
			"text-size": 12,
			"text-offset": [0, 0],
			"text-anchor": "center"
		},
		paint: {
			"text-color": "#000"
		}
	})

	// Voeg een click event toe voor de popups op obstacles
	map.on("click", "obstacles-layer", (e) => {
		const coordinates = e.features[0].geometry.coordinates.slice()
		const { index, description } = e.features[0].properties

		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(`<strong>Hindernis ${index}</strong><p>${description || ""}</p>`)
			.addTo(map)
	})
	map.on("mouseenter", "obstacles-layer", () => {
		map.getCanvas().style.cursor = "pointer"
	})
	map.on("mouseleave", "obstacles-layer", () => {
		map.getCanvas().style.cursor = ""
	})

	const legend = new LegendControl({
		title: "Legenda",
			layers: {
				// Show all properties in this layer
				"plein-indeling-labels": {
					toggler: ["plein-indeling-labels"],
					collapsed: false,
					highlight: true
					// attributes: [],
					// attributes: ['title', 'image-name'],
				},
				afzettingen: {
					title: "Afgezet gebied",
					collapsed: false,
					toggler: ["afzettingen", "afzettingen-borden"],
					highlight: true
					// attributes: ['title', 'image-name'],
				},
				"route-14km": {
					toggler: [...routes.map((route) => route.id)]
				},
				"traffic-controllers": {
					title: "Verkeersregelaars",
					collapsed: false,
					toggler: ["traffic-controllers"]
				},
				"fietsroute": {
					title: "Fietsroute",
					collapsed: false,
					toggler: ["fietsroute"]
				},
				// Show only selected properties in this layer
				// population: ['circle-radius'],
				// // Fine grained options per layer
				// pois: {
				// 	collapsed: true,
				// 	toggler: false,
				// 	highlight: true,
				// 	attributes: ['circle-radius'],
				// }
			}
	})
	map.addControl(legend, "bottom-left");


	map.addControl(new MapboxExportControl.MapboxExportControl({
		PageSize: MapboxExportControl.Size.A4,
		PageOrientation: MapboxExportControl.PageOrientation.Portrait,
		Format: MapboxExportControl.Format.PDF,
		DPI: MapboxExportControl.DPI[300],
		Crosshair: true,
		PrintableArea: true,
		Local: 'nl',
		accessToken: mapboxgl.accessToken
	}), 'top-right');
})
