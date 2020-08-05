'use strict';
{
  const tasks = [];
  const tbody = document.querySelector('tbody');
  let displayKey = 0;
  const addTasks = () => {
    const taskTextBox = document.getElementById('text');
    const task = {
      'id': '',
      'comment': taskTextBox.value,
      'status': '作業中',
      'delete': '削除',
      'display': undefined
    };
    if (displayKey === 2) {
      task.display = false;
    } else {
      task.display = true;
    }
    tasks.push(task);
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].id = i;
    }
    taskTextBox.value = '';
  }
  const displayTasks = () => {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    for (let i = 0; i < tasks.length; i++) {
      const tr = document.createElement('tr');  
      // 一列目
      const tdId = document.createElement('td');
      tdId.textContent = tasks[i]['id'];
      tr.appendChild(tdId);
      // 二列目
      const tdTask = document.createElement('td');
      tdTask.textContent = tasks[i]['comment'];
      tr.appendChild(tdTask);
      // 三列目
      const tdStatus = document.createElement('td');
      const button1 = document.createElement('button');
      button1.textContent = tasks[i]['status'];
      button1.addEventListener('click', () => {
        if(tasks[i]['status'] === '作業中') {
          tasks[i]['status'] = '完了';
          tr.classList.remove('workingStatus');
          tr.classList.add('doneStatus');
        }else {
          tasks[i]['status'] = '作業中';
          tr.classList.remove('doneStatus');
          tr.classList.add('workingStatus');
        }
        button1.textContent = tasks[i]['status'];
      })
      if(tasks[i]['status'] === '作業中') {
        tr.classList.add('workingStatus');
      }else {
        tr.classList.add('doneStatus');
      }
      tdStatus.appendChild(button1);
      tr.appendChild(tdStatus);
      // 四列目
      const tdDelete = document.createElement('td');
      const button2 = document.createElement('button');
      button2.textContent = tasks[i]['delete'];
      button2.classList.add('delete');
      button2.addEventListener('click', e =>{
        const targetTr = e.target.parentNode.parentNode;
        const targetId = Number(targetTr.firstChild.textContent);
          tasks.splice(targetId, 1);
          for (let i = 0; i < tasks.length; i++) {
            tasks[i].id = i;
          }
          displayTasks();
      });
      tdDelete.appendChild(button2);
      if (tasks[i]['display']) {
        tr.style.display = 'table-row';
      }else {
        tr.style.display = 'none';
      }
      tr.appendChild(tdDelete);
      tbody.appendChild(tr);
    }
  }
  const displayChange = () => {
    const radios = document.getElementsByName('radio');
    const doneStatus = document.getElementsByClassName('doneStatus');
    const workingStatus = document.getElementsByClassName('workingStatus');
    for (let i = 0; i < 3; i++) {
      radios[i].addEventListener('click',() => {
        switch (i) {
          case 0:
            for (let i = 0; i < workingStatus.length; i++) {
              workingStatus[i].style.display = 'table-row';
              const  workingNumber = Number(workingStatus[i].firstChild.textContent);
              tasks[workingNumber]['display'] = true;
            }
            for (let i = 0; i < doneStatus.length; i++) {
              doneStatus[i].style.display = 'table-row';
              const  doneNumber = Number(doneStatus[i].firstChild.textContent);
              tasks[doneNumber]['display'] = true;
            }
            displayKey = 0;
            break;
          case 1:
            for (let i = 0; i < workingStatus.length; i++) {
              workingStatus[i].style.display = 'table-row';
              const  workingNumber = Number(workingStatus[i].firstChild.textContent);
              tasks[workingNumber]['display'] = true;
            }
            for (let i = 0; i < doneStatus.length; i++) {
              doneStatus[i].style.display = 'none';
              const  doneNumber = Number(doneStatus[i].firstChild.textContent);
              tasks[doneNumber]['display'] = false;
            }
            displayKey = 1;
            break;
          case 2:
            for (let i = 0; i < workingStatus.length; i++) {
              workingStatus[i].style.display = 'none';
              const  workingNumber = Number(workingStatus[i].firstChild.textContent);
              tasks[workingNumber]['display'] = false;
            }
            for (let i = 0; i < doneStatus.length; i++) {
              doneStatus[i].style.display = 'table-row';
              const  doneNumber = Number(doneStatus[i].firstChild.textContent);
              tasks[doneNumber]['display'] = true;
            }
            displayKey = 2;
            break;
        }
      })
    }
  };
  document.querySelector('button').addEventListener('click', () => {
    addTasks();
    displayTasks();
    displayChange();
  });
}