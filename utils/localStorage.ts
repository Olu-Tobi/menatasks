export const loadTasksFromStorage = () => {
    try {
        const data = localStorage.getItem('tasks');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveTasksToStorage = (tasks: any[]) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch { }
};
