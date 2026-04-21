export const TOWNS = [
  "Beveren",
  "Kruibeke",
  "Melsele",
  "Vrasene",
  "Zwijndrecht",
] as const;

export type Town = (typeof TOWNS)[number];

const TOWN_SLUGS: Record<Town, string> = {
  Beveren: "beveren",
  Kruibeke: "kruibeke",
  Melsele: "melsele",
  Vrasene: "vrasene",
  Zwijndrecht: "zwijndrecht",
};

const SLUG_TO_TOWN = Object.fromEntries(
  Object.entries(TOWN_SLUGS).map(([town, slug]) => [slug, town as Town]),
) as Record<string, Town>;

export function townToSlug(town: Town): string {
  return TOWN_SLUGS[town];
}

export function slugToTown(slug: string): Town | undefined {
  return SLUG_TO_TOWN[slug];
}

export function getTownPagePath(town: Town): string {
  return `/gemeenten/${townToSlug(town)}`;
}

export function getTownSeoMeta(
  town: Town,
  clubCount: number,
  eventCount: number,
) {
  const clubText =
    clubCount === 1 ? "1 wielerclub" : `${clubCount} wielerclubs`;
  const eventText =
    eventCount === 1
      ? "1 aankomend evenement"
      : `${eventCount} aankomende evenementen`;

  return {
    title: `Wielrennen in ${town} | Wielerclubs in ${town} — WielerWaas`,
    description:
      eventCount > 0
        ? `Ontdek ${clubText} en ${eventText} in ${town}. Bekijk vertrekpunten, wekelijkse ritten en lokale wielerevents op WielerWaas.`
        : `Ontdek ${clubText} in ${town}. Bekijk vertrekpunten, wekelijkse ritten en lokale wielerclubs op WielerWaas.`,
    intro:
      eventCount > 0
        ? `Zoek je naar wielrennen in ${town}? Hier vind je lokale wielerclubs, wekelijkse ritten en komende evenementen in ${town}.`
        : `Zoek je naar een wielerclub in ${town}? Hier vind je lokale clubs, vertrekpunten en wekelijkse ritten in ${town}.`,
  };
}
