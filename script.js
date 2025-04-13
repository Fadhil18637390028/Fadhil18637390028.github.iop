let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse event
    document.addEventListener('mousemove', (e) => {
      this.handleMove(e.clientX, e.clientY, paper);
    });
  
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      if (e.button === 0) {
        this.mouseTouchX = e.clientX;
        this.mouseTouchY = e.clientY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });
  
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  
    // Touch event
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.handleMove(touch.clientX, touch.clientY, paper);
    });
  
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.mouseTouchX = touch.clientX;
      this.mouseTouchY = touch.clientY;
    });
  
    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
  
  handleMove(clientX, clientY, paper) {
    if (!this.rotating) {
      this.mouseX = clientX;
      this.mouseY = clientY;
  
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }
  
    const dirX = clientX - this.mouseTouchX;
    const dirY = clientY - this.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;
  
    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    let degrees = 180 * angle / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
  
    if (this.rotating) {
      this.rotation = degrees;
    }
  
    if (this.holdingPaper && !this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    }
  
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  
    paper.style.transform = translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg);
  }