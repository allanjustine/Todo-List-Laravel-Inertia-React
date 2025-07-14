import { dueDate } from '@/utils/dueDate';
import { Link } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { Pen, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from './ui/table';

interface TodoList {
    todoList: {
        id: number;
        task: string;
        description: string;
        status: string;
        due_date: string;
        created_at: string;
    };
}
export default function TodoLists({ todoList }: TodoList) {
    const status = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200 text-yellow-800';
            case 'completed':
                return 'bg-blue-200 text-blue-800';
            case 'cancelled':
                return 'bg-red-200 text-red-800';
            default:
                return 'bg-indigo-200 text-indigo-800';
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{todoList.id}</TableCell>
            <TableCell>{todoList.task}</TableCell>
            <TableCell>{todoList.description}</TableCell>
            <TableCell>{dueDate(todoList.due_date)}</TableCell>
            <TableCell>
                <span className={`rounded-4xl px-1 py-0.5 text-[9px] font-bold uppercase ${status(todoList.status)}`}>{todoList.status}</span>
            </TableCell>
            <TableCell>{formatDate(todoList.created_at, 'yyyy-MM-dd')}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Link
                        href={route('todo-lists.edit', todoList.id)}
                        className="flex items-center gap-1 rounded px-2 py-1 text-sm text-blue-500 hover:text-blue-600"
                    >
                        <Pen className="h-4 w-4" />
                    </Link>
                    <Link
                        href={route('todo-lists.delete', todoList.id)}
                        className="flex items-center gap-1 rounded px-2 py-1 text-sm text-red-500 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Link>
                </div>
            </TableCell>
        </TableRow>
    );
}
