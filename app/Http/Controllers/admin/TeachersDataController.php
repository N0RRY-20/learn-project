<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\TeachersData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TeachersDataController extends Controller
{
    public function index()
    {
        $teachers = TeachersData::with('user.roles')->orderBy('id', 'asc')->get();

        return Inertia::render('admin/data/teachers/index', compact('teachers'));
    }

    public function create()
    {
        return Inertia::render('admin/data/teachers/create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',

            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', Rule::in(['Guru Halaqah', 'Guru Mapel', 'Admin', 'Walimurid'])],
            'jenis_kelamin' => ['required', Rule::in(['Laki-Laki', 'Perempuan'])],

            'alamat' => 'required|string|max:500',
            'birth_date' => 'required|date',
            'tempat_kelahiran' => 'required|string|max:255',
            'no_hp' => [
                'nullable',
                'string',
                'regex:/^(?:\(\+62\)|\+62|0)?[0-9\s\-]{8,16}$/',
            ],

        ]);

        DB::transaction(function () use ($validatedData) {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);
            $user->teacherData()->create([
                'jenis_kelamin' => $validatedData['jenis_kelamin'],

                'alamat' => $validatedData['alamat'],
                'birth_date' => $validatedData['birth_date'],
                'tempat_kelahiran' => $validatedData['tempat_kelahiran'],

                'no_hp' => $validatedData['no_hp'],
            ]);
            $user->roles()->sync(
                Role::whereIn('name', $validatedData['roles'])->pluck('id')
            );
        });

        return redirect()->route('teachersData')->with('success', 'data berhasil ditambahkan');
    }

    public function edit(TeachersData $teachersData)
    {
        $teachersData->load('user.roles');

        return Inertia::render('admin/data/teachers/edit', compact('teachersData'));
    }

    public function update(Request $request, TeachersData $teachersData)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $teachersData->user->id,
            'password' => 'nullable|string|min:6',

            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', Rule::in(['Guru Halaqah', 'Guru Mapel', 'Admin', 'Walimurid'])],
            'jenis_kelamin' => ['required', Rule::in(['Laki-Laki', 'Perempuan'])],

            'alamat' => 'required|string|max:500',
            'birth_date' => 'required|date',
            'tempat_kelahiran' => 'required|string|max:255',
            'no_hp' => [
                'nullable',
                'string',
                'regex:/^(?:\(\+62\)|\+62|0)?[0-9\s\-]{8,16}$/',
            ],

        ]);

        DB::transaction(function () use ($validatedData, $teachersData) {
            $teachersData->user->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'] ? Hash::make($validatedData['password']) : $teachersData->user->password,
            ]);
            $teachersData->update([
                'jenis_kelamin' => $validatedData['jenis_kelamin'],

                'alamat' => $validatedData['alamat'],
                'birth_date' => $validatedData['birth_date'],
                'tempat_kelahiran' => $validatedData['tempat_kelahiran'],

                'no_hp' => $validatedData['no_hp'],
            ]);
            $teachersData->user->roles()->sync(
                Role::whereIn('name', $validatedData['roles'])->pluck('id')
            );
        });

        return redirect()->route('teachersData')->with('success', 'data berhasil diupdate');
    }

    public function destroy(TeachersData $teachersData)
    {
        $teachersData->delete();
    }
}
