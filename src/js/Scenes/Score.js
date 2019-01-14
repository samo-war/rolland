class Score {
  constructor() {
  }

  refreshScore(player) {
    if (!localStorage['rolland-scopper']) {
      localStorage['rolland-scopper'] = JSON.stringify([player]);
    } else {
      let score = JSON.parse(localStorage['rolland-scopper']);
      score.push(player);
      score.sort((a,b) => b.result - a.result);
      score.length > 3 ? score.pop() : score;
      localStorage['rolland-scopper'] = JSON.stringify(score);
    }
  }

  showScore(wrapper) {
    wrapper.innerHTML = '';
    if (!localStorage['rolland-scopper']) {
      wrapper.textContent = "Become a great wizard!"
    } else {
      const scoreList = document.createElement('ol');
      const topScore = JSON.parse(localStorage['rolland-scopper']);
      topScore.forEach(item => this.createScoreItem (item, scoreList));
      wrapper.appendChild(scoreList);
    }
  }

  createScoreItem(item, list) {
    const scoreItem = document.createElement('li');
    const itemWrapper = document.createElement('div');
    const name = document.createElement('div');
    const score = document.createElement('div');
    itemWrapper.classList.add('score-item');
    name.textContent = item.name;
    score.textContent = item.result;
    itemWrapper.appendChild(name);
    itemWrapper.appendChild(score);
    scoreItem.appendChild(itemWrapper);
    list.appendChild(scoreItem);
  }
}

export default Score;