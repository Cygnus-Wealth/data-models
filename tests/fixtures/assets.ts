import { Asset, NFT, AssetType, Chain } from '../../src/index';

/**
 * Test fixtures for Asset and NFT types.
 * Provides reusable sample data for unit and integration tests.
 */

export const ethAsset: Asset = {
  id: 'ethereum-eth',
  symbol: 'ETH',
  name: 'Ethereum',
  type: AssetType.CRYPTOCURRENCY,
  decimals: 18,
  contractAddress: '0x0000000000000000000000000000000000000000',
  chain: Chain.ETHEREUM,
  logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  coingeckoId: 'ethereum'
};

export const usdcAsset: Asset = {
  id: 'ethereum-usdc',
  symbol: 'USDC',
  name: 'USD Coin',
  type: AssetType.CRYPTOCURRENCY,
  decimals: 6,
  contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  chain: Chain.ETHEREUM,
  logoUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  coingeckoId: 'usd-coin'
};

export const btcAsset: Asset = {
  id: 'bitcoin-btc',
  symbol: 'BTC',
  name: 'Bitcoin',
  type: AssetType.CRYPTOCURRENCY,
  decimals: 8,
  chain: Chain.BITCOIN,
  logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  coingeckoId: 'bitcoin'
};

export const solAsset: Asset = {
  id: 'solana-sol',
  symbol: 'SOL',
  name: 'Solana',
  type: AssetType.CRYPTOCURRENCY,
  decimals: 9,
  chain: Chain.SOLANA,
  logoUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  coingeckoId: 'solana'
};

export const aaplStock: Asset = {
  id: 'stock-aapl',
  symbol: 'AAPL',
  name: 'Apple Inc.',
  type: AssetType.STOCK,
  decimals: 2,
  cusip: '037833100',
  isin: 'US0378331005'
};

export const usdFiat: Asset = {
  id: 'fiat-usd',
  symbol: 'USD',
  name: 'United States Dollar',
  type: AssetType.FIAT,
  decimals: 2
};

export const baycNFT: NFT = {
  id: 'bayc-1',
  symbol: 'BAYC',
  name: 'Bored Ape Yacht Club #1',
  type: AssetType.NFT,
  tokenId: '1',
  collectionAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  collectionName: 'Bored Ape Yacht Club',
  chain: Chain.ETHEREUM,
  imageUrl: 'https://example.com/bayc1.png',
  metadataUri: 'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1',
  attributes: [
    { trait_type: 'Background', value: 'Blue' },
    { trait_type: 'Fur', value: 'Golden Brown' },
    { trait_type: 'Eyes', value: 'Bored' },
    { trait_type: 'Mouth', value: 'Bored' }
  ],
  rarity: 0.85,
  description: 'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs'
};

export const cryptopunkNFT: NFT = {
  id: 'cryptopunk-1234',
  symbol: 'PUNK',
  name: 'CryptoPunk #1234',
  type: AssetType.NFT,
  tokenId: '1234',
  collectionAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
  collectionName: 'CryptoPunks',
  chain: Chain.ETHEREUM,
  imageUrl: 'https://example.com/punk1234.png',
  attributes: [
    { trait_type: 'Type', value: 'Alien' },
    { trait_type: 'Accessory', value: 'Bandana' }
  ],
  rarity: 0.95
};

// Minimal asset with only required fields
export const minimalAsset: Asset = {
  id: 'minimal-token',
  symbol: 'MIN',
  name: 'Minimal Token',
  type: AssetType.CRYPTOCURRENCY
};

// All assets array for bulk testing
export const allAssets: Asset[] = [
  ethAsset,
  usdcAsset,
  btcAsset,
  solAsset,
  aaplStock,
  usdFiat,
  minimalAsset
];

export const allNFTs: NFT[] = [
  baycNFT,
  cryptopunkNFT
];
