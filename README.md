## ✅ To-Do App – Full Tutorial
[![View Tutorial](https://img.shields.io/badge/View-Full%20Tutorial-blue)](https://www.maxoncodes.online/2026/02/modern-todo-app-html-css-javascript.html)&nbsp;&nbsp;
[![More Projects](https://img.shields.io/badge/More-JavaScript%20Projects-green)](https://www.maxoncodes.online/p/javascript-projects.html)

A clean and responsive **To-Do App** built using **HTML, CSS, and JavaScript** that helps users manage daily tasks efficiently.  
This beginner-friendly project focuses on DOM manipulation, event handling, state updates, and browser storage.

---

## 🚀 Features

- ➕ Add new tasks instantly  
- ✏️ Edit existing tasks  
- ❌ Delete tasks individually  
- ✔️ Mark tasks as completed  
- 🔎 Filter tasks (All / Active / Completed)  
- 💾 Saves tasks using localStorage  
- 📱 Fully responsive modern UI  
- 🧮 Live task counter  

---

## 🛠️ Technologies Used

- **HTML5** – Structure  
- **CSS3** – Modern styling & responsive layout  
- **JavaScript (ES6)** – Logic & interactivity  
- **localStorage API** – Persistent data storage  

---

## 📂 Project Structure

```
todo-app/
├── index.html
├── style.css
├── script.js
├── images/
```

---

## ⚙️ How It Works

1. User enters a task in the input field  
2. JavaScript adds task to an array  
3. Tasks render dynamically in UI  
4. Each action updates state  
5. State is saved in localStorage  
6. When page reloads, tasks load automatically  

---

## 🧠 Core Logic Example

```js
function persistTasks(){
 localStorage.setItem("modernTodoList", JSON.stringify(tasks));
}

function loadTasks(){
 const saved = localStorage.getItem("modernTodoList");
 if(saved) tasks = JSON.parse(saved);
}
```

---

## 🧪 Try It Yourself

1. Download project files  
2. Open folder in VS Code  
3. Run **index.html** in browser  
4. Add tasks and test filters  
5. Refresh page to verify storage  

---

## 📌 Learning Outcomes

After building this project, you will understand:

- DOM manipulation fundamentals  
- Event listeners and UI updates  
- State-based rendering logic  
- Local storage usage  
- Real-world frontend project structure  

---

## 🎯 Next Improvements You Can Add

- Drag and drop task sorting  
- Dark mode toggle  
- Task priority labels  
- Due date reminders  
- Cloud database sync  

---

💡 **Pro Tip:** Projects like this are perfect for portfolios because they demonstrate real frontend logic, not just design.

