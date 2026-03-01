/**
 * Server-side polyfills needed by pdf-parse (pdfjs) when running in Node.js.
 * These are browser APIs that pdfjs expects but don't exist in Node.
 * Call ensurePdfjsPolyfills() once before using pdf-parse.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function ensurePdfjsPolyfills() {
    if (typeof globalThis.DOMMatrix === 'undefined') {
        (globalThis as any).DOMMatrix = class DOMMatrix {
            a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
            m11 = 1; m12 = 0; m13 = 0; m14 = 0;
            m21 = 0; m22 = 1; m23 = 0; m24 = 0;
            m31 = 0; m32 = 0; m33 = 1; m34 = 0;
            m41 = 0; m42 = 0; m43 = 0; m44 = 1;
            is2D = true; isIdentity = true;
            constructor(init?: any) {
                if (Array.isArray(init) && init.length === 6) {
                    [this.a, this.b, this.c, this.d, this.e, this.f] = init;
                    this.m11 = this.a; this.m12 = this.b;
                    this.m21 = this.c; this.m22 = this.d;
                    this.m41 = this.e; this.m42 = this.f;
                    this.isIdentity = false;
                }
            }
            inverse() { return new (globalThis as any).DOMMatrix(); }
            invertSelf() { return this; }
            multiply() { return new (globalThis as any).DOMMatrix(); }
            multiplySelf() { return this; }
            preMultiplySelf() { return this; }
            translate() { return new (globalThis as any).DOMMatrix(); }
            translateSelf() { return this; }
            scale() { return new (globalThis as any).DOMMatrix(); }
            scaleSelf() { return this; }
            transformPoint(p: any) { return p || { x: 0, y: 0, z: 0, w: 1 }; }
            toFloat64Array() { return new Float64Array([this.a, this.b, this.c, this.d, this.e, this.f]); }
        };
    }

    if (typeof globalThis.Path2D === 'undefined') {
        (globalThis as any).Path2D = class Path2D {
            addPath() {} closePath() {} moveTo() {} lineTo() {}
            bezierCurveTo() {} quadraticCurveTo() {} arc() {}
            arcTo() {} ellipse() {} rect() {}
        };
    }

    if (typeof globalThis.ImageData === 'undefined') {
        (globalThis as any).ImageData = class ImageData {
            data: Uint8ClampedArray;
            width: number;
            height: number;
            constructor(sw: number, sh: number) {
                this.width = sw;
                this.height = sh;
                this.data = new Uint8ClampedArray(sw * sh * 4);
            }
        };
    }
}
