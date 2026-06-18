import type { Locale } from "@/i18n/routing";

export type Localized<T> = Record<Locale, T>;

export function pickLocalized<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value["pt-BR"];
}

export function pickLocalizedList<T>(
  values: Localized<T>[],
  locale: Locale,
): T[] {
  return values.map((value) => pickLocalized(value, locale));
}
