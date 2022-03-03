const $form = document.getElementById('form-tasks')

const addTask = (title) => {
  // Criar Item (li)
  const $li = document.createElement('li')
  $li.classList.add('tasks-section__item')

  // Criar Label (label)
  const $label = document.createElement('label')
  $label.classList.add('tasks-section__item__label')
  $li.append($label)

  // Criar input (input)
  const $input = document.createElement('input')
  $input.classList.add('tasks-section__item__checkbox')
  $input.setAttribute('type', 'checkbox')
  $label.append($input)

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
  
  const $tasksList = document.getElementById('list-todo')
  $tasksList.append($li)
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  const formData = new FormData($form)
  const title = formData.get('title')

  addTask(title)
}

$form.addEventListener('submit', handleFormSubmit)