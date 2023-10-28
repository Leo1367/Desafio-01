import Task from '../models/task.js';

const validateTaskData = (req, res, next) => {
    const { title, description } = req.body;

    if (req.headers['x-import-task']) {
        next(); 
    } else {
        if (!title || !description) {
            return res.status(400).json({ message: 'Os campos "title" e "description" são obrigatórios' });
        }
        next();
    }
};

const createTask = async (req, res) => {

    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: 'Task criado com sucesso', data: task });
};

const getTasks = async (req, res) => {

    const tasks = await Task.find();
    res.status(200).json({ message: 'Tasks obtidos com sucesso', data: tasks });
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!task) return res.status(404).json({ message: 'Task não encontrado' });

        task.update_at = new Date();
        await task.save();

        res.status(200).json({ message: 'Task atualizado com sucesso', data: task });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro ao atualizar a tarefa', error });
    }
};

const deleteTask = async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deletado com sucesso' });
};

const updateTaskComplete = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task não encontrada' });

        if (!task.completed_at) {

            task.completed_at = new Date();
            task.update_at = new Date();
            await task.save();
            res.status(200).json({ message: 'Tarefa marcada como completa', data: task });
        } else {
            res.status(400).json({ message: 'Tarefa já está completa' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro ao marcar a tarefa como completa', error });
    }
};

export default { createTask, deleteTask, updateTask, updateTaskComplete, getTasks, validateTaskData }
