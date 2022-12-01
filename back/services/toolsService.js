class tools {
	// prettier-ignore
	static mapAddress(address, getName = false) {
		// * Joyeux anniversaire à celui qui lit ca
		// ? De la part de Hugo <3

		this.log('Mapping address', { id: address.name, origin: 'services/toolsService', position: '9:43' })

		try {
			const getFieldValue = (components, field) => {
				const component = components.find(c => c.types.includes(field))
				return component ? component.long_name : null
			}

			let datas = {
				streetNumber: 	getFieldValue(address.address_components, 'street_number'),
				route: 			getFieldValue(address.address_components, 'route'),
				city: 			getFieldValue(address.address_components, 'locality'),
				postalCode: 	getFieldValue(address.address_components, 'postal_code'),
				country: 		getFieldValue(address.address_components, 'country'),
				addressId: 		address.place_id,
				location: {
					type: 			'Point',
					coordinates: 	[address.geometry.location.lng, address.geometry.location.lat]
				},
				_json: 			{ address },
			}

			if (getName && address.name) datas['name'] = address.name

			datas['longNames'] = {
				name: 		'',
				street: 	'',
				city: 		'',
				country: 	'',
			}


			switch (true) {
				case datas.name !== (undefined || null):
					datas['longNames'].name = datas.name
					break
			}
			
			//? STREET
			switch (true) {
				case datas.streetNumber !== (undefined || null) && datas.route !== (undefined || null):
					datas['longNames'].street = datas.streetNumber + ' ' + datas.route
					break
					
				case datas.streetNumber !== (undefined || null) && datas.route === (undefined || null):
					datas['longNames'].street = datas.streetNumber
					break
						
				case datas.streetNumber === (undefined || null) && datas.route !== (undefined || null):
					datas['longNames'].street = datas.route
					break
			}

			//? CITY
			switch (true) {
				case datas.postalCode !== (undefined || null) && datas.city !== (undefined || null):
					datas['longNames'].city = datas.postalCode + ' ' + datas.city
					break

				case datas.postalCode !== (undefined || null) && datas.city === (undefined || null):
					datas['longNames'].city = datas.postalCode
					break

				case datas.postalCode === (undefined || null) && datas.city != (undefined || null):
					datas['longNames'].city = datas.city
					break
			}

			
			//? COUNTRY
			switch (true) {
				case datas.country != (undefined || null):
					datas['longNames'].country = datas.country
			}

			let fullAddress = ''
			let $address 	= ''
			const ln = datas['longNames']
			const gn = getName && address.name

			if (ln.name && gn) 				fullAddress += ln.name
			if (ln.name && ln.street && gn) fullAddress += ', '

			if (ln.street) 				$address += ln.street
			if (ln.street && ln.city) 	$address += ', '

			if (ln.city) 				$address += ln.city
			if (ln.city && ln.country)	$address += ', '

			if (ln.country) 			$address += ln.country

			datas['fullAddress'] 	= fullAddress += $address
			datas['address'] 		= $address

			console.table({
				name:			getName ? datas.name : false,
				streetNumber: 	datas.streetNumber,
				route: 			datas.route,
				city: 			datas.city,
				postalCode: 	datas.postalCode,
				country: 		datas.country,
				fullAddress: 	datas.fullAddress,
				location: 		datas.location.coordinates.join(', '),
				addressId: 		datas.addressId,
			})
			return datas
		} catch(err) { console.log(err); return address }

	}

	// prettier-ignore
	static formatString(string, type) {

		switch (type) {
			case 'phone':
				return string.replace(/\D/g, '')

			case 'email':
				return string.replace(/\s/g, '').toLowerCase()

			default:
				return string
		}

	}

	// prettier-ignore
	static regexTest(type, string, datas) {
		//TODO Passer le type dans le { datas }
		this.log('Regex', { id: datas.all ? 'all' : type, origin: 'services/toolsService', position: '142:37', deco: '/\//' })
		
		try {
			const { 
				all, 
				test = false 
			} = datas


			const phoneRegex 	= /(\+?3{1,2} ?|0\D?\d{1}\D?)(\d.? ?){8}/g
			const urlRegex 		= /((https?:\/\/((w){3}?\.)?\w+\.\w{2,4})(\/?\w+)+(\.\w{2,})?)/g
			const mailRegex 	= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gim

			let res

			if (!all) {
				switch (type) {
					case 'phone':
						res = test
							? phoneRegex.test(string)
							: string.replace(phoneRegex, '**********')
						break
	
					case 'email':
						res = test
							? mailRegex.test(string)
							: string.replace(mailRegex, '**********')
						break
	
					case 'url':
						res = test
							? urlRegex.test(string)
							: string.replace(urlRegex, '**********')
						break
				}
			} else {
				res = test 
					? phoneRegex.test(string) ||
						mailRegex.test(string) ||
						urlRegex.test(string)
					: string
						.replace(phoneRegex, '**********')
						.replace(mailRegex, '**********')
						.replace(urlRegex, '**********')

			}
			return res

		} catch(err) { console.log(err); return string }
	}

	// prettier-ignore
	static getConvStatus(statusName) {

		const statusList = [
			{	id: -1,		date: new Date(), 	name: 'other'				},

			{	id: 1,		date: new Date(), 	name: 'sent'				},
			{	id: 2,		date: new Date(), 	name: 'seen'				},
			{	id: 3,		date: new Date(), 	name: 'answered'			},

			{	id: 10,		date: new Date(), 	name: 'visitSent'			},
			{	id: 11,		date: new Date(), 	name: 'visitAccepted'		},
			{	id: 12,		date: new Date(), 	name: 'visitRefused'		},

			{	id: 20,		date: new Date(), 	name: 'accepted'			},
			{	id: 21,		date: new Date(), 	name: 'refused'				},
			{	id: 22,		date: new Date(), 	name: 'refusedBan'			},
			{	id: 23,		date: new Date(), 	name: 'refusedDeactivate'	},

			{	id: 30,		date: new Date(), 	name: 'cronExpired'			},

			{	id: 40,		date: new Date(), 	name: 'askFolder'			},
			{	id: 41,		date: new Date(), 	name: 'sharedFolder'		},

			{	id: 50,		date: new Date(), 	name: 'externalContact'		},
		]

		const status = statusList.find(status => status.name === statusName)
		if (!status) return statusList[0]

		return status 
	}

	// prettier-ignore
	static UTC(value, options, type = '==') {
		this.log('UTC', { id: `Comparing ${value} ${type} ${options}`, origin: 'services/toolsService', position: '231:39'} )
		//? UTC stands for Ultra Cool Tool
		let found = false
	
		const compare = (target) => {
			if (type == '==' 		|| type == 'equal') 			{ return value == target 	}
			if (type == '===' 		|| type == 'exact') 			{ return value === target 	}
			if (type == '!=' 		|| type == 'different') 		{ return value != target 	}
			if (type == '!==' 		|| type == 'veryDifferent') 	{ return value !== target 	}
			if (type == '>' 		|| type == 'greater') 			{ return value > target 	}
			if (type == '<' 		|| type == 'less') 				{ return value < target 	}
			if (type == '>=' 		|| type == 'greaterOrEqual')	{ return value >= target 	}
			if (type == '<=' 		|| type == 'lessOrEqual') 		{ return value <= target 	}

			if (type == '><'		|| type == 'inside')			{ return value > options[0] || value < options[1] }
			if (type == '<>'		|| type == 'outside')			{ return value < options[0] || value > options[1] }
	
			if (type == 'in' 		|| type == 'includes') 			{ return options.includes(value) }
			if (type == 'contains' 	|| type == 'contains') 			{ return value.includes(target)  }
		}
	
		options.forEach(opt => { if (compare(opt)) found = true  })
		this.log('UTC', { id: `${found ? '' : 'not '}found`, decolor: found ? 'green' : 'red', color: found ? 'green' : 'red' })
		return found
	}

	// prettier-ignore
	static log(title, datas = {}) {
		//* Notes 	-> Utilise l'extension "Better Comments" (aaron-bond.better-comments) pour une éxperience optimale et immersive af, et si t'utilise pas vscode, t'es vraiment un gros noob (ou un gros bg qui utilise atom ou sublime text, mais bon, c'est pas comme si vscode était le meilleur éditeur de texte du monde, hein ?)
		//* Notes 1 -> GitHub Copilot est parti en couilles sur la fin de la ligne d'au dessus, j'ai pas eu le temps de tout corriger, mais ça devrait être bon, j'ai testé, et ça marche, donc bon, c'est pas comme si j'avais fait une grosse merde, hein ? (ou si j'avais fait une grosse merde, mais bon, c'est pas comme si j'avais fait une grosse merde, hein ?)
		//* Notes 2 -> Il l'a refait c'est excellent

		const presets = [ 
			//? Presets par pages
			{ name: 'home', 	size: 2, 	boldeco: true, 		color: 'yellow', 		decolor: 'yellow' 	},
			{ name: 'wizard', 	size: 1, 	boldeco: false, 	color: 'gray',	 		decolor: 'cyan',	deco: 'GW',	idColor: 'grey'	},

			//? Presets par type de model
			{ name: 'group', 	size: 2, 	boldeco: true, 		color: 'cyan', 			decolor: 'cyan' 	},
			{ name: 'user', 	size: 2, 	boldeco: true, 		color: 'magenta', 		decolor: 'magenta' 	},
			{ name: 'conv',		size: 1, 					 	color: 'blue', 			decolor: 'blue' 	},

			//? Presets par type d'action
			{ name: 'setter',	size: 1, 	boldeco: true, 		color: 'green', 		decolor: 'yellow',	deco: '><' 	},
			{ name: 'toggler',	size: 1, 	boldeco: true, 		color: 'yellow', 		decolor: 'green',	deco: '^v' 	},
			{ name: 'auth',		size: 1, 	boldeco: true, 		color: 'green', 		decolor: 'green' 	},
			{ name: 'field',	size: 1, 	decostyle: 'dim',	color: 'yellow', 		decolor: 'yellow' 	},

			//? Communication / Technos externes
			{ name: 'socket',	size: 1,	bold: true,			color: 'brightMagenta', decolor: 'gray', 	deco: '---' },
			{ name: 'whatsapp', size: 1,	bold: false,		color: 'green',			decolor: 'green', 	deco: 'w^w' },
			{ name: 'stripe',	size: 5, 					 	color: 'gray', 			decolor: 'magenta' 	},

			//? Surtout utilisés pour Stripe rn
			{ name: 'notif',	size: 2, 					 	color: 'yellow', 		decolor: 'magenta' 	},
			{ name: 'notifErr',	size: 2, 	boldeco: true, 		color: 'red', 			decolor: 'magenta' 	},

			//? Amogus
			{ name: 'sus',		size: 5, 	boldeco: true, 		color: 'red', 			decolor: 'red', 	deco: 'ඞ' 	},
		]
		
		//? Des presets, pour ne pas avoir à réécrire tout le temps les mêmes choses (couleurs, etc) et pour avoir un affichage plus propre
		//* Notes -> Penser à bien laisser le ...presets.find() avant le ...datas pour que les datas puissent écraser les presets au besoin
		if (datas['preset']) 	datas = { ...presets.find(preset => preset.name == datas['preset']), ...datas }

		//? Les arguments ont tous des valeurs par défaut pour éviter de devoir les réécrire à chaque fois
		const { 
			//? Affichage d'information supplémentaires, entre () après le title | pas forcément un id
			id = '',
			idColor = 'blue',

			//? Si err, <!> affichage différent (rouge) <!> 
			err = null,

			//? Style du title
			color = 'green',
			bold = false,
			style = 'reset',

			//? Chemin vers le fichier, position du curseur ('row:col') *Notes -> La position sert plus mais je la garde par nostalgie (<3)
			origin = null,
			position = null,

			//? Si clean pas de remplissage (./ | .js | origin) | hide = hide or not (makes sense ??) | oriColor = origin color | oriStyle = origin style
			cleanOrigin = false,
			hideOrigin = false,
			oriColor = 'gray',
			oriStyle = 'dim',
			
			//? Style de la décoration`| Size = nb de répétiton de <> / <!> | decolor = deco color | boldeco = bold deco 
			size = 3,
			decolor = 'rainbow',
			boldeco = false,
			decostyle = 'reset',
			deco = '<>',

			//? Affichage d'objet sous forme de table | keys = affichage ou non des clés de l'objet à log
			table = null,
			keys = false, 

			blank = 0,
		} = datas

		const isActive = true
		try {

			/*
			! Explications sur le package "Colors", sans qui rien ne serait aussi joli
			* Notes -> Les couleurs sont définies dans le fichier "colors.js" du package "colors"
			? Pour utiliser une couleur, les syntaxes utilisées sont les suivantes :
			?	"*contenu*" [*COLOR*] [*STYLE*]
			?	"*contenu*" [*COLOR*].*STYLE*
			?	"*contenu*" .*COLOR*[*STYLE*]
			? Voir https://www.npmjs.com/package/colors pour plus d'infos
			? Ou encore ./node_modules/colors/README.md
			*/

			const $deco = err
				? ` ${ '<!> '.repeat(size) }`.bold.red
				: ` ${ `${deco.trim()} `.repeat(size) }`[ decolor ][ boldeco ? 'bold' : decostyle ]

			const $content = id 
				? ` (${id})`[ idColor ].italic
				: ''

			const $title = title.length > 0
				? title[ err ? 'red' : color ][ bold ? 'bold' : style ]
				: err
					? 'ERROR'.bold.red
					: 'LOG'.green[ bold ? 'bold' : style ]


			/* Old Code
			! Old code
			let tmpOrigin = origin
			if (!cleanOrigin && origin) {
				if (!origin?.startsWith('./')) 	tmpOrigin = `./${origin}`
				if (!origin?.endsWith('.js')) 	tmpOrigin = `${origin}.js`
			}

			const $position = new Error().stack.split('\n')[2].trim().split('.js')[1].split(')')[0]
			! Old code */

			/* Explications sur le tracage de l'origine du log
			! 	Explications détaillée:
			?	-----------------------------------------------------------------------------------------------------
			?	new Error() génère une fausse erreur
			?	.stack retourne un string avec toutes les infos sur l'erreur
			?	.split('\n') sépare le string en un array de string
				* 0 -> Erreur
				* 1 -> Position actuelle (ici)
				* 2 -> Position de l'appel de la fonction (aka CIBLE)

			?	[2] retourne la 3ème ligne de l'array (la ligne qui contient le fichier et la position du curseur)
			?	.trim() enlève les espaces inutiles
			?	.split('.js')[1] récupère la position du curseur lors de l'appel de la fonction (juste après le fichier)
				* tools.log('hola mundo', {  })
				*      ↑ par ici le curseur
			TODO Remplacer totalement l'origin manuelle en utilisant le stack

			?	.split(')')[0] retire le ')' de la fin (logique bro suit un peu)
			?	-----------------------------------------------------------------------------------------------------
			*	c'était assez simple a faire et surement à comprendre (au pire mets des console.log() a chaque étape) mais j'ai besoin de tuer le temps alors je documente tout
			*	si avec tout ca tu galères encore, sorry mais je peux rien faire pour toi
			*	bisous
			
			//? Depuis la position dynamique plus besoin du ternaire méga stylé, adieu mon bro <3
			//* ? '- ' + `${ tmpOrigin }${ position ? position.startsWith(':') ? position : `:${position}` : '' }` [ oriColor ][ oriStyle ]
			//! const $origin = tmpOrigin 
			//! 	? '- ' + `${ tmpOrigin }${ $position }` [ oriColor ][ oriStyle ]
			//! 	: ''

			*/

			//TODO - Reworked origin
			const stack = new Error().stack

				//? Récupération de la ligne concernant le call
				.split('\n')[2].trim()

				//? Récupération de l'info entre les parenthèses (fichier concerné + ligne)
				// .split(isProd ? 'backend/' : 'back/')
				.split('AppartooAPI2\\')
				//? ↑ Route en local
				.reverse()[0].split(')')[0]

				//? Remplacement des \ par des / pour avoir un chemin correct
				.replace(/\\/g, '/')
				
			const $origin = `- ${ stack }`[ oriColor ][ oriStyle ]

			const toLog = `${ $deco }${ $title }${ $content }${ $deco }${ hideOrigin ? '' : $origin }`

			if (isActive) {
				console[ err ? 'error' : 'log' ](toLog)

				
				//? Log d'object (ex: Query du paginate)
				//* Log seulement s'il y a des données à log
				//* La condition est un chiante à lire, explications:
				//! ╔══════════╦═════════╦═════════╗
				//! ║ (index)  ║  field  ║    foo  ║  
				//! ╠══════════╬═════════╬═════════╣
				//! ║  query   ║  value  ║    bar  ║
				//! ╚══════════╩═════════╩═════════╝
				
				//? query = { field: value, foo: bar }
				//? table = { query }

				//? Object.keys(table)[0] = query
				//? Object.keys(table[Object.keys(table)[0]]) = [ 'field', 'foo' ]
				//? Object.keys(table[Object.keys(table)[0]]).length = 2	
				//? 	===> 	>= 1 donc log
				if (table && Object.keys(table[Object.keys(table)[0]]).length >= 1)	
					console.table(table)


				//? Log des clés de l'objet { clé: valeur }
				if (keys) 
					console.log('Table keys:', Object.keys(table[Object.keys(table)[0]]))


				//? Log d'erreur
				if (err) 
					console.error(typeof err == 'string' ? err.red.bold : err)


				//? Espacement en fin de log
				if (blank > 0) 
					console.log('\n'.repeat(blank))
			}
			
			return 'hola que tal'
		} catch(err) { console.log(err); return 'ayyy'  }
	}
}

module.exports = tools
