'use client';

import { useState } from 'react';

const propertyTypes = ['Single Family Home', 'Townhouse / Patio Home', 'Condo', 'Multi-Family', 'Land / Lot'];

const tucssonAreas = [
  'Northwest Tucson', 'Northeast Tucson', 'Midtown Tucson', 'Downtown / Historic',
  'South Tucson', 'Eastside', 'Marana', 'Oro Valley', 'Sahuarita', 'Vail', 'No preference',
];

const mustHaveOptions = [
  '2-car garage', '3+ car garage', 'RV gate / RV parking', 'Pool', 'Covered patio',
  'Large backyard', 'Single story', 'Guest bedroom / casita', 'Home office / flex room',
  'Open floor plan', 'Indoor laundry room', 'Updated kitchen', 'Updated bathrooms',
  'Primary bedroom on main floor', 'No HOA', 'Corner lot',
];

const niceToHaveOptions = [
  'Mountain / city views', 'Solar panels', 'Smart home features', 'Fireplace',
  'Community pool / gym', 'Gated community', 'Near parks / trails', 'Near top-rated schools',
  'Short commute to I-10', 'New construction', 'Workshop / extra garage space',
];

const includedAppliances = [
  'Refrigerator', 'Washer & Dryer', 'Dishwasher', 'Microwave', 'Stove / Range',
  'Window treatments / blinds', 'Outdoor furniture / BBQ grill',
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  propertyType: string[];
  minBeds: string;
  minBaths: string;
  minSqft: string;
  maxSqft: string;
  areas: string[];
  mustHaves: string[];
  niceToHaves: string[];
  minBudget: string;
  maxBudget: string;
  moveInDate: string;
  flexibleMoveIn: string;
  appliancesWanted: string[];
  additionalNotes: string;
}

const initial: FormState = {
  name: '', email: '', phone: '',
  propertyType: [],
  minBeds: '', minBaths: '',
  minSqft: '', maxSqft: '',
  areas: [],
  mustHaves: [], niceToHaves: [],
  minBudget: '', maxBudget: '',
  moveInDate: '', flexibleMoveIn: '',
  appliancesWanted: [],
  additionalNotes: '',
};

function toggle(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm" style={{ fontFamily: 'var(--font-body)' }}>
      <span
        className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
        style={{
          borderColor: checked ? 'var(--color-maroon)' : 'var(--color-cream-dark)',
          background: checked ? 'var(--color-maroon)' : 'white',
        }}
      >
        {checked && <span className="text-white text-xs font-bold">✓</span>}
      </span>
      <span className="opacity-80">{label}</span>
    </label>
  );
}

export default function WishListForm({ base }: { base: string }) {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState, val: string) =>
    setForm(f => ({ ...f, [field]: val }));

  const toggleArr = (field: 'propertyType' | 'areas' | 'mustHaves' | 'niceToHaves' | 'appliancesWanted', val: string) =>
    setForm(f => ({ ...f, [field]: toggle(f[field] as string[], val) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      ``,
      `=== PROPERTY TYPE ===`,
      form.propertyType.join(', ') || 'Not specified',
      ``,
      `=== SIZE ===`,
      `Bedrooms: ${form.minBeds || 'Any'}+`,
      `Bathrooms: ${form.minBaths || 'Any'}+`,
      `Square Footage: ${form.minSqft || 'Any'} – ${form.maxSqft || 'Any'} sq ft`,
      ``,
      `=== PREFERRED AREAS ===`,
      form.areas.join(', ') || 'No preference',
      ``,
      `=== MUST-HAVES ===`,
      form.mustHaves.join(', ') || 'None selected',
      ``,
      `=== NICE TO HAVES ===`,
      form.niceToHaves.join(', ') || 'None selected',
      ``,
      `=== BUDGET ===`,
      `$${form.minBudget || '?'} – $${form.maxBudget || '?'}`,
      ``,
      `=== MOVE-IN TIMELINE ===`,
      `Target date: ${form.moveInDate || 'Not specified'}`,
      `Flexible on closing date: ${form.flexibleMoveIn || 'Not specified'}`,
      ``,
      `=== APPLIANCES / ITEMS TO INCLUDE ===`,
      form.appliancesWanted.join(', ') || 'None specified',
      ``,
      `=== ADDITIONAL NOTES ===`,
      form.additionalNotes || 'None',
    ];

    const body = encodeURIComponent(lines.join('\n'));
    const subject = encodeURIComponent(`Home Wish List from ${form.name}`);
    window.location.href = `mailto:NinaFloresRealty@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    color: 'var(--color-charcoal)',
    fontSize: '0.8125rem',
    fontWeight: 600,
    opacity: 0.7,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    borderColor: 'var(--color-cream-dark)',
    background: 'white',
  };

  const sectionHead = (title: string) => (
    <div className="mb-4 pb-2" style={{ borderBottom: '2px solid var(--color-cream-dark)' }}>
      <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>{title}</h2>
    </div>
  );

  if (submitted) {
    return (
      <div className="text-center py-16 rounded-sm px-8" style={{ background: 'var(--color-white)' }}>
        <p className="text-4xl mb-4">🏡</p>
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
          Your wish list is on its way!
        </h2>
        <p className="text-sm opacity-70 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          Your email app should have opened with your wish list pre-filled. Nina will follow up with matches as soon as she reviews it.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm underline opacity-60"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Edit my wish list
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* Contact info */}
      <div className="rounded-sm p-6 space-y-5" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Your Contact Info')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" style={labelStyle}>Full Name *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Jane Smith"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none focus:ring-1"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--color-maroon)' } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block mb-1" style={labelStyle}>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="520-000-0000"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1" style={labelStyle}>Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="jane@email.com"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Property type */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Type of Home')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {propertyTypes.map(t => (
            <CheckOption
              key={t}
              label={t}
              checked={form.propertyType.includes(t)}
              onChange={() => toggleArr('propertyType', t)}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="rounded-sm p-6 space-y-4" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Size Requirements')}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Min Bedrooms', field: 'minBeds', opts: ['1', '2', '3', '4', '5+'] },
            { label: 'Min Bathrooms', field: 'minBaths', opts: ['1', '1.5', '2', '2.5', '3+'] },
          ].map(({ label, field, opts }) => (
            <div key={field} className="sm:col-span-2">
              <label className="block mb-1" style={labelStyle}>{label}</label>
              <select
                value={form[field as keyof FormState] as string}
                onChange={e => set(field as keyof FormState, e.target.value)}
                className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
                style={inputStyle}
              >
                <option value="">Any</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block mb-1" style={labelStyle}>Min Sq Ft</label>
            <input
              type="number"
              value={form.minSqft}
              onChange={e => set('minSqft', e.target.value)}
              placeholder="e.g. 1200"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1" style={labelStyle}>Max Sq Ft</label>
            <input
              type="number"
              value={form.maxSqft}
              onChange={e => set('maxSqft', e.target.value)}
              placeholder="e.g. 2500"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Preferred Areas in Tucson')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tucssonAreas.map(a => (
            <CheckOption
              key={a}
              label={a}
              checked={form.areas.includes(a)}
              onChange={() => toggleArr('areas', a)}
            />
          ))}
        </div>
      </div>

      {/* Must-haves */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Must-Haves')}
        <p className="text-xs mb-4 opacity-60" style={{ fontFamily: 'var(--font-body)' }}>These are non-negotiable — homes missing these will be filtered out.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mustHaveOptions.map(o => (
            <CheckOption
              key={o}
              label={o}
              checked={form.mustHaves.includes(o)}
              onChange={() => toggleArr('mustHaves', o)}
            />
          ))}
        </div>
      </div>

      {/* Nice to haves */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Nice to Haves')}
        <p className="text-xs mb-4 opacity-60" style={{ fontFamily: 'var(--font-body)' }}>Preferences that would be great but won't eliminate a home from the list.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {niceToHaveOptions.map(o => (
            <CheckOption
              key={o}
              label={o}
              checked={form.niceToHaves.includes(o)}
              onChange={() => toggleArr('niceToHaves', o)}
            />
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Budget Range')}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" style={labelStyle}>Min ($)</label>
            <input
              type="number"
              value={form.minBudget}
              onChange={e => set('minBudget', e.target.value)}
              placeholder="e.g. 200000"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1" style={labelStyle}>Max ($)</label>
            <input
              type="number"
              value={form.maxBudget}
              onChange={e => set('maxBudget', e.target.value)}
              placeholder="e.g. 400000"
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Timeline & flexibility */}
      <div className="rounded-sm p-6 space-y-4" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Move-In Timeline')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" style={labelStyle}>Target Move-In Date</label>
            <input
              type="month"
              value={form.moveInDate}
              onChange={e => set('moveInDate', e.target.value)}
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1" style={labelStyle}>Flexible on Closing Date?</label>
            <select
              value={form.flexibleMoveIn}
              onChange={e => set('flexibleMoveIn', e.target.value)}
              className="w-full border rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Very flexible">Very flexible</option>
              <option value="Somewhat flexible">Somewhat flexible</option>
              <option value="Need a specific date">Need a specific date</option>
            </select>
          </div>
        </div>
        <p className="text-xs opacity-50" style={{ fontFamily: 'var(--font-body)' }}>
          Tip: Being flexible on your possession date can make your offer more attractive to sellers.
        </p>
      </div>

      {/* Appliances to include */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Appliances / Items You\'d Like Included')}
        <p className="text-xs mb-4 opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
          Which items staying in the home matter to you? These can often be negotiated as part of the offer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {includedAppliances.map(a => (
            <CheckOption
              key={a}
              label={a}
              checked={form.appliancesWanted.includes(a)}
              onChange={() => toggleArr('appliancesWanted', a)}
            />
          ))}
        </div>
      </div>

      {/* Additional notes */}
      <div className="rounded-sm p-6" style={{ background: 'var(--color-white)' }}>
        {sectionHead('Anything Else?')}
        <textarea
          value={form.additionalNotes}
          onChange={e => set('additionalNotes', e.target.value)}
          rows={4}
          placeholder="School districts, specific streets, deal-breakers, anything else Nina should know..."
          className="w-full border rounded-sm px-3 py-2 text-sm outline-none resize-y"
          style={inputStyle}
        />
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="px-10 py-4 rounded-sm font-bold text-base text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
        >
          Send My Wish List to Nina
        </button>
        <p className="text-xs mt-3 opacity-50" style={{ fontFamily: 'var(--font-body)' }}>
          This opens your email app with your wish list pre-filled and addressed to Nina.
        </p>
      </div>
    </form>
  );
}
