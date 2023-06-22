module.exports = class Plane {
    constructor(a, b, c) {
        //a b c  are three points

        this.a = a
        this.b = b
        this.c = c
        
        let ab = {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z
        }

        let ac = {
            x: c.x - a.x,
            y: c.y - a.y,
            z: c.z - a.z
        }
        
        // crossProduct
        this.ab = ab
        this.ac = ac
        this.A = ab.y * ac.z - ac.y * ab.z
        this.B = ab.z * ac.x - ac.z * ab.x
        this.C = ab.x * ac.y - ac.x * ab.y
        this.D = - (this.A * a.x + this.B * a.y + this.C * a.z)
    }

    lineIntersection(posStart, vec) {
        let line = {
            x0 : posStart.x,
            y0 : posStart.y,
            z0 : posStart.z,
            a : vec.x,
            b : vec.y,
            c : vec.z,
        }
        return this.#linePlaneIntersection(line, {
            a: this.A,
            b: this.B,
            c: this.C,
            d: this.D,
        })
    }

    #linePlaneIntersection(line, plane) {
        //x = x0 + at
        //y = y0 + bt
        //z = z0 + ct
        //plane: Ax + By + Cz + D = 0
        //A(x0 + at) + B(y0 + bt) + C(z0 + ct) + D = 0
        let a = - (plane.d + plane.a * line.x0 + plane.b * line.y0 + plane.c * line.z0)
        let b = plane.a * line.a + plane.b * line.b + plane.c * line.c
        let t = a / b
        return {
            x : line.x0 + line.a * t,
            y : line.y0 + line.b * t,
            z : line.z0 + line.c * t,
        }
    }
}