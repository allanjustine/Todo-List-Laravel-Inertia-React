import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, useForm, usePage } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { LoaderCircle, Save } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

interface TodoForm {
    task: string;
    description: string;
    due_date: string;
    status: 'pending' | 'completed' | 'cancelled';
}

export default function EditTodo() {
    const { todoList }: any = usePage().props;
    const { processing, patch, errors, data, setData, reset } = useForm<Required<TodoForm>>({
        task: '',
        description: '',
        due_date: '',
        status: 'pending',
    });

    useEffect(() => {
        if (!todoList) return;

        setData((data) => ({
            ...data,
            task: todoList.task,
            description: todoList.description,
            due_date: formatDate(todoList.due_date, "yyyy-MM-dd'T'HH:mm"),
            status: todoList.status,
        }));
    }, [todoList]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('todo-lists.update', todoList.id), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleChange = (title: string) => (e: any) => {
        const { value } = e.target;

        setData((data) => ({
            ...data,
            [title]: value,
        }));
    };

    const handleSelectChange = (e: string) => {
        setData((data: any) => ({
            ...data,
            status: e,
        }));
    };

    return (
        <>
            <Head title="Edit Task" />
            <div className="grid h-screen place-content-center">
                <div className="w-lg rounded border border-gray-500 p-5">
                    <h1 className="text-center text-2xl font-bold">Edit Task</h1>
                    <form className="space-y-2" onSubmit={submit}>
                        <div>
                            <Label htmlFor="task">Task</Label>
                            <Input type="text" id="task" value={data.task} onChange={handleChange('task')} />
                            <InputError message={errors.task} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" id="description" value={data.description} onChange={handleChange('description')} />
                            <InputError message={errors.description} />
                        </div>
                        <div>
                            <Label htmlFor="due_date">Due date</Label>
                            <Input type="datetime-local" id="due_date" value={data.due_date} onChange={handleChange('due_date')} />
                            <InputError message={errors.due_date} />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select onValueChange={handleSelectChange} value={data.status}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="flex w-full items-center gap-1 bg-blue-500 hover:bg-blue-600"
                            variant="outline"
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="animate-spin" /> <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Save /> <span>Submit</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
