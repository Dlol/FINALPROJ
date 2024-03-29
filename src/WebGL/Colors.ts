import { Color } from "./Types";

class Colors {
    /**
     * Makes a color from rgb values (0-255)
     * @param r red
     * @param g green
     * @param b blue
     * @returns the color
     */
    static fromRGB(r: number, g: number, b: number): Color {
        return {
            r: r / 255,
            g: g / 255,
            b: b / 255,
            a: 1
        };
    }
    /**
     * Makes a color from rgba values (0-255)
     * @param r red
     * @param g green
     * @param b blue
     * @param a alpha
     * @returns the color
     */
    static fromRGBA(r: number, g: number, b: number, a: number): Color {
        return {
            r: r / 255,
            g: g / 255,
            b: b / 255,
            a: a / 255
        };
    }

    static get white(): Color {
        return { r: 1, g: 1, b: 1, a: 1 };
    }

    static get black(): Color {
        return { r: 0, g: 0, b: 0, a: 1 };
    }

    static get red(): Color {
        return { r: 1, g: 0, b: 0, a: 1 };
    }

    static get green(): Color {
        return { r: 0, g: 1, b: 0, a: 1 };
    }

    static get blue(): Color {
        return { r: 0, g: 0, b: 1, a: 1 };
    }

    static get yellow(): Color {
        return { r: 1, g: 1, b: 0, a: 1 };
    }

    static get cyan(): Color {
        return { r: 0, g: 1, b: 1, a: 1 };
    }

    static get magenta(): Color {
        return { r: 1, g: 0, b: 1, a: 1 };
    }

    static get transparent(): Color {
        return { r: 0, g: 0, b: 0, a: 0 };
    }

    static get pink(): Color {
        return this.fromRGB(244, 9, 221);
    }
}
export { Colors };
