/**
 * Destinos públicos de los canales conversacionales de Isaak (WhatsApp y
 * Telegram). Centralizados aquí para que ningún bloque de "habla con Isaak"
 * se desincronice si cambia el número o el handle del bot.
 *
 * Override por entorno: NEXT_PUBLIC_WHATSAPP_URL / NEXT_PUBLIC_TELEGRAM_URL.
 */
export const DEFAULT_WHATSAPP_NUMBER = '34650045276';
export const DEFAULT_WHATSAPP_URL = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`;

export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? DEFAULT_WHATSAPP_URL;
export const WHATSAPP_NUMBER = WHATSAPP_URL.match(/wa\.me\/(\d+)/)?.[1] ?? DEFAULT_WHATSAPP_NUMBER;

export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/IsaakFiscalBot';
