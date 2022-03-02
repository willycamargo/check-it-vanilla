const $form = document.getElementById('form-tasks')

const addTask = (title) => {
  const taskHTML = `<li class="tasks-section__item">
    <label class="tasks-section__item__label">
      <input type="checkbox" class="tasks-section__item__checkbox">
      <span class="tasks-section__item__text">${title}</span>
    </label>
    <button type="button" class="tasks-section__item__remove">X</button>
  </li>`
  
  const $tasksList = document.getElementById('list-todo')
  $tasksList.insertAdjacentHTML('beforeend', taskHTML)
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  const formData = new FormData($form)
  const title = formData.get('title')
  addTask(title)
}

$form.addEventListener('submit', handleFormSubmit)