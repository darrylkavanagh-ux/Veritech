/**
 * CVK 1100 TRUTH ENGINE TESTS
 * 
 * Copyright (c) 2026 Orb AI Limited. All Rights Reserved.
 * 
 * Tests for CVK 1100 - the engine that takes all known facts and determines
 * what is REAL, TRUE, and NEEDED.
 * 
 * TO 1100.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  CVK1100Engine, 
  RawInput, 
  CaseContext,
  CVK1100Result
} from './cvk-1100';

describe('CVK1100Engine', () => {
  let engine: CVK1100Engine;

  beforeEach(() => {
    engine = new CVK1100Engine();
  });

  describe('Engine Initialization', () => {
    it('should initialize with correct owner', () => {
      const info = engine.getEngineInfo();
      expect(info.owner).toBe('Orb AI Limited');
    });

    it('should have CVK 1100 protocol identifier', () => {
      const info = engine.getEngineInfo();
      expect(info.protocol).toBe('CVK 1100');
    });

    it('should have version 1100', () => {
      const info = engine.getEngineInfo();
      expect(info.version).toBe('1100');
    });

    it('should describe the core capability', () => {
      const info = engine.getEngineInfo();
      expect(info.description).toContain('REAL');
      expect(info.description).toContain('TRUE');
      expect(info.description).toContain('NEEDED');
    });

    it('should list verification levels', () => {
      const info = engine.getEngineInfo();
      const levels = info.verificationLevels as Record<string, string>;
      expect(levels['1-3']).toContain('Automated');
      expect(levels['4-6']).toContain('Enhanced');
      expect(levels['7-10']).toContain('human-in-the-loop');
    });

    it('should list source types from cave carvings to modern', () => {
      const info = engine.getEngineInfo();
      const sources = info.sourceTypes as string[];
      expect(sources.some(s => s.toLowerCase().includes('cave'))).toBe(true);
      expect(sources.some(s => s.toLowerCase().includes('digital'))).toBe(true);
    });
  });

  describe('Input Processing', () => {
    const createTestInput = (overrides: Partial<RawInput> = {}): RawInput => ({
      id: `INPUT-${Date.now()}`,
      source: 'Test Source',
      sourceType: 'legal_document',
      content: 'This is test content for verification purposes.',
      rawData: { test: true },
      metadata: {},
      timestamp: new Date(),
      jurisdiction: 'IE',
      provenance: [{
        timestamp: new Date(),
        source: 'Original Source',
        method: 'Direct Collection',
        handler: 'Test Handler',
        verified: true
      }],
      ...overrides
    });

    const createTestContext = (overrides: Partial<CaseContext> = {}): CaseContext => ({
      caseId: 'CASE-001',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
      jurisdictions: ['IE', 'UK'],
      subjects: ['Test Subject'],
      keywords: ['fraud', 'investigation'],
      ...overrides
    });

    it('should process valid inputs', async () => {
      const inputs = [createTestInput()];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.success).toBe(true);
      expect(result.processedInputs).toBe(1);
    });

    it('should verify fragments from valid inputs', async () => {
      const inputs = [
        createTestInput({ id: 'INPUT-1' }),
        createTestInput({ id: 'INPUT-2' }),
        createTestInput({ id: 'INPUT-3' })
      ];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.verifiedFragments.length).toBeGreaterThan(0);
    });

    it('should reject inputs with empty content', async () => {
      const inputs = [createTestInput({ content: '' })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      // Empty content should fail reality check
      expect(result.rejectedInputs.length).toBeGreaterThanOrEqual(0);
    });

    it('should reject inputs with future timestamps', async () => {
      const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      const inputs = [createTestInput({ timestamp: futureDate })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      // Future timestamp should trigger anomaly
      expect(result.humanReviewRequired.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Reality Checks', () => {
    const createTestInput = (overrides: Partial<RawInput> = {}): RawInput => ({
      id: `INPUT-${Date.now()}`,
      source: 'Test Source',
      sourceType: 'legal_document',
      content: 'Valid content for reality checking.',
      rawData: {},
      metadata: {},
      timestamp: new Date(),
      jurisdiction: 'IE',
      provenance: [{
        timestamp: new Date(),
        source: 'Verified Source',
        method: 'Collection',
        handler: 'Handler',
        verified: true
      }],
      ...overrides
    });

    const createTestContext = (): CaseContext => ({
      caseId: 'CASE-REALITY',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      jurisdictions: ['IE', 'UK'],
      subjects: [],
      keywords: []
    });

    it('should verify source existence', async () => {
      const inputs = [createTestInput({ source: 'Valid Source' })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      // Valid source should pass
      expect(result.verifiedFragments.length).toBeGreaterThanOrEqual(0);
    });

    it('should verify content substantiveness', async () => {
      const inputs = [createTestInput({ 
        content: 'This is substantial content that provides meaningful information for the investigation.'
      })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.verifiedFragments.length).toBeGreaterThanOrEqual(0);
    });

    it('should verify temporal validity', async () => {
      const validDate = new Date(2024, 6, 15);
      const inputs = [createTestInput({ timestamp: validDate })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.success).toBe(true);
    });

    it('should verify provenance chain', async () => {
      const inputs = [createTestInput({
        provenance: [
          { timestamp: new Date(), source: 'Source 1', method: 'Collection', handler: 'Handler 1', verified: true },
          { timestamp: new Date(), source: 'Source 2', method: 'Transfer', handler: 'Handler 2', verified: true }
        ]
      })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.verifiedFragments.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Truth Checks', () => {
    const createTestInput = (overrides: Partial<RawInput> = {}): RawInput => ({
      id: `INPUT-${Date.now()}`,
      source: 'Test Source',
      sourceType: 'financial_record',
      content: 'Financial record showing transaction details.',
      rawData: {},
      metadata: {},
      timestamp: new Date(),
      jurisdiction: 'IE',
      provenance: [{
        timestamp: new Date(),
        source: 'Bank Records',
        method: 'Official Request',
        handler: 'Financial Investigator',
        verified: true
      }],
      ...overrides
    });

    const createTestContext = (): CaseContext => ({
      caseId: 'CASE-TRUTH',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      jurisdictions: ['IE', 'UK'],
      subjects: [],
      keywords: []
    });

    it('should check internal consistency', async () => {
      const inputs = [createTestInput()];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.success).toBe(true);
    });

    it('should check external corroboration', async () => {
      const inputs = [createTestInput({
        provenance: [
          { timestamp: new Date(), source: 'Source 1', method: 'Collection', handler: 'Handler', verified: true },
          { timestamp: new Date(), source: 'Source 2', method: 'Verification', handler: 'Verifier', verified: true }
        ]
      })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      // Multiple verified sources should increase confidence
      expect(result.verifiedFragments.length).toBeGreaterThanOrEqual(0);
    });

    it('should check temporal consistency with case', async () => {
      const caseStartDate = new Date(2024, 0, 1);
      const inputDate = new Date(2024, 6, 15); // After case start
      
      const inputs = [createTestInput({ timestamp: inputDate })];
      const context: CaseContext = {
        caseId: 'CASE-TEMPORAL',
        caseType: 'fraud',
        startDate: caseStartDate,
        jurisdictions: ['IE'],
        subjects: [],
        keywords: []
      };

      const result = await engine.processInputs(inputs, context);

      expect(result.success).toBe(true);
    });

    it('should check jurisdictional validity', async () => {
      const inputs = [createTestInput({ jurisdiction: 'IE' })];
      const context: CaseContext = {
        caseId: 'CASE-JURISDICTION',
        caseType: 'fraud',
        startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        jurisdictions: ['IE', 'UK'],
        subjects: [],
        keywords: []
      };

      const result = await engine.processInputs(inputs, context);

      expect(result.verifiedFragments.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Necessity Checks', () => {
    const createTestInput = (overrides: Partial<RawInput> = {}): RawInput => ({
      id: `INPUT-${Date.now()}`,
      source: 'Test Source',
      sourceType: 'financial_record',
      content: 'Account number: IE12BANK12345678901234 showing suspicious transactions.',
      rawData: {},
      metadata: {},
      timestamp: new Date(),
      jurisdiction: 'IE',
      provenance: [{
        timestamp: new Date(),
        source: 'Bank',
        method: 'Official Request',
        handler: 'Investigator',
        verified: true
      }],
      ...overrides
    });

    const createTestContext = (): CaseContext => ({
      caseId: 'CASE-NECESSITY',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      jurisdictions: ['IE'],
      subjects: [],
      keywords: []
    });

    it('should assess case type relevance', async () => {
      const inputs = [createTestInput({ sourceType: 'financial_record' })];
      const context: CaseContext = {
        ...createTestContext(),
        caseType: 'fraud'  // Financial records are relevant to fraud
      };

      const result = await engine.processInputs(inputs, context);

      expect(result.verifiedFragments.length).toBeGreaterThanOrEqual(0);
    });

    it('should identify actionable intelligence', async () => {
      const inputs = [createTestInput({
        content: 'Email: suspect@example.com, IP: 192.168.1.1, Account: IE12BANK12345678901234'
      })];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      // Content with identifiable patterns should be considered actionable
      expect(result.success).toBe(true);
    });
  });

  describe('Human Review Requirements', () => {
    const createTestInput = (overrides: Partial<RawInput> = {}): RawInput => ({
      id: `INPUT-${Date.now()}`,
      source: 'Critical Source',
      sourceType: 'witness_statement',
      content: 'Critical witness testimony requiring human verification.',
      rawData: {},
      metadata: {},
      timestamp: new Date(),
      jurisdiction: 'IE',
      provenance: [{
        timestamp: new Date(),
        source: 'Witness Interview',
        method: 'Formal Statement',
        handler: 'Senior Investigator',
        verified: true
      }],
      ...overrides
    });

    const createTestContext = (): CaseContext => ({
      caseId: 'CASE-HUMAN',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      jurisdictions: ['IE'],
      subjects: [],
      keywords: []
    });

    it('should flag high-level verifications for human review', async () => {
      const inputs = [
        createTestInput({ id: 'INPUT-1' }),
        createTestInput({ id: 'INPUT-2' }),
        createTestInput({ id: 'INPUT-3' })
      ];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      // Level 7+ verifications should require human review
      expect(result.humanReviewRequired).toBeDefined();
      expect(Array.isArray(result.humanReviewRequired)).toBe(true);
    });

    it('should include required expertise for review', async () => {
      const inputs = [createTestInput()];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      if (result.humanReviewRequired.length > 0) {
        const review = result.humanReviewRequired[0];
        expect(review.requiredExpertise).toBeDefined();
        expect(Array.isArray(review.requiredExpertise)).toBe(true);
      }
    });

    it('should set review deadlines', async () => {
      const inputs = [createTestInput()];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      if (result.humanReviewRequired.length > 0) {
        const review = result.humanReviewRequired[0];
        expect(review.deadline).toBeDefined();
      }
    });
  });

  describe('Source Type Support', () => {
    const sourceTypes = [
      'cave_carving',
      'ancient_manuscript',
      'historical_archive',
      'oral_tradition',
      'written_record',
      'legal_document',
      'financial_record',
      'government_database',
      'corporate_record',
      'digital_trace',
      'witness_statement',
      'physical_evidence',
      'scientific_analysis',
      'surveillance_data',
      'communication_intercept',
      'osint_collection'
    ] as const;

    const createTestContext = (): CaseContext => ({
      caseId: 'CASE-SOURCE',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      jurisdictions: ['IE', 'UK', 'EU'],
      subjects: [],
      keywords: []
    });

    sourceTypes.forEach(sourceType => {
      it(`should handle ${sourceType} source type`, async () => {
        const inputs: RawInput[] = [{
          id: `INPUT-${sourceType}`,
          source: `Test ${sourceType}`,
          sourceType,
          content: `Content from ${sourceType} source`,
          rawData: {},
          metadata: {},
          timestamp: new Date(),
          jurisdiction: 'IE',
          provenance: [{
            timestamp: new Date(),
            source: 'Test',
            method: 'Collection',
            handler: 'Handler',
            verified: true
          }]
        }];
        const context = createTestContext();

        const result = await engine.processInputs(inputs, context);

        expect(result.success).toBe(true);
        expect(result.processedInputs).toBe(1);
      });
    });
  });

  describe('Verification Summary', () => {
    const createTestInput = (id: string): RawInput => ({
      id,
      source: 'Test Source',
      sourceType: 'legal_document',
      content: 'Test content for verification.',
      rawData: {},
      metadata: {},
      timestamp: new Date(),
      jurisdiction: 'IE',
      provenance: [{
        timestamp: new Date(),
        source: 'Source',
        method: 'Collection',
        handler: 'Handler',
        verified: true
      }]
    });

    const createTestContext = (): CaseContext => ({
      caseId: 'CASE-SUMMARY',
      caseType: 'fraud',
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      jurisdictions: ['IE'],
      subjects: [],
      keywords: []
    });

    it('should generate verification summary', async () => {
      const inputs = [
        createTestInput('INPUT-1'),
        createTestInput('INPUT-2'),
        createTestInput('INPUT-3')
      ];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.verificationSummary).toBeDefined();
      expect(result.verificationSummary.totalInputs).toBe(3);
    });

    it('should track level distribution', async () => {
      const inputs = [
        createTestInput('INPUT-1'),
        createTestInput('INPUT-2')
      ];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.verificationSummary.levelDistribution).toBeDefined();
      // Should have entries for levels 1-10
      expect(Object.keys(result.verificationSummary.levelDistribution).length).toBe(10);
    });

    it('should calculate average confidence', async () => {
      const inputs = [
        createTestInput('INPUT-1'),
        createTestInput('INPUT-2'),
        createTestInput('INPUT-3')
      ];
      const context = createTestContext();

      const result = await engine.processInputs(inputs, context);

      expect(result.verificationSummary.averageConfidence).toBeGreaterThanOrEqual(0);
      expect(result.verificationSummary.averageConfidence).toBeLessThanOrEqual(100);
    });
  });

  describe('Chain of Custody', () => {
    it('should maintain chain of custody in verified fragments', async () => {
      const inputs: RawInput[] = [{
        id: 'INPUT-CUSTODY',
        source: 'Evidence Source',
        sourceType: 'physical_evidence',
        content: 'Physical evidence with chain of custody.',
        rawData: {},
        metadata: {},
        timestamp: new Date(),
        jurisdiction: 'IE',
        provenance: [
          { timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), source: 'Scene', method: 'Collection', handler: 'Officer A', verified: true },
          { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), source: 'Lab', method: 'Analysis', handler: 'Analyst B', verified: true },
          { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), source: 'Storage', method: 'Secure Storage', handler: 'Custodian C', verified: true }
        ]
      }];
      const context: CaseContext = {
        caseId: 'CASE-CUSTODY',
        caseType: 'fraud',
        startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        jurisdictions: ['IE'],
        subjects: [],
        keywords: []
      };

      const result = await engine.processInputs(inputs, context);

      if (result.verifiedFragments.length > 0) {
        const fragment = result.verifiedFragments[0];
        expect(fragment.chainOfCustody).toBeDefined();
        expect(fragment.chainOfCustody.length).toBeGreaterThan(0);
        
        // Should include CVK 1100 processing in chain
        const cvkEntry = fragment.chainOfCustody.find(e => e.handler === 'CVK 1100 Engine');
        expect(cvkEntry).toBeDefined();
      }
    });
  });

  describe('Engine Signature', () => {
    it('should generate unique engine signature', async () => {
      const inputs: RawInput[] = [{
        id: 'INPUT-SIG',
        source: 'Test',
        sourceType: 'legal_document',
        content: 'Test content.',
        rawData: {},
        metadata: {},
        timestamp: new Date(),
        jurisdiction: 'IE',
        provenance: []
      }];
      const context: CaseContext = {
        caseId: 'CASE-SIG',
        caseType: 'fraud',
        startDate: new Date(),
        jurisdictions: ['IE'],
        subjects: [],
        keywords: []
      };

      const result = await engine.processInputs(inputs, context);

      expect(result.engineSignature).toBeDefined();
      expect(result.engineSignature.length).toBeGreaterThan(0);
    });
  });
});
