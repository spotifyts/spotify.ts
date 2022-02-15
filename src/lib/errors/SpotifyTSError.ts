export type ErrorMessageSupplier = (...args: any[]) => string;

const messages = new Map<string, string | ErrorMessageSupplier>();

export class SpotifyTSError extends Error {
	public constructor(key: string, ...args: any[]) {
		super(getMessage(key, args));

		/**
		 * Returns an error message. Basically parsing it from the Message keys.
		 * @param {string} key: The key of the error, such as CLIENT_MISSING_OPTION
		 * @param {any[]} args: Any args to pass as the arguments, when calling the message, if the message registered is a function.
		 */
		function getMessage(key: string, args: any[]) {
			if (typeof key !== 'string') throw new Error('key must be typeof string.');

			const msg = messages.get(key);

			if (!msg) throw new Error(`Error key "${key}" does not exist or is not registered.`);
			if (typeof msg === 'function') return msg(...args);
			if (!args.length) return msg;

			args.unshift(msg);
			return String(...args);
		}
	}
}

/**
 * Registers the error message.
 * @param {string} key: The key/name of the error.
 * @param {string | ErrorMessageSupplier} message: The message of the error.
 */
export function register(key: string, value: string | ErrorMessageSupplier) {
	messages.set(key, value);
}
