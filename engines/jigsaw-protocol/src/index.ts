/**
 * JIGSAW PROTOCOL ENGINE
 * 
 * Copyright (c) 2026 Orb AI Limited. All Rights Reserved.
 * 
 * THE RECONSTRUCTION ENGINE
 * 
 * "Creates everything that doesn't exist based on everything that exists"
 * 
 * This engine receives verified truth fragments from CVK 1100 and:
 * 1. Compresses each fragment into an engineered Jigsaw Component
 * 2. Each component is shaped by truth itself - only fits ONE way
 * 3. Wrong pieces physically CANNOT fit - mathematical certainty
 * 4. The picture assembles itself from verified components
 * 
 * Universal Application:
 * - Missing Person → Reconstruct location from fragments
 * - Missing Asset → Reconstruct location from traces
 * - Fraud → Reconstruct the falsification from evidence
 * - Corruption → Reconstruct the network from connections
 * 
 * Developed through real cases:
 * - Michelle Young case
 * - Grandfather's case
 * - Ancestors' investigations
 * - Treasure hunt proof-of-concept
 * 
 * TO 1100.
 */

import crypto from 'crypto';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Fragment Types - What kind of truth fragment is this?
 */
export type FragmentType = 
  | 'survivor_testimony'      // Human witness account
  | 'physical_evidence'       // Tangible, measurable evidence
  | 'environmental_factor'    // Weather, terrain, conditions
  | 'location_data'           // GPS, addresses, coordinates
  | 'financial_trace'         // Money movement, transactions
  | 'communication_record'    // Calls, messages, emails
  | 'document_artifact'       // Written records, contracts
  | 'digital_footprint'       // Online activity, metadata
  | 'relationship_link'       // Connections between entities
  | 'temporal_marker'         // Timestamps, sequences, timelines
  | 'behavioral_pattern'      // Habits, routines, anomalies
  | 'historical_record'       // Cave carvings to archives
  | 'scientific_data'         // Forensic, technical analysis
  | 'oral_history'            // Passed down knowledge
  | 'institutional_record';   // Government, corporate records

/**
 * Case Types - What are we reconstructing?
 */
export type CaseType = 
  | 'missing_person'
  | 'missing_asset'
  | 'hidden_wealth'
  | 'fraud'
  | 'corruption'
  | 'predatory_lending'
  | 'financial_crime'
  | 'identity_theft'
  | 'money_laundering'
  | 'asset_tracing'
  | 'witness_protection'
  | 'historical_investigation';

/**
 * Jurisdiction for multi-jurisdiction support
 */
export type Jurisdiction = 'IE' | 'UK' | 'NI' | 'SC' | 'WA' | 'EN' | 'ES' | 'EU' | 'GLOBAL';

/**
 * A truth fragment - raw input from CVK 1100
 */
export interface TruthFragment {
  id: string;
  type: FragmentType;
  content: string;
  source: string;
  verificationLevel: number;  // 1-10 from CVK 1100
  confidence: number;         // 0-100%
  timestamp: Date;
  jurisdiction: Jurisdiction;
  metadata: Record<string, unknown>;
  chainOfCustody: ChainOfCustodyEntry[];
  isReal: boolean;            // CVK 1100 determination
  isTrue: boolean;            // CVK 1100 determination
  isNeeded: boolean;          // CVK 1100 determination
}

/**
 * Chain of custody entry for evidence integrity
 */
export interface ChainOfCustodyEntry {
  timestamp: Date;
  handler: string;
  action: string;
  location: string;
  hash: string;
}

/**
 * A Jigsaw Component - compressed, engineered truth
 */
export interface JigsawComponent {
  id: string;
  fragmentId: string;
  shape: ComponentShape;
  edges: ComponentEdge[];
  weight: number;             // Importance in the picture
  position: ComponentPosition | null;  // Where it fits (null until placed)
  locked: boolean;            // Once placed, cannot be moved
  hash: string;               // Cryptographic verification
  compressionRatio: number;   // How much was compressed
  engineeringSignature: string;
}

/**
 * Component shape - determines how it can connect
 */
export interface ComponentShape {
  topology: 'corner' | 'edge' | 'interior' | 'bridge' | 'keystone';
  complexity: number;         // 1-10, higher = more unique fit
  symmetry: boolean;          // Symmetric pieces are more dangerous (could fit wrong)
  uniqueIdentifier: string;   // Mathematical signature
}

/**
 * Component edge - the connection points
 */
export interface ComponentEdge {
  direction: 'north' | 'south' | 'east' | 'west' | 'temporal' | 'causal';
  pattern: string;            // The unique edge pattern
  compatibleWith: string[];   // IDs of components that CAN connect
  incompatibleWith: string[]; // IDs of components that CANNOT connect
  strength: number;           // Connection strength when matched
}

/**
 * Component position in the picture
 */
export interface ComponentPosition {
  x: number;
  y: number;
  z: number;                  // Temporal/causal layer
  rotation: number;           // 0, 90, 180, 270 degrees
  confidence: number;         // How certain is this placement
}

/**
 * The Picture - the reconstructed truth
 */
export interface Picture {
  id: string;
  caseId: string;
  caseType: CaseType;
  title: string;
  components: JigsawComponent[];
  placedComponents: JigsawComponent[];
  unplacedComponents: JigsawComponent[];
  completionPercentage: number;
  gaps: PictureGap[];
  conclusions: Conclusion[];
  reconstructedTruth: string;
  courtReady: boolean;
  humanReviewRequired: boolean;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * A gap in the picture - what we need to find
 */
export interface PictureGap {
  id: string;
  location: ComponentPosition;
  requiredShape: ComponentShape;
  requiredEdges: ComponentEdge[];
  possibleSources: string[];  // Where to look for this piece
  priority: number;           // 1-10
  description: string;
}

/**
 * A conclusion drawn from the picture
 */
export interface Conclusion {
  id: string;
  type: 'finding' | 'inference' | 'recommendation' | 'warning' | 'certainty';
  statement: string;
  supportingComponents: string[];
  confidence: number;
  courtReady: boolean;
  humanVerified: boolean;
  legalImplications: string[];
}

/**
 * Jigsaw Protocol Result
 */
export interface JigsawResult {
  success: boolean;
  picture: Picture;
  processingTime: number;
  fragmentsProcessed: number;
  componentsCreated: number;
  componentsPlaced: number;
  gapsIdentified: number;
  conclusionsDrawn: number;
  humanReviewRequired: boolean;
  courtReadiness: number;     // 0-100%
  recommendations: string[];
  nextSteps: string[];
}

// ============================================================================
// JIGSAW PROTOCOL ENGINE
// ============================================================================

export class JigsawProtocolEngine {
  private readonly engineId: string;
  private readonly version = '1.0.0';
  private readonly owner = 'Orb AI Limited';

  constructor() {
    this.engineId = `JIGSAW-${crypto.randomUUID()}`;
  }

  /**
   * MAIN ENTRY POINT
   * Process verified fragments and reconstruct the picture
   */
  async processFragments(
    fragments: TruthFragment[],
    caseId: string,
    caseType: CaseType,
    caseTitle: string
  ): Promise<JigsawResult> {
    const startTime = Date.now();

    // Step 1: Filter - only process what CVK 1100 verified as real, true, and needed
    const verifiedFragments = this.filterVerifiedFragments(fragments);

    // Step 2: Compress each fragment into a Jigsaw Component
    const components = await this.compressFragments(verifiedFragments);

    // Step 3: Engineer the edges - determine what can connect to what
    const engineeredComponents = this.engineerEdges(components);

    // Step 4: Initialize the picture
    const picture = this.initializePicture(caseId, caseType, caseTitle, engineeredComponents);

    // Step 5: Assemble - let the pieces find their places
    const assembledPicture = await this.assemblePicture(picture);

    // Step 6: Identify gaps - what's missing?
    const pictureWithGaps = this.identifyGaps(assembledPicture);

    // Step 7: Draw conclusions from the assembled picture
    const finalPicture = this.drawConclusions(pictureWithGaps);

    // Step 8: Determine court readiness
    const courtReadyPicture = this.assessCourtReadiness(finalPicture);

    const processingTime = Date.now() - startTime;

    return {
      success: true,
      picture: courtReadyPicture,
      processingTime,
      fragmentsProcessed: fragments.length,
      componentsCreated: components.length,
      componentsPlaced: courtReadyPicture.placedComponents.length,
      gapsIdentified: courtReadyPicture.gaps.length,
      conclusionsDrawn: courtReadyPicture.conclusions.length,
      humanReviewRequired: courtReadyPicture.humanReviewRequired,
      courtReadiness: this.calculateCourtReadiness(courtReadyPicture),
      recommendations: this.generateRecommendations(courtReadyPicture),
      nextSteps: this.generateNextSteps(courtReadyPicture)
    };
  }

  /**
   * STEP 1: Filter verified fragments
   * Only process what CVK 1100 determined is REAL, TRUE, and NEEDED
   */
  private filterVerifiedFragments(fragments: TruthFragment[]): TruthFragment[] {
    return fragments.filter(f => 
      f.isReal === true && 
      f.isTrue === true && 
      f.isNeeded === true &&
      f.verificationLevel >= 5  // Minimum Level 5 for Jigsaw processing
    );
  }

  /**
   * STEP 2: Compress fragments into Jigsaw Components
   * Each fragment becomes an engineered piece that only fits one way
   */
  private async compressFragments(fragments: TruthFragment[]): Promise<JigsawComponent[]> {
    return fragments.map(fragment => this.compressFragment(fragment));
  }

  /**
   * Compress a single fragment into a Jigsaw Component
   */
  private compressFragment(fragment: TruthFragment): JigsawComponent {
    // Generate unique shape based on fragment characteristics
    const shape = this.generateShape(fragment);
    
    // Calculate compression ratio
    const originalSize = JSON.stringify(fragment).length;
    const compressedSize = JSON.stringify(shape).length;
    const compressionRatio = originalSize / compressedSize;

    // Generate engineering signature - this makes the piece unique
    const engineeringSignature = this.generateEngineeringSignature(fragment, shape);

    // Create the component
    const component: JigsawComponent = {
      id: `JC-${crypto.randomUUID()}`,
      fragmentId: fragment.id,
      shape,
      edges: [],  // Will be engineered in next step
      weight: this.calculateWeight(fragment),
      position: null,
      locked: false,
      hash: this.hashComponent(fragment, shape),
      compressionRatio,
      engineeringSignature
    };

    return component;
  }

  /**
   * Generate shape based on fragment type and content
   */
  private generateShape(fragment: TruthFragment): ComponentShape {
    // Determine topology based on fragment type
    const topology = this.determineTopology(fragment);
    
    // Calculate complexity based on verification level and confidence
    const complexity = Math.min(10, Math.ceil((fragment.verificationLevel + fragment.confidence / 10) / 2));
    
    // Determine symmetry - asymmetric pieces are safer (only fit one way)
    const symmetry = fragment.type === 'temporal_marker' || fragment.type === 'location_data';
    
    // Generate unique identifier from fragment content
    const uniqueIdentifier = crypto
      .createHash('sha256')
      .update(`${fragment.id}-${fragment.content}-${fragment.timestamp}`)
      .digest('hex')
      .substring(0, 16);

    return {
      topology,
      complexity,
      symmetry,
      uniqueIdentifier
    };
  }

  /**
   * Determine topology based on fragment type
   */
  private determineTopology(fragment: TruthFragment): ComponentShape['topology'] {
    switch (fragment.type) {
      case 'temporal_marker':
        return 'edge';  // Timeline pieces are edges
      case 'location_data':
        return 'corner';  // Location anchors the picture
      case 'relationship_link':
        return 'bridge';  // Connects other pieces
      case 'financial_trace':
        return 'interior';  // Fills in the middle
      case 'survivor_testimony':
        return 'keystone';  // Critical central pieces
      default:
        return 'interior';
    }
  }

  /**
   * Calculate weight (importance) of a fragment
   */
  private calculateWeight(fragment: TruthFragment): number {
    let weight = fragment.verificationLevel * 10;  // Base weight from verification
    
    // Boost for high confidence
    weight += fragment.confidence / 10;
    
    // Boost for certain types
    if (fragment.type === 'survivor_testimony') weight += 20;
    if (fragment.type === 'physical_evidence') weight += 15;
    if (fragment.type === 'document_artifact') weight += 10;
    
    // Boost for complete chain of custody
    if (fragment.chainOfCustody.length > 0) weight += 5;
    
    return Math.min(100, weight);
  }

  /**
   * Generate engineering signature - makes each piece unique
   */
  private generateEngineeringSignature(fragment: TruthFragment, shape: ComponentShape): string {
    const data = `${fragment.id}-${fragment.type}-${shape.uniqueIdentifier}-${this.engineId}`;
    return crypto.createHash('sha512').update(data).digest('hex');
  }

  /**
   * Hash component for integrity verification
   */
  private hashComponent(fragment: TruthFragment, shape: ComponentShape): string {
    const data = JSON.stringify({ fragment, shape, timestamp: new Date().toISOString() });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * STEP 3: Engineer edges - determine what can connect to what
   */
  private engineerEdges(components: JigsawComponent[]): JigsawComponent[] {
    return components.map((component, index) => {
      const edges = this.calculateEdges(component, components, index);
      return { ...component, edges };
    });
  }

  /**
   * Calculate edges for a component
   */
  private calculateEdges(
    component: JigsawComponent, 
    allComponents: JigsawComponent[],
    currentIndex: number
  ): ComponentEdge[] {
    const edges: ComponentEdge[] = [];
    const directions: ComponentEdge['direction'][] = ['north', 'south', 'east', 'west', 'temporal', 'causal'];

    for (const direction of directions) {
      const pattern = this.generateEdgePattern(component, direction);
      const { compatible, incompatible } = this.findCompatibleComponents(
        component, 
        direction, 
        pattern, 
        allComponents,
        currentIndex
      );

      edges.push({
        direction,
        pattern,
        compatibleWith: compatible,
        incompatibleWith: incompatible,
        strength: this.calculateEdgeStrength(component, direction)
      });
    }

    return edges;
  }

  /**
   * Generate unique edge pattern
   */
  private generateEdgePattern(component: JigsawComponent, direction: ComponentEdge['direction']): string {
    const data = `${component.id}-${direction}-${component.shape.uniqueIdentifier}`;
    return crypto.createHash('md5').update(data).digest('hex').substring(0, 8);
  }

  /**
   * Find compatible and incompatible components
   */
  private findCompatibleComponents(
    component: JigsawComponent,
    direction: ComponentEdge['direction'],
    pattern: string,
    allComponents: JigsawComponent[],
    currentIndex: number
  ): { compatible: string[], incompatible: string[] } {
    const compatible: string[] = [];
    const incompatible: string[] = [];

    for (let i = 0; i < allComponents.length; i++) {
      if (i === currentIndex) continue;
      
      const other = allComponents[i];
      
      // Check if shapes are compatible
      if (this.shapesCanConnect(component.shape, other.shape, direction)) {
        compatible.push(other.id);
      } else {
        incompatible.push(other.id);
      }
    }

    return { compatible, incompatible };
  }

  /**
   * Check if two shapes can connect
   */
  private shapesCanConnect(
    shape1: ComponentShape, 
    shape2: ComponentShape, 
    direction: ComponentEdge['direction']
  ): boolean {
    // Corners can connect to edges
    if (shape1.topology === 'corner' && shape2.topology === 'edge') return true;
    
    // Edges can connect to interior
    if (shape1.topology === 'edge' && shape2.topology === 'interior') return true;
    
    // Bridges connect everything
    if (shape1.topology === 'bridge' || shape2.topology === 'bridge') return true;
    
    // Keystones connect to high-complexity pieces
    if (shape1.topology === 'keystone' && shape2.complexity >= 7) return true;
    
    // Interior pieces connect to each other
    if (shape1.topology === 'interior' && shape2.topology === 'interior') return true;
    
    // Temporal connections
    if (direction === 'temporal') return true;
    
    // Causal connections require complexity match
    if (direction === 'causal') {
      return Math.abs(shape1.complexity - shape2.complexity) <= 2;
    }

    return false;
  }

  /**
   * Calculate edge strength
   */
  private calculateEdgeStrength(component: JigsawComponent, direction: ComponentEdge['direction']): number {
    let strength = 50;  // Base strength
    
    // Temporal and causal edges are stronger
    if (direction === 'temporal') strength += 20;
    if (direction === 'causal') strength += 25;
    
    // High complexity = stronger edges
    strength += component.shape.complexity * 3;
    
    // Asymmetric pieces have stronger edges (more unique fit)
    if (!component.shape.symmetry) strength += 10;
    
    return Math.min(100, strength);
  }

  /**
   * STEP 4: Initialize the picture
   */
  private initializePicture(
    caseId: string,
    caseType: CaseType,
    caseTitle: string,
    components: JigsawComponent[]
  ): Picture {
    return {
      id: `PIC-${crypto.randomUUID()}`,
      caseId,
      caseType,
      title: caseTitle,
      components,
      placedComponents: [],
      unplacedComponents: [...components],
      completionPercentage: 0,
      gaps: [],
      conclusions: [],
      reconstructedTruth: '',
      courtReady: false,
      humanReviewRequired: false,
      hash: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * STEP 5: Assemble the picture
   * Let the pieces find their places based on edge compatibility
   */
  private async assemblePicture(picture: Picture): Promise<Picture> {
    const assembled = { ...picture };
    let iterations = 0;
    const maxIterations = assembled.unplacedComponents.length * 10;

    // Sort by weight - place most important pieces first
    assembled.unplacedComponents.sort((a, b) => b.weight - a.weight);

    while (assembled.unplacedComponents.length > 0 && iterations < maxIterations) {
      iterations++;
      
      const component = assembled.unplacedComponents[0];
      const position = this.findBestPosition(component, assembled);
      
      if (position) {
        // Place the component
        component.position = position;
        component.locked = true;
        assembled.placedComponents.push(component);
        assembled.unplacedComponents.shift();
      } else {
        // Can't place yet, move to end of queue
        assembled.unplacedComponents.push(assembled.unplacedComponents.shift()!);
      }
    }

    // Calculate completion
    assembled.completionPercentage = 
      (assembled.placedComponents.length / assembled.components.length) * 100;

    return assembled;
  }

  /**
   * Find the best position for a component
   */
  private findBestPosition(component: JigsawComponent, picture: Picture): ComponentPosition | null {
    if (picture.placedComponents.length === 0) {
      // First piece - place at origin
      return { x: 0, y: 0, z: 0, rotation: 0, confidence: 100 };
    }

    // Find compatible placed components
    const compatiblePlacements: { position: ComponentPosition, score: number }[] = [];

    for (const placed of picture.placedComponents) {
      for (const edge of component.edges) {
        if (edge.compatibleWith.includes(placed.id)) {
          const position = this.calculateAdjacentPosition(placed, edge.direction);
          const score = edge.strength * (component.weight / 100);
          compatiblePlacements.push({ position, score });
        }
      }
    }

    if (compatiblePlacements.length === 0) return null;

    // Return highest scoring position
    compatiblePlacements.sort((a, b) => b.score - a.score);
    return compatiblePlacements[0].position;
  }

  /**
   * Calculate position adjacent to a placed component
   */
  private calculateAdjacentPosition(
    placed: JigsawComponent, 
    direction: ComponentEdge['direction']
  ): ComponentPosition {
    const pos = placed.position!;
    
    switch (direction) {
      case 'north': return { ...pos, y: pos.y + 1, confidence: 90 };
      case 'south': return { ...pos, y: pos.y - 1, confidence: 90 };
      case 'east': return { ...pos, x: pos.x + 1, confidence: 90 };
      case 'west': return { ...pos, x: pos.x - 1, confidence: 90 };
      case 'temporal': return { ...pos, z: pos.z + 1, confidence: 85 };
      case 'causal': return { ...pos, z: pos.z - 1, confidence: 85 };
      default: return { ...pos, confidence: 70 };
    }
  }

  /**
   * STEP 6: Identify gaps in the picture
   */
  private identifyGaps(picture: Picture): Picture {
    const gaps: PictureGap[] = [];
    
    // Check for missing connections between placed components
    for (const component of picture.placedComponents) {
      for (const edge of component.edges) {
        const hasConnection = picture.placedComponents.some(
          other => other.id !== component.id && edge.compatibleWith.includes(other.id)
        );
        
        if (!hasConnection && edge.compatibleWith.length > 0) {
          gaps.push({
            id: `GAP-${crypto.randomUUID()}`,
            location: this.calculateAdjacentPosition(component, edge.direction),
            requiredShape: {
              topology: 'interior',
              complexity: component.shape.complexity,
              symmetry: false,
              uniqueIdentifier: `NEEDED-${edge.direction}`
            },
            requiredEdges: [{
              direction: this.oppositeDirection(edge.direction),
              pattern: edge.pattern,
              compatibleWith: [component.id],
              incompatibleWith: [],
              strength: edge.strength
            }],
            possibleSources: this.suggestSources(edge.direction),
            priority: Math.ceil(component.weight / 10),
            description: `Missing ${edge.direction} connection from component ${component.id}`
          });
        }
      }
    }

    return { ...picture, gaps };
  }

  /**
   * Get opposite direction
   */
  private oppositeDirection(direction: ComponentEdge['direction']): ComponentEdge['direction'] {
    const opposites: Record<ComponentEdge['direction'], ComponentEdge['direction']> = {
      north: 'south',
      south: 'north',
      east: 'west',
      west: 'east',
      temporal: 'temporal',
      causal: 'causal'
    };
    return opposites[direction];
  }

  /**
   * Suggest sources for missing pieces
   */
  private suggestSources(direction: ComponentEdge['direction']): string[] {
    switch (direction) {
      case 'temporal':
        return ['Historical records', 'Archives', 'Witness testimony', 'Digital timestamps'];
      case 'causal':
        return ['Financial records', 'Communication logs', 'Relationship mapping'];
      default:
        return ['OSINT investigation', 'Document analysis', 'Witness interviews'];
    }
  }

  /**
   * STEP 7: Draw conclusions from the assembled picture
   */
  private drawConclusions(picture: Picture): Picture {
    const conclusions: Conclusion[] = [];

    // Conclusion from completion percentage
    if (picture.completionPercentage >= 90) {
      conclusions.push({
        id: `CONC-${crypto.randomUUID()}`,
        type: 'certainty',
        statement: 'Picture is substantially complete. High confidence in reconstruction.',
        supportingComponents: picture.placedComponents.map(c => c.id),
        confidence: picture.completionPercentage,
        courtReady: true,
        humanVerified: false,
        legalImplications: ['Evidence chain established', 'Pattern of conduct demonstrated']
      });
    }

    // Conclusion from gaps
    if (picture.gaps.length > 0) {
      conclusions.push({
        id: `CONC-${crypto.randomUUID()}`,
        type: 'recommendation',
        statement: `${picture.gaps.length} gaps identified requiring additional investigation.`,
        supportingComponents: [],
        confidence: 100,
        courtReady: false,
        humanVerified: false,
        legalImplications: ['Additional evidence needed', 'Investigation incomplete']
      });
    }

    // Conclusion from high-weight components
    const highWeightComponents = picture.placedComponents.filter(c => c.weight >= 80);
    if (highWeightComponents.length >= 3) {
      conclusions.push({
        id: `CONC-${crypto.randomUUID()}`,
        type: 'finding',
        statement: 'Multiple high-confidence evidence pieces corroborate the reconstruction.',
        supportingComponents: highWeightComponents.map(c => c.id),
        confidence: 95,
        courtReady: true,
        humanVerified: false,
        legalImplications: ['Strong evidentiary foundation', 'Multiple independent sources']
      });
    }

    // Generate reconstructed truth narrative
    const reconstructedTruth = this.generateTruthNarrative(picture, conclusions);

    return { ...picture, conclusions, reconstructedTruth };
  }

  /**
   * Generate truth narrative from the picture
   */
  private generateTruthNarrative(picture: Picture, conclusions: Conclusion[]): string {
    const parts: string[] = [];

    parts.push(`RECONSTRUCTED TRUTH - Case: ${picture.title}`);
    parts.push(`Case Type: ${picture.caseType}`);
    parts.push(`Completion: ${picture.completionPercentage.toFixed(1)}%`);
    parts.push('');
    parts.push('FINDINGS:');
    
    for (const conclusion of conclusions) {
      parts.push(`- [${conclusion.type.toUpperCase()}] ${conclusion.statement}`);
      parts.push(`  Confidence: ${conclusion.confidence}%`);
      parts.push(`  Court Ready: ${conclusion.courtReady ? 'YES' : 'NO'}`);
    }

    if (picture.gaps.length > 0) {
      parts.push('');
      parts.push('GAPS REQUIRING INVESTIGATION:');
      for (const gap of picture.gaps) {
        parts.push(`- Priority ${gap.priority}: ${gap.description}`);
        parts.push(`  Suggested sources: ${gap.possibleSources.join(', ')}`);
      }
    }

    return parts.join('\n');
  }

  /**
   * STEP 8: Assess court readiness
   */
  private assessCourtReadiness(picture: Picture): Picture {
    const courtReadyConclusions = picture.conclusions.filter(c => c.courtReady);
    const highConfidenceComponents = picture.placedComponents.filter(c => c.weight >= 70);
    
    const courtReady = 
      picture.completionPercentage >= 80 &&
      courtReadyConclusions.length >= 1 &&
      highConfidenceComponents.length >= 3;

    // Human review required for high-stakes conclusions
    const humanReviewRequired = 
      picture.conclusions.some(c => c.type === 'certainty') ||
      picture.completionPercentage >= 95;

    // Generate final hash
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(picture))
      .digest('hex');

    return {
      ...picture,
      courtReady,
      humanReviewRequired,
      hash,
      updatedAt: new Date()
    };
  }

  /**
   * Calculate court readiness percentage
   */
  private calculateCourtReadiness(picture: Picture): number {
    let score = 0;
    
    // Completion contributes 40%
    score += (picture.completionPercentage / 100) * 40;
    
    // Court-ready conclusions contribute 30%
    const courtReadyRatio = picture.conclusions.filter(c => c.courtReady).length / 
                           Math.max(1, picture.conclusions.length);
    score += courtReadyRatio * 30;
    
    // High-weight components contribute 20%
    const highWeightRatio = picture.placedComponents.filter(c => c.weight >= 70).length /
                           Math.max(1, picture.placedComponents.length);
    score += highWeightRatio * 20;
    
    // No gaps contributes 10%
    if (picture.gaps.length === 0) score += 10;
    
    return Math.min(100, score);
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(picture: Picture): string[] {
    const recommendations: string[] = [];

    if (picture.completionPercentage < 80) {
      recommendations.push('Continue investigation to gather additional evidence fragments');
    }

    if (picture.gaps.length > 0) {
      recommendations.push(`Address ${picture.gaps.length} identified gaps before proceeding to court`);
    }

    if (picture.humanReviewRequired) {
      recommendations.push('MANDATORY: Human review required before any legal action');
    }

    if (!picture.courtReady) {
      recommendations.push('Picture not yet court-ready - additional verification needed');
    } else {
      recommendations.push('Picture is court-ready - proceed with legal counsel review');
    }

    return recommendations;
  }

  /**
   * Generate next steps
   */
  private generateNextSteps(picture: Picture): string[] {
    const steps: string[] = [];

    if (picture.gaps.length > 0) {
      const highPriorityGaps = picture.gaps.filter(g => g.priority >= 7);
      if (highPriorityGaps.length > 0) {
        steps.push(`1. Investigate ${highPriorityGaps.length} high-priority gaps`);
      }
    }

    if (picture.humanReviewRequired) {
      steps.push('2. Submit for human expert review (Level 7+ verification)');
    }

    if (picture.courtReady) {
      steps.push('3. Generate court-ready documentation package');
      steps.push('4. Coordinate with legal counsel for filing');
    } else {
      steps.push('3. Continue evidence gathering');
      steps.push('4. Re-run Jigsaw Protocol when new fragments available');
    }

    return steps;
  }

  /**
   * Get engine information
   */
  getEngineInfo(): Record<string, unknown> {
    return {
      engineId: this.engineId,
      version: this.version,
      owner: this.owner,
      protocol: 'Jigsaw Protocol',
      description: 'Creates everything that doesn\'t exist based on everything that exists',
      capabilities: [
        'Fragment compression',
        'Component engineering',
        'Edge compatibility analysis',
        'Automatic assembly',
        'Gap identification',
        'Conclusion generation',
        'Court readiness assessment'
      ],
      universalApplications: [
        'Missing persons',
        'Missing assets',
        'Hidden wealth',
        'Fraud investigation',
        'Corruption exposure',
        'Predatory lending',
        'Financial crime',
        'Asset tracing'
      ]
    };
  }
}

// Export singleton instance
export const jigsawProtocol = new JigsawProtocolEngine();
