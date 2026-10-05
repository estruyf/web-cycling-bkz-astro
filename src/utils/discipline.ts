export const DISCIPLINES = ["road", "gravel", "mtb"] as const;

export type Discipline = (typeof DISCIPLINES)[number];

export interface DisciplineBadge {
  label: string;
  classes: string;
  ariaLabel: string;
}

const disciplineBadges: Record<Discipline, DisciplineBadge> = {
  road: {
    label: "Weg",
    classes: "ww-badge disc-road",
    ariaLabel: "Wegfiets",
  },
  gravel: {
    label: "Gravel",
    classes: "ww-badge disc-gravel",
    ariaLabel: "Gravelfiets",
  },
  mtb: {
    label: "MTB",
    classes: "ww-badge disc-mtb",
    ariaLabel: "Mountainbike",
  },
};

export function getDisciplineBadge(
  discipline?: Discipline,
): DisciplineBadge | undefined {
  return discipline ? disciplineBadges[discipline] : undefined;
}

export function getDisciplineLabel(discipline: Discipline): string {
  return disciplineBadges[discipline].label;
}

/** A ride without its own discipline takes the club's main (first) one. */
export function resolveRideDiscipline(
  ride: { discipline?: Discipline },
  club: { disciplines: Discipline[] },
): Discipline {
  return ride.discipline ?? club.disciplines[0];
}

/** Every discipline a club offers: its own list plus any set on its rides. */
export function getClubDisciplines(club: {
  disciplines: Discipline[];
  rides?: { discipline?: Discipline }[];
}): Discipline[] {
  const all = new Set<Discipline>(club.disciplines);
  (club.rides ?? []).forEach((ride) => {
    if (ride.discipline) all.add(ride.discipline);
  });
  return DISCIPLINES.filter((d) => all.has(d));
}
