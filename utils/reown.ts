import { createAppKit } from '@reown/appkit/react'
import utils from '@/utils'
import { coreDao } from '@reown/appkit/networks'
import { coreTestnet } from './wagmi'

const metadata = {
    name: utils.app.NAME,
    description: utils.app.DESCRIPTION,
    url: 'https://cafifinance.com',
    icons: ['https://cafifinance.com/favicon.ico'],
}

const modal = createAppKit({
    networks: [coreDao, coreTestnet],
    defaultNetwork: coreTestnet,
    adapters: [utils.wagmi],
    metadata: metadata,
    projectId: "c502147f156291bc288c3dbe04fccaac",
})

export default modal;