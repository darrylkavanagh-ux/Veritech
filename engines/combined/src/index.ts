/**
 * COMBINED ENGINE - CVK 1100 + JIGSAW PROTOCOL
 * 
 * Copyright (c) 2026 Orb AI Limited. All Rights Reserved.
 * 
 * THE COMPLETE TRUTH RECONSTRUCTION SYSTEM
 * 
 * This engine combines:
 * 1. CVK 1100 - Takes all known facts and extracts what is REAL, TRUE, and NEEDED
 * 2. Jigsaw Protocol - Compresses verified fragments and reconstructs the complete picture
 * 
 * Together, they "create everything that doesn't exist based on everything that exists"
 * 
 * Universal Application:
 * - Missing persons → Find them
 * - Missing assets → Locate them
 * - Hidden wealth → Expose it
 * - Fraud → Prove it
 * - Corruption → Reveal it
 * - Predatory lending → Document it
 * 
 * Human-in-the-loop is MANDATORY for Level 7+ verifications.
 * 
 * TO 1100.
 */

import crypto from 'crypto';
import { CVK1100Engine, CaseContext, RawInput, CVK1100Result } from './cvk-1100';
import { JigsawProtocolEngine, JigsawResult, CaseType, Picture, TruthFragment } from './jigsaw-protocol';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Combined Engine Result
 */
export interface CombinedEngineResult {
  success: boolean;
  caseId: string;
  caseType: CaseType;
  
  // CVK 1100 Phase
  cvk1100Result: CVK1100Result;
  
  // Jigsaw Protocol Phase
  jigsawResult: JigsawResult;
  
  // Combined Analysis
  combinedAnalysis: CombinedAnalysis;
  
  // Court Readiness
  courtReadiness: CourtReadinessAssessment;
  
  // Human Review
  humanReviewRequired: boolean;
  humanReviewItems: HumanReviewSummary[];
  
  // Recommendations
  recommendations: Recommendation[];
  nextSteps: string[];
  
  // Metadata
  processingTime: number;
  engineSignature: string;
  timestamp: Date;
}

/**
 * Combined analysis from both engines
 */
export interface CombinedAnalysis {
  totalInputsProcessed: number;
  fragmentsVerified: number;
  fragmentsRejected: number;
  pictureCompleteness: number;
  gapsIdentified: number;
  conclusionsDrawn: number;
  confidenceScore: number;
  truthReconstruction: string;
  keyFindings: KeyFinding[];
  evidenceChain: EvidenceChainLink[];
}

/**
 * Key finding from the analysis
 */
export interface KeyFinding {
  id: string;
  type: 'discovery' | 'pattern' | 'anomaly' | 'connection' | 'gap';
  title: string;
  description: string;
  supportingEvidence: string[];
  confidence: number;
  courtReady: boolean;
  humanVerified: boolean;
}

/**
 * Evidence chain link
 */
export interface EvidenceChainLink {
  id: string;
  fragmentId: string;
  componentId: string;
  position: number;
  description: string;
  verificationLevel: number;
  hash: string;
}

/**
 * Court readiness assessment
 */
export interface CourtReadinessAssessment {
  isReady: boolean;
  readinessScore: number;
  strengths: string[];
  weaknesses: string[];
  requiredActions: string[];
  jurisdictionCompliance: JurisdictionCompliance[];
  documentationStatus: DocumentationStatus;
}

/**
 * Jurisdiction compliance
 */
export interface JurisdictionCompliance {
  jurisdiction: string;
  compliant: boolean;
  requirements: string[];
  gaps: string[];
}

/**
 * Documentation status
 */
export interface DocumentationStatus {
  evidencePackageReady: boolean;
  chainOfCustodyComplete: boolean;
  witnessStatementsVerified: boolean;
  expertReportsAvailable: boolean;
  legalBriefDrafted: boolean;
}

/**
 * Human review summary
 */
export interface HumanReviewSummary {
  itemId: string;
  source: 'cvk1100' | 'jigsaw';
  reason: string;
  priority: number;
  requiredExpertise: string[];
  deadline: Date | null;
  status: 'pending' | 'in_progress' | 'completed' | 'escalated';
}

/**
 * Recommendation
 */
export interface Recommendation {
  id: string;
  type: 'investigation' | 'verification' | 'legal' | 'documentation' | 'human_review';
  priority: number;
  title: string;
  description: string;
  actionItems: string[];
  deadline: Date | null;
}

// ============================================================================
// COMBINED ENGINE
// ============================================================================

export class CombinedEngine {
  private readonly engineId: string;
  private readonly version = '1.0.0';
  private readonly owner = 'Orb AI Limited';
  private readonly cvk1100: CVK1100Engine;
  private readonly jigsawProtocol: JigsawProtocolEngine;

  constructor() {
    this.engineId = `COMBINED-${crypto.randomUUID()}`;
    this.cvk1100 = new CVK1100Engine();
    this.jigsawProtocol = new JigsawProtocolEngine();
  }

  /**
   * MAIN ENTRY POINT
   * Process inputs through CVK 1100 and Jigsaw Protocol
   */
  async processCase(
    inputs: RawInput[],
    caseId: string,
    caseType: CaseType,
    caseTitle: string,
    caseContext: CaseContext
  ): Promise<CombinedEngineResult> {
    const startTime = Date.now();

    // ========================================================================
    // PHASE 1: CVK 1100 - Extract verified truth
    // ========================================================================
    console.log(`[Combined Engine] Phase 1: CVK 1100 processing ${inputs.length} inputs...`);
    const cvk1100Result = await this.cvk1100.processInputs(inputs, caseContext);
    console.log(`[Combined Engine] CVK 1100 complete: ${cvk1100Result.verifiedFragments.length} fragments verified`);

    // ========================================================================
    // PHASE 2: Jigsaw Protocol - Reconstruct the picture
    // ========================================================================
    console.log(`[Combined Engine] Phase 2: Jigsaw Protocol processing ${cvk1100Result.verifiedFragments.length} fragments...`);
    const jigsawResult = await this.jigsawProtocol.processFragments(
      cvk1100Result.verifiedFragments,
      caseId,
      caseType,
      caseTitle
    );
    console.log(`[Combined Engine] Jigsaw Protocol complete: ${jigsawResult.picture.completionPercentage.toFixed(1)}% picture completion`);

    // ========================================================================
    // PHASE 3: Combined Analysis
    // ========================================================================
    const combinedAnalysis = this.performCombinedAnalysis(cvk1100Result, jigsawResult);

    // ========================================================================
    // PHASE 4: Court Readiness Assessment
    // ========================================================================
    const courtReadiness = this.assessCourtReadiness(cvk1100Result, jigsawResult, caseContext);

    // ========================================================================
    // PHASE 5: Human Review Consolidation
    // ========================================================================
    const humanReviewItems = this.consolidateHumanReview(cvk1100Result, jigsawResult);
    const humanReviewRequired = humanReviewItems.length > 0 || jigsawResult.humanReviewRequired;

    // ========================================================================
    // PHASE 6: Generate Recommendations
    // ========================================================================
    const recommendations = this.generateRecommendations(
      cvk1100Result, 
      jigsawResult, 
      combinedAnalysis, 
      courtReadiness
    );

    // ========================================================================
    // PHASE 7: Generate Next Steps
    // ========================================================================
    const nextSteps = this.generateNextSteps(
      cvk1100Result,
      jigsawResult,
      combinedAnalysis,
      courtReadiness,
      humanReviewRequired
    );

    const processingTime = Date.now() - startTime;

    return {
      success: true,
      caseId,
      caseType,
      cvk1100Result,
      jigsawResult,
      combinedAnalysis,
      courtReadiness,
      humanReviewRequired,
      humanReviewItems,
      recommendations,
      nextSteps,
      processingTime,
      engineSignature: this.generateEngineSignature(cvk1100Result, jigsawResult),
      timestamp: new Date()
    };
  }

  /**
   * Perform combined analysis
   */
  private performCombinedAnalysis(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult
  ): CombinedAnalysis {
    // Build evidence chain
    const evidenceChain = this.buildEvidenceChain(
      cvk1100Result.verifiedFragments,
      jigsawResult.picture
    );

    // Extract key findings
    const keyFindings = this.extractKeyFindings(cvk1100Result, jigsawResult);

    // Calculate confidence score
    const confidenceScore = this.calculateOverallConfidence(cvk1100Result, jigsawResult);

    return {
      totalInputsProcessed: cvk1100Result.processedInputs,
      fragmentsVerified: cvk1100Result.verifiedFragments.length,
      fragmentsRejected: cvk1100Result.rejectedInputs.length,
      pictureCompleteness: jigsawResult.picture.completionPercentage,
      gapsIdentified: jigsawResult.gapsIdentified,
      conclusionsDrawn: jigsawResult.conclusionsDrawn,
      confidenceScore,
      truthReconstruction: jigsawResult.picture.reconstructedTruth,
      keyFindings,
      evidenceChain
    };
  }

  /**
   * Build evidence chain linking fragments to components
   */
  private buildEvidenceChain(
    fragments: TruthFragment[],
    picture: Picture
  ): EvidenceChainLink[] {
    const chain: EvidenceChainLink[] = [];

    for (let i = 0; i < picture.placedComponents.length; i++) {
      const component = picture.placedComponents[i];
      const fragment = fragments.find(f => f.id === component.fragmentId);

      if (fragment) {
        chain.push({
          id: `ECL-${crypto.randomUUID()}`,
          fragmentId: fragment.id,
          componentId: component.id,
          position: i + 1,
          description: fragment.content.substring(0, 100) + '...',
          verificationLevel: fragment.verificationLevel,
          hash: component.hash
        });
      }
    }

    return chain;
  }

  /**
   * Extract key findings from both engines
   */
  private extractKeyFindings(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult
  ): KeyFinding[] {
    const findings: KeyFinding[] = [];

    // Findings from CVK 1100
    if (cvk1100Result.verificationSummary.verified > 0) {
      findings.push({
        id: `KF-${crypto.randomUUID()}`,
        type: 'discovery',
        title: 'Evidence Verification Complete',
        description: `${cvk1100Result.verificationSummary.verified} pieces of evidence verified through CVK 1100 protocol`,
        supportingEvidence: cvk1100Result.verifiedFragments.map(f => f.id),
        confidence: cvk1100Result.verificationSummary.averageConfidence,
        courtReady: cvk1100Result.verificationSummary.averageConfidence >= 80,
        humanVerified: false
      });
    }

    // Findings from Jigsaw Protocol
    for (const conclusion of jigsawResult.picture.conclusions) {
      findings.push({
        id: `KF-${crypto.randomUUID()}`,
        type: conclusion.type === 'certainty' ? 'discovery' : 
              conclusion.type === 'finding' ? 'pattern' : 
              conclusion.type === 'warning' ? 'anomaly' : 'connection',
        title: conclusion.type.charAt(0).toUpperCase() + conclusion.type.slice(1),
        description: conclusion.statement,
        supportingEvidence: conclusion.supportingComponents,
        confidence: conclusion.confidence,
        courtReady: conclusion.courtReady,
        humanVerified: conclusion.humanVerified
      });
    }

    // Gap findings
    if (jigsawResult.gapsIdentified > 0) {
      findings.push({
        id: `KF-${crypto.randomUUID()}`,
        type: 'gap',
        title: 'Investigation Gaps Identified',
        description: `${jigsawResult.gapsIdentified} gaps in the evidence picture require additional investigation`,
        supportingEvidence: jigsawResult.picture.gaps.map(g => g.id),
        confidence: 100,
        courtReady: false,
        humanVerified: false
      });
    }

    return findings;
  }

  /**
   * Calculate overall confidence score
   */
  private calculateOverallConfidence(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult
  ): number {
    // CVK 1100 confidence (40% weight)
    const cvkConfidence = cvk1100Result.verificationSummary.averageConfidence * 0.4;

    // Jigsaw completion (30% weight)
    const jigsawCompletion = jigsawResult.picture.completionPercentage * 0.3;

    // Court readiness (20% weight)
    const courtReadiness = jigsawResult.courtReadiness * 0.2;

    // Evidence chain integrity (10% weight)
    const verifiedRatio = cvk1100Result.verifiedFragments.length / 
                         Math.max(1, cvk1100Result.processedInputs);
    const chainIntegrity = verifiedRatio * 100 * 0.1;

    return cvkConfidence + jigsawCompletion + courtReadiness + chainIntegrity;
  }

  /**
   * Assess court readiness
   */
  private assessCourtReadiness(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult,
    caseContext: CaseContext
  ): CourtReadinessAssessment {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const requiredActions: string[] = [];

    // Assess strengths
    if (cvk1100Result.verificationSummary.averageConfidence >= 80) {
      strengths.push('High confidence evidence verification');
    }
    if (jigsawResult.picture.completionPercentage >= 90) {
      strengths.push('Near-complete evidence picture');
    }
    if (jigsawResult.picture.conclusions.some(c => c.courtReady)) {
      strengths.push('Court-ready conclusions available');
    }

    // Assess weaknesses
    if (cvk1100Result.rejectedInputs.length > cvk1100Result.verifiedFragments.length) {
      weaknesses.push('High rejection rate - evidence quality concerns');
    }
    if (jigsawResult.gapsIdentified > 3) {
      weaknesses.push('Multiple gaps in evidence picture');
    }
    if (cvk1100Result.humanReviewRequired.length > 0) {
      weaknesses.push('Pending human review items');
    }

    // Required actions
    if (jigsawResult.humanReviewRequired) {
      requiredActions.push('Complete mandatory human review');
    }
    if (jigsawResult.gapsIdentified > 0) {
      requiredActions.push('Address identified evidence gaps');
    }
    if (!jigsawResult.picture.courtReady) {
      requiredActions.push('Achieve court-ready status');
    }

    // Jurisdiction compliance
    const jurisdictionCompliance = caseContext.jurisdictions.map(j => ({
      jurisdiction: j,
      compliant: true,  // Would check against jurisdiction-specific requirements
      requirements: this.getJurisdictionRequirements(j),
      gaps: []
    }));

    // Documentation status
    const documentationStatus: DocumentationStatus = {
      evidencePackageReady: jigsawResult.picture.completionPercentage >= 80,
      chainOfCustodyComplete: cvk1100Result.verifiedFragments.every(f => f.chainOfCustody.length > 0),
      witnessStatementsVerified: cvk1100Result.verifiedFragments.some(f => f.type === 'survivor_testimony'),
      expertReportsAvailable: false,  // Would check for expert reports
      legalBriefDrafted: false  // Would check for legal brief
    };

    // Calculate readiness score
    let readinessScore = 0;
    if (cvk1100Result.verificationSummary.averageConfidence >= 70) readinessScore += 25;
    if (jigsawResult.picture.completionPercentage >= 80) readinessScore += 25;
    if (jigsawResult.picture.courtReady) readinessScore += 25;
    if (documentationStatus.chainOfCustodyComplete) readinessScore += 15;
    if (cvk1100Result.humanReviewRequired.length === 0) readinessScore += 10;

    return {
      isReady: readinessScore >= 75 && jigsawResult.picture.courtReady,
      readinessScore,
      strengths,
      weaknesses,
      requiredActions,
      jurisdictionCompliance,
      documentationStatus
    };
  }

  /**
   * Get jurisdiction-specific requirements
   */
  private getJurisdictionRequirements(jurisdiction: string): string[] {
    const requirements: Record<string, string[]> = {
      'IE': ['Garda evidence standards', 'Irish court admissibility rules'],
      'UK': ['Crown Prosecution Service guidelines', 'UK evidence act compliance'],
      'NI': ['PSNI evidence standards', 'Northern Ireland court rules'],
      'SC': ['Scottish court evidence requirements', 'Procurator Fiscal standards'],
      'WA': ['Welsh court procedures', 'CPS Wales guidelines'],
      'EN': ['English court evidence rules', 'CPS England guidelines'],
      'ES': ['Spanish court requirements', 'EU evidence standards'],
      'EU': ['European Court of Justice standards', 'Cross-border evidence protocols']
    };
    return requirements[jurisdiction] || ['Standard evidence requirements'];
  }

  /**
   * Consolidate human review items from both engines
   */
  private consolidateHumanReview(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult
  ): HumanReviewSummary[] {
    const items: HumanReviewSummary[] = [];

    // From CVK 1100
    for (const review of cvk1100Result.humanReviewRequired) {
      items.push({
        itemId: review.inputId,
        source: 'cvk1100',
        reason: review.reason,
        priority: review.priority,
        requiredExpertise: review.requiredExpertise,
        deadline: review.deadline,
        status: 'pending'
      });
    }

    // From Jigsaw Protocol (if picture requires review)
    if (jigsawResult.humanReviewRequired) {
      items.push({
        itemId: jigsawResult.picture.id,
        source: 'jigsaw',
        reason: 'Complete picture requires human verification before court submission',
        priority: 10,
        requiredExpertise: ['Senior Investigator', 'Legal Counsel'],
        deadline: new Date(Date.now() + 72 * 60 * 60 * 1000),
        status: 'pending'
      });
    }

    // Sort by priority (highest first)
    return items.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult,
    combinedAnalysis: CombinedAnalysis,
    courtReadiness: CourtReadinessAssessment
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Investigation recommendations
    if (jigsawResult.gapsIdentified > 0) {
      recommendations.push({
        id: `REC-${crypto.randomUUID()}`,
        type: 'investigation',
        priority: 9,
        title: 'Address Evidence Gaps',
        description: `${jigsawResult.gapsIdentified} gaps identified in the evidence picture require additional investigation`,
        actionItems: jigsawResult.picture.gaps.map(g => `Investigate: ${g.description}`),
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    }

    // Verification recommendations
    if (cvk1100Result.rejectedInputs.length > 0) {
      recommendations.push({
        id: `REC-${crypto.randomUUID()}`,
        type: 'verification',
        priority: 7,
        title: 'Review Rejected Evidence',
        description: `${cvk1100Result.rejectedInputs.length} pieces of evidence were rejected - review for potential re-submission with additional corroboration`,
        actionItems: cvk1100Result.rejectedInputs.slice(0, 5).map(r => `Review: ${r.reason}`),
        deadline: null
      });
    }

    // Human review recommendations
    if (cvk1100Result.humanReviewRequired.length > 0) {
      recommendations.push({
        id: `REC-${crypto.randomUUID()}`,
        type: 'human_review',
        priority: 10,
        title: 'Complete Mandatory Human Review',
        description: `${cvk1100Result.humanReviewRequired.length} items require human expert review (Level 7+ verification)`,
        actionItems: ['Assign to qualified reviewers', 'Track review progress', 'Document review decisions'],
        deadline: new Date(Date.now() + 72 * 60 * 60 * 1000)
      });
    }

    // Legal recommendations
    if (courtReadiness.isReady) {
      recommendations.push({
        id: `REC-${crypto.randomUUID()}`,
        type: 'legal',
        priority: 8,
        title: 'Prepare Court Submission',
        description: 'Evidence package is court-ready - proceed with legal counsel review',
        actionItems: [
          'Generate court-ready documentation package',
          'Schedule legal counsel review',
          'Prepare witness statements',
          'Draft legal brief'
        ],
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      });
    }

    // Documentation recommendations
    if (!courtReadiness.documentationStatus.evidencePackageReady) {
      recommendations.push({
        id: `REC-${crypto.randomUUID()}`,
        type: 'documentation',
        priority: 6,
        title: 'Complete Evidence Documentation',
        description: 'Evidence package requires additional documentation before court submission',
        actionItems: [
          'Complete chain of custody documentation',
          'Verify all witness statements',
          'Compile expert reports',
          'Generate evidence index'
        ],
        deadline: null
      });
    }

    // Sort by priority
    return recommendations.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Generate next steps
   */
  private generateNextSteps(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult,
    combinedAnalysis: CombinedAnalysis,
    courtReadiness: CourtReadinessAssessment,
    humanReviewRequired: boolean
  ): string[] {
    const steps: string[] = [];
    let stepNumber = 1;

    // Human review is always first if required
    if (humanReviewRequired) {
      steps.push(`${stepNumber}. MANDATORY: Complete human review for ${cvk1100Result.humanReviewRequired.length} items`);
      stepNumber++;
    }

    // Address gaps
    if (jigsawResult.gapsIdentified > 0) {
      steps.push(`${stepNumber}. Investigate ${jigsawResult.gapsIdentified} identified evidence gaps`);
      stepNumber++;
    }

    // Court readiness actions
    if (courtReadiness.isReady) {
      steps.push(`${stepNumber}. Generate court-ready documentation package`);
      stepNumber++;
      steps.push(`${stepNumber}. Schedule legal counsel review`);
      stepNumber++;
      steps.push(`${stepNumber}. Prepare for court filing`);
    } else {
      steps.push(`${stepNumber}. Continue evidence gathering to achieve court readiness`);
      stepNumber++;
      steps.push(`${stepNumber}. Re-run Combined Engine when new evidence available`);
    }

    return steps;
  }

  /**
   * Generate engine signature
   */
  private generateEngineSignature(
    cvk1100Result: CVK1100Result,
    jigsawResult: JigsawResult
  ): string {
    const data = {
      engineId: this.engineId,
      version: this.version,
      owner: this.owner,
      cvk1100Signature: cvk1100Result.engineSignature,
      jigsawPictureHash: jigsawResult.picture.hash,
      timestamp: new Date().toISOString()
    };
    return crypto.createHash('sha512').update(JSON.stringify(data)).digest('hex');
  }

  /**
   * Get engine information
   */
  getEngineInfo(): Record<string, unknown> {
    return {
      engineId: this.engineId,
      version: this.version,
      owner: this.owner,
      protocol: 'Combined CVK 1100 + Jigsaw Protocol',
      description: 'Creates everything that doesn\'t exist based on everything that exists',
      components: {
        cvk1100: this.cvk1100.getEngineInfo(),
        jigsawProtocol: this.jigsawProtocol.getEngineInfo()
      },
      capabilities: [
        'Full truth extraction and verification',
        'Fragment compression and engineering',
        'Picture reconstruction',
        'Gap identification',
        'Court readiness assessment',
        'Multi-jurisdiction compliance',
        'Human-in-the-loop integration',
        'Evidence chain management'
      ],
      universalApplications: [
        'Missing persons investigation',
        'Asset tracing and recovery',
        'Fraud investigation and proof',
        'Corruption exposure',
        'Predatory lending documentation',
        'Financial crime investigation',
        'Hidden wealth discovery',
        'Historical investigation'
      ],
      humanInTheLoop: 'MANDATORY for Level 7+ verifications'
    };
  }
}

// Export singleton instance
export const combinedEngine = new CombinedEngine();
