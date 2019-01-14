import HealthBar from "./HealthBar";

class Character {
  constructor() {
    this.faceId = 0;
    this.wandId = 0;
    this.health = 100;
    this.fireSound = document.getElementById('fire-sound');
    this.iceSound = document.getElementById('ice-sound');
  }

  createFigure() {
    let figure = document.createElement('div');
    this.face = document.createElement('div');
    this.wand = document.createElement('div');
    this.body = document.createElement('div');
    this.face.classList.add('face', `face-${this.faceId}`);
    this.wand.classList.add('wand', `wand-${this.wandId}`);
    this.body.classList.add('body');
    figure.appendChild(this.face);
    figure.appendChild(this.wand);
    figure.appendChild(this.body);
    return figure;
  }

  createHealthBar(className) {
    if (!this.healthBar) {
      this.healthBar = new HealthBar(className);
    } else {
      this.renderHealthBar();
    }
  }

  renderHealthBar() {
    this.healthBar.render(this.health);
  }

  attack(attackType) {
    if (attackType === 'fire') {
      this.body.className = 'body';
      this.face.classList.remove('face-attack-fire-anim', 'face-opponent-fire-anim', 'face-attack-ice-anim', 'face-opponent-ice-anim');
      this.wand.classList.remove('wand-attack-fire-anim', 'wand-opponent-fire-anim', 'wand-attack-ice-anim', 'wand-opponent-ice-anim');
      this.fire.className = 'fireObj';
      setTimeout(() => {
        this.fireSound.play();
        this.body.classList.add('body-attack-fire-anim');
        this.face.classList.add('face-attack-fire-anim');
        this.wand.classList.add('wand-attack-fire-anim');
        this.fire.classList.add('correct-fire-anim');
    }, 3000)

    } else if (attackType === 'ice') {
      this.body.className = 'body';
      this.face.classList.remove('face-attack-ice-anim', 'face-opponent-ice-anim', 'face-attack-fire-anim', 'face-opponent-fire-anim');
      this.wand.classList.remove('wand-attack-ice-anim', 'wand-opponent-ice-anim', 'wand-attack-fire-anim', 'wand-opponent-fire-anim');
      this.ice.className = 'iceObj';
      setTimeout(() => {
        this.iceSound.play();
        this.body.classList.add('body-attack-ice-anim');
        this.face.classList.add('face-attack-ice-anim');
        this.wand.classList.add('wand-attack-ice-anim');
        this.ice.classList.add('correct-ice-anim');
      }, 3000)
    }
  }

  takeAttack(attackType) {
    this.health = this.health - 25;
    if (attackType === 'fire') {
    this.body.className = 'body';
    this.face.classList.remove('face-opponent-fire-anim', 'face-attack-fire-anim', 'face-opponent-ice-anim', 'face-attack-ice-anim');
    this.wand.classList.remove('wand-opponent-fire-anim', 'wand-attack-fire-anim', 'wand-opponent-ice-anim', 'wand-attack-ice-anim');
    setTimeout(() => {
      if (this.health) {
        this.body.classList.add('body-opponent-fire-anim');
        this.face.classList.add('face-opponent-fire-anim');
        this.wand.classList.add('wand-opponent-fire-anim');
      } else {
        this.body.classList.add('body-opponent-final-fire');
        this.face.classList.add('face-opponent-final-fire');
        this.wand.classList.add('wand-opponent-final-fire');
      }
    }, 3000);

    } else if (attackType === 'ice') {
      this.body.className = 'body';
      this.face.classList.remove('face-opponent-ice-anim', 'face-attack-ice-anim', 'face-opponent-fire-anim', 'face-attack-fire-anim');
      this.wand.classList.remove('wand-opponent-ice-anim', 'wand-attack-ice-anim', 'wand-opponent-fire-anim', 'wand-attack-fire-anim');
      setTimeout(() => {
        if (this.health) {
          this.body.classList.add('body-opponent-ice-anim');
          this.face.classList.add('face-opponent-ice-anim');
          this.wand.classList.add('wand-opponent-ice-anim');
        } else {
          this.body.classList.add('body-opponent-final-ice');
          this.face.classList.add('face-opponent-final-ice');
          this.wand.classList.add('wand-opponent-final-ice');
        }
      }, 3000);
    }
  }
}

export default Character;