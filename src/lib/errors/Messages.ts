import { register } from './SpotifyTSError';

const messages = {
	CLIENT_OPTIONS_MISSING_OPTION: (option: string) => `ClientOptions.${option} must be provided.`,
	CLIENT_OPTION_INVALID_TYPE: (option: string, expected: string) => `ClientOptions.${option} must be typeof ${expected}.`,
	CLIENT_MISSING_ACCESS_TOKEN: 'ClientOptions.accessToken is missing. Have you called the start function?',

	MANAGER_MISSING_ARGUMENT: (manager: string, method: string, option: string) => `${manager}.${method} requires option ${option}.`,
	MANAGER_ARGUMENT_INVALID_TYPE: (manager: string, method: string, option: string, expected: string) =>
		`${manager}.${method} requires option "${option}" to be typeof ${expected}.`,
	MANAGER_ARGUMENT_OUT_OF_RANGE: (manager: string, method: string, option: string, max?: number, min?: number) =>
		`${manager}.${method} requires option "${option}" to be ${max && min ? `between ${max} and ${min}` : max ? `below ${max}` : `above ${min}`}.`
};

for (const [key, value] of Object.entries(messages)) register(key, value);
