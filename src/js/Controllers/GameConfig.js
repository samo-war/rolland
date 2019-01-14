class GameConfig {
  constructor(player, classes, gameController) {
    this.player = player;
    this.classList = classes;
    this.GameController = gameController;
    this.selectLocationPage = document.getElementById('location-select');
    this.playerConfigPage = document.getElementById('config-page');
    this.faceContainer = document.getElementById('face-container');
    this.wandContainer = document.getElementById('wand-container');
    this.playerFigure = document.getElementById('player-figure');
    this.nameInput = document.getElementById('player-name-input');
    document.addEventListener('click', (e) => this.changeConfig(e));
  }

  init() {
    this.createPlayerConfigPage();
  }

  selectLocation(e) {
    this.locationId = e.target.id;
    this.showPlayerConfigPage();
  }

  showPlayerConfigPage() {
    this.playerConfigPage.classList.remove('hidden');
    this.selectLocationPage.classList.add('hidden');
  }

  createPlayerConfigPage() {
    this.createFaceItems();
    this.createWandItems();
    this.renderPlayerFigure();
  }

  createFaceItems() {
    const faceList = document.createElement('div');
    faceList.classList.add('config-section');
    this.classList.faces.forEach((item, index) => {
      let face = document.createElement('div');
      face.classList.add('config-item-image', item);
      face.dataset.itemId = index;
      face.dataset.itemType = 'face';
      faceList.appendChild(face);
    });
    this.faceContainer.appendChild(faceList);
  }

  createWandItems() {
    const wandList = document.createElement('div');
    wandList.classList.add('config-section');
    this.classList.wands.forEach((item, index) => {
      let wand = document.createElement('div');
      wand.classList.add('config-item-image', item);
      wand.dataset.itemId = index;
      wand.dataset.itemType = 'wand';
      wandList.appendChild(wand);
    });
    this.wandContainer.appendChild(wandList);
  }

  renderPlayerFigure() {
    this.playerFigure.innerHTML = '';
    let figure = this.player.createFigure();
    figure.classList.add('player-figure-demo');
    this.playerFigure.appendChild(figure);
  }

  changeConfig(e) {
    let configType = e.target.dataset.itemType;
    if (e.target.id === 'submit-button') {
      this.compileConfig();
    } else if (e.target.classList.contains('location-item')) {
      this.selectLocation(e);
    }
    switch (configType) {
      case 'face':
        this.player.faceId = e.target.dataset.itemId;
        this.renderPlayerFigure()
        break;
      case 'wand':
        this.player.wandId = e.target.dataset.itemId;
        this.renderPlayerFigure()
        break;
    }
  }

  compileConfig() {
    if (this.nameInput.value) {
      this.player.name = this.nameInput.value;
      this.playerConfigPage.classList.add('hidden');
      this.GameController.init(this.player, this.locationId);
      this.GameController.initGame();
    } else {
      this.nameInput.classList.add('empty-input')
    }
  }
}

export default GameConfig; 