export type Gender = "women" | "men" | "mixed";

export interface GenderBadge {
  label: string;
  classes: string;
  ariaLabel: string;
}

const genderBadges: Record<Gender, GenderBadge> = {
  women: {
    label: "Vrouwen",
    classes: "bg-pink-100 text-pink-700",
    ariaLabel: "Vrouwen enkel club",
  },
  men: {
    label: "Mannen",
    classes: "bg-blue-100 text-blue-700",
    ariaLabel: "Mannen enkel club",
  },
  mixed: {
    label: "Gemengd",
    classes: "bg-green-100 text-green-700",
    ariaLabel: "Gemengde club",
  },
};

export function getGenderBadge(gender?: Gender): GenderBadge | undefined {
  return gender ? genderBadges[gender] : undefined;
}
