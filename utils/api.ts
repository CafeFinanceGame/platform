enum CIDType {
    PRODUCT = 'product',
    EVENT = 'event',
    COMPANY = 'company'
}

class CIDManager {
    public productCID: string | undefined;
    public eventCID: string | undefined;
    public companyCID: string | undefined;

    public getProductCID() {
        return this.productCID;
    }

    public getEventCID() {
        return this.eventCID;
    }

    public getCompanyCID() {
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
            this.productCID = cid;
        } else if (this.eventCID === oldCid) {
            this.eventCID = cid;
        } else if (this.companyCID === oldCid) {
            this.companyCID = cid;
        }
    }
}

const cidManager = new CIDManager();

export { cidManager, CIDType };