import { SourceMetadata } from './types';
export interface MetatagOptions extends Partial<SourceMetadata> {
    tool?: string;
    details?: string;
    query?: string;
    path?: string;
    seeds?: string[];
    memoryId?: string;
    confidence?: number;
}
/**
 * Wrap content in source attribution metatags
 */
export declare function wrapInMetatag(content: string, options: MetatagOptions): string;
/**
 * Create a metatag for random thoughts
 */
export declare function randomThoughtMetatag(content: string, seeds: string[]): string;
/**
 * Create a metatag for surfaced memories
 */
export declare function memoryMetatag(content: string, memory: any): string;
/**
 * Create a metatag for file content
 */
export declare function fileMetatag(content: string, filePath: string): string;
/**
 * Create a metatag for search results
 */
export declare function searchMetatag(content: string, query: string, url?: string): string;
/**
 * Create a metatag for analysis/computation results
 */
export declare function analysisMetatag(content: string, tool?: string): string;
/**
 * Create a metatag for human input
 */
export declare function humanMetatag(content: string): string;
/**
 * Parse metatags from text (for filtering/visualization)
 */
export declare function parseMetatags(text: string): Array<{
    content: string;
    metadata: MetatagOptions;
    fullMatch: string;
}>;
//# sourceMappingURL=metatags.d.ts.map