async function startSimulation() {
    const n = parseInt(document.getElementById('n').value);
    const b = parseInt(document.getElementById('b').value);
    const m = parseInt(document.getElementById('m').value);
    const t = parseInt(document.getElementById('t').value);
    const r = parseInt(document.getElementById('r').value);
    const fastResult = document.getElementById('fast-result').checked;

    const mError = document.getElementById('m-error');
    mError.style.display = 'none';

    if (isNaN(n) || isNaN(b) || isNaN(m) || isNaN(t) || isNaN(r)) {
      alert("Пожалуйста, введите корректные значения.");
      return;
    }

    if (b > m) {
      mError.style.display = 'block';
      return;
    }

    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = "";

    let totalSeconds = 0; // общее время
    let catsFed = 0;
    let foodRemaining = m;

    async function wait(seconds) {
      if (fastResult) {
        return;
      }
      return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    
    while (catsFed < n) {
      if (foodRemaining >= b) {
        
        foodRemaining -= b;
        catsFed++;
        statusDiv.innerHTML += `Котик под номером ${catsFed} кормится. Прошло времени: ${totalSeconds} секунд.<br>`;
        await wait(t);
        totalSeconds += t;
        statusDiv.innerHTML += `Котик под номером ${catsFed} отошел от миски. Прошло времени: ${totalSeconds} секунд.<br>`;
      } else {
       
        statusDiv.innerHTML += `Бабушка наполняет миску. Прошло времени: ${totalSeconds} секунд.<br>`;
        await wait(r);
        totalSeconds += r;
        foodRemaining = m;
        statusDiv.innerHTML += `Бабушка закончила наполнять миску. Прошло времени: ${totalSeconds} секунд.<br>`;
      }
    }

    
    statusDiv.innerHTML += `Всего затрачено времени: ${totalSeconds} секунд.`;
  }