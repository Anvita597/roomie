import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Menu, Moon, Search, ShieldCheck, SlidersHorizontal, Sparkles, Sun, X } from "lucide-react";
import { listings, type Listing } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import ListingDetailsDialog from "@/components/ListingDetailsDialog";
import { useTheme } from "@/contexts/ThemeContext";

const favoriteStorageKey = "roomie-saved-homes";

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="Roomie home">
      <span className="brand-icon" aria-hidden="true">
        <svg viewBox="0 0 36 36" fill="none"><path d="M8 29V13.5L18 6l10 7.5V29" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M14 29V18h8v11M5 29h26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="14" r="1.2" fill="currentColor"/></svg>
      </span>
      <span>roomie<span className="brand-period">.</span></span>
    </a>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [maxRent, setMaxRent] = useState("30000");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [wellLitOnly, setWellLitOnly] = useState(false);
  const [cctvOnly, setCctvOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const value = localStorage.getItem(favoriteStorageKey);
      if (value) setSaved(JSON.parse(value) as string[]);
    } catch {
      setSaved([]);
    }
  }, []);

  const toggleSaved = (id: string) => {
    setSaved(current => {
      const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
      try { localStorage.setItem(favoriteStorageKey, JSON.stringify(next)); } catch { /* storage may be disabled */ }
      return next;
    });
  };

  const filteredListings = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return listings.filter(listing => {
      const matchesQuery = !query || `${listing.neighborhood} ${listing.city} ${listing.title} ${listing.safety.join(" ")}`.toLowerCase().includes(query);
      const matchesRent = listing.rent <= Number(maxRent);
      const matchesLit = !wellLitOnly || listing.safety.some(item => /well lit|lighting/i.test(item));
      const matchesCctv = !cctvOnly || listing.safety.some(item => /cctv/i.test(item));
      const matchesSaved = !savedOnly || saved.includes(listing.id);
      return matchesQuery && matchesRent && matchesLit && matchesCctv && matchesSaved;
    });
  }, [searchText, maxRent, wellLitOnly, cctvOnly, savedOnly, saved]);

  const clearFilters = () => {
    setSearchText(""); setMaxRent("30000"); setWellLitOnly(false); setCctvOnly(false); setSavedOnly(false);
  };

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#homes" onClick={() => setMobileMenuOpen(false)}>Find a home</a>
            <a href="#safety" onClick={() => setMobileMenuOpen(false)}>Safety, honestly</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <button className={`saved-nav ${savedOnly ? "active" : ""}`} type="button" onClick={() => { setSavedOnly(!savedOnly); document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" }); setMobileMenuOpen(false); }}>
              <Heart size={16} fill={savedOnly ? "currentColor" : "none"} /> Saved <span>{saved.length}</span>
            </button>
          </nav>
          <div className="header-actions">
            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}<span>{theme === "light" ? "Dark" : "Light"}</span>
            </button>
            <button className="mobile-menu-button icon-button" type="button" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> BETTER FLAT HUNTING STARTS HERE</p>
            <h1>A place that fits <em>your life.</em></h1>
            <p className="hero-description">Find a bachelor-friendly home with the house rules, owner details and neighborhood notes upfront.</p>
            <form className="search-panel" onSubmit={event => { event.preventDefault(); document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" }); }}>
              <label className="search-field">
                <span className="field-label">Where are you looking?</span>
                <span className="input-row"><Search size={18} /><input value={searchText} onChange={event => setSearchText(event.target.value)} placeholder="Try Indiranagar, Bengaluru" aria-label="Search by neighborhood or city" /></span>
              </label>
              <span className="search-divider" aria-hidden="true" />
              <label className="budget-field">
                <span className="field-label">Monthly budget</span>
                <span className="select-row"><select value={maxRent} onChange={event => setMaxRent(event.target.value)} aria-label="Maximum monthly rent"><option value="15000">Up to ₹15,000</option><option value="20000">Up to ₹20,000</option><option value="25000">Up to ₹25,000</option><option value="30000">Any budget</option></select><ChevronDown size={16} /></span>
              </label>
              <button className="search-submit" type="submit">Find my place <ArrowRight size={17} /></button>
            </form>
            <div className="hero-trust"><ShieldCheck size={16} /><span>Clear house rules. Safety notes with context. No awkward surprises.</span></div>
          </div>
          <div className="hero-art">
            <img src="/manus-storage/async-images/i5JIroE5FOvhpQ5CQOzdUw/image-1.webp" alt="Sunlit shared apartment opening onto a green balcony" />
            <div className="hero-image-note"><span className="note-icon"><Sparkles size={17} /></span><span><strong>Room to be yourself</strong><small>Find a home that feels right</small></span></div>
            <div className="hero-caption">SPACE FOR WHAT'S NEXT <span>01 / HOME</span></div>
          </div>
          <div className="hero-bottomline"><span>Thoughtful homes for your next chapter</span><a href="#homes">Explore homes <ArrowDown size={14} /></a></div>
        </section>

        <section className="sample-notice" aria-label="Sample data notice">
          <span className="notice-mark"><Sparkles size={17} /></span>
          <p><strong>A little note about these listings</strong><span>These are illustrative examples. Owner contacts, house rules and safety notes must be confirmed before a real viewing.</span></p>
          <span className="sample-badge">DEMO CONTENT</span>
        </section>

        <section className="homes-section" id="homes">
          <div className="section-topline"><div><p className="eyebrow">A HOME THAT WORKS FOR YOU</p><h2>Good places, <em>good to know.</em></h2></div><p className="section-aside">Clear details make a better first viewing.</p></div>
          <div className="results-toolbar">
            <div className="results-count"><strong>{filteredListings.length.toString().padStart(2, "0")}</strong><span>{savedOnly ? "saved homes" : "homes to explore"}</span></div>
            <div className="results-actions">
              <button className={`filter-trigger ${filtersOpen ? "active" : ""}`} type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16} /> More filters</button>
              {(searchText || maxRent !== "30000" || wellLitOnly || cctvOnly || savedOnly) && <button className="clear-filter" type="button" onClick={clearFilters}>Clear filters</button>}
            </div>
          </div>
          {filtersOpen && <div className="filter-drawer">
            <label className="filter-check"><input type="checkbox" checked={wellLitOnly} onChange={event => setWellLitOnly(event.target.checked)} /><span className="custom-check"><Check size={12} /></span><span>Owner reports well-lit access</span></label>
            <label className="filter-check"><input type="checkbox" checked={cctvOnly} onChange={event => setCctvOnly(event.target.checked)} /><span className="custom-check"><Check size={12} /></span><span>Owner reports CCTV</span></label>
            <span className="filter-disclaimer">Safety filters reflect owner notes, not independent checks.</span>
          </div>}
          {filteredListings.length ? <div className="listing-grid">
            {filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} saved={saved.includes(listing.id)} onToggleSaved={toggleSaved} onOpen={setSelectedListing} />)}
          </div> : <div className="empty-state"><span className="empty-icon"><Search size={22} /></span><h3>No homes match just yet</h3><p>Try a different area or loosen the filters to see more options.</p><button className="secondary-button" type="button" onClick={clearFilters}>Clear all filters</button></div>}
          <div className="browse-note"><span>Real listings should always show a clear point of contact.</span><span>01 — 03 <ArrowUpRight size={14} /></span></div>
        </section>

        <section className="safety-section" id="safety">
          <div className="safety-graphic" aria-hidden="true"><div className="street-map"><span className="map-road road-one"/><span className="map-road road-two"/><span className="map-road road-three"/><span className="map-pin"><ShieldCheck size={20} /></span><span className="map-dot dot-one"/><span className="map-dot dot-two"/><span className="map-dot dot-three"/></div><span className="map-caption">THE WAY HOME MATTERS, TOO</span></div>
          <div className="safety-copy"><p className="eyebrow">A CLOSER LOOK AT THE NEIGHBORHOOD</p><h2>Feel good about <em>the way home.</em></h2><p>Safety is more than a checkbox. We make the everyday details easier to ask about, so you can see what the owner says and decide what to verify in person.</p>
            <div className="safety-points"><div><span className="safety-point-icon"><Sun size={17} /></span><span><strong>Street lighting</strong><small>Is the walk from the main road well lit?</small></span></div><div><span className="safety-point-icon"><ShieldCheck size={17} /></span><span><strong>CCTV &amp; entry</strong><small>Where are cameras and how is entry managed?</small></span></div><div><span className="safety-point-icon"><ArrowUpRight size={17} /></span><span><strong>Your route, your call</strong><small>Visit at the time you'll usually be coming home.</small></span></div></div>
            <div className="honesty-note"><ShieldCheck size={17} /><span><strong>We keep the source visible.</strong> Owner-reported notes are labeled and should be checked independently.</span></div>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-heading"><p className="eyebrow">LESS GUESSWORK, MORE HOME</p><h2>Know before <em>you go.</em></h2></div>
          <div className="steps-row"><article><span className="step-number">01</span><h3>Find your fit</h3><p>Look through homes that welcome bachelor and shared living.</p></article><article><span className="step-number">02</span><h3>Read the details</h3><p>Check the rent, move-in date and the house rules the owner shares.</p></article><article><span className="step-number">03</span><h3>Ask &amp; verify</h3><p>Talk to the owner, then visit the area and check what matters to you.</p></article></div>
          <a className="how-link" href="#homes">Start exploring <ArrowRight size={16} /></a>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-main"><BrandMark /><p>A better start to finding a place of your own.</p><a href="#top">Back to top <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© 2026 Roomie. Find your place, your way.</span><span>Demo listings are for illustration only.</span></div></footer>
      <ListingDetailsDialog listing={selectedListing} onClose={() => setSelectedListing(null)} />
    </div>
  );
}
