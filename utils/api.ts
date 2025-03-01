import fs from 'fs';

enum CIDType {
    PRODUCT = 'product',
    EVENT = 'event',
    COMPANY = 'company'
}

class CIDManager {
    public productCID: string | undefined;
    public eventCID: string | undefined;
    public companyCID: string | undefined;

    constructor() {
        if (!fs.existsSync(`./ipfs_index`)) {
            fs.mkdirSync(`./ipfs_index`);
        }
        if (!fs.existsSync(`./ipfs_index/index.json`)) {
            fs.writeFileSync(`./ipfs_index/index.json`, JSON.stringify({}));
        }
        this.loadIndex();
    }

    public getProductCID() {
        this.updateIndex();
        return this.productCID;
    }

    public getEventCID() {
        this.updateIndex();
        return this.eventCID;
    }

    public getCompanyCID() {
        this.updateIndex();
        return this.companyCID;
    }

    public setProductCID(cid: string) {
        this.productCID = cid;
    }

    public setEventCID(cid: string) {
        this.eventCID = cid;
    }

    public setCompanyCID(cid: string) {
        this.companyCID = cid;
    }

    public setCID(cidType: CIDType, cid: string) {
        switch (cidType) {
            case CIDType.PRODUCT:
                this.setProductCID(cid);
                break;
            case CIDType.EVENT:
                this.setEventCID(cid);
                break;
            case CIDType.COMPANY:
                this.setCompanyCID(cid);
                break;
        }
    }

    public getCID(cidType: CIDType) {
        switch (cidType) {
            case CIDType.PRODUCT:
                return this.getProductCID();
            case CIDType.EVENT:
                return this.getEventCID();
            case CIDType.COMPANY:
                return this.getCompanyCID();
        }
    }

    public updateCID(oldCid: string, cid: string) {
        if (this.productCID === oldCid) {
            this.setProductCID(cid);
        } else if (this.eventCID === oldCid) {
            this.setEventCID(cid);
        } else if (this.companyCID === oldCid) {
            this.setCompanyCID(cid);
        }
    }

    private async updateIndex() {
        const time = new Date().getTime();
        const stream = fs.createWriteStream(`./ipfs_index/index.json`);
        stream.write(JSON.stringify({ 
            [CIDType.PRODUCT]: this.productCID,
            [CIDType.EVENT]: this.eventCID,
            [CIDType.COMPANY]: this.companyCID,
            time
        }));
        stream.end();
    }

    private async loadIndex() {
        const index = JSON.parse(fs.readFileSync(`./ipfs_index/index.json`, 'utf8'));
        CIDType.PRODUCT in index ? this.productCID = index[CIDType.PRODUCT] : this.productCID = '';
        CIDType.EVENT in index ? this.eventCID = index[CIDType.EVENT] : this.eventCID = '';
        CIDType.COMPANY in index ? this.companyCID = index[CIDType.COMPANY] : this.companyCID = '';
    }
}

const cidManager = new CIDManager();

export { cidManager, CIDType };