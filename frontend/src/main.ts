import { v4 } from "uuid";

import "./style.css";

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>("#tasksList");
interface Task {
  title: string;
  description: string;
  id: string;
}

let tasks: Task[] = [];

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  // console.log(title.value, description.value)

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4(),
    // id: Math.random().toString(36).substr(2, 9),
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);
  taskForm.reset();
  title.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  // console.log(tasks)
  renderTasks(tasks);
});

function renderTasks(tasks: Task[]) {
  tasksList!.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add(
      "bg-zinc-700",
      "p-4",
      "rounded-md",
      "mb-4",
      "hover:bg-gray-500",
      "cursor-pointer"
    );
    const header = document.createElement("header");
    header.classList.add("flex", "justify-between", "items-center");

    const title = document.createElement("span");
    title.classList.add("text-white", "font-bold", "text-xl", "mb-2");

    const description = document.createElement("p");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "bg-red-500",
      "p-2",
      "rounded-md",
      "text-white",
      "font-bold",
      "hover:bg-red-400"
    );

    deleteButton.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
      //   console.log(index);
    });

    title.innerHTML = task.title;
    description.innerHTML = task.description;
    deleteButton.innerHTML = "Delete";

    header.append(title);
    header.append(deleteButton);
    taskElement.append(header);
    taskElement.append(description);

    tasksList?.append(taskElement);

    console.log(task);
  });
}
