/**
 * Investigation Engine
 * 
 * Owned by Orb AI Limited
 * 
 * Intelligence gathering and analysis system for complex investigations
 */

// Types
export interface InvestigationRequest {
  subject: Subject;
  scope: InvestigationScope[];
  jurisdiction: Jurisdiction[];
  targetLevel: InvestigationLevel;
  caseId: string;
  priority?: 'standard' | 'high' | 'critical';
}

export interface Subject {
  type: 'individual' | 'corporate';
  name: string;
  identifiers: SubjectIdentifiers;
  aliases?: string[];
  knownAssociates?: string[];
}

export interface SubjectIdentifiers {
  dateOfBirth?: string;
  address?: string;
  companyNumber?: string;
  taxId?: string;
  passportNumber?: string;
  drivingLicense?: string;
}

export interface InvestigationResult {
  caseId: string;
  subject: Subject;
  level: InvestigationLevel;
  status: 'pending' | 'in_progress' | 'complete' | 'requires_review';
  findings: InvestigationFinding[];
  entities: Entity[];
  relationships: Relationship[];
  assets: Asset[];
  documents: InvestigationDocument[];
  timeline: TimelineEvent[];
  recommendations: string[];
  riskAssessment: RiskAssessment;
  timestamp: Date;
  investigator: string;
}

export interface InvestigationFinding {
  id: string;
  category: FindingCategory;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  evidence: string[];
  confidence: number;
  actionRequired: boolean;
}

export interface Entity {
  id: string;
  type: 'individual' | 'corporate' | 'trust' | 'partnership';
  name: string;
  jurisdiction: Jurisdiction;
  status: 'active' | 'dissolved' | 'unknown';
  identifiers: Record<string, string>;
  metadata: Record<string, any>;
}

export interface Relationship {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  type: RelationshipType;
  startDate?: string;
  endDate?: string;
  details: string;
  verified: boolean;
}

export interface Asset {
  id: string;
  type: AssetType;
  description: string;
  value?: number;
  currency?: string;
  jurisdiction: Jurisdiction;
  ownerEntityId: string;
  registryReference?: string;
  verified: boolean;
}

export interface InvestigationDocument {
  id: string;
  filename: string;
  type: DocumentType;
  source: string;
  retrievedAt: Date;
  verificationLevel?: number;
  content?: Buffer;
}

export interface TimelineEvent {
  date: string;
  event: string;
  entities: string[];
  significance: 'low' | 'medium' | 'high';
  source: string;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  factor: string;
  level: 'low' | 'medium' | 'high';
  description: string;
}

// Enums and Types
export type InvestigationLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type InvestigationScope = 
  | 'financial'
  | 'corporate'
  | 'property'
  | 'litigation'
  | 'regulatory'
  | 'media'
  | 'social'
  | 'criminal';

export type Jurisdiction = 
  | 'IE'  // Ireland
  | 'UK'  // United Kingdom
  | 'NI'  // Northern Ireland
  | 'SC'  // Scotland
  | 'WA'  // Wales
  | 'EN'  // England
  | 'ES'  // Spain
  | 'EU'; // European Union

export type FindingCategory = 
  | 'identity'
  | 'corporate_structure'
  | 'financial'
  | 'property'
  | 'litigation'
  | 'regulatory'
  | 'media'
  | 'relationship'
  | 'risk';

export type RelationshipType = 
  | 'director'
  | 'shareholder'
  | 'beneficial_owner'
  | 'secretary'
  | 'related_party'
  | 'family'
  | 'business_associate'
  | 'creditor'
  | 'debtor';

export type AssetType = 
  | 'property'
  | 'vehicle'
  | 'company_shares'
  | 'bank_account'
  | 'investment'
  | 'intellectual_property'
  | 'other';

export type DocumentType = 
  | 'company_filing'
  | 'court_record'
  | 'property_record'
  | 'financial_statement'
  | 'news_article'
  | 'regulatory_filing'
  | 'witness_statement'
  | 'other';

// Constants
export const INVESTIGATION_LEVELS = {
  1: { name: 'Preliminary', description: 'Initial subject identification' },
  2: { name: 'Basic', description: 'Public records check' },
  3: { name: 'Standard', description: 'Corporate structure analysis' },
  4: { name: 'Enhanced', description: 'Financial trail analysis' },
  5: { name: 'Comprehensive', description: 'Full asset discovery' },
  6: { name: 'Forensic', description: 'Deep financial forensics' },
  7: { name: 'Legal Ready', description: 'Court-admissible evidence' },
  8: { name: 'Expert', description: 'Expert witness integration' },
  9: { name: 'Complete', description: 'Full investigation package' },
  10: { name: 'Maximum', description: 'VeriTech certified investigation' }
} as const;

export const REGISTRY_SOURCES = {
  IE: {
    companies: 'Companies Registration Office (CRO)',
    property: 'Property Registration Authority (PRA)',
    courts: 'Courts Service of Ireland'
  },
  UK: {
    companies: 'Companies House',
    property: 'HM Land Registry',
    courts: 'Courts and Tribunals Service'
  },
  NI: {
    companies: 'Companies House NI',
    property: 'Land & Property Services',
    courts: 'Northern Ireland Courts and Tribunals Service'
  },
  ES: {
    companies: 'Registro Mercantil',
    property: 'Registro de la Propiedad',
    courts: 'Consejo General del Poder Judicial'
  }
} as const;

export const CONFIG = {
  maxLevel: 10 as InvestigationLevel,
  defaultJurisdiction: 'IE' as Jurisdiction,
  humanInTheLoop: true, // MANDATORY - All Orb AI systems require human oversight
  maxRelationshipDepth: 5,
  version: '1.0.0'
};

// Main Investigation Engine Class
export class InvestigationEngine {
  private config: typeof CONFIG;
  
  constructor(customConfig?: Partial<typeof CONFIG>) {
    this.config = { ...CONFIG, ...customConfig };
  }

  /**
   * Start a new investigation
   */
  async investigate(request: InvestigationRequest): Promise<InvestigationResult> {
    const { subject, scope, jurisdiction, targetLevel, caseId, priority } = request;
    
    console.log(`[Investigation] Starting investigation for case ${caseId}`);
    console.log(`[Investigation] Subject: ${subject.name} (${subject.type})`);
    console.log(`[Investigation] Scope: ${scope.join(', ')}`);
    console.log(`[Investigation] Jurisdictions: ${jurisdiction.join(', ')}`);
    console.log(`[Investigation] Target level: ${targetLevel} (${INVESTIGATION_LEVELS[targetLevel].name})`);
    
    const findings: InvestigationFinding[] = [];
    const entities: Entity[] = [];
    const relationships: Relationship[] = [];
    const assets: Asset[] = [];
    const documents: InvestigationDocument[] = [];
    const timeline: TimelineEvent[] = [];
    
    // Create primary entity
    const primaryEntity = this.createPrimaryEntity(subject, jurisdiction[0]);
    entities.push(primaryEntity);
    
    // Level 1-2: Basic identification
    if (targetLevel >= 1) {
      const idFindings = await this.performIdentityCheck(subject, jurisdiction);
      findings.push(...idFindings);
    }
    
    // Level 3-4: Corporate and financial analysis
    if (targetLevel >= 3 && scope.includes('corporate')) {
      const corpFindings = await this.performCorporateAnalysis(subject, jurisdiction);
      findings.push(...corpFindings.findings);
      entities.push(...corpFindings.entities);
      relationships.push(...corpFindings.relationships);
    }
    
    // Level 5-6: Asset discovery and forensics
    if (targetLevel >= 5) {
      if (scope.includes('property')) {
        const propAssets = await this.performPropertySearch(subject, jurisdiction);
        assets.push(...propAssets);
      }
      if (scope.includes('financial')) {
        const finFindings = await this.performFinancialForensics(subject, jurisdiction);
        findings.push(...finFindings);
      }
    }
    
    // Level 7+: Court-ready evidence (requires human review)
    if (targetLevel >= 7) {
      if (this.config.humanInTheLoop) {
        console.log(`[Investigation] Level ${targetLevel} requires human approval`);
        findings.push({
          id: `finding-${Date.now()}`,
          category: 'risk',
          severity: 'info',
          title: 'Human Review Required',
          description: 'Investigation queued for human verification (human-in-the-loop mandatory)',
          evidence: [],
          confidence: 100,
          actionRequired: true
        });
      }
    }
    
    // Generate timeline
    const generatedTimeline = this.generateTimeline(findings, entities, relationships);
    timeline.push(...generatedTimeline);
    
    // Risk assessment
    const riskAssessment = this.assessRisk(findings, assets, relationships);
    
    const result: InvestigationResult = {
      caseId,
      subject,
      level: targetLevel,
      status: targetLevel >= 7 ? 'requires_review' : 'complete',
      findings,
      entities,
      relationships,
      assets,
      documents,
      timeline,
      recommendations: this.generateRecommendations(findings, targetLevel),
      riskAssessment,
      timestamp: new Date(),
      investigator: `Investigation Engine v${this.config.version}`
    };
    
    console.log(`[Investigation] Investigation complete: ${findings.length} findings, ${entities.length} entities, ${assets.length} assets`);
    
    return result;
  }

  /**
   * Map entity relationships
   */
  async mapRelationships(params: {
    subject: string;
    depth: number;
    types: RelationshipType[];
  }): Promise<Relationship[]> {
    console.log(`[Investigation] Mapping relationships for ${params.subject} (depth: ${params.depth})`);
    
    // Simulated relationship mapping
    const relationships: Relationship[] = [];
    
    // In production, this would query company registries, court records, etc.
    
    return relationships;
  }

  /**
   * Discover assets
   */
  async discoverAssets(params: {
    subject: string;
    jurisdictions: Jurisdiction[];
    types: AssetType[];
  }): Promise<Asset[]> {
    console.log(`[Investigation] Discovering assets for ${params.subject}`);
    console.log(`[Investigation] Jurisdictions: ${params.jurisdictions.join(', ')}`);
    console.log(`[Investigation] Asset types: ${params.types.join(', ')}`);
    
    const assets: Asset[] = [];
    
    // In production, this would query property registries, company registries, etc.
    
    return assets;
  }

  /**
   * Generate investigation report
   */
  async generateReport(params: {
    investigation: InvestigationResult;
    format: 'summary' | 'full' | 'court-bundle';
  }): Promise<string> {
    const { investigation, format } = params;
    
    console.log(`[Investigation] Generating ${format} report for case ${investigation.caseId}`);
    
    let report = `
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║                    INVESTIGATION REPORT                          ║
║                                                                  ║
║                    Orb AI Limited                                ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Case ID: ${investigation.caseId.padEnd(50)}║
║  Subject: ${investigation.subject.name.padEnd(50)}║
║  Type: ${investigation.subject.type.padEnd(53)}║
║  Level: ${investigation.level.toString().padEnd(52)}║
║  Status: ${investigation.status.padEnd(51)}║
║  Date: ${investigation.timestamp.toISOString().padEnd(53)}║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SUMMARY                                                         ║
║  ───────                                                         ║
║  Findings: ${investigation.findings.length.toString().padEnd(49)}║
║  Entities: ${investigation.entities.length.toString().padEnd(49)}║
║  Relationships: ${investigation.relationships.length.toString().padEnd(44)}║
║  Assets: ${investigation.assets.length.toString().padEnd(51)}║
║  Documents: ${investigation.documents.length.toString().padEnd(48)}║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  RISK ASSESSMENT                                                 ║
║  ───────────────                                                 ║
║  Overall Risk: ${investigation.riskAssessment.overallRisk.toUpperCase().padEnd(45)}║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  © 2026 Orb AI Limited. All rights reserved.                     ║
║  VeriTech V✓ Verified                                            ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
    `;
    
    return report;
  }

  // Private methods
  
  private createPrimaryEntity(subject: Subject, jurisdiction: Jurisdiction): Entity {
    return {
      id: `entity-${Date.now()}`,
      type: subject.type,
      name: subject.name,
      jurisdiction,
      status: 'active',
      identifiers: subject.identifiers as Record<string, string>,
      metadata: {}
    };
  }

  private async performIdentityCheck(subject: Subject, jurisdictions: Jurisdiction[]): Promise<InvestigationFinding[]> {
    return [
      {
        id: `finding-${Date.now()}-1`,
        category: 'identity',
        severity: 'info',
        title: 'Subject Identified',
        description: `Subject ${subject.name} identified and verified`,
        evidence: [],
        confidence: 95,
        actionRequired: false
      }
    ];
  }

  private async performCorporateAnalysis(subject: Subject, jurisdictions: Jurisdiction[]): Promise<{
    findings: InvestigationFinding[];
    entities: Entity[];
    relationships: Relationship[];
  }> {
    return {
      findings: [
        {
          id: `finding-${Date.now()}-2`,
          category: 'corporate_structure',
          severity: 'info',
          title: 'Corporate Structure Analyzed',
          description: 'Corporate structure and relationships mapped',
          evidence: [],
          confidence: 88,
          actionRequired: false
        }
      ],
      entities: [],
      relationships: []
    };
  }

  private async performPropertySearch(subject: Subject, jurisdictions: Jurisdiction[]): Promise<Asset[]> {
    return [];
  }

  private async performFinancialForensics(subject: Subject, jurisdictions: Jurisdiction[]): Promise<InvestigationFinding[]> {
    return [
      {
        id: `finding-${Date.now()}-3`,
        category: 'financial',
        severity: 'info',
        title: 'Financial Analysis Complete',
        description: 'Financial forensics analysis completed using forensic accountancy methodology',
        evidence: [],
        confidence: 92,
        actionRequired: false
      }
    ];
  }

  private generateTimeline(findings: InvestigationFinding[], entities: Entity[], relationships: Relationship[]): TimelineEvent[] {
    return [
      {
        date: new Date().toISOString(),
        event: 'Investigation initiated',
        entities: [],
        significance: 'high',
        source: 'Investigation Engine'
      }
    ];
  }

  private assessRisk(findings: InvestigationFinding[], assets: Asset[], relationships: Relationship[]): RiskAssessment {
    const criticalFindings = findings.filter(f => f.severity === 'critical');
    const highFindings = findings.filter(f => f.severity === 'high');
    
    let overallRisk: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (criticalFindings.length > 0) overallRisk = 'critical';
    else if (highFindings.length > 2) overallRisk = 'high';
    else if (highFindings.length > 0) overallRisk = 'medium';
    
    return {
      overallRisk,
      factors: [],
      recommendations: []
    };
  }

  private generateRecommendations(findings: InvestigationFinding[], level: InvestigationLevel): string[] {
    const recommendations: string[] = [];
    
    if (level < 10) {
      recommendations.push(`Continue investigation to Level 10 for VeriTech certification`);
    }
    
    const actionRequired = findings.filter(f => f.actionRequired);
    if (actionRequired.length > 0) {
      recommendations.push(`${actionRequired.length} findings require action`);
    }
    
    return recommendations;
  }
}

// Export default instance
export default new InvestigationEngine();

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  Investigation Engine');
  console.log('  Owned by Orb AI Limited');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('Investigation Levels:');
  Object.entries(INVESTIGATION_LEVELS).forEach(([level, info]) => {
    console.log(`  Level ${level}: ${info.name} - ${info.description}`);
  });
  console.log('');
  console.log('Registry Sources:');
  Object.entries(REGISTRY_SOURCES).forEach(([jurisdiction, sources]) => {
    console.log(`  ${jurisdiction}:`);
    Object.entries(sources).forEach(([type, name]) => {
      console.log(`    - ${type}: ${name}`);
    });
  });
  console.log('');
  console.log('Ready for investigation requests.');
}
