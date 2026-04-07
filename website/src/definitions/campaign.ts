// components/campaigns-page/types.ts

export type CampaignFilter = "all" | "blood" | "food" | "medical" | "shelter";

export interface Campaign {
  id: string;
  badge: string;
  badgeBg: string;
  image: string;
  imageAlt: string;
  location: string;
  title: string;
  description: string;
  pct: number;
  metric: string;
  primaryCta: string;
  secondaryCta?: string;
  filter: CampaignFilter;
}

export const FILTER_TABS: { id: CampaignFilter; label: string }[] = [
  { id: "all", label: "All Missions" },
  { id: "blood", label: "Blood Support" },
  { id: "food", label: "Food & Aid" },
  { id: "medical", label: "Medical Relief" },
  { id: "shelter", label: "Shelter" },
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: "blood-drive",
    badge: "URGENT",
    badgeBg: "#670017",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvEt4cyjY8lo7JAcR6D8jTc2oInWzBTNak0cxeiArO3-Jo4ypcH1QZ7uuU0VZrnFuCtimi6rPwVF0e7pt9IUQrJt9obUyIYrba25VEkQq5gsB0vkbmVIqZ-2rggmWDy3eHpUoUYzfKnD-n-K0q7fg5YZUt7HZq_3E4_V4FDfDylkJeTt8Ddf78BkCd6PFOduxh6iOxOcu5KbBYOkX97Noc0dQaAJdxHIrXua3MqGzhEc2v5qEUTUhZeFk9qS9zIZP3VGSr1ZOV-KEm",
    imageAlt: "Blood donation process",
    location: "Eastern Province",
    title: "Blood Drive Eastern Province",
    description:
      "Providing critical type-O negative supplies to local hospitals following recent seasonal surges.",
    pct: 78,
    metric: "420/500 Units",
    primaryCta: "Donate Blood",
    filter: "blood",
  },
  {
    id: "flood-relief",
    badge: "FOOD DRIVE",
    badgeBg: "#9c404b",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAcP6eZaaAtY8MgkiJuN4w7OXFxW84szLoGolWDpeOrYrYg9YT-gFLm_sespRVkoDhzlr98ptG1uhS1KVYHixKkzTMXfbdd8R0H9NexeYfsIzkZ-oVMELABgYCKpELbTNOxtjOy6DgsU5zbcHUm6Wjjvjgqv4xoa5fW0Jf8rQy-jpYQ4F3zYTj5HQkJRmLfuj_Gj4rR-1jq0upGDwt-LxdmLM2u2SoGma0uWRJRvhUnC9RGGjaZIeSDggqcvZGyohDdiOzjk8iA-kl",
    imageAlt: "Rescue workers in flooded area",
    location: "Coastal Regions",
    title: "Coastal Flood Relief",
    description:
      "Delivering dry rations and clean water to over 2,000 families displaced by flash flooding.",
    pct: 45,
    metric: "$12,400 / $28,000",
    primaryCta: "Donate Money",
    secondaryCta: "Volunteer",
    filter: "food",
  },
  {
    id: "pediatric",
    badge: "HEALTHCARE",
    badgeBg: "#512122",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyNns627fRqCQH_E53soyTlqn9Sz30mDjrxIgxDZmmhRlclcKG47GIbZ3XXxDdVmpq-1RUb_T85ZBj8wFAxjhGVVTHC9un1rpYPhwMFe7Uo_XZomY1PwDm2rG1v2FEqyOn20DmQsSkIffN1hJ9drlG5VkZUTts4ibg6YbeC7zGXk6VgKSiYLcw_fP5PyOE-ichAUYED-xHv71VYcomDCHIdUXyiuYOvzt3PDekxJg5jnLfkxCq5sbK2KFwigMSwdVEeo0ccFS9UQkU",
    imageAlt: "Pediatric hospital ward",
    location: "Central City Hospital",
    title: "Pediatric Ward Supplies",
    description:
      "Procuring specialized ventilation and monitoring equipment for neonatal care units.",
    pct: 92,
    metric: "$46,000 / $50,000",
    primaryCta: "Donate Now",
    filter: "medical",
  },
];
