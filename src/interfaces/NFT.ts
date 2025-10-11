import { Asset } from './Asset';

/**
 * NFT-specific asset extensions including token IDs and metadata.
 *
 * Extends the base Asset interface with NFT-specific fields for collection
 * information, unique token identification, visual content URIs, and trait
 * attributes. Supports ERC-721, ERC-1155, SPL NFTs, and SUI Move NFTs.
 *
 * **Design Pattern:** Inherits all Asset fields (id, symbol, name, etc.) and
 * adds NFT-specific data. The Asset.type should be AssetType.NFT for proper
 * classification.
 *
 * @example
 * ```typescript
 * import { NFT, AssetType, Chain } from '@cygnus-wealth/data-models';
 *
 * // ERC-721 NFT from OpenSea
 * const nft: NFT = {
 *   // Asset base fields
 *   id: 'bayc-1234',
 *   symbol: 'BAYC',
 *   name: 'Bored Ape Yacht Club #1234',
 *   type: AssetType.NFT,
 *   chain: Chain.ETHEREUM,
 *   contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
 *
 *   // NFT-specific fields
 *   tokenId: '1234',
 *   collectionAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
 *   collectionName: 'Bored Ape Yacht Club',
 *   tokenUri: 'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1234',
 *   imageUrl: 'https://example.com/bayc-1234.png',
 *   attributes: [
 *     { trait_type: 'Background', value: 'Blue' },
 *     { trait_type: 'Fur', value: 'Brown' },
 *     { trait_type: 'Rarity Score', value: 125.5, display_type: 'number' }
 *   ]
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Asset} for inherited base fields
 * @see {@link AssetType} - use AssetType.NFT for NFTs
 */
export interface NFT extends Asset {
  /** Unique token identifier within the collection (e.g., '1234', '0x5f') */
  tokenId: string;

  /** Smart contract address of the NFT collection */
  collectionAddress: string;

  /** Human-readable name of the NFT collection */
  collectionName: string;

  /** URI pointing to token metadata (IPFS, HTTP, or on-chain) */
  tokenUri?: string;

  /** Direct URL to the NFT image for display */
  imageUrl?: string;

  /** URL to animation or video content (MP4, GIF, etc.) */
  animationUrl?: string;

  /** Array of trait attributes defining NFT characteristics and rarity */
  attributes?: Array<{
    /** Category or type of the trait (e.g., 'Background', 'Fur', 'Eyes') */
    trait_type: string;

    /** Value of the trait (can be text or numeric) */
    value: string | number;

    /** Optional display hint for numeric traits (e.g., 'number', 'boost_percentage') */
    display_type?: string;
  }>;
}
