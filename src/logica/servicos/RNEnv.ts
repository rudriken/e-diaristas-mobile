import {
	NEXT_PUBLIC_API,
	NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
	/* @ts-ignore */
} from "@env";

process.env.NEXT_PUBLIC_API = NEXT_PUBLIC_API;
process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY = NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY;

const RN_ENV = {
	NEXT_PUBLIC_API,
	NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
};

for (const chave in RN_ENV) {
	if (!process.env[chave]) {
		// @ts-ignore
		process.env[chave] = RN_ENV[chave];
	}
}
