export type Listing = {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  rent: number;
  deposit: number;
  rooms: string;
  occupancy: string;
  moveIn: string;
  furnishing: string;
  image: string;
  rules: string[];
  safety: string[];
  landlordName: string;
  landlordPhone: string | null;
  note: string;
};

/** Illustrative examples only. Replace with verified owner listings before production. */
export const listings: Listing[] = [
  {
    id: "indiranagar-room",
    title: "A sunlit room near 12th Main",
    neighborhood: "Indiranagar",
    city: "Bengaluru",
    rent: 17500,
    deposit: 50000,
    rooms: "1 room in 3BHK",
    occupancy: "1 spot",
    moveIn: "Available now",
    furnishing: "Furnished",
    image: "/manus-storage/async-images/7BUet3Jmg9GzD0vyIIrXf2/image-1.webp",
    rules: ["Quiet hours after 10:30 pm", "No smoking indoors", "Guests by prior notice"],
    safety: ["Approach reported well lit", "CCTV reported at main entrance", "Gatekeeper until 10 pm"],
    landlordName: "Owner contact",
    landlordPhone: null,
    note: "An easygoing shared home with a leafy balcony and room for a work desk.",
  },
  {
    id: "hsr-two-bedroom",
    title: "Room in a breezy, shared 2BHK",
    neighborhood: "HSR Layout",
    city: "Bengaluru",
    rent: 13500,
    deposit: 40000,
    rooms: "1 room in 2BHK",
    occupancy: "1 spot",
    moveIn: "From 1 Nov",
    furnishing: "Semi-furnished",
    image: "/manus-storage/async-images/7BUet3Jmg9GzD0vyIIrXf2/image-2.webp",
    rules: ["Shared kitchen clean-up rota", "No parties on weekdays", "Guests leave by 10 pm"],
    safety: ["Street lighting reported on the main road", "CCTV reported in common areas", "Secure entry reported"],
    landlordName: "Owner contact",
    landlordPhone: null,
    note: "A relaxed shared apartment close to cafés, groceries and everyday essentials.",
  },
  {
    id: "jayanagar-private-room",
    title: "A calm private room by the park",
    neighborhood: "Jayanagar",
    city: "Bengaluru",
    rent: 16000,
    deposit: 45000,
    rooms: "1 room in 3BHK",
    occupancy: "1 spot",
    moveIn: "From 15 Nov",
    furnishing: "Furnished",
    image: "/manus-storage/async-images/7BUet3Jmg9GzD0vyIIrXf2/image-3.webp",
    rules: ["Keep common spaces tidy", "No smoking indoors", "Overnight guests with a heads-up"],
    safety: ["Residential lane reported well lit", "CCTV reported near building entry", "Main gate locks at night"],
    landlordName: "Owner contact",
    landlordPhone: null,
    note: "A quiet home with a sunny room, a proper desk and a green view from the window.",
  },
];
