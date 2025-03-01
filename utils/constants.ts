console.log('process.env.WALLETCONNECT_PROJECT_ID', process.env.WALLETCONNECT_PROJECT_ID)
console.log(process.env.NEXT_PUBLIC_INFURA_ID)
export default {
    walletconnet: {
        PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID as string,
    }
}