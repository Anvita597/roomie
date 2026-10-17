import { ArrowUpRight, Heart, MapPin, ShieldCheck } from "lucide-react";
import type { Listing } from "@/data/listings";

type ListingCardProps = {
  listing: Listing;
  saved: boolean;
  onToggleSaved: (id: string) => void;
  onOpen: (listing: Listing) => void;
};

export default function ListingCard({ listing, saved, onToggleSaved, onOpen }: ListingCardProps) {
  return (
    <article className="listing-card">
      <div className="listing-image-wrap">
        <img className="listing-image" src={listing.image} alt={`${listing.rooms} in ${listing.neighborhood}`} />
        <span className="image-label"><span className="live-dot" /> Sample listing</span>
        <button
          className={`icon-button save-button ${saved ? "is-saved" : ""}`}
          type="button"
          aria-label={saved ? "Remove from saved homes" : "Save this home"}
          aria-pressed={saved}
          onClick={() => onToggleSaved(listing.id)}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="listing-content">
        <div className="listing-heading-row">
          <div>
            <p className="listing-location"><MapPin size={14} /> {listing.neighborhood}, {listing.city}</p>
            <h3>{listing.title}</h3>
          </div>
          <span className="availability-tag">Open</span>
        </div>
        <p className="listing-description">{listing.note}</p>
        <div className="listing-specs">
          <span>{listing.rooms}</span><span>{listing.furnishing}</span><span>{listing.moveIn}</span>
        </div>
        <div className="safety-preview">
          <ShieldCheck size={16} />
          <span>{listing.safety[0]}</span>
          <span className="owner-reported">Owner reported</span>
        </div>
        <div className="listing-bottom">
          <div className="rent-line"><strong>₹{listing.rent.toLocaleString("en-IN")}</strong><span>/ month</span></div>
          <button className="text-button" type="button" onClick={() => onOpen(listing)}>
            Details <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
