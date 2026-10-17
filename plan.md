# Roomie — implementation and design plan

## Product and implementation

Build a responsive React website for finding available flats suitable for bachelors and shared living. Use a local, clearly labeled illustrative listing dataset because no city, live listings, or verified landlord contact records were provided. Listings will expose the intended landlord-contact and viewing-rules experience using unmistakable demo-only contact placeholders rather than fabricated real contact information. Each listing will show owner-reported street and building safety details (for example, street lighting, CCTV and access), with an explicit reminder that these have not been independently verified and should be checked during a viewing.

The visitor can search locations, refine the listings by price, occupancy and facilities, save favorites locally, and open a listing details view with rent, availability, landlord rules, contact placeholder and safety information. A responsive header will offer persistent light/dark mode switching. Keep all prototype data in the browser; no server, database, login or external listings API is required for this version. The imagery and interface will be suitable for future substitution with verified photos and data.

### Project structure

- `client/src/pages/Home.tsx`: responsive landing and discovery page, filters, state, favorites, and section composition.
- `client/src/data/listings.ts`: typed illustrative property data, landlord rules, safety signals and demo-only contact placeholders.
- `client/src/components/ListingCard.tsx`: reusable listing result card and quick actions.
- `client/src/components/ListingDetailsDialog.tsx`: accessible full listing view with all viewing rules, contact details and street-safety signals.
- `client/src/App.tsx`: route shell and switchable theme provider.
- `client/src/index.css`: responsive visual system, light/dark tokens, typography, layout and motion.
- `client/public/manus-routes.json`: static route manifest for the homepage.
- `app.config.ts`: platform project logo metadata, preserving any existing fields.

## Design direction

Three distinct style candidates (probabilities sampled from the distribution's lower tail):
- Warm editorial property journal — 0.07
- Swiss transit-map utility — 0.04
- Playful neo-brutalist roommate club — 0.02

**Chosen: Warm editorial property journal.**

- **Design Movement:** Contemporary residential editorial design, pairing architectural photography and expressive print-inspired typography with a crisp digital rental interface.
- **Core Principles:** (1) Human and welcoming, never transactional. (2) Rental terms are legible before the viewing. (3) Safety indicators are transparent and attributed, not overstated. (4) Search controls stay practical and easy to reach.
- **Color Philosophy:** Warm paper and soft stone make listings feel approachable; deep evergreen communicates steadiness; a small marigold accent highlights availability and decisions. Dark mode inverts the paper palette to deep ink and muted evergreen without reducing contrast.
- **Layout Paradigm:** An asymmetrical, magazine-like entry panel pairs a large image and short editorial headline with a compact search surface. Results flow in a roomy horizontal listing rhythm; a dedicated safety strip gives area facts a visible place rather than hiding them in fine print.
- **Signature Elements:** Evergreen availability pills; small outlined “owner reported” safety chips; fine route-line and pin motifs in map-adjacent details.
- **Interaction Philosophy:** Fast, local filtering and clear toggle states; favorites and viewing details give direct feedback. Contact details remain clearly marked as sample placeholders until verified records exist.
- **Animation:** Restrained 160–220 ms transitions for color, button and card states; soft image reveal on entry and subtle focus/hover lift only. Respect `prefers-reduced-motion` and avoid parallax.
- **Typography System:** Instrument Serif for the editorial display headline and short expressive labels; DM Sans for navigation, controls, listing facts and longer descriptions, with robust system fallbacks.
- **Brand Essence:** A clearer way for bachelors and flat-sharers to find a place and understand its rules and street conditions before visiting; **thoughtful, direct, reassuring**.
- **Brand Voice:** Warm, plainspoken and specific. Examples: “A place that fits your life.” “Know the house rules before you book a viewing.”
- **Wordmark & Logo:** A custom wordmark paired with a compact line-art doorway/pin monogram, rendered in CSS/SVG rather than using a default typeface as the logo.
- **Signature Brand Color:** Deep evergreen, `#1F6B55`.

## Serving and constraints

Use the initialized React/Vite static setup on the configured port 3000 (`pnpm dev:static`), with no backend services or database. Keep route declarations synchronized with the source. The custom generated hero visual and listing photos are served from the returned project-managed image paths. Configure a static production build after inspecting current project configuration; do not activate auto-publication. User-facing information about safety, landlord rules and availability must be clearly labeled illustrative until a live verification and moderation process is added.
