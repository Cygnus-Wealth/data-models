import { Asset } from './Asset';

export interface NFT extends Asset {
  tokenId: string;
  collectionAddress: string;
  collectionName: string;
  tokenUri?: string;
  imageUrl?: string;
  animationUrl?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
}