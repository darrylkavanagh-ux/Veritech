/**
 * Investigation Engine Tests
 * 
 * Owned by Orb AI Limited
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  InvestigationEngine, 
  INVESTIGATION_LEVELS, 
  REGISTRY_SOURCES,
  CONFIG,
  type InvestigationRequest,
  type InvestigationLevel,
  type Subject
} from '../src/index';

describe('Investigation Engine', () => {
  let engine: InvestigationEngine;

  beforeEach(() => {
    engine = new InvestigationEngine();
  });

  describe('Configuration', () => {
    it('should have correct default configuration', () => {
      expect(CONFIG.maxLevel).toBe(10);
      expect(CONFIG.defaultJurisdiction).toBe('IE');
      expect(CONFIG.humanInTheLoop).toBe(true);
      expect(CONFIG.maxRelationshipDepth).toBe(5);
    });

    it('should have all 10 investigation levels defined', () => {
      expect(Object.keys(INVESTIGATION_LEVELS)).toHaveLength(10);
      for (let i = 1; i <= 10; i++) {
        expect(INVESTIGATION_LEVELS[i as InvestigationLevel]).toBeDefined();
        expect(INVESTIGATION_LEVELS[i as InvestigationLevel].name).toBeTruthy();
        expect(INVESTIGATION_LEVELS[i as InvestigationLevel].description).toBeTruthy();
      }
    });

    it('should enforce human-in-the-loop as mandatory', () => {
      expect(CONFIG.humanInTheLoop).toBe(true);
    });
  });

  describe('Registry Sources', () => {
    it('should have Ireland registry sources', () => {
      expect(REGISTRY_SOURCES.IE.companies).toBe('Companies Registration Office (CRO)');
      expect(REGISTRY_SOURCES.IE.property).toBe('Property Registration Authority (PRA)');
      expect(REGISTRY_SOURCES.IE.courts).toBe('Courts Service of Ireland');
    });

    it('should have UK registry sources', () => {
      expect(REGISTRY_SOURCES.UK.companies).toBe('Companies House');
      expect(REGISTRY_SOURCES.UK.property).toBe('HM Land Registry');
      expect(REGISTRY_SOURCES.UK.courts).toBe('Courts and Tribunals Service');
    });

    it('should have Northern Ireland registry sources', () => {
      expect(REGISTRY_SOURCES.NI.companies).toBe('Companies House NI');
      expect(REGISTRY_SOURCES.NI.property).toBe('Land & Property Services');
    });

    it('should have Spain registry sources', () => {
      expect(REGISTRY_SOURCES.ES.companies).toBe('Registro Mercantil');
      expect(REGISTRY_SOURCES.ES.property).toBe('Registro de la Propiedad');
    });
  });

  describe('Investigation Process', () => {
    const createTestSubject = (type: 'individual' | 'corporate' = 'individual'): Subject => ({
      type,
      name: type === 'individual' ? 'John Smith' : 'Test Company Ltd',
      identifiers: type === 'individual' 
        ? { dateOfBirth: '1970-01-01', address: '123 Main Street, Dublin' }
        : { companyNumber: '123456', address: '1 Business Park, Dublin' }
    });

    it('should investigate an individual to Level 3', async () => {
      const request: InvestigationRequest = {
        subject: createTestSubject('individual'),
        scope: ['financial', 'corporate'],
        jurisdiction: ['IE'],
        targetLevel: 3,
        caseId: 'INV-2026-001'
      };

      const result = await engine.investigate(request);

      expect(result.caseId).toBe('INV-2026-001');
      expect(result.level).toBe(3);
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.entities.length).toBeGreaterThan(0);
    });

    it('should investigate a corporate entity', async () => {
      const request: InvestigationRequest = {
        subject: createTestSubject('corporate'),
        scope: ['corporate', 'financial'],
        jurisdiction: ['IE', 'UK'],
        targetLevel: 5,
        caseId: 'INV-2026-002'
      };

      const result = await engine.investigate(request);

      expect(result.subject.type).toBe('corporate');
      expect(result.level).toBe(5);
    });

    it('should require human review for Level 7+', async () => {
      const request: InvestigationRequest = {
        subject: createTestSubject(),
        scope: ['financial'],
        jurisdiction: ['IE'],
        targetLevel: 7,
        caseId: 'INV-2026-003'
      };

      const result = await engine.investigate(request);

      expect(result.status).toBe('requires_review');
      const humanReviewFinding = result.findings.find(
        f => f.title === 'Human Review Required'
      );
      expect(humanReviewFinding).toBeDefined();
    });

    it('should support multiple jurisdictions', async () => {
      const request: InvestigationRequest = {
        subject: createTestSubject(),
        scope: ['corporate', 'property'],
        jurisdiction: ['IE', 'UK', 'ES'],
        targetLevel: 5,
        caseId: 'INV-2026-004'
      };

      const result = await engine.investigate(request);

      expect(result.level).toBe(5);
    });
  });

  describe('Investigation Scopes', () => {
    const scopes = ['financial', 'corporate', 'property', 'litigation', 'regulatory', 'media'] as const;

    scopes.forEach(scope => {
      it(`should support ${scope} scope`, async () => {
        const request: InvestigationRequest = {
          subject: {
            type: 'individual',
            name: 'Test Subject',
            identifiers: { address: 'Dublin' }
          },
          scope: [scope],
          jurisdiction: ['IE'],
          targetLevel: 3,
          caseId: `INV-SCOPE-${scope.toUpperCase()}`
        };

        const result = await engine.investigate(request);
        expect(result.caseId).toBe(`INV-SCOPE-${scope.toUpperCase()}`);
      });
    });
  });

  describe('Relationship Mapping', () => {
    it('should map relationships for a subject', async () => {
      const relationships = await engine.mapRelationships({
        subject: 'John Smith',
        depth: 3,
        types: ['director', 'shareholder']
      });

      expect(Array.isArray(relationships)).toBe(true);
    });
  });

  describe('Asset Discovery', () => {
    it('should discover assets for a subject', async () => {
      const assets = await engine.discoverAssets({
        subject: 'John Smith',
        jurisdictions: ['IE', 'UK'],
        types: ['property', 'company_shares']
      });

      expect(Array.isArray(assets)).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate a summary report', async () => {
      const request: InvestigationRequest = {
        subject: {
          type: 'individual',
          name: 'John Smith',
          identifiers: { address: 'Dublin' }
        },
        scope: ['financial'],
        jurisdiction: ['IE'],
        targetLevel: 5,
        caseId: 'INV-2026-REPORT'
      };

      const investigation = await engine.investigate(request);
      const report = await engine.generateReport({
        investigation,
        format: 'summary'
      });

      expect(report).toContain('INVESTIGATION REPORT');
      expect(report).toContain('Orb AI Limited');
      expect(report).toContain(investigation.caseId);
    });
  });

  describe('Risk Assessment', () => {
    it('should include risk assessment in results', async () => {
      const request: InvestigationRequest = {
        subject: {
          type: 'individual',
          name: 'John Smith',
          identifiers: { address: 'Dublin' }
        },
        scope: ['financial'],
        jurisdiction: ['IE'],
        targetLevel: 5,
        caseId: 'INV-2026-RISK'
      };

      const result = await engine.investigate(request);

      expect(result.riskAssessment).toBeDefined();
      expect(result.riskAssessment.overallRisk).toBeDefined();
      expect(['low', 'medium', 'high', 'critical']).toContain(result.riskAssessment.overallRisk);
    });
  });

  describe('Timeline Generation', () => {
    it('should generate timeline events', async () => {
      const request: InvestigationRequest = {
        subject: {
          type: 'individual',
          name: 'John Smith',
          identifiers: { address: 'Dublin' }
        },
        scope: ['financial'],
        jurisdiction: ['IE'],
        targetLevel: 5,
        caseId: 'INV-2026-TIMELINE'
      };

      const result = await engine.investigate(request);

      expect(result.timeline).toBeDefined();
      expect(Array.isArray(result.timeline)).toBe(true);
      expect(result.timeline.length).toBeGreaterThan(0);
    });
  });

  describe('Investigation Levels', () => {
    it('should have correct level descriptions', () => {
      expect(INVESTIGATION_LEVELS[1].name).toBe('Preliminary');
      expect(INVESTIGATION_LEVELS[5].name).toBe('Comprehensive');
      expect(INVESTIGATION_LEVELS[10].name).toBe('Maximum');
    });
  });
});
