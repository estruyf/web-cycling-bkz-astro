export type Gender = "women" | "men" | "mixed";

export interface GenderBadge {
  label: string;
  classes: string;
  ariaLabel: string;
}

const genderBadges: Record<Gender, GenderBadge> = {
  women: {
    label: "Vrouwen",
    classes: "ww-badge women",
    ariaLabel: "Vrouwen enkel club",
  },
  men: {
    label: "Mannen",
    classes: "ww-badge men",
    ariaLabel: "Mannen enkel club",
  },
  mixed: {
    label: "Gemengd",
    classes: "ww-badge mixed",
    ariaLabel: "Gemengde club",
  },
};

export function getGenderBadge(gender?: Gender): GenderBadge | undefined {
  return gender ? genderBadges[gender] : undefined;
}
