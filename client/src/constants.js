export const STREAMS = [
  { key: "", label: "All streams" },
  { key: "PCM", label: "Science (PCM)", icon: "🧪" },
  { key: "PCB", label: "Science (PCB)", icon: "🧬" },
  { key: "Commerce", label: "Commerce", icon: "📊" },
  { key: "Arts", label: "Arts", icon: "🎨" },
  { key: "Graduate", label: "After graduation", icon: "🎓" },
];
export const streamLabel = (k) => ({ PCM: "Science (PCM)", PCB: "Science (PCB)", Commerce: "Commerce", Arts: "Arts", Any: "Any stream", Graduate: "After graduation" }[k] || k);

export const DOMAIN_ICONS = {
  "engineering-and-technology": "⚙️", "computer-and-it": "💻", "medical-and-ayush": "🩺", "nursing-and-allied-health": "🏥",
  "pharmacy-and-veterinary": "💊", "science-and-research": "🔬", "agriculture-and-allied": "🌾", "commerce-and-finance": "📈",
  "management-and-business": "💼", law: "⚖️", "arts-and-humanities": "📚", "education-and-teaching": "🍎",
  "media-and-communication": "🎬", design: "✏️", "architecture-and-planning": "🏛️", "fine-and-performing-arts": "🎭",
  "hospitality-and-tourism": "🏨", "aviation-and-maritime": "✈️", "sports-and-physical-education": "🏅", "vocational-education": "🛠️",
};
export const domainIcon = (slug) => DOMAIN_ICONS[slug] || "🎓";

export const SECTIONS = [
  { key: "", label: "All" },
  { key: "karnataka-abroad", label: "Karnataka: study abroad", star: true },
  { key: "karnataka-india", label: "Karnataka: study in India", star: true },
  { key: "all-india", label: "All India" },
  { key: "international", label: "International" },
];
export const sectionLabel = (k) => SECTIONS.find((s) => s.key === k)?.label || k;
export const CATEGORIES = ["SC/ST", "OBC", "Minority", "General"];
