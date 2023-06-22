module.exports = class MyRay {
    constructor() {
        this.position = undefined
        this.normalizedVector = undefined
        this.far = Infinity
    }

    set(pos, normalizedVector) {
        this.position = pos
        this.normalizedVector = normalizedVector
    }

    intersectObjects(arrObj) {
        const res = []
        if (this.position === undefined || this.normalizedVector === undefined)
            return (res)
        for (const item of arrObj) {
            const p = item.lineIntersection(this.position, this.normalizedVector)
            const x = p.x - this.position.x
            const y = p.y - this.position.y
            const z = p.z - this.position.z
            const dist = Math.sqrt(x * x + y * y + z * z)
            const sx = Math.sign(x) - Math.sign(this.normalizedVector.x)
            const sy = Math.sign(y) - Math.sign(this.normalizedVector.y)
            const sz = Math.sign(z) - Math.sign(this.normalizedVector.z)
            if (dist < this.far && sx === 0 && sy === 0 && sz === 0) {
                res.push({
                    point: p,
                    dist: dist,
                    object: item,
                    startPoint: this.position,
                    direction: this.normalizedVector
                })
            }
        }
        res.sort((a, b) => a.dist - b.dist)
        return (res)
    }
}
