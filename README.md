# Countries App — React Native

A production-ready countries explorer built with React Native and Expo, based on the [Frontend Mentor REST Countries API challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Designed mobile-first for iOS with a focus on clean architecture, typed API integration, and a polished dark/light theme experience.

## Table of contents

- [Overview](#overview)
- [Demo](#demo)
- [Built with](#built-with)
- [Architecture](#architecture)
- [What I learned](#what-i-learned)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Overview

### Features

- Browse all countries in the world with flag, population, region and capital
- Search any country by name with 500ms debounced autocomplete
- Filter countries by region (Africa, Americas, Asia, Europe, Oceania)
- Detailed country view with native name, currencies, languages, TLD and sub-region
- Navigate through border countries via deep stack navigation
- Dark / Light theme toggle — persisted across sessions via AsyncStorage
- Lottie loading animations and graceful error handling

---

## Demo

> Add your GIFs or screenshots here

<div align="center">
  <img src="./assets/demo/home.gif" width="300" />
  <p><strong>Home & Search</strong> — debounced search with region filter</p>

  <img src="./assets/demo/detail.gif" width="300" />
  <p><strong>Country Detail</strong> — deep navigation through border countries</p>

  <img src="./assets/demo/theme.gif" width="300" />
  <p><strong>Theme Toggle</strong> — light/dark switch persisted across sessions</p>
</div>

---

## Built with

- **React Native 0.81** + **Expo SDK 54**
- **React 19** (latest concurrent rendering)
- **TypeScript 5.9** — strict mode, typed navigation, typed API responses
- **React Navigation 7** — native stack with typed routes
- **Axios** — HTTP client with centralized Axios instance and field-selective requests
- **Lottie React Native** — animated loading states
- **AsyncStorage** — persisting theme preference
- **REST Countries API v3.1** — free, no API key required
- **Nunito Sans** — 4 weights loaded via expo-font

---

## Architecture

```
countries-app/
├── components/
│   ├── layout/          # Atomic layout primitives (Column, Row, Space)
│   ├── Button.tsx        # Reusable touchable — supports icon, reverse, gap and justify
│   ├── CountryCard.tsx   # Flag + metadata card with module-level aspect ratio cache
│   ├── DataRow.tsx       # Label/value pair with semibold label and light value
│   ├── RegionDropdown.tsx # Position-aware modal dropdown
│   └── TextComponent.tsx  # Theme-aware text wrapper
├── views/
│   ├── Navbar.tsx         # Header with logo and theme toggle
│   ├── CountryGrid.tsx    # Grid container with loading and error states
│   └── Loader.tsx         # Lottie animation wrapper
├── screens/
│   ├── HomeScreen.tsx     # Orchestrates search, filter and country grid
│   └── CountryScreen.tsx  # Country detail with borders deep-nav
├── hooks/
│   └── useCountries.ts    # Debounced search + region filter logic
├── services/
│   └── CountriesServices.ts  # API layer — field-selective requests per view
└── core/
    ├── context/           # ThemeContext + useThemePersistence
    ├── theme/             # Colors (light/dark) + Typography system
    └── types/             # Country, GridCountry, Navigation types
```

Logic lives in screens and hooks. Components only render. Services only fetch.

---

## What I learned

Although I work professionally as a mobile developer, this was the first app I built entirely from scratch — owning every decision from architecture to production build.

Key takeaways:

- **Separation of concerns at scale** — keeping screens as orchestrators and components as pure renderers made adding every new feature straightforward without touching unrelated code
- **Typed navigation with React Navigation** — defining `RootStackParamList` once and using it across `useNavigation` and `NativeStackScreenProps` catches routing bugs at compile time instead of runtime
- **API field selection** — requesting only the fields each view needs (different payloads for grid vs detail view) reduces response sizes and avoids over-fetching
- **Module-level caching** — storing `Image.getSize` results in a `Map` outside component lifecycle avoids redundant network requests every time a card re-renders, noticeably improving scroll performance
- **Debounced search** — understanding why debouncing matters in practice: without it, every keystroke triggers an API call, causing race conditions where an earlier slow response overwrites a newer fast one
- **iOS build environment** — navigated code signing, provisioning profiles and trusted developer setup for physical device deployment

---

## Roadmap

| Version | Feature                                               |
| ------- | ----------------------------------------------------- |
| v1.1    | Offline support — cache last fetched results          |
| v1.2    | Fullscreen flag viewer                                |
| v1.3    | Landscape orientation support                         |
| v1.4    | Map view — tap a country on Google Maps or Apple Maps |

---

## Author

- LinkedIn — [Ignacio Gonzalia](https://www.linkedin.com/in/ignaciogonzalia/?locale=en_US)
