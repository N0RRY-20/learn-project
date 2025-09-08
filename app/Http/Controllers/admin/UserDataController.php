<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserDataController extends Controller
{
    public function index()
    {
        $usersData = User::with('roles')->orderBy('id', 'asc')->get();

        return Inertia::render('admin/data/users/index', compact('usersData'));
    }

    public function create()
    {
        return Inertia::render('admin/data/users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', Rule::in(['Guru Halaqah', 'Guru Mapel', 'Admin', 'Walimurid'])],
        ]);
        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
            $user->roles()->sync(
                Role::whereIn('name', $validated['roles'])->pluck('id')
            );
        });

        return redirect()->route('usersData')->with('success', 'User berhasil ditambahkan');
    }

    public function edit(User $user)
    {
        $user->load('roles');

        return Inertia::render('admin/data/users/edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:6',
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', Rule::in(['Guru Halaqah', 'Guru Mapel', 'Admin', 'Walimurid'])],
        ]);
        DB::transaction(function () use ($validated, $user) {
            $user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
            ]);
            $user->roles()->sync(
                Role::whereIn('name', $validated['roles'])->pluck('id')
            );
        });

        return redirect()->route('usersData')->with('success', 'User berhasil diupdate');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('usersData')->with('success', 'User berhasil dihapus');
    }
}
