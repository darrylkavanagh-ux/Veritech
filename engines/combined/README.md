# Combined Engine

**Copyright © 2026 Orb AI Limited. All Rights Reserved.**

## Overview

The Combined Engine orchestrates the CVK 1100 Truth Engine and the Jigsaw Protocol into a unified truth reconstruction system. It processes raw inputs through verification, compresses verified fragments, reconstructs the complete picture, and assesses court readiness—all in a single operation.

## Architecture

```
Raw Inputs
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMBINED ENGINE                           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              CVK 1100 TRUTH ENGINE                   │    │
│  │                                                      │    │
│  │  Reality Checks → Truth Checks → Necessity Checks   │    │
│  │                                                      │    │
│  │  Output: Verified Truth Fragments                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              JIGSAW PROTOCOL ENGINE                  │    │
│  │                                                      │    │
│  │  Fragment Compression → Component Engineering        │    │
│  │  Picture Assembly → Gap Identification               │    │
│  │  Conclusion Generation                               │    │
│  │                                                      │    │
│  │  Output: Reconstructed Truth Picture                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              COMBINED ANALYSIS                       │    │
│  │                                                      │    │
│  │  Key Findings Extraction                             │    │
│  │  Evidence Chain Construction                         │    │
│  │  Court Readiness Assessment                          │    │
│  │  Human Review Consolidation                          │    │
│  │  Recommendation Generation                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Court-Ready Output
```

## Key Features

### 1. Unified Processing
Single entry point for complete truth reconstruction. No need to manually coordinate between engines.

### 2. Combined Analysis
Generates comprehensive analysis including:
- Key findings with confidence scores
- Evidence chain with full traceability
- Jurisdiction compliance assessment
- Documentation status

### 3. Court Readiness Assessment
Evaluates readiness across multiple factors:
- Evidence strength
- Chain of custody integrity
- Human verification status
- Jurisdiction compliance
- Documentation completeness

### 4. Human Review Consolidation
Combines human review requirements from both engines into a unified queue with:
- Priority ranking
- Required expertise
- Deadlines
- Review reasons

### 5. Recommendation Generation
Produces actionable recommendations:
- Investigation priorities
- Evidence gaps to fill
- Verification upgrades needed
- Timeline considerations

## Usage

```typescript
import { CombinedEngine } from './combined-engine';

const engine = new CombinedEngine();

const result = await engine.process({
  caseId: 'CASE-001',
  targetEntity: 'Subject Name',
  jurisdiction: 'IE',
  operatorId: 1,
  caseType: 'fraud',
  priority: 10
});

// Result contains:
// - cvk1100Result: Full CVK 1100 output
// - jigsawResult: Full Jigsaw Protocol output
// - combinedAnalysis: Unified analysis
// - courtReadiness: Assessment with score
// - humanReviewSummary: Consolidated review items
// - recommendations: Actionable next steps
```

## Output Structure

The Combined Engine produces a comprehensive result including:

| Component | Description |
|-----------|-------------|
| `cvk1100Result` | Complete CVK 1100 verification output |
| `jigsawResult` | Complete Jigsaw Protocol reconstruction |
| `combinedAnalysis` | Key findings, evidence chains, assessments |
| `courtReadiness` | Score and detailed readiness assessment |
| `humanReviewSummary` | Consolidated human review requirements |
| `recommendations` | Prioritized actionable recommendations |

## Integration

The Combined Engine is the recommended entry point for most use cases. It handles all coordination between the CVK 1100 and Jigsaw Protocol engines automatically.

For specialized use cases requiring direct engine access, the individual engines can be imported separately.

---

**TO 1100.**

*The complete truth reconstruction system.*
