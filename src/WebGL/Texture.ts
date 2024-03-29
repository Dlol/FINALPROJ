import Canvas from './Canvas';
import Shader from './Shader';
import { Vec2 } from "./Types";

export default class Texture{
	gl: WebGLRenderingContext | null;
	texture: WebGLTexture | null;
	shader: Shader;
	constructor(url: string, canvas: Canvas, shader: Shader){
		const { gl } = canvas;
		this.gl = gl;
		this.shader = shader;
		
		this.texture = gl?.createTexture();
		if (this.texture == undefined) {
			alert("screaming screaming (texture.ts)")
			return;
		}
		gl?.bindTexture(gl?.TEXTURE_2D, this.texture);

		// temp image while we wait
		const level = 0;
		const internalFormat = gl?.RGBA || 0;
		const dimen:Vec2 = {x:1, y:1};
		const border = 0;
		const srcFormat = gl?.RGBA;
		const srcType = gl?.UNSIGNED_BYTE;
		const pixel = new Uint8Array([255, 0, 255, 255]); // magenta
		gl?.texImage2D(gl?.TEXTURE_2D, level, internalFormat, dimen.x, dimen.y, border, srcFormat, srcType, pixel);

		const image = new Image();
		image.onload = () => {
			console.log("loading");
			
			gl?.bindTexture(gl.TEXTURE_2D, this.texture);
			gl?.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

			// decide to generate mipmaps
			if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
				gl?.generateMipmap(gl.TEXTURE_2D);
				console.log("mips");
				
			}
			else {
				// turn off mips
				gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl?.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				console.log("no mips");
				
			}
			console.log("loaded");
			
		};

		image.src = url;
		console.log(image);
		
	}
	private isPowerOf2(val:number) {
		return (val & (val - 1)) == 0;
	}
	bind(){
		this.gl?.activeTexture(this.gl?.TEXTURE0);
		this.gl?.bindTexture(this.gl?.TEXTURE_2D, this.texture);
		this.gl?.uniform1i(this.shader.programInfo.uniformLocations.uSampler, 0);
	}
}

