<?php

use App\Http\Controllers\TodoList\TodoListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('todo-lists', TodoListController::class);

Route::get('todo-lists/{todo_list}/delete', [TodoListController::class, 'delete'])->name('todo-lists.delete');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
