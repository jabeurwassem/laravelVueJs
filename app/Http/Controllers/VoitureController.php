<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       //get
        $voitures = Voiture::all();
        return $voitures;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $voiture = new Voiture([

            'image' => $request->input('image'),
            'matricule' => $request->input('matricule'),
            'marque' => $request->input('marque'),
            'modele' => $request->input('modele'),
            'annee' => $request->input('annee'),
            'prix_journalier' => $request->input('prix_journalier')
            ]);
            $voiture->save();
            return response()->json($voiture, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $voiture = Voiture::find($id);
        return response()->json($voiture);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $voiture = Voiture::find($id);
        $voiture->update($request->all());
        return response()->json($voiture, 200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        $voiture = Voiture::find($id);
        $voiture->delete();
        return response()->json('Voiture supprimée !');
    }
}












   






