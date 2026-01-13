# Investigation Engine

**Owned by Orb AI Limited**

---

## Overview

The Investigation Engine is the intelligence gathering and analysis system for complex investigations. It provides comprehensive tools for entity research, financial trail analysis, corporate structure investigation, and evidence documentation.

---

## Capabilities

### 1. Entity Research
- Individual background investigation
- Corporate entity analysis
- Beneficial ownership tracing
- Director/officer history
- Related party identification

### 2. Financial Trail Analysis
- Transaction pattern analysis
- Asset flow tracking
- Bank account identification
- Property ownership tracing
- Debt instrument analysis

### 3. Corporate Structure Investigation
- Company registry searches (CRO, Companies House)
- Subsidiary mapping
- Shell company identification
- Cross-jurisdictional analysis
- Historical ownership changes

### 4. Asset Discovery
- Property registry searches
- Vehicle registration checks
- Intellectual property holdings
- Investment portfolio identification
- Offshore asset tracing

### 5. Witness Management
- Witness identification
- Statement collection
- Affidavit preparation
- Testimony coordination
- Expert witness sourcing

### 6. Evidence Chain Documentation
- Evidence cataloging
- Chain of custody tracking
- Exhibit preparation
- Court bundle assembly
- Timeline construction

---

## Investigation Protocols

### OSINT (Open Source Intelligence)
```
┌─────────────────────────────────────────────────────────────┐
│                    OSINT PROTOCOL                           │
├─────────────────────────────────────────────────────────────┤
│ 1. Public Records Search                                    │
│    - Company registries                                     │
│    - Court records                                          │
│    - Property registries                                    │
│    - Professional registers                                 │
│                                                             │
│ 2. Media Analysis                                           │
│    - News archives                                          │
│    - Press releases                                         │
│    - Industry publications                                  │
│    - Social media (public)                                  │
│                                                             │
│ 3. Financial Data                                           │
│    - Annual returns                                         │
│    - Published accounts                                     │
│    - Credit ratings                                         │
│    - Insolvency notices                                     │
└─────────────────────────────────────────────────────────────┘
```

### Financial Forensics
- Forensic accountancy methodology
- Transaction reconstruction
- Hidden asset identification
- Fraudulent transfer analysis
- Value extraction tracking

### Corporate Registry Analysis
- Ireland: Companies Registration Office (CRO)
- UK: Companies House
- Northern Ireland: Companies House NI
- Spain: Registro Mercantil
- EU: Business Registers Interconnection System (BRIS)

### Property Registry Searches
- Ireland: Property Registration Authority (PRA)
- UK: HM Land Registry
- Northern Ireland: Land & Property Services
- Spain: Registro de la Propiedad

### Court Record Analysis
- Judgment searches
- Litigation history
- Enforcement actions
- Bankruptcy proceedings
- Regulatory actions

---

## Investigation Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | Preliminary | Initial subject identification |
| 2 | Basic | Public records check |
| 3 | Standard | Corporate structure analysis |
| 4 | Enhanced | Financial trail analysis |
| 5 | Comprehensive | Full asset discovery |
| 6 | Forensic | Deep financial forensics |
| 7 | Legal Ready | Court-admissible evidence |
| 8 | Expert | Expert witness integration |
| 9 | Complete | Full investigation package |
| 10 | Maximum | VeriTech certified investigation |

---

## API Reference

### Start Investigation

```typescript
import { InvestigationEngine } from '@orb-ai/investigation';

const engine = new InvestigationEngine();

const investigation = await engine.investigate({
  subject: {
    type: 'individual', // or 'corporate'
    name: 'John Smith',
    identifiers: {
      dateOfBirth: '1970-01-01',
      address: '123 Main Street, Dublin'
    }
  },
  scope: ['financial', 'corporate', 'property'],
  jurisdiction: ['IE', 'UK'],
  targetLevel: 10,
  caseId: 'INV-2026-001'
});
```

### Entity Relationship Mapping

```typescript
const relationships = await engine.mapRelationships({
  subject: 'John Smith',
  depth: 3, // Levels of connection
  types: ['director', 'shareholder', 'related_party']
});
```

### Asset Discovery

```typescript
const assets = await engine.discoverAssets({
  subject: 'John Smith',
  jurisdictions: ['IE', 'UK', 'ES'],
  types: ['property', 'corporate', 'financial']
});
```

---

## Output Formats

### Investigation Report
- Executive summary
- Subject profile
- Entity relationships
- Financial analysis
- Asset inventory
- Evidence catalog
- Recommendations
- Appendices

### Evidence Package
- Document index
- Chain of custody log
- Exhibit list
- Witness statements
- Expert reports
- Timeline of events

### Court Bundle
- Index and pagination
- Core documents
- Supporting evidence
- Witness statements
- Expert reports
- Chronology

---

## Integration with VeriTech Verification Engine

The Investigation Engine integrates seamlessly with the VeriTech Verification Engine:

```typescript
import { InvestigationEngine } from '@orb-ai/investigation';
import { VerificationEngine } from '@orb-ai/verification';

// Investigate
const investigation = await investigationEngine.investigate(request);

// Verify all discovered documents
for (const document of investigation.documents) {
  const verification = await verificationEngine.verify({
    document: document.content,
    targetLevel: 10,
    jurisdiction: investigation.jurisdiction,
    caseId: investigation.caseId
  });
}

// Generate combined report
const report = await investigationEngine.generateReport({
  investigation,
  verifications,
  format: 'court-bundle'
});
```

---

## Compliance

All investigations must comply with:

1. **Data Protection** - GDPR, DPA 2018
2. **Legal Privilege** - Attorney-client privilege where applicable
3. **Evidence Rules** - Jurisdiction-specific evidence requirements
4. **Human Oversight** - Human-in-the-loop for all sensitive operations
5. **Audit Trail** - Complete documentation of all actions

---

## License

Copyright © 2026 Orb AI Limited. All rights reserved.

*VeriTech V✓ Verified*
