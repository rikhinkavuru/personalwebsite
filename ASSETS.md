# Assets to drop in

Everything below is optional. The site renders correctly without any of it —
missing images fall back to lettered tiles, and missing postcards remove
themselves from the sentence. Drop a file in the right place and it appears; no
code change needed unless noted.

## 1. Profile photo — done

`public/avatar.jpg`, centre-cropped square from the photo you sent. Replace by
overwriting that path with another square image.

## 2. Logos — done

All nine tiles are in `public/logos/` as 256x256 full-bleed PNGs, built to read
as app icons (the tile clips them to a rounded square, so they fill it edge to
edge rather than sitting contained inside it).

| Logo | Source |
| --- | --- |
| `telo.png`, `inkr.png`, `linkd.png` | Files you sent, trimmed and squared |
| `convexia.png` | convexia.bio web clip |
| `broad.png` | Blue mark cropped from the Broad wordmark |
| `yale.png` | Yale School of Medicine shield |
| `adaptyv.png` | adaptyvbio.com icon |
| `purdue.png` | pfw.edu touch icon |
| `virahacks.png` | virahacks.com favicon, inverted onto brand green |

Replace any of them by dropping a new square PNG at the same path. Brand hover
tints live in `marks` in `lib/content.ts`.

## 3. Postcards — in, captions pending

Two files per postcard: a small inline crop and the full image the modal opens.
Both are cropped to **3:2**.

```
public/postcards/fort-wayne-thumb.jpg  +  fort-wayne.jpg
public/postcards/sf-thumb.jpg          +  sf.jpg
```

`fort-wayne` is the southern shore of Lake Michigan. The `sf` pair is still on
disk and still defined in `postcards`, but nothing renders it — the bio dropped
that clause. Re-adding it is one `<Postcard card={postcards.sf} />`.

The Lake Michigan photo's camera specs are set by hand in `postcards.home.exif`
— Photos strips EXIF from its renders, so they could not be read off the file.

Inline links can carry a website preview: give that mark a `preview` path in
`marks` and hovering the name floats the screenshot above the line. Yale and
Adaptyv use `public/previews/`.

Captions, alt text, and the EXIF line live in `postcards` in `lib/content.ts`.
The `exif` field is blank by default; fill it in for kominko's
`Shot on iPhone 16 Pro · 24mm · ƒ/1.8 · ISO 50 · 1/1385s` line, or leave it
empty and only the caption shows.

To add, remove, or relocate a postcard, edit the `postcards` object and the
corresponding `<Postcard card={...} />` in `app/page.tsx`.

## 4. Spotify

The track is currently hardcoded in `nowPlaying` (lib/content.ts) to
collage by Gunna, with the cover at `public/music/collage.jpg`.
Hovering the equaliser bars opens the album card, which links to the track.

To swap it, change `nowPlaying` and drop a new square cover at that path.

To make it live instead, set these three environment variables; whatever
`/api/spotify` returns takes over from the hardcoded track.

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Getting them:

1. Create an app at <https://developer.spotify.com/dashboard>. Copy the Client
   ID and Client Secret.
2. Add `http://localhost:3000/callback` as a Redirect URI in the app settings.
3. Visit this URL in a browser, replacing `CLIENT_ID`, and approve:

   ```
   https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
   ```

4. You land on a broken `localhost/callback?code=...` page. Copy the `code`.
5. Exchange it for a refresh token:

   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Authorization: Basic $(printf '%s:%s' CLIENT_ID CLIENT_SECRET | base64)" \
     -d grant_type=authorization_code \
     -d code=THE_CODE \
     -d redirect_uri=http://localhost:3000/callback
   ```

   The `refresh_token` in the response does not expire. Put all three in
   `.env.local` locally and in the Vercel project's environment variables for
   production.

The equaliser bars are already on the page and already moving; credentials add
the track name and make them link to Spotify. With a track playing the bars
animate, and they hold still when playback is paused.

## 5. Social hover cards

Hovering an icon opens a profile preview. Data lives in `socialCards`
(lib/content.ts).

GitHub's numbers are real, pulled from its public API. Instagram, LinkedIn, and
X have no public API, so their stats are `null` on purpose rather than invented:
fill in `posts` / `followers` / `following` and `connections` and the cards grow
those rows. The email card is a plain address preview. The GitHub avatar is the default identicon at
`public/social/github-avatar.jpg` until you set a photo on GitHub.

## 6. Book a call — done

"Get in touch" links to cal.com/rikhinkavuru/30min via `profile.bookingUrl`.
The label stays "Get in touch" regardless; email has its own icon in the row.

## 7. Bento artwork

Each project's bento card is a composed image in `public/projects/`:

| Card | Treatment |
| --- | --- |
| `telo.png` | Cream mark on a charcoal ground, as a flat graphic |
| `virahacks.png` | A hackathon event card floated on light grey |
| `linkd.png` | Two app screens on Linkd red |
| `inkr.png` | Two app screens on indigo |

The Linkd and Inkr phone screens are rebuilt as HTML in the scratch directory
and rendered at 3x, not upscaled screenshots. That is why they are sharp at
card size. Re-render from those templates rather than re-photographing the
sites.

Inkr's card is indigo rather than its own orange: Inkr's palette is essentially
black-and-white with an orange dot, and orange sat too close to Linkd's red for
the two tiles to read apart.

Images are rendered at each slot's measured aspect ratio, so `object-cover`
never crops the composition. If you change the `grow` weights in `LAYOUT`,
re-measure and re-render or the phones will get clipped.

The ViraHacks event card is generated from an HTML template; its source is in
the scratch directory rather than the repo. Its date, location, and title are
placeholder text.

Swap any of them by replacing the file and updating that project's `shots`
entry in `lib/content.ts`. Slot placement and the uneven column split live in
`LAYOUT` at the top of `components/BentoGrid.tsx`.

## 8. Project case studies

Each project already has a page at `/projects/<slug>`. Right now they show the
logo, title, role, tags, one-line summary, and a link out.

To turn one into a full case study like kenemrls's `/findu`, add `sections` and
`stats` to that project in `lib/content.ts`:

```ts
sections: [
  {
    id: "overview",
    heading: "Overview",
    paragraphs: ["First paragraph.", "Second paragraph."],
    image: { src: "/projects/inkr-1.png", alt: "...", caption: "..." },
  },
],
stats: [
  { value: "60K+", label: "Users", detail: "Since launch" },
],
```

The left-rail table of contents builds itself from `sections` and highlights the
active one as you scroll. It only appears once at least one section exists, and
only on screens wide enough to hold it (1280px+).
