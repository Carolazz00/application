let shapes = [];

      function setup() {
        createCanvas(800, 800);
        colorMode(HSB, 360, 100, 100);
        noStroke();

        for (let i = 0; i < 60; i++) {
          shapes.push({
            type: random(['circle', 'square', 'triangle']),
            baseX: random(width),
            baseY: random(height),
            size: random(100,400),
            hue: random(360),
            speed: random(0.5, 1.5),
            offset: random(10)
          });
        }
      }

      function draw() {
        background("BLACK"); 

        for (let i = 0; i < shapes.length; i++) {
          let s = shapes[i];
          let t = frameCount * 0.02 * s.speed + s.offset;

          let x = s.baseX + sin(t) * 50;
          let y = s.baseY + cos(t * 1.5) * 50;

         
          fill(s.hue, 80, 90);

          if (s.type === 'circle') {
            ellipse(x, y, s.size);
          } else if (s.type === 'square') {
            rectMode(CENTER);
            rect(x, y, s.size, s.size);
          } else if (s.type === 'triangle') {
            let r = s.size / 2;
            
            
            push();
            translate(x, y);
            rotate(t);
            triangle(
              0, -r,
              -r * cos(PI / 6), r * sin(PI / 6),
              r * cos(PI / 6), r * sin(PI / 6)
            );
            pop();
          }
        }
      }