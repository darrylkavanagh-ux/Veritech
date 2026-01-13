# ORB AI LIMITED - THREE ENGINE ARCHITECTURE

**Version:** 1.0  
**Date:** January 13, 2026  
**Classification:** Technical Specification  
**Owner:** Orb AI Limited  

---

## EXECUTIVE SUMMARY

The Orb AI platform consists of three distinct but interconnected engines that work together to provide comprehensive verification and investigation capabilities. Each engine can operate independently or in combination, with the Combined Engine providing real-time verification during investigation processes.

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ORB AI LIMITED PLATFORM                          │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐   │
│  │   VERIFICATION   │  │  INVESTIGATION   │  │      COMBINED        │   │
│  │      ENGINE      │  │      ENGINE      │  │       ENGINE         │   │
│  │                  │  │                  │  │                      │   │
│  │   CVK 1100       │  │   OSINT          │  │  VERIFY-WHILE-       │   │
│  │   Protocol       │  │   Protocol       │  │  INVESTIGATING       │   │
│  │                  │  │                  │  │                      │   │
│  │   7 Stages       │  │   8 Agents       │  │  Real-time           │   │
│  │   10 Levels      │  │   Multi-         │  │  Compliance          │   │
│  │   8 Tiers        │  │   Jurisdiction   │  │  Check               │   │
│  └────────┬─────────┘  └────────┬─────────┘  └──────────┬───────────┘   │
│           │                     │                       │               │
│           └─────────────────────┼───────────────────────┘               │
│                                 │                                        │
│                    ┌────────────▼────────────┐                          │
│                    │   HUMAN-IN-THE-LOOP     │                          │
│                    │   (Mandatory at L7+)    │                          │
│                    └────────────┬────────────┘                          │
│                                 │                                        │
│                    ┌────────────▼────────────┐                          │
│                    │   iSEE APPS BLOCKCHAIN  │                          │
│                    │   (Immutable Records)   │                          │
│                    └─────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ENGINE 1: VERIFICATION ENGINE (CVK 1100)

### Purpose
Transform raw data into court-admissible, precision-engineered truth through a systematic 7-stage process.

### The 7-Stage CVK Protocol

| Stage | Name | Purpose | Output |
|-------|------|---------|--------|
| 1 | INGEST | Accept all evidence without filtering | Tagged items with metadata |
| 2 | CORROBORATE | Test every piece against every other | N×N correlation matrix |
| 3 | VERIFY | Confirm against authoritative sources | Verification tier assignment |
| 4 | KILL | Eliminate what cannot be proven | Kill log with recovery paths |
| 5 | COMPRESS | Reduce to irreducible essence | Compressed fact set |
| 6 | PRECISION ENGINEER | Shape each fact for exact fit | Precision facts |
| 7 | JIGSAW ASSEMBLY | Build complete picture | Court-ready package |

### 10-Level Verification Standard

| Level | Name | Description | Human Required |
|-------|------|-------------|----------------|
| 1 | Intake | Initial submission received | No |
| 2 | Preliminary | Basic checks completed | No |
| 3 | Documented | Supporting documents attached | No |
| 4 | Cross-Referenced | Multiple sources confirm | No |
| 5 | Validated | External validation complete | No |
| 6 | Analyzed | Deep analysis performed | No |
| 7 | Expert Reviewed | Subject matter expert review | **YES** |
| 8 | Legal Reviewed | Legal compliance confirmed | **YES** |
| 9 | Certified | Full certification issued | **YES** |
| 10 | Court-Ready | Admissible as evidence | **YES** |

### 8 Verification Tiers (Evidence Weighting)

| Tier | Source Type | Weight | Examples |
|------|-------------|--------|----------|
| 1 | Court Records | 100 | Judgments, orders, transcripts |
| 2 | Government Records | 95 | Companies House, Land Registry, CRO |
| 3 | Regulated Entity | 90 | Bank statements, audited accounts |
| 4 | Physical Evidence | 85 | Forensic reports, expert analysis |
| 5 | Documentary | 75 | Contracts, correspondence |
| 6 | Expert Opinion | 65 | Qualified expert statements |
| 7 | Witness Testimony | 50 | Direct knowledge statements |
| 8 | Circumstantial | 30 | Patterns, inferences |

### 7 Kill Rules

| Rule | Trigger | Recovery Path |
|------|---------|---------------|
| SINGLE_SOURCE | Only one source, no corroboration | Find additional independent source |
| CONTRADICTION | Contradicted by verified source | Provide higher-tier evidence |
| SPECULATION | Opinion presented as fact | Obtain documentary evidence |
| HEARSAY | Second-hand without support | Trace to original source |
| IMPOSSIBILITY | Defies physics or logic | Provide scientific explanation |
| FABRICATION | Evidence of manipulation | Submit to forensic authentication |
| NOISE | Irrelevant to subject | Demonstrate direct relevance |

---

## ENGINE 2: INVESTIGATION ENGINE

### Purpose
Conduct comprehensive investigations across multiple jurisdictions using specialized agents and OSINT protocols.

### 8 Specialist Agents

| Agent | Function | Capabilities |
|-------|----------|--------------|
| JIGSAW TOOL | Pattern assembly | Connect disparate evidence pieces |
| SPIDER WEB MAPPING | Network visualization | Map entity relationships |
| TRAJECTORY ANALYSIS | Timeline construction | Build chronological narratives |
| OFFSHORE PENETRATION | Hidden asset discovery | Trace offshore structures |
| WITNESS MATRIX | Testimony management | Coordinate witness evidence |
| DEBT RECOVERY | Financial tracking | Trace money flows |
| RESEARCH AGENT | Information gathering | Deep research across sources |
| BROWSER AGENT | Web automation | Automated data collection |

### Multi-Jurisdiction Support

| Jurisdiction | Code | Regulatory Framework |
|--------------|------|---------------------|
| Ireland | IE | Companies Registration Office, Central Bank |
| United Kingdom | UK | Companies House, FCA |
| Northern Ireland | NI | Companies House, FCA |
| Scotland | SC | Companies House, Scottish Courts |
| Wales | WA | Companies House, Welsh Courts |
| England | EN | Companies House, FCA |
| Spain | ES | Registro Mercantil, CNMV |
| European Union | EU | GDPR, EU Directives |

### OSINT Protocol

1. **Open Source Intelligence** - Publicly available information
2. **Corporate Records** - Company registrations, filings
3. **Property Records** - Land registry, planning applications
4. **Court Records** - Judgments, proceedings
5. **Media Archives** - News articles, press releases
6. **Social Media** - Public profiles, connections
7. **Financial Records** - Published accounts, credit reports
8. **Regulatory Filings** - Compliance documents, licenses

---

## ENGINE 3: COMBINED ENGINE (VERIFY-WHILE-INVESTIGATING)

### Purpose
Provide real-time verification during investigation, ensuring all findings are immediately checked against global regulations, laws, and precedents.

### Core Principle

> **"Verify while investigating - every finding is checked against all applicable laws, regulations, and precedents in real-time."**

### How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMBINED ENGINE WORKFLOW                      │
│                                                                  │
│  INVESTIGATION          REAL-TIME              VERIFICATION     │
│     ACTION              COMPLIANCE                OUTPUT        │
│        │                   CHECK                    │           │
│        ▼                     │                      ▼           │
│  ┌──────────┐          ┌─────▼─────┐         ┌──────────┐      │
│  │ Discover │ ───────► │ Check vs  │ ──────► │ Verified │      │
│  │   Fact   │          │ Laws/Regs │         │   Fact   │      │
│  └──────────┘          └───────────┘         └──────────┘      │
│        │                     │                      │           │
│        ▼                     ▼                      ▼           │
│  ┌──────────┐          ┌───────────┐         ┌──────────┐      │
│  │  Map     │ ───────► │ Check vs  │ ──────► │ Verified │      │
│  │ Entity   │          │Precedents │         │  Entity  │      │
│  └──────────┘          └───────────┘         └──────────┘      │
│        │                     │                      │           │
│        ▼                     ▼                      ▼           │
│  ┌──────────┐          ┌───────────┐         ┌──────────┐      │
│  │ Trace    │ ───────► │ Check vs  │ ──────► │ Verified │      │
│  │ Assets   │          │ Industry  │         │  Trail   │      │
│  └──────────┘          │ Standards │         └──────────┘      │
│                        └───────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### Real-Time Compliance Checks

| Check Type | Sources | Frequency |
|------------|---------|-----------|
| Legal Compliance | Legislation databases | Every finding |
| Regulatory Compliance | Regulator guidelines | Every entity |
| Industry Standards | Professional bodies | Every sector |
| Case Precedents | Court databases | Every legal assertion |
| GDPR/Data Protection | Privacy regulations | Every data point |

### Global Regulatory Database

The Combined Engine maintains and checks against:

**Legal Frameworks:**
- Common Law (UK, Ireland, US, Australia)
- Civil Law (EU, Spain)
- Statutory Law (All jurisdictions)

**Regulatory Bodies:**
- Financial: FCA, Central Bank of Ireland, SEC, ESMA
- Corporate: Companies House, CRO, SEC
- Property: Land Registry, Property Registration Authority
- Professional: Law Societies, Medical Councils, Engineering bodies

**Industry Standards:**
- Construction: Building regulations, safety standards
- Legal: Professional conduct rules, solicitor regulations
- Medical: GMC guidelines, medical standards
- Financial: Accounting standards, audit requirements

---

## OPERATOR VERIFICATION REQUIREMENTS

### The Key Question

> **"Who can verify what, and must they come from the specific sector?"**

### Answer: Tiered Qualification System

| Verification Type | Required Qualifier | Cross-Sector Allowed? |
|-------------------|-------------------|----------------------|
| Document Authenticity | Trained VeriTech Operator | YES |
| Technical Content | Sector Specialist | NO |
| Legal Compliance | Legal Professional | NO |
| Financial Accuracy | Qualified Accountant | NO |
| Construction Standards | Qualified Engineer/Surveyor | NO |
| Medical Records | Medical Professional | NO |
| Process Verification | Trained VeriTech Operator | YES |

### Legal Basis for Qualification Requirements

**Federal Rule of Evidence 702 (US):**
> "A witness who is qualified as an expert by **knowledge, skill, experience, training, or education** may testify..."

**UK Civil Procedure Rules Part 35:**
> "Expert evidence shall be restricted to that which is reasonably required... Expert's duty is to help the court on matters **within their expertise**."

**Ireland Order 39:**
> "Expert must assist the court... must be independent and provide objective, unbiased opinion... **based on relevant expertise**."

### Sector-Specific Requirements

| Sector | Required Qualifications | Regulatory Body |
|--------|------------------------|-----------------|
| **Legal** | Solicitor/Barrister qualification | Law Society / Bar Council |
| **Construction** | Chartered Engineer, Chartered Surveyor | ICE, RICS, CABE |
| **Medical** | GMC/Medical Council registration | GMC, Medical Council |
| **Financial** | ACA, ACCA, CPA qualification | ICAEW, ACCA, CPA Ireland |
| **Property** | RICS qualification | Royal Institution of Chartered Surveyors |
| **IT/Cyber** | CISSP, CEH, or equivalent | (ISC)², EC-Council |

### Cross-Sector Verification Rules

**PERMITTED:**
- Document authenticity verification (any trained operator)
- Process compliance verification (any trained operator)
- Timeline verification (any trained operator)
- Chain of custody verification (any trained operator)

**NOT PERMITTED:**
- Technical accuracy in specialist fields (must be sector expert)
- Professional standard compliance (must be sector professional)
- Regulatory compliance (must be sector-qualified)

### The VeriTech Operator Role

A VeriTech Operator can verify:
1. That documents exist and are authentic
2. That processes were followed correctly
3. That timelines are accurate
4. That chain of custody is maintained
5. That evidence meets VeriTech standards

A VeriTech Operator CANNOT verify:
1. That construction meets building codes (needs engineer)
2. That legal advice was correct (needs solicitor)
3. That medical treatment was appropriate (needs doctor)
4. That accounts are accurate (needs accountant)

---

## COURT-READY OUTPUT

### Documentation Package

Upon completion, the Combined Engine produces:

1. **Executive Summary** - One-page overview
2. **Verification Certificate** - VeriTech Level 10 certification
3. **Evidence Index** - All evidence catalogued
4. **Chain of Custody Log** - Complete audit trail
5. **Corroboration Matrix** - Evidence cross-references
6. **Kill Log** - Rejected evidence with reasons
7. **Expert Qualifications** - Operator/expert credentials
8. **Methodology Statement** - How verification was conducted
9. **Blockchain Hash** - Immutable record reference
10. **Legal Pack** - Ready for solicitor/counsel instruction

### Admissibility Checklist

| Requirement | Verified By | Status |
|-------------|-------------|--------|
| Relevance | Combined Engine | ✓ |
| Authenticity | Verification Engine | ✓ |
| Chain of Custody | Blockchain | ✓ |
| Expert Qualification | Human-in-the-Loop | ✓ |
| Methodology Reliability | CVK Protocol | ✓ |
| Independence | Operator Declaration | ✓ |
| Objectivity | Bias Elimination Protocol | ✓ |

---

## IMPLEMENTATION STATUS

| Component | Status | Notes |
|-----------|--------|-------|
| Verification Engine | 75% | Core logic complete |
| Investigation Engine | 70% | Agents defined |
| Combined Engine | 60% | Architecture defined |
| Human-in-the-Loop | 80% | Mandatory at L7+ |
| Blockchain Integration | 70% | Awaiting iSee Apps |
| Operator Training | 40% | Documentation needed |

---

## NEXT STEPS

1. **Complete API wrappers** for all three engines
2. **Integrate with iSee Apps blockchain** for immutable records
3. **Build operator training program** with certification
4. **Create sector-specific qualification databases**
5. **Develop real-time compliance checking system**
6. **Test court-ready output with legal professionals**

---

*© 2026 Orb AI Limited. All rights reserved.*
*VeriTech CVK 1100 - "The truth shall set you free"*
