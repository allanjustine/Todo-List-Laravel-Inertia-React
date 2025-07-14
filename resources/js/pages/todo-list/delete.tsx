import { Button } from '@/components/ui/button';
import { dueDate } from '@/utils/dueDate';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function DeleteTodo() {
    const { todoList }: any = usePage().props;
    const { processing, delete: deleteData } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        deleteData(route('todo-lists.destroy', todoList.id));
    };

    return (
        <div>
            <div className="flex h-screen items-center justify-center">
                <div className="w-md max-w-lg space-y-3 rounded border border-red-400 bg-red-100 p-5 text-red-700 shadow-lg">
                    <div className="flex flex-col rounded px-4 py-3 text-center">
                        <strong className="text-xl font-bold">Delete Task</strong>
                        <span className="block sm:inline">Are you sure you want to delete this task?</span>
                        <span>{`This task is ${dueDate(todoList.due_date)} and the status of this task is ${todoList.status}.`}</span>
                    </div>
                    <form onSubmit={submit}>
                        <div className="flex items-center gap-1">
                            <Button type="submit" disabled={processing} className="w-full rounded bg-red-500 p-2 text-sm text-white hover:bg-red-600">
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Deleting...
                                    </>
                                ) : (
                                    <>
                                        <i className="far fa-trash" /> Yes, Delete
                                    </>
                                )}
                            </Button>
                            <Link
                                href={route('todo-lists.index')}
                                className="w-full rounded bg-gray-500 p-2 text-center text-sm text-white hover:bg-gray-600"
                            >
                                <i className="far fa-close" /> Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
