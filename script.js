    (function() {
        // ---------- state (immutable pattern with re-render) ----------
        let tasks = [];
        let currentFilter = 'all';   // 'all', 'active', 'completed'
        
        // DOM elements
        const taskListEl = document.getElementById('taskList');
        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addTaskBtn');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const counterSpan = document.getElementById('counterValue');
        const clearAllBtn = document.getElementById('clearAllBtn');

        // ---------- helper: load from localStorage ----------
        function loadFromStorage() {
            const stored = localStorage.getItem('modernTodoList');
            if (stored) {
                try {
                    tasks = JSON.parse(stored);
                } catch (e) {
                    tasks = [];
                }
            } else {
                // friendly default tasks to show UI flavour
                tasks = [
                    { id: '1', text: 'design glassmorphism card', completed: true },
                    { id: '2', text: 'implement filter tabs', completed: false },
                    { id: '3', text: 'add local storage', completed: false },
                    { id: '4', text: 'test on mobile', completed: false }
                ];
            }
        }

        // save to localStorage
        function persistTasks() {
            localStorage.setItem('modernTodoList', JSON.stringify(tasks));
        }

        // ---------- generate unique id (simple) ----------
        function generateId() {
            return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        // ---------- render based on currentFilter ----------
        function render() {
            // 1. filter tasks
            let filtered = tasks;
            if (currentFilter === 'active') {
                filtered = tasks.filter(t => !t.completed);
            } else if (currentFilter === 'completed') {
                filtered = tasks.filter(t => t.completed);
            }

            // 2. build HTML string or clear + append (using manual loop for direct event binding)
            taskListEl.innerHTML = '';

            if (filtered.length === 0) {
                // empty state
                const emptyLi = document.createElement('li');
                emptyLi.className = 'empty-state';
                emptyLi.style.background = 'transparent';
                emptyLi.style.backdropFilter = 'none';
                emptyLi.style.border = 'none';
                emptyLi.style.boxShadow = 'none';
                emptyLi.style.justifyContent = 'center';
                emptyLi.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <i class="fas fa-smile-wink"></i>
                        <span>all clear · nothing here</span>
                    </div>
                `;
                taskListEl.appendChild(emptyLi);
            } else {
                filtered.forEach(task => {
                    const li = document.createElement('li');
                    li.dataset.id = task.id;
                    if (task.completed) li.classList.add('completed-task');

                    // checkbox
                    const check = document.createElement('input');
                    check.type = 'checkbox';
                    check.className = 'task-check';
                    check.checked = task.completed;
                    check.setAttribute('aria-label', 'toggle completion');

                    // task text span
                    const textSpan = document.createElement('span');
                    textSpan.className = 'task-text';
                    textSpan.textContent = task.text;

                    // actions div
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'task-actions';

                    const editBtn = document.createElement('button');
                    editBtn.className = 'edit-btn';
                    editBtn.setAttribute('aria-label', 'edit task');
                    editBtn.innerHTML = '<i class="fas fa-pencil"></i>';

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.setAttribute('aria-label', 'delete task');
                    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

                    actionsDiv.appendChild(editBtn);
                    actionsDiv.appendChild(deleteBtn);

                    li.appendChild(check);
                    li.appendChild(textSpan);
                    li.appendChild(actionsDiv);

                    // --- attach event listeners ---
                    // toggle complete
                    check.addEventListener('change', (e) => {
                        e.stopPropagation();
                        const newCompleted = check.checked;
                        const taskId = li.dataset.id;
                        const taskToUpdate = tasks.find(t => t.id === taskId);
                        if (taskToUpdate) {
                            taskToUpdate.completed = newCompleted;
                            persistTasks();
                            render();   // re-render to reflect filter & class
                        }
                    });

                    // edit task (inline prompt — simple but effective)
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const taskId = li.dataset.id;
                        const taskToEdit = tasks.find(t => t.id === taskId);
                        if (!taskToEdit) return;
                        const newText = prompt('Edit task:', taskToEdit.text);
                        if (newText !== null && newText.trim() !== '') {
                            taskToEdit.text = newText.trim();
                            persistTasks();
                            render();
                        } else if (newText !== null && newText.trim() === '') {
                            alert('task cannot be empty');
                        }
                    });

                    // delete task
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const taskId = li.dataset.id;
                        tasks = tasks.filter(t => t.id !== taskId);
                        persistTasks();
                        render();
                    });

                    taskListEl.appendChild(li);
                });
            }

            // 3. update task counter (total active)
            const activeCount = tasks.filter(t => !t.completed).length;
            counterSpan.textContent = activeCount;

            // 4. update active filter button UI
            filterBtns.forEach(btn => {
                const filterVal = btn.dataset.filter;
                if (filterVal === currentFilter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // ---------- add new task ----------
        function addNewTask() {
            const rawText = taskInput.value.trim();
            if (rawText === '') {
                alert('please write something');
                return;
            }

            const newTask = {
                id: generateId(),
                text: rawText,
                completed: false
            };
            tasks.push(newTask);
            persistTasks();
            // reset filter to 'all' to make new task visible (optional but friendly)
            currentFilter = 'all';
            taskInput.value = '';
            render();
            taskInput.focus();
        }

        // ---------- filter change ----------
        function setFilter(filterName) {
            currentFilter = filterName;
            render();
        }

        // ---------- clear all tasks (with confirm) ----------
        function clearAllTasks() {
            if (tasks.length === 0) return;
            const confirmClear = confirm('permanently delete all tasks?');
            if (confirmClear) {
                tasks = [];
                persistTasks();
                render();
            }
        }

        // ---------- initial boot & event listeners ----------
        function init() {
            loadFromStorage();
            render();

            // add task (button + enter key)
            addBtn.addEventListener('click', addNewTask);
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addNewTask();
                }
            });

            // filter clicks
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;
                    setFilter(filter);
                });
            });

            // clear all button
            clearAllBtn.addEventListener('click', clearAllTasks);
        }

        // go
        init();
    })();