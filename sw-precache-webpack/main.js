(function (window, document) {
  const todoListDOM = document.getElementById('todo-list')
  const todoInputDOM = document.getElementById('todo-input')
  let todoList = []

  // 监听input keydown 事件， 新增待办事项
  todoInputDOM.addEventListener('keydown', event => {
    if (event.keyCode === 13 && event.target.value) {
      // ....
      addItem(newItem(event.target.value))
      event.target.value = ''
    }
  })

  // 监听todoListDOM 事件
  todoListDOM.addEventListener('click', event => {
    const currentTarget = event.target

    // 更新状态和删除
    if (currentTarget && (currentTarget.matches('a.finish') || currentTarget.matches('a.unfinish') || currentTarget.matches('.des'))) {
      toggleItem(parseInt(currentTarget.dataset.id, 10))
    } else if (currentTarget && currentTarget.matches('a.del')) {
      removeItem(parseInt(currentTarget.dataset.id, 10))
    }
  })

  const newItem = (value) => ({ desc: value, isComplete: false })
  const addItem = item => {
    fetch('http://localhost:8888/todolist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(json => {
      // 在页面进行渲染
      todoList.push(json)
      renderToDoList(todoList)
    })
  }

  const toggleItem = id => {
    const currentSelectItem = todoList.find(item => item.id === id)

    currentSelectItem.isComplete = !currentSelectItem.isComplete

    fetch(`http://localhost:8888/todolist/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentSelectItem)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      renderToDoList(todoList)
    })
  }

  // fetch资源并加载
  fetch('http://localhost:8888/todolist')
  .then(res => res.json())
  .then(json => {
    todoList = todoList.concat(json)
    renderToDoList(todoList)
  })
  .catch(err => {
    console.log(err)
  })

  const removeItem = id => {
    fetch(`http://localhost:8888/todolist/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      todoList = todoList.filter(item => item.id !== id)
      renderToDoList(todoList)
    })
  }

  // render函数
  function renderToDoList(todoList) {
    const html = todoList.map((item, index) =>
    `
    <li class="list">
    <a class="${item.isComplete ? 'finish' : 'unfinish'}" data-id="${item.id}"></a>
    <p class="desc" data-id="${item.id}">
      ${item.desc}
    </p>
    <a class="del" data-id="${item.id}"></a>
  </li>
    `).join('')

    todoListDOM.innerHTML = html
  }
}(window, document))
