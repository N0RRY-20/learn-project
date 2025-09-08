<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\DataHalaqah;
use App\Models\TeachersData;
use Inertia\Inertia;

class DataHalaqahController extends Controller
{
    public function index()
    {
        $halaqah = DataHalaqah::with('teacher.user')->get();

        return Inertia::render('admin/data/halaqah/index', compact('halaqah'));
    }

    public function create()
    {
        $teachers = TeachersData::whereHas('user.roles', function ($query) {
            $query->where('name', 'Guru Halaqah');
        })
            ->with(['user.roles']) // biar relasinya langsung ikut di-load
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('admin/data/halaqah/create', compact('teachers'));
    }

    public function store()
    {
        $attributes = request()->validate([
            'nama_halaqah' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers_data,id',
        ]);

        DataHalaqah::create($attributes);

        return to_route('datahalaqah.index')->with('success', 'Data Halaqah berhasil ditambahkan.');
    }

    public function edit(DataHalaqah $datahalaqah)
    {
        $teachers = TeachersData::whereHas('user.roles', function ($query) {
            $query->where('name', 'Guru Halaqah');
        })
            ->with(['user.roles']) // biar relasinya langsung ikut di-load
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('admin/data/halaqah/edit', compact('datahalaqah', 'teachers'));
    }

    public function update(DataHalaqah $datahalaqah)
    {
        $attributes = request()->validate([
            'nama_halaqah' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers_data,id',
        ]);

        $datahalaqah->update($attributes);

        return to_route('datahalaqah.index')->with('success', 'Data Halaqah berhasil diupdate.');
    }

    public function destroy(DataHalaqah $datahalaqah)
    {
        $datahalaqah->delete();

        return to_route('datahalaqah.index')->with('success', 'Data Halaqah berhasil dihapus.');
    }
}
