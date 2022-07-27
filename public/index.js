const input = document.querySelector('input')
const form = document.querySelector('form')
const button = document.querySelector('button')
const taskContainer = document.querySelector('.task-cover')
const fetchMsg = document.querySelector('.fetch-error')
const loader = document.querySelector('p')
let isEditing = false
let editID

const deleteTask = (query) => {
    const allTasks = query.querySelectorAll('.delete')
    allTasks.forEach((value) => {
        value.addEventListener('click', async(e) => {
            const deleteID = e.target.dataset.delete
            loader.classList.remove('hide-msg')
            try {
                loader.classList.add('hide-msg')
                await axios.delete(`/api/v1/tasks/${deleteID}`)
                showTasks()
            } catch (error) {
                console.log('error deleting')
            }
        })
    })
}

const editTask = (query) => {
    const allTasks = query.querySelectorAll('.edit')
    allTasks.forEach((value) => {
        value.addEventListener('click', async(e) => {
            isEditing = true
            editID = e.target.dataset.edit
            const taskInput =
                e.target.parentElement.parentElement.firstElementChild.textContent
            input.value = taskInput
            button.innerHTML = 'edit'
        })
    })
}

const showTasks = async() => {
    loader.classList.remove('hide-msg')
    try {
        loader.classList.add('hide-msg')
        const {
            data: { data },
        } = await axios.get('/api/v1/tasks')
        const allTasks = data
            .map((value) => {
                const { name, _id: id } = value
                return `<div class="task">
                    <span>${name}</span>
                    <div class="icons">
                        <span class="edit" data-edit=${id}>
                        +
                        </span>
                        <span class="delete" data-delete=${id}>-</span>
                    </div>
                </div>`
            })
            .join('')

        fetchMsg.classList.add('hide-msg')

        taskContainer.innerHTML = allTasks
        deleteTask(taskContainer)
        editTask(taskContainer)
        const params = window.location
    } catch (error) {
        fetchMsg.classList.remove('hide-msg')
    }
}

showTasks()

const createTask = async(e) => {
    e.preventDefault()
    const inputValue = input.value
    loader.classList.remove('hide-msg')
    try {
        loader.classList.add('hide-msg')
        if (isEditing && inputValue) {
            await axios.patch(`/api/v1/tasks/${editID}`, {
                name: inputValue,
                completed: false,
            })
        } else if (!isEditing && inputValue) {
            await axios.post('/api/v1/tasks', {
                name: inputValue,
                completed: false,
            })
        }

        showTasks()
        input.value = ''
        isEditing = false
        editID = ''
        button.innerHTML = 'submit'
    } catch (error) {
        console.log(`failed to post`)
    }
}

button.addEventListener('click', createTask)
form.addEventListener('submit', createTask)