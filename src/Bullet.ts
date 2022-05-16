import { mat4 } from "gl-matrix-ts";
import GameObject from "./GameObject";
import Canvas from "./WebGL/Canvas";
import Shader from "./WebGL/Shader";
import { TextureRect } from "./WebGL/Shapes";
import { Vec2 } from "./WebGL/Types";
import { currentDelta } from "./Global";

export default class Bullet extends GameObject {
  texRect: TextureRect;
  angle: number;
  canvas: Canvas;
  shader: Shader;
  owner: string;
  speed: number;
  dx: number;
  dy: number;
  constructor(pos: Vec2, canvas: Canvas, shader: Shader, angle: number, owner?: string) {
    const size: Vec2 = { x: 16, y: 16 };
    super({x:pos.x - 8, y:pos.y - 8}, size);
    this.canvas = canvas;
    this.shader = shader;
    this.texRect = new TextureRect(
      { x: 0, y: 0 },
      size,
      canvas,
      "assets/bullet.png",
      shader
    );
    this.angle = angle;
    this.cullable = true;

    this.owner = owner || "other";
    this.speed = 0.2;
    this.dx = Math.cos(this.angle);
    this.dy = Math.sin(this.angle);


    // console.log(currentDelta);
    
  }

  draw(): void {
    const { gl } = this.canvas;
    const programInfo = this.shader.programInfo;
		this.shader.bind();
    this.pos.x += this.dx * this.speed * currentDelta;
    this.pos.y += this.dy * this.speed * currentDelta;
    const model = mat4.create();

    mat4.translate(model, model, [this.pos.x, this.pos.y, 0]);
    gl?.uniformMatrix4fv(
      programInfo?.uniformLocations.uModelMatrix,
      false,
      model
    );

    this.texRect.draw();
  }
}
