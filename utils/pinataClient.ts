const pinata = require('@pinata/sdk');
const pinataClient = new pinata(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY);
const fs = require('fs');
const path = require('path');

// Keep track of the latest type folders locally
const localTypeFolders = './nft_types';
if (!fs.existsSync(localTypeFolders)) {
  fs.mkdirSync(localTypeFolders);
}

export async function addNftToType(nftType: any, nftId: any, jsonContent: any) {
  // Create or access the type folder
  const typeFolder = path.join(localTypeFolders, nftType);

  if (!fs.existsSync(typeFolder)) {
    fs.mkdirSync(typeFolder);
  }
  
  // Add the new NFT to the type folder
  fs.writeFileSync(
    path.join(typeFolder, nftId),
    typeof jsonContent === 'string' ? jsonContent : JSON.stringify(jsonContent)
  );
  
  // Re-upload the entire type folder to get a new CID
  const result = await pinataClient.pinFromFS(typeFolder, {
    pinataMetadata: { name: `NFT-Type-${nftType}-${Date.now()}` }
  });
  
  // Return the updated CID for this type
  return {
    typeCid: result.IpfsHash,
    nftUri: `ipfs://${result.IpfsHash}/${nftId}.json`,
    latestTypeUri: `ipfs://${result.IpfsHash}/`
  };
}


// // Function to upload JSON data to IPFS via Pinata
// export const uploadJSONToIPFS = async (jsonData: any) => {
//     try {
//         const res = await axios.post(
//             'https://api.pinata.cloud/pinning/pinJSONToIPFS',
//             jsonData,
//             {
//                 headers: {
//                     'pinata_api_key': PINATA_API_KEY,
//                     'pinata_secret_api_key': PINATA_SECRET_API_KEY,
//                 },
//             }
//         );
    
//         return {
//             success: true,
//             ipfsHash: res.data.IpfsHash,
//             pinataUrl: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
//         };
//     } catch (error) {
//         console.error('Error uploading JSON to IPFS: ', error);
//         return {
//             success: false,
//             error: (error as any).message,
//         };
//     }
// };

// export const uploadImageToIPFS = async (imageData: any) => {
//     try {
//         const formData = new FormData();
//         formData.append('file', imageData.buffer, imageData.name);
    
//         const res = await axios.post(
//             'https://api.pinata.cloud/pinning/pinFileToIPFS',
//             formData,
//             {
//                 headers: {
//                     'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
//                     'pinata_api_key': PINATA_API_KEY,
//                     'pinata_secret_api_key': PINATA_SECRET_API_KEY,
//                 },
//             }
//         );
    
//         return {
//             success: true,
//             ipfsHash: res.data.IpfsHash,
//             pinataUrl: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
//         };
//     } catch (error) {
//         console.error('Error uploading image to IPFS: ', error);
//         return {
//             success: false,
//             error: (error as any).message,
//         };
//     }
// }
