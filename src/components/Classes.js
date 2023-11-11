export class StepPOJO {
    constructor(disk, from, to) {
        this.disk = disk;
        this.from = from;
        this.to = to;
    }

    setStep(step) {
        this.step = step;
    }

    getStep() {
        return this.step;
    }
}

export class DiskPOJO {
    constructor(disk, desc) {
        this.disk = disk;
        this.desc = desc;
    }
}