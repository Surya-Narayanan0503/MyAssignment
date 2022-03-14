export interface User {
    firstName: string;
    lastName: string;
    handle: string;
    password: string;
    email: string;
    picture: string;
    id: number;
    userTasks : any;
}

export const list: User[] = [
    {
        id: 1,
        handle: 'Surya',
        firstName: 'surya',
        lastName: 'narayanan',
        password: 'surya',
        email: 'surya@gmail.com',
        picture: 'https://icon2.cleanpng.com/20180403/rhe/kisspng-computer-icons-avatar-male-super-b-5ac405d4cdcd45.472240621522795988843.jpg',
        userTasks: [
            {task : 'Need to update vue',dueDate:'04/21/2022', isCompleted: true, assignedBy: "kokila"},
            {task : 'Need to update pinia',dueDate:'05/18/2022', isCompleted: false, assignedBy: "ragu"},
            {task : 'Need to update Rest service',dueDate:'06/11/2022', isCompleted: false, assignedBy: "janani"},
            {task : 'Need to update Async',dueDate:'04/17/2022', isCompleted: false, assignedBy: "ragu"},
            {task : 'Need to update express',dueDate:'03/11/2022', isCompleted: true, assignedBy: "kokila"}
        ]
    },
    {
        id: 2,
        handle: 'Ragu',
        firstName: 'ragu',
        lastName: 'murugaiyan',
        password: 'ragu',
        email: 'ragu@gmail.com',
        picture: 'https://www.kindpng.com/picc/m/357-3575561_girl-young-beautiful-people-female-person-woman-user.png',
        userTasks: [
            {task : 'Need to update angular',dueDate:'03/21/2022', isCompleted: false, assignedBy: "Surya"},
            {task : 'Need to update react',dueDate:'03/26/2022', isCompleted: false, assignedBy: "Janani"},
            {task : 'Need to update CSS',dueDate:'04/30/2022', isCompleted: false, assignedBy: "Janani"},
            {task : 'Need to update Web Service',dueDate:'03/31/2022', isCompleted: false, assignedBy: "Surya"}
        ]
        //
    },
    {
        id: 3,
        handle: 'Janani',
        firstName: 'janu',
        lastName: 'ragupathy',
        password: 'janani',
        email: 'janani@gmail.com',
        picture: 'https://www.pngitem.com/pimgs/m/461-4610786_beautiful-girl-cartoon-png-clipart-png-download-beautiful.png',
        userTasks: [
            {task : 'Need to update jQuery',dueDate:'04/05/2022', isCompleted: false, assignedBy: "Kokila"},
            {task : 'Need to update Services',dueDate:'07/26/2022', isCompleted: false, assignedBy: "Surya"},
            {task : 'Need to update Python',dueDate:'03/22/2022', isCompleted: false, assignedBy: "Surya"},
            {task : 'Need to update ajax',dueDate:'03/25/2022', isCompleted: false, assignedBy: "Surya"}
        ]
    },
    {
        id: 4,
        handle: 'Kokila',
        firstName: 'koki',
        lastName: 'ragupathy',
        password: 'kokila',
        email: 'koki@gmail.com',
        picture: 'https://images.cdn1.stockunlimited.net/clipart/customer-service-executive_1562515.jpg',
        userTasks: [
            {task : 'Need to update Vue',dueDate:'20/05/2022', isCompleted: false, assignedBy: "kokila"},
            {task : 'Need to update ajax',dueDate:'03/25/2022', isCompleted: false, assignedBy: "Mishat"}
        ]
    },
    {
        id: 5,
        handle: 'Mishat',
        firstName: 'Mishat',
        lastName: 'Ken',
        password: 'mishat123',
        email: 'mishat@gmail.com',
        picture: 'https://images.cdn3.stockunlimited.net/clipart/call-center-executive_1617805.jpg',
        userTasks: [
            {task : 'Need to update Vue',dueDate:'04/09/2022', isCompleted: false, assignedBy: "Janani"},
            {task : 'Need to update ajax',dueDate:'06/25/2022', isCompleted: false, assignedBy: "Kokila"}
        ]
    }
]
