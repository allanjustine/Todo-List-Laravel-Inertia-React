<?php

namespace App\Http\Controllers\TodoList;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoList\TodoListRequest;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todoLists = TodoList::all();

        return Inertia::render('todo-list/index', [
            'todoLists' => $todoLists
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('todo-list/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoListRequest $request)
    {
        $data = $request->validated();

        TodoList::create($data);

        return to_route('todo-lists.index')->with('success', 'Todo List created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $todoList = TodoList::findOrFail($id);

        return Inertia::render('todo-list/edit', [
            'todoList' => $todoList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TodoListRequest $request, TodoList $todoList)
    {
        $data = $request->validated();

        $todoList->update($data);

        return to_route('todo-lists.index')->with('success', 'Todo List updated successfully');
    }

    public function delete(TodoList $todoList)
    {
        return Inertia::render('todo-list/delete', [
            'todoList' => $todoList,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoList $todoList)
    {
        $todoList->delete();

        return to_route('todo-lists.index')->with('success', 'Todo List deleted successfully');
    }
}
