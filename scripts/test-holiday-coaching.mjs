import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const banner = read('src/components/HolidayCoachingBanner.tsx');
const home = read('src/pages/Index.tsx');
const booking = read('src/components/BookingCalendar.tsx');

test('holiday campaign uses exact approved copy and existing paid coaching selector', () => {
  assert.match(banner, /Make a plan before the holiday gathering\./);
  assert.match(banner, /Plan your holiday coaching session/);
  assert.match(banner, /to="\/book-intervention-consultation\?type=crisis-coaching#booking"/);
  assert.match(read('src/App.tsx'), /path="\/book-intervention-consultation"/);
  assert.match(read('src/pages/BookInterventionConsultation.tsx'), /<BookingCalendar/);
  assert.match(booking, /params\.get\("type"\)/);
  assert.match(booking, /'crisis-coaching':\s*\{\s*label: 'Crisis Coaching Session',\s*durationMinutes: 60,\s*priceCents: 15000,/);
});

test('banner is homepage-only immediately after hero, not shared public/private chrome', () => {
  assert.match(home, /<Hero \/>\s*<HolidayCoachingBanner \/>/);
  assert.doesNotMatch(read('src/App.tsx'), /HolidayCoachingBanner/);
  assert.doesNotMatch(read('src/components/Navbar.tsx'), /HolidayCoachingBanner/);
});

test('stable prerender campaign has manual removal note, no new motion or clock gate', () => {
  assert.match(banner, /January 2027/);
  assert.doesNotMatch(banner, /new Date|setInterval|setTimeout/);
  assert.doesNotMatch(read('src/components/HolidayCoachingBanner.css'), /animation|transition/);
  assert.match(read('src/components/HolidayCoachingBanner.css'), /:focus-visible/);
});
