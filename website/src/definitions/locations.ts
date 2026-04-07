export type CategoryFilter = "all" | "blood" | "food" | "clothing" | "medical";

export interface LocationCategory {
  id: CategoryFilter;
  label: string;
  icon: "apps" | "bloodtype" | "restaurant" | "checkroom" | "medical_services";
}

export interface LocationCenter {
  id: string;
  badge: string;
  badgeColor: "primary" | "secondary";
  distance: string;
  name: string;
  address: string;
  hours: string;
  tags: string[];
}

export const CATEGORIES: LocationCategory[] = [
  { id: "all", label: "All Centers", icon: "apps" },
  { id: "blood", label: "Blood Donation", icon: "bloodtype" },
  { id: "food", label: "Food Support", icon: "restaurant" },
  { id: "clothing", label: "Clothing Aid", icon: "checkroom" },
  { id: "medical", label: "Medical Supplies", icon: "medical_services" },
];

export const LOCATION_CENTERS: LocationCenter[] = [
  {
    id: "phnom-penh-central",
    badge: "ACTIVE",
    badgeColor: "primary",
    distance: "1.4 km",
    name: "Phnom Penh Central Hub",
    address: "St. 240, Sangkat Chaktomuk, Phnom Penh",
    hours: "Open daily, 8:00 AM - 8:00 PM",
    tags: ["BLOOD", "PLATELETS", "MEDICAL SUPPLIES"],
  },
  {
    id: "tuol-kork-relief",
    badge: "LIMITED",
    badgeColor: "secondary",
    distance: "3.1 km",
    name: "Tuol Kork Relief Point",
    address: "St. 271, Khan Tuol Kork, Phnom Penh",
    hours: "Mon - Sat, 9:00 AM - 6:00 PM",
    tags: ["FOOD", "CLOTHING"],
  },
  {
    id: "sen-sok-community",
    badge: "ACTIVE",
    badgeColor: "primary",
    distance: "5.8 km",
    name: "Sen Sok Community Center",
    address: "St. 2004, Khan Sen Sok, Phnom Penh",
    hours: "Open daily, 7:30 AM - 7:00 PM",
    tags: ["BLOOD", "PLASMA", "FOOD"],
  },
  {
    id: "kampong-speu-mobile",
    badge: "MOBILE",
    badgeColor: "secondary",
    distance: "32 km",
    name: "Kampong Speu Mobile Unit",
    address: "National Road 4, Kampong Speu",
    hours: "Tue - Sun, 8:00 AM - 5:00 PM",
    tags: ["MEDICAL SUPPLIES", "CLOTHING"],
  },
];
