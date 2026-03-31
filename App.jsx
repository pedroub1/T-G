import { useState, useEffect, useCallback, useRef } from "react";

/* ───── SVG stick-figure illustrations ───── */
const I = {
  catCow: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M22 20L34 16L46 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 20L18 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M46 20L50 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="62" cy="22" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M58 24L46 28C42 30 38 30 34 28L22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <path d="M58 24L54 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <path d="M22 24L18 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
    </svg>
  ),
  worldsGreatest: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M50 14L48 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 28L36 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 40L24 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 28L60 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 18L58 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 18L40 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  carsHip: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 12L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L32 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L48 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L50 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="30" rx="14" ry="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
    </svg>
  ),
  carsShoulder: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 18L40 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 34L34 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 34L46 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 22L30 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 22L50 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="20" rx="16" ry="12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
    </svg>
  ),
  thoracicRotation: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L30 38L24 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L50 38L56 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20L56 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ankleMobility: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="54" y="4" width="4" height="44" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
      <circle cx="36" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 12L36 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 24L42 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 38L54 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 24L28 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 38L24 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  deadBug: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="34" x2="70" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="22" cy="30" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M26 30L54 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M54 30L62 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M54 30L64 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <path d="M34 30L30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 30L42 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
    </svg>
  ),
  pallofPress: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 30L34 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 30L46 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20L56 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M56 20L68 20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
      <rect x="68" y="10" width="4" height="20" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  ),
  singleLegBalance: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 12L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L40 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L54 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L50 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  jumpRope: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L36 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L44 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L48 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 24C24 30 20 42 36 46L44 46C60 42 56 30 48 24" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.5"/>
    </svg>
  ),
  gobletSquat: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L30 38L28 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L50 38L52 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L36 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L44 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="36" y="16" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  singleLegRDL: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 19L44 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 24L44 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 24L62 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 20L22 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 26L16 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  alternateDumbbellPress: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="28" x2="70" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="40" cy="24" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 24L20 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 24L52 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="48" y="6" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M52 28L58 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 28L42 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  singleArmRow: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 17L48 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 24L56 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 24L40 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20L44 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="42" y="10" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </svg>
  ),
  chop: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 16L40 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 30L34 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 30L46 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20L54 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M54 10L28 38" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.4"/>
    </svg>
  ),
  shuttleRun: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 14L38 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 26L28 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 26L50 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 18L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 18L42 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 44L62 44" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <path d="M18 42L18 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M40 42L40 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M62 42L62 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  bikeIntervals: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L42 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 24L52 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 24L32 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="52" cy="38" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
      <circle cx="26" cy="38" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
    </svg>
  ),
  cooldown: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 18L24 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 30L20 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 30L28 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 22L18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 22L30 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  hipFlexorStretch: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 12L40 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L50 36L52 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L28 36L22 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L34 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L46 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  pigeonPose: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 18L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 28L26 36L20 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 28L46 32L60 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 22L22 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 22L34 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    </svg>
  ),
  foamRollerThoracic: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <circle cx="24" cy="30" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 30L56 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M56 28L64 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 28L46 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="42" cy="32" rx="6" ry="4" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <path d="M28 28L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  sleeperStretch: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="34" x2="70" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 28L48 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 28L56 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 28L42 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 28L32 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 16L26 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  wristStretch: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 28L50 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 28L54 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M54 20L58 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M30 28L26 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <path d="M36 26L36 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 26L44 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  hamstringStretch: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <circle cx="30" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M30 18L34 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 30L28 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 30L48 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48 18L56 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  childsPose: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="38" x2="70" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <circle cx="50" cy="28" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M46 28L36 32L32 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 32L38 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 26L60 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  foamRollingLegs: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="38" x2="70" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <circle cx="22" cy="20" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 23L34 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 28L54 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M54 30L60 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="46" cy="34" rx="6" ry="4" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <path d="M24 23L18 30L16 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  lacrosseBall: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L30 38L26 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L50 38L54 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L32 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L48 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="40" cy="30" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  ),
  mobilityFlow: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L30 40L26 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 26L50 40L54 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L32 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L48 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 20C16 24 14 30 18 34" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.35"/>
      <path d="M60 20C64 24 66 30 62 34" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.35"/>
    </svg>
  ),
  medBallRotation: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="64" y="4" width="4" height="44" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
      <circle cx="36" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 14L38 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 28L32 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 28L44 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 20L56 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="56" cy="14" r="4" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  lift: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 16L40 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 30L34 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 30L46 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 20L28 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 38L54 10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.4"/>
    </svg>
  ),
  turkishGetUp: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 22L40 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 32L48 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 32L32 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 26L28 34L24 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 24L44 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="40" y="4" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </svg>
  ),
  hip9090: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 14L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L28 34L22 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L52 34L58 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L34 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L46 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 38L56 38" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.25"/>
    </svg>
  ),
  farmersCarry: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 12L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L34 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 28L46 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 18L48 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="28" y="26" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
    </svg>
  ),
  carioca: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M34 14L36 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 26L44 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 26L24 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 18L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 18L42 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 44L58 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M56 42L58 44L56 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  birdDog: (
    <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M26 18L50 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 18L30 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M46 16L48 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M26 16L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 16L64 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="34" x2="70" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    </svg>
  ),
};

const ILLUST_MAP = {
  "Cat-Cow (gato-vaca)": I.catCow, "World's Greatest Stretch": I.worldsGreatest,
  "CARs de cadera (círculos articulares)": I.carsHip, "CARs de hombro": I.carsShoulder,
  "Rotación torácica en 90/90": I.thoracicRotation, "Ankle CARs + movilidad de tobillo en pared": I.ankleMobility,
  "Dead Bug": I.deadBug, "Pallof Press (banda elástica)": I.pallofPress,
  "Balanceo a una pierna con ojos cerrados": I.singleLegBalance, "Calentamiento: saltar cuerda": I.jumpRope,
  "Sentadilla goblet": I.gobletSquat, "Peso muerto rumano a una pierna": I.singleLegRDL,
  "Press de pecho con mancuerna (alterno)": I.alternateDumbbellPress, "Remo con mancuerna a una mano": I.singleArmRow,
  "Chop con polea/banda (alto a bajo)": I.chop, "Shuttle runs (5-10-5)": I.shuttleRun,
  "Intervalos en bici/elíptica": I.bikeIntervals, "Enfriamiento: caminata + respiración": I.cooldown,
  "Estiramiento de flexores de cadera (half-kneeling)": I.hipFlexorStretch, "Pigeon Pose (paloma)": I.pigeonPose,
  "Estiramiento torácico en foam roller": I.foamRollerThoracic, "Sleeper stretch + cross-body (hombro)": I.sleeperStretch,
  "Estiramiento de muñeca (extensores y flexores)": I.wristStretch, "Estiramiento de isquiotibiales con banda": I.hamstringStretch,
  "Child's Pose con alcance lateral": I.childsPose, "Foam rolling: piernas + espalda": I.foamRollingLegs,
  "Lacrosse ball: glúteos + pies": I.lacrosseBall, "Flujo de movilidad libre": I.mobilityFlow,
  "Rotación de medicina ball contra pared": I.medBallRotation, "Lift con polea/banda (bajo a alto)": I.lift,
  "Turkish Get-Up (peso ligero)": I.turkishGetUp, "Hip 90/90 transiciones": I.hip9090,
  "Farmer's carry a una mano": I.farmersCarry, "Cariocas / Karaoke drill": I.carioca,
  "Bird Dog con pausa": I.birdDog,
};

const SEARCH_TERMS = {
  "Cat-Cow (gato-vaca)": "cat cow stretch exercise form",
  "World's Greatest Stretch": "world's greatest stretch exercise",
  "CARs de cadera (círculos articulares)": "hip CARs controlled articular rotations",
  "CARs de hombro": "shoulder CARs controlled articular rotations",
  "Rotación torácica en 90/90": "90 90 thoracic rotation exercise",
  "Ankle CARs + movilidad de tobillo en pared": "ankle mobility wall drill CARs",
  "Dead Bug": "dead bug exercise proper form", "Pallof Press (banda elástica)": "pallof press resistance band",
  "Balanceo a una pierna con ojos cerrados": "single leg balance eyes closed",
  "Calentamiento: saltar cuerda": "jump rope warm up technique",
  "Sentadilla goblet": "goblet squat proper form", "Peso muerto rumano a una pierna": "single leg romanian deadlift",
  "Press de pecho con mancuerna (alterno)": "alternating dumbbell bench press",
  "Remo con mancuerna a una mano": "single arm dumbbell row", "Chop con polea/banda (alto a bajo)": "cable chop high to low",
  "Shuttle runs (5-10-5)": "5 10 5 shuttle run drill", "Intervalos en bici/elíptica": "HIIT bike intervals",
  "Enfriamiento: caminata + respiración": "cool down breathing exercise",
  "Estiramiento de flexores de cadera (half-kneeling)": "half kneeling hip flexor stretch",
  "Pigeon Pose (paloma)": "pigeon pose stretch", "Estiramiento torácico en foam roller": "foam roller thoracic extension",
  "Sleeper stretch + cross-body (hombro)": "sleeper stretch cross body shoulder",
  "Estiramiento de muñeca (extensores y flexores)": "wrist flexor extensor stretch",
  "Estiramiento de isquiotibiales con banda": "hamstring stretch with band",
  "Child's Pose con alcance lateral": "child's pose lateral reach", "Foam rolling: piernas + espalda": "foam rolling legs back",
  "Lacrosse ball: glúteos + pies": "lacrosse ball glute plantar fascia",
  "Flujo de movilidad libre": "morning mobility flow", "Rotación de medicina ball contra pared": "medicine ball rotational throw wall",
  "Lift con polea/banda (bajo a alto)": "cable lift low to high", "Turkish Get-Up (peso ligero)": "turkish get up tutorial",
  "Hip 90/90 transiciones": "hip 90 90 transitions mobility", "Farmer's carry a una mano": "single arm farmer carry",
  "Cariocas / Karaoke drill": "carioca karaoke drill agility", "Bird Dog con pausa": "bird dog exercise pause",
};

/* ───── Data ───── */
const DAYS = [
  {
    day: "Día 1", title: "Movilidad & Core", icon: "🔄",
    focus: "Desbloquear articulaciones, activar centro y propiocepción",
    color: "#E07A5F", optional: false, duration: "~40 min",
    exercises: [
      { name: "Cat-Cow (gato-vaca)", sets: "2", reps: "10 rep", rest: 0, notes: "Fluidez en columna torácica. Clave para rotación en swing y saque." },
      { name: "World's Greatest Stretch", sets: "2", reps: "5 por lado", rest: 0, notes: "Abre caderas, torácica y hombros en un solo movimiento." },
      { name: "CARs de cadera (círculos articulares)", sets: "2", reps: "5 por lado", rest: 0, notes: "Círculos controlados de cadera. Aumenta rango progresivamente." },
      { name: "CARs de hombro", sets: "2", reps: "5 por lado", rest: 0, notes: "Círculos lentos y controlados. Protege manguito rotador." },
      { name: "Rotación torácica en 90/90", sets: "3", reps: "8 por lado", rest: 30, notes: "Sentado en posición 90/90, rotar torso. Fundamental para ambos deportes." },
      { name: "Ankle CARs + movilidad de tobillo en pared", sets: "2", reps: "8 por lado", rest: 0, notes: "Dorsiflexión crucial para postura en ambos deportes." },
      { name: "Dead Bug", sets: "3", reps: "8 por lado", rest: 30, notes: "Coordinación core-extremidades. Espalda baja pegada al suelo." },
      { name: "Pallof Press (banda elástica)", sets: "3", reps: "10 por lado", rest: 30, notes: "Anti-rotación. Estabilidad del core bajo demanda rotacional." },
      { name: "Balanceo a una pierna con ojos cerrados", sets: "2", reps: "30s por lado", rest: 0, notes: "Propiocepción avanzada. Abre ojos si pierdes estabilidad." },
    ],
  },
  {
    day: "Día 2", title: "Fuerza & Cardio", icon: "💪",
    focus: "Fuerza funcional unilateral + intervalos de agilidad",
    color: "#3D85C6", optional: false, duration: "~50 min",
    exercises: [
      { name: "Calentamiento: saltar cuerda", sets: "1", reps: "3 min", rest: 0, notes: "Ritmo moderado. Activa tobillos, coordinación y ritmo cardíaco." },
      { name: "Sentadilla goblet", sets: "3", reps: "10", rest: 60, notes: "Peso moderado. Profundidad completa, torso erguido." },
      { name: "Peso muerto rumano a una pierna", sets: "3", reps: "8 por lado", rest: 45, notes: "Equilibrio + cadena posterior. Clave para estabilidad en el swing." },
      { name: "Press de pecho con mancuerna (alterno)", sets: "3", reps: "8 por lado", rest: 45, notes: "Anti-rotación bajo carga. Estabiliza core mientras empujas." },
      { name: "Remo con mancuerna a una mano", sets: "3", reps: "10 por lado", rest: 45, notes: "Fortalece dorsal y romboides. Contrarresta el patrón de rotación." },
      { name: "Chop con polea/banda (alto a bajo)", sets: "3", reps: "10 por lado", rest: 30, notes: "Patrón diagonal. Imita la mecánica de golpeo en ambos deportes." },
      { name: "Shuttle runs (5-10-5)", sets: "3", reps: "3 rep", rest: 45, notes: "Sprint corto con cambio de dirección. Agilidad lateral para tenis." },
      { name: "Intervalos en bici/elíptica", sets: "5", reps: "30s sprint / 60s suave", rest: 0, notes: "Cardio sin impacto. Mantiene articulaciones frescas." },
      { name: "Enfriamiento: caminata + respiración", sets: "1", reps: "3 min", rest: 0, notes: "Respiración nasal. Bajar pulsaciones gradualmente." },
    ],
  },
  {
    day: "Día 3", title: "Flexibilidad & Recuperación", icon: "🧘",
    focus: "Estiramientos profundos, foam rolling y restauración",
    color: "#81B29A", optional: false, duration: "~35 min",
    exercises: [
      { name: "Estiramiento de flexores de cadera (half-kneeling)", sets: "2", reps: "45s por lado", rest: 0, notes: "Squeeze glúteo del lado de atrás. Abre psoas acortado." },
      { name: "Pigeon Pose (paloma)", sets: "2", reps: "60s por lado", rest: 0, notes: "Rotación externa de cadera. Clave para la postura del golf." },
      { name: "Estiramiento torácico en foam roller", sets: "2", reps: "60s", rest: 0, notes: "Extensión pasiva. Acostado sobre foam roller a lo largo de la columna." },
      { name: "Sleeper stretch + cross-body (hombro)", sets: "2", reps: "30s c/u por lado", rest: 0, notes: "Rotación interna + cápsula posterior. Previene rigidez post-tenis." },
      { name: "Estiramiento de muñeca (extensores y flexores)", sets: "2", reps: "30s c/dirección", rest: 0, notes: "Prevención de codo de tenista/golfista. No forzar." },
      { name: "Estiramiento de isquiotibiales con banda", sets: "2", reps: "45s por lado", rest: 0, notes: "Pierna activa. Mantener rodilla ligeramente flexionada." },
      { name: "Child's Pose con alcance lateral", sets: "2", reps: "45s por lado", rest: 0, notes: "Estira dorsal ancho y oblicuos. Respirar profundo en cada lado." },
      { name: "Foam rolling: piernas + espalda", sets: "1", reps: "2 min por grupo", rest: 0, notes: "Cuádriceps, isquios, IT band, gemelos, torácica. Pausar en puntos tensos." },
      { name: "Lacrosse ball: glúteos + pies", sets: "1", reps: "60s por lado/pie", rest: 0, notes: "Puntos gatillo en glúteos y fascia plantar." },
    ],
  },
  {
    day: "Día 4", title: "Potencia Rotacional", icon: "⚡",
    focus: "Potencia deportiva, equilibrio dinámico y anti-rotación",
    color: "#9B72AA", optional: true, duration: "~40 min",
    exercises: [
      { name: "Flujo de movilidad libre", sets: "1", reps: "5 min", rest: 0, notes: "Sentadilla profunda, rotaciones, alcances. Calentamiento intuitivo." },
      { name: "Rotación de medicina ball contra pared", sets: "3", reps: "8 por lado", rest: 30, notes: "Potencia rotacional explosiva. Simula el patrón del swing y el drive." },
      { name: "Lift con polea/banda (bajo a alto)", sets: "3", reps: "10 por lado", rest: 30, notes: "Cadena cruzada. Complemento del chop del Día 2." },
      { name: "Turkish Get-Up (peso ligero)", sets: "2", reps: "3 por lado", rest: 60, notes: "Movilidad + estabilidad integradas. Técnica > peso." },
      { name: "Hip 90/90 transiciones", sets: "2", reps: "8 transiciones", rest: 0, notes: "Ir y venir entre rotación interna y externa. Fluidez de cadera." },
      { name: "Farmer's carry a una mano", sets: "3", reps: "30m por mano", rest: 45, notes: "Anti-flexión lateral. Estabilidad de core y grip." },
      { name: "Cariocas / Karaoke drill", sets: "3", reps: "20m ida y vuelta", rest: 30, notes: "Coordinación de cadera y pies. Disociación cadera-torso." },
      { name: "Bird Dog con pausa", sets: "3", reps: "8 por lado", rest: 30, notes: "Equilibrio y estabilidad. Pausa de 2s arriba para mayor activación." },
    ],
  },
];

/* ───── Timer Component ───── */
function RestTimer({ seconds, color, onDone }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && left > 0) {
      intervalRef.current = setInterval(() => setLeft((p) => p - 1), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, left]);

  useEffect(() => {
    if (left === 0 && running) { setRunning(false); if (onDone) onDone(); }
  }, [left, running]);

  const reset = () => { setLeft(seconds); setRunning(false); };
  const pct = ((seconds - left) / seconds) * 100;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
      <button onClick={() => running ? setRunning(false) : setRunning(true)}
        style={{
          background: running ? "rgba(255,100,100,0.15)" : `${color}22`,
          border: `1px solid ${running ? "rgba(255,100,100,0.3)" : color + "44"}`,
          color: running ? "#ff9999" : color, borderRadius: 8, padding: "4px 10px",
          cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace",
          display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
        }}>
        {left === 0 ? "✓" : running ? "⏸" : "▶"} {left}s
      </button>
      <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1s linear" }} />
      </div>
      {left !== seconds && (
        <button onClick={reset} style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.3)",
          cursor: "pointer", fontSize: 12, padding: 2,
        }}>↺</button>
      )}
    </div>
  );
}

/* ───── Main App ───── */
export default function ExercisePlan() {
  const [view, setView] = useState("workout"); // "workout" | "progress"
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState({});
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleExercise = (dayIdx, exIdx) => {
    const key = `${dayIdx}-${exIdx}`;
    setCompletedExercises((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const current = DAYS[selectedDay];
  const totalForDay = current.exercises.length;
  const completedForDay = current.exercises.filter(
    (_, i) => completedExercises[`${selectedDay}-${i}`]
  ).length;

  // Weekly stats
  const weekStats = DAYS.map((d, di) => {
    const total = d.exercises.length;
    const done = d.exercises.filter((_, ei) => completedExercises[`${di}-${ei}`]).length;
    return { ...d, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });
  const totalAll = weekStats.reduce((a, s) => a + s.total, 0);
  const doneAll = weekStats.reduce((a, s) => a + s.done, 0);
  const weekPct = totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0;

  return (
    <div style={{
      fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif",
      background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      minHeight: "100vh", color: "#e8e8e8", padding: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .day-pill {
          cursor: pointer; border: none; padding: 12px 10px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1); background: rgba(255,255,255,0.04);
          flex: 1; min-width: 68px; position: relative; overflow: hidden;
        }
        .day-pill:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); }
        .day-pill.active { background: rgba(255,255,255,0.12); transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }

        .exercise-card {
          border-radius: 14px; transition: all 0.25s ease; background: rgba(255,255,255,0.03);
          margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.04); overflow: hidden; cursor: pointer;
        }
        .exercise-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
        .exercise-card.done { opacity: 0.45; }
        .exercise-card.done .ex-name { text-decoration: line-through; }

        .exercise-header {
          display: grid; grid-template-columns: 36px 1fr auto auto;
          align-items: center; gap: 12px; padding: 14px 16px;
        }

        .exercise-detail { overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
        .exercise-detail.collapsed { max-height: 0; padding: 0 16px; }
        .exercise-detail.expanded { max-height: 400px; padding: 0 16px 16px 16px; }

        .illust-box {
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px; padding: 10px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06); width: 96px; height: 76px; flex-shrink: 0;
        }
        .illust-box svg { width: 76px; height: 54px; }

        .chk {
          width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .chk:hover { border-color: rgba(255,255,255,0.5); }
        .chk.on { border-color: #81B29A; background: #81B29A; }

        .bg { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-family: 'Space Mono', monospace; white-space: nowrap; background: rgba(255,255,255,0.06); }

        .pbar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; margin-top: 8px; }
        .pfill { height: 100%; border-radius: 4px; transition: width 0.4s ease; }

        .yt-btn {
          display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08); background: rgba(255,0,0,0.06);
          color: rgba(255,255,255,0.55); font-size: 10px; font-family: 'Space Mono', monospace;
          cursor: pointer; transition: all 0.2s; text-decoration: none;
        }
        .yt-btn:hover { background: rgba(255,0,0,0.15); color: rgba(255,255,255,0.8); border-color: rgba(255,80,80,0.3); }

        .tab-btn {
          padding: 6px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.4);
          font-size: 12px; font-family: 'Space Mono', monospace; cursor: pointer; transition: all 0.2s;
        }
        .tab-btn:hover { background: rgba(255,255,255,0.06); }
        .tab-btn.on { background: rgba(255,255,255,0.1); color: #e8e8e8; border-color: rgba(255,255,255,0.15); }

        .stat-ring { transition: stroke-dashoffset 0.6s ease; }

        @media (max-width: 640px) {
          .exercise-header { grid-template-columns: 32px 1fr auto; gap: 8px; padding: 12px; }
          .bg-desk { display: none; }
          .bg-mob { display: flex !important; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
          .illust-box { width: 76px; height: 60px; }
          .illust-box svg { width: 60px; height: 44px; }
        }
        @media (min-width: 641px) { .bg-mob { display: none !important; } }
      `}</style>

      {/* ─── Header ─── */}
      <div style={{ padding: "28px 24px 16px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 24 }}>🎾</span>
              <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.2)" }}>✦</span>
              <span style={{ fontSize: 24 }}>⛳</span>
            </div>
            <h1 style={{
              fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #E07A5F, #F2CC8F, #81B29A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2,
            }}>Plan Complementario</h1>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className={`tab-btn ${view === "workout" ? "on" : ""}`} onClick={() => setView("workout")}>Rutina</button>
            <button className={`tab-btn ${view === "progress" ? "on" : ""}`} onClick={() => setView("progress")}>Progreso</button>
          </div>
        </div>
      </div>

      {/* ═══════ PROGRESS VIEW ═══════ */}
      {view === "progress" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 40px" }}>
          {/* Big ring */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0 32px" }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="70" cy="70" r="58" fill="none" stroke="url(#grad)" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - weekPct / 100)}`}
                transform="rotate(-90 70 70)" className="stat-ring" />
              <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E07A5F"/><stop offset="50%" stopColor="#F2CC8F"/><stop offset="100%" stopColor="#81B29A"/>
              </linearGradient></defs>
              <text x="70" y="64" textAnchor="middle" fill="#e8e8e8" fontSize="28" fontWeight="700" fontFamily="'Space Mono', monospace">{weekPct}%</text>
              <text x="70" y="82" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="'Space Mono', monospace">SEMANAL</text>
            </svg>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12, fontFamily: "'Space Mono', monospace" }}>
              {doneAll} de {totalAll} ejercicios completados
            </p>
          </div>

          {/* Per-day bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {weekStats.map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer",
              }} onClick={() => { setSelectedDay(i); setView("workout"); }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: s.color }}>{s.title}</span>
                    {s.optional && <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: "#c9a8d8", opacity: 0.6 }}>OPC</span>}
                  </div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: s.pct === 100 ? "#81B29A" : "rgba(255,255,255,0.4)" }}>
                    {s.done}/{s.total} {s.pct === 100 && "✓"}
                  </span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 4, transition: "width 0.4s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Reset */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setCompletedExercises({})} style={{
              background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.15)",
              color: "rgba(255,150,150,0.6)", borderRadius: 10, padding: "8px 20px",
              cursor: "pointer", fontSize: 12, fontFamily: "'Space Mono', monospace", transition: "all 0.2s",
            }}>Reiniciar semana</button>
          </div>
        </div>
      )}

      {/* ═══════ WORKOUT VIEW ═══════ */}
      {view === "workout" && (
        <>
          {/* Schedule hint */}
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 12px" }}>
            <div style={{
              display: "flex", gap: 16, padding: "10px 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#81B29A" }} />
                <strong style={{ color: "rgba(255,255,255,0.55)" }}>3 días:</strong> 1 → desc → 2 → desc → 3
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#9B72AA" }} />
                <strong style={{ color: "rgba(255,255,255,0.55)" }}>4 días:</strong> suma Día 4
              </div>
            </div>
          </div>

          {/* Day selector */}
          <div style={{ display: "flex", gap: 8, padding: "0 24px 16px", maxWidth: 800, margin: "0 auto" }}>
            {DAYS.map((d, i) => (
              <button key={i} className={`day-pill ${selectedDay === i ? "active" : ""}`}
                onClick={() => { setSelectedDay(i); setExpandedExercise(null); }}>
                <span style={{ fontSize: 18 }}>{d.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.5px", color: selectedDay === i ? d.color : "rgba(255,255,255,0.35)" }}>
                  {d.day.toUpperCase()}
                </span>
                {d.optional && <span style={{ fontSize: 7, color: "#c9a8d8", opacity: 0.6, fontFamily: "'Space Mono', monospace" }}>OPC</span>}
                {selectedDay === i && (
                  <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: 3, borderRadius: "3px 3px 0 0", background: d.color }} />
                )}
              </button>
            ))}
          </div>

          {/* Day content */}
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 40px" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: "20px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Day header */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ fontSize: 19, fontWeight: 700, color: current.color, display: "inline" }}>{current.title}</h2>
                    {current.optional && <span style={{
                      display: "inline-block", padding: "2px 7px", borderRadius: 6, fontSize: 9,
                      fontFamily: "'Space Mono', monospace", background: "rgba(155,114,170,0.2)",
                      color: "#c9a8d8", marginLeft: 8, verticalAlign: "middle",
                    }}>OPCIONAL</span>}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>{current.focus}</p>
                      <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.22)", whiteSpace: "nowrap" }}>{current.duration}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: current.color, opacity: 0.8 }}>
                    {completedForDay}/{totalForDay}
                  </div>
                </div>
                <div className="pbar"><div className="pfill" style={{ width: `${totalForDay > 0 ? (completedForDay / totalForDay) * 100 : 0}%`, background: current.color }} /></div>
              </div>

              {/* Exercises */}
              {current.exercises.map((ex, i) => {
                const key = `${selectedDay}-${i}`;
                const done = !!completedExercises[key];
                const isExp = expandedExercise === i;
                const ill = ILLUST_MAP[ex.name];
                const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(SEARCH_TERMS[ex.name] || ex.name)}`;

                return (
                  <div key={i} className={`exercise-card ${done ? "done" : ""}`}>
                    <div className="exercise-header" onClick={() => setExpandedExercise(isExp ? null : i)}>
                      <div className={`chk ${done ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); toggleExercise(selectedDay, i); }}>
                        {done && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <div>
                        <div className="ex-name" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{ex.name}</div>
                        <div className="bg-mob">
                          <span className="bg">{ex.sets}×{ex.reps}</span>
                          {ex.rest > 0 && <span className="bg">⏱ {ex.rest}s</span>}
                        </div>
                      </div>
                      <span className="bg bg-desk" style={{ color: current.color }}>{ex.sets} × {ex.reps}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", transition: "transform 0.3s", transform: isExp ? "rotate(180deg)" : "rotate(0)", fontFamily: "'Space Mono', monospace" }}>▼</span>
                    </div>

                    <div className={`exercise-detail ${isExp ? "expanded" : "collapsed"}`}>
                      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        {ill && <div className="illust-box" style={{ color: current.color }}>{ill}</div>}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, fontStyle: "italic" }}>{ex.notes}</p>
                          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                            <span className="bg" style={{ color: current.color }}>{ex.sets} × {ex.reps}</span>
                            <span className="bg" style={{ color: ex.rest > 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}>
                              {ex.rest > 0 ? `⏱ ${ex.rest}s descanso` : "sin pausa"}
                            </span>
                            <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="yt-btn" onClick={(e) => e.stopPropagation()}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                              </svg>
                              Ver ejemplo
                            </a>
                          </div>
                          {ex.rest > 0 && <RestTimer seconds={ex.rest} color={current.color} />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer tips */}
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 1, marginBottom: 6 }}>NOTAS</p>
              <ul style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, paddingLeft: 16 }}>
                <li>Alterna días de entrenamiento con descanso o juego.</li>
                <li>Día de partido: sustituye por calentamiento + foam rolling.</li>
                <li>Progresión: rango articular → repeticiones → carga.</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
