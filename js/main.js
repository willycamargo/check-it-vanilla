const $form = document.getElementById('form-tasks')

/**
 * Funcoes de Armazenamento
 */
const addTaskToLocalStorage = (task) => {
  let tasks = JSON.parse(window.localStorage.getItem('tasks'))

  if (!tasks) {
    tasks = []
  }

  tasks.push(task)
  window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

const removeTaskFromLocalStorage = (taskId) => {
  const tasks = JSON.parse(window.localStorage.getItem('tasks'))
  const taskToRemove = tasks.findIndex((task) => task.id == taskId)
  tasks.splice(taskToRemove, 1)
  window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

const updateTaskCheckedFromLocalStorage = (taskId, checked) => {
  const tasks = JSON.parse(window.localStorage.getItem('tasks'))
  const taskToUpdate = tasks.findIndex((task) => task.id == taskId)
  tasks[taskToUpdate].checked = checked
  window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

/**
 * Funcoes de DOM
 */
const handleItemRemove = (event) => {
  const $removeButton = event.target
  const $li = $removeButton.parentElement
  const $currentList = $li.parentElement
  const taskId = $li.dataset.id

  $currentList.removeChild($li)
  removeTaskFromLocalStorage(taskId)
}

const handleCheckboxChange = (event) => {
  const $checkbox = event.target
  const $li = $checkbox.parentElement.parentElement
  const $tasksTodoList = document.getElementById('list-todo')
  const $tasksDoneList = document.getElementById('list-done')
  const taskId = $li.dataset.id

  if ($checkbox.checked) {
    $tasksDoneList.append($li)
  } else {
    $tasksTodoList.append($li)
  }

  updateTaskCheckedFromLocalStorage(taskId, $checkbox.checked)
}

const addTaskToPage = ({ title, checked, id }) => {
  // Criar Item (li)
  const $li = document.createElement('li')
  $li.classList.add('tasks-section__item')
  $li.dataset.id = id

  // Criar Label (label)
  const $label = document.createElement('label')
  $label.classList.add('tasks-section__item__label')
  $li.append($label)

  // Criar checkbox (input)
  const $checkbox = document.createElement('input')
  $checkbox.classList.add('tasks-section__item__checkbox')
  $checkbox.setAttribute('type', 'checkbox')
  $checkbox.checked = checked
  $label.append($checkbox)

  // Criar span (span)
  const $span = document.createElement('span')
  $span.classList.add('tasks-section__item__text')
  $span.innerText = title
  $label.append($span)

  // Criar botao de remocao (remove)
  const $removeButton = document.createElement('button')
  $removeButton.classList.add('tasks-section__item__remove')
  $removeButton.innerText = 'X'
  $li.append($removeButton)
  
  // Adicionar item nas listas
  if (checked) {
    const $tasksTodoList = document.getElementById('list-done')
    $tasksTodoList.append($li)
  } else {
    const $tasksTodoList = document.getElementById('list-todo')
    $tasksTodoList.append($li)
  }

  // Adicionar eventos
  $checkbox.addEventListener('change', handleCheckboxChange)
  $removeButton.addEventListener('click', handleItemRemove)
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  const formData = new FormData($form)
  const title = formData.get('title')

  const task = {
    title: title,
    checked: false,
    id: Date.now()
  }
  addTaskToLocalStorage(task)
  addTaskToPage(task)
  $form.reset()
}

// Renderiza elementos do local storage
const renderTasksFromLocalStorage = () => {
  const tasks = JSON.parse(window.localStorage.getItem('tasks'))

  if (tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const currentTask = tasks[i]
      addTaskToPage(currentTask)
    }
  }
}
renderTasksFromLocalStorage()

// Inicialize eventos
$form.addEventListener('submit', handleFormSubmit)
