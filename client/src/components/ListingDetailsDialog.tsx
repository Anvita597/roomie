import { useEffect } from "react";
import { ArrowUpRight, Check, MapPin, ShieldCheck, X } from "lucide-react";
import type { Listing } from "@/data/listings";

type ListingDetailsDialogProps = {
  listing: Listing | null;
  onClose: () => void;
};

export default function ListingDetailsDialog({ listing, onClose }: ListingDetailsDialogProps) {
  useEffect(() => {
    if (!listing) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [listing, onClose]);

  if (!listing) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="details-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button className="icon-button dialog-close" type="button" aria-label="Close listing details" onClick={onClose}>
          <X size={19} />
        </button>
        <img className="dialog-image" src={listing.image} alt={`${listing.neighborhood} shared flat`} />
        <div className="dialog-body">
          <p className="eyebrow"><MapPin size={14} /> {listing.neighborhood}, {listing.city} <span className="sample-pill">Illustrative sample</span></p>
          <h2 id="dialog-title">{listing.title}</h2>
          <p className="dialog-intro">{listing.note}</p>
          <div className="details-rent"><strong>₹{listing.rent.toLocaleString("en-IN")}</strong> / month <span>Deposit ₹{listing.deposit.toLocaleString("en-IN")}</span></div>
          <div className="dialog-columns">
            <section>
              <h3>House rules from the owner</h3>
              <p className="section-note">Illustrative only — confirm every rule with the landlord before you decide.</p>
              <ul className="detail-list">{listing.rules.map(rule => <li key={rule}><Check size={15} />{rule}</li>)}</ul>
              <h3 className="section-heading-spaced">Landlord contact</h3>
              <div className="contact-placeholder">
                <span className="contact-icon"><ArrowUpRight size={16} /></span>
                <div><strong>{listing.landlordName}</strong><p>{listing.landlordPhone ?? "No phone number supplied for this sample listing."}</p></div>
              </div>
              <p className="section-note">Real contact details appear here only when provided and verified. This sample has no working phone number.</p>
            </section>
            <section className="safety-panel">
              <h3><ShieldCheck size={17} /> Street &amp; building safety</h3>
              <p className="section-note">Owner-reported, not independently verified. Check the route in person, including after dark.</p>
              <ul className="detail-list">{listing.safety.map(item => <li key={item}><span className="safety-bullet" />{item}</li>)}</ul>
              <div className="verify-callout"><strong>Before your viewing</strong><span>Walk the last stretch to the building, test the lighting and ask who monitors the cameras.</span></div>
            </section>
          </div>
          <div className="dialog-footer"><span>{listing.rooms} · {listing.furnishing} · {listing.moveIn}</span><span className="demo-disclaimer">Example data — not a live offer</span></div>
        </div>
      </section>
    </div>
  );
}
