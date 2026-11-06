# Helios — Solar Storm Simulator

An interactive Three.js laboratory for designing coronal mass ejections (CMEs) and exploring their propagation toward Earth. Inspired by [NASA's SC22 “Make Your Own Solar Storms!”](https://www.nas.nasa.gov/SC22/research/project19.html) and the CORHEL-AMCG workflow.

## Run

Requires Node.js 22.12+ (or 20.19+).

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static host. Relative build paths support subdirectory hosting, including GitHub Pages. Three.js is bundled locally; no CDN is required. Google Fonts are optional and fall back to system fonts.

## Explore

- Presets for moderate, extreme, and off-axis eruptions.
- Adjustable launch speed, full angular width, longitude, latitude, Bz, and background solar wind.
- Up to six independently configured CMEs, each starting at the current timeline time.
- Play/pause, rewind, scrubbing through 120 simulated hours, and playback speed selection (simulated hours per real second).
- Orbit/zoom, top view, magnetic loop visibility, and camera reset.
- Latest-CME distance, drag-adjusted speed, estimated arrival, and illustrative coupling category.
- Responsive controls, keyboard-accessible inputs, and a WebGL-unavailable message.

## Model and limitations

This is an educational visualization, **not a forecast tool or an implementation of CORHEL/MAS**. It does not solve magnetohydrodynamics, model reconnection, or reproduce observed events.

The radial propagation solves `dv/dt = -gamma (v-w)|v-w|` analytically, with constant background wind `w` and illustrative `gamma = 1e-8 km^-1`. Distance starts at zero; arrival is found numerically at 1 AU (149,597,870.7 km). The rendered launch front is clamped outside the enlarged Sun. Cone intersection uses the angular separation of the eruption axis from a fixed Earth; latitude and longitude zero point toward Earth. Arrival estimates refer to the cone front at Earth's radial distance.

Coupling categories use arrival speed multiplied by southward Bz: Low ≤ 2,000; Moderate ≤ 8,000; High ≤ 18,000; Very high above 18,000 (km/s·nT). These are arbitrary educational thresholds, not a calibrated geomagnetic index. Bz is constant and does not alter propagation. CMEs do not interact; Earth is fixed; body sizes are exaggerated; magnetic loops, plasma particles, and the procedural solar surface are illustrative. Multiple-CME interaction and data-constrained MHD require a much more sophisticated model, as described in the NASA reference.

## Technology

Vanilla JavaScript, Three.js, OrbitControls, procedural GLSL solar texture, and Vite. No external image assets or backend. Model tests run with Node's built-in test runner.
