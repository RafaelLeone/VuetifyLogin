const data = require("../data");

module.exports = {
  find: (req, res) => {
    const { id } = req.params;
    if (id != undefined) {
      const task = data.tasks.find((t) => t.id == id);
      if (!task) {
        res.status(404).end();
        return;
      }
      res.send(task);
      return;
    }
    res.send(data.tasks);
  },
  add: (req, res) => {
    const { title, project, status } = req.body;
    const id =
      data.tasks[data.tasks.length - 1] === undefined
        ? 1
        : data.tasks[data.tasks.length - 1].id + 1; //arrumar
    const newTask = {
      id,
      title,
      project,
      status,
    };
    data.tasks.push(newTask);
    res.send(newTask);
  },
  update: (req, res) => {
    const { id } = req.params;
    const task = data.tasks.find((t) => t.id == id);
    if (!id || !task) {
      res.status(404).end();
      return;
    }
    const { title, project, status } = req.body;
    task.title = title;
    task.project = project;
    task.status = status;
    res.send(task);
  },
  remove: (req, res) => {
    const { id } = req.params;
    const task = data.tasks.find((t) => t.id == id);
    const index = data.tasks.indexOf(task);
    data.tasks.splice(index, 1);
    res.send(task);
  },
};
