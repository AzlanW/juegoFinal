class Obstacle
{
    constructor(x,y,w,h,angle)
    {
        var options = 
        {
            restitution: 1.6,
            density: 1, 
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        this.w = w;
        this.h = h;
        this.image = loadImage("assets/papa.png");
        World.add(world, this.body);
    }

    display()
    {
        var angle = this.body.angle;
        push()
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.w,this.h);
        pop()
    }
}