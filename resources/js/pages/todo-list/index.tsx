import TodoLists from '@/components/todo-lists';
import { Toaster } from '@/components/ui/sonner';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Index() {
    const { flash, todoLists } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
        if (flash.error) {
            toast(flash.error);
        }
    }, [flash]);

    return (
        <div className="p-10">
            <div className="flex justify-between">
                <h1 className="text-lg">Todo Lists</h1>
                <Link href={route('todo-lists.create')} className="flex items-center gap-1 rounded bg-blue-500 px-2 py-1 text-sm hover:bg-blue-600">
                    <Plus className="h-5 w-5" /> <span>Add New Task</span>
                </Link>
            </div>
            <Table>
                <TableCaption>A list of your recent todo lists.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todoLists.length > 1 ? (
                        todoLists.map((todoList, index) => <TodoLists key={index} todoList={todoList} />)
                    ) : (
                        <TableRow>
                            <TableCell className="py-5 text-center" colSpan={7}>
                                No task added yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Toaster />
        </div>
    );
}
