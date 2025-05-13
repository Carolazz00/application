/** @typedef {import("./p5/types").Font} Font */
/** @typedef {import("./p5/types").Graphics} Graphics */
/** @typedef {import("./p5/types").Image} Image */

/**
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {Graphics} [graphics] Optional graphics context to draw on
 */
function textSVG(text, x, y, graphics) {
  const ctx = graphics || window;

  /** @type {Font | string | object} */
  let font = ctx.textFont();
  if (typeof font === "string") {
    throw new Error("A custom font must be loaded to use textSVG");
  }

  const size = ctx.textSize();
  const lineHeight = ctx.textLeading();

  text.split("\n").forEach((line, index) => {
    const paths = font.font.getPaths(line, x, y + index * lineHeight, size);
    paths.forEach(({ commands }) => {
      drawPathCommands(commands, graphics);
    });
  });
}

/**
 * @param {Array} commands
 * @param {Graphics} [graphics] Optional graphics context to draw on
 */
function drawPathCommands(commands, graphics) {
  // Find all M commands to identify start of contours
  const contourStarts = commands.reduce((acc, cmd, index) => {
    if (cmd.type === "M") {
      acc.push(index);
    }
    return acc;
  }, []);

  // If no commands, return
  if (contourStarts.length === 0) return;

  // Get the appropriate context
  const ctx = graphics || window;

  // Start the main shape
  ctx.beginShape();

  // Process each contour
  for (let i = 0; i < contourStarts.length; i++) {
    const startIndex = contourStarts[i];
    const endIndex =
      i === contourStarts.length - 1 ? commands.length : contourStarts[i + 1];

    // If this is a sub-contour (not the first one), use beginContour
    if (i > 0) {
      ctx.beginContour();
    }

    // Process all commands in this contour
    for (let j = startIndex; j < endIndex; j++) {
      const cmd = commands[j];

      switch (cmd.type) {
        case "M":
          ctx.vertex(cmd.x, cmd.y);
          break;
        case "L":
          ctx.vertex(cmd.x, cmd.y);
          break;
        case "C":
          ctx.bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
          break;
        case "Q":
          ctx.quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
          break;
        case "Z":
          // Only endContour if this is a sub-contour
          if (i > 0) {
            ctx.endContour();
          }
          break;
      }
    }
  }

  // Close the main shape
  ctx.endShape(CLOSE);
}

//

function addDownloadButton() {
  createButton("Download SVG").mousePressed(() => {
    save("sketch.svg");
  });
}
