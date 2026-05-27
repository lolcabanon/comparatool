// Same as fr
// import { formatDistance } from '../../node_modules/date-fns/locale/fr/_lib/formatDistance.mjs';
import { formatRelative } from '../../node_modules/date-fns/locale/fr/_lib/formatRelative.mjs';
import { localize } from '../../node_modules/date-fns/locale/fr/_lib/localize.mjs';
import { match } from '../../node_modules/date-fns/locale/fr/_lib/match.mjs';

// Unique for fr-CA
import { formatLong } from '../../node_modules/date-fns/locale/fr-CA/_lib/formatLong.mjs';

const formatDistanceLocale = {
	lessThanXSeconds: {
		one: '- d’une seconde',
		other: '- de {{count}} secondes'
	},

	xSeconds: {
		one: '1 seconde',
		other: '{{count}} secondes'
	},

	halfAMinute: '30 secondes',

	lessThanXMinutes: {
		one: '- d’une minute',
		other: '- de {{count}} minutes'
	},

	xMinutes: {
		one: '1 minute',
		other: '{{count}} minutes'
	},

	aboutXHours: {
		one: '~ 1 heure',
		other: '~ {{count}} heures'
	},

	xHours: {
		one: '1 heure',
		other: '{{count}} heures'
	},

	xDays: {
		one: '1 jour',
		other: '{{count}} jours'
	},

	aboutXWeeks: {
		one: '~ 1 semaine',
		other: '~ {{count}} semaines'
	},

	xWeeks: {
		one: '1 semaine',
		other: '{{count}} semaines'
	},

	aboutXMonths: {
		one: '~ 1 mois',
		other: '~ {{count}} mois'
	},

	xMonths: {
		one: '1 mois',
		other: '{{count}} mois'
	},

	aboutXYears: {
		one: '~ 1 an',
		other: '~ {{count}} ans'
	},

	xYears: {
		one: '1 an',
		other: '{{count}} ans'
	},

	overXYears: {
		one: '+ d’un an',
		other: '+ de {{count}} ans'
	},

	almostXYears: {
		one: '\u2272 un an',
		other: '\u2272 {{count}} ans'
	}
};

/**
 * @type {import('date-fns').FormatDistanceFn}
 */
export const formatDistance = (token, count, options) => {
	let result;
	const form = formatDistanceLocale[token];
	if (typeof form === 'string') {
		result = form;
	} else if (count === 1) {
		result = form.one;
	} else {
		result = form.other.replace('{{count}}', String(count));
	}

	if (options?.addSuffix) {
		if (options.comparison && options.comparison > 0) {
			return 'dans ' + result;
		} else {
			return 'il y a ' + result;
		}
	}

	return result;
};

/**
 * @category Locales
 * @summary French locale (Canada).
 * @language French
 * @iso-639-2 fra
 * @author Jean Dupouy [@izeau](https://github.com/izeau)
 * @author François B [@fbonzon](https://github.com/fbonzon)
 * @author Gabriele Petrioli [@gpetrioli](https://github.com/gpetrioli)
 */
export const frCA = {
	code: 'fr-CA',
	formatDistance: formatDistance,
	formatLong: formatLong,
	formatRelative: formatRelative,
	localize: localize,
	match: match,

	/**
	 * Unique for fr-CA
	 *
	 * @type {import('date-fns').LocaleOptions}
	 */
	options: {
		weekStartsOn: 0 /* Sunday */,
		firstWeekContainsDate: 1
	}
};

// Fallback for modularized imports:
export default frCA;
