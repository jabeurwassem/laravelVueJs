<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
    public function getAvailableCars(Request $request)
{
    try {
        // Validez les paramètres de la requête (startDate et endDate)
        $request->validate([
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
        ]);

        // Récupérez les voitures disponibles en fonction des dates spécifiées
        $availableCars = DB::table('voitures')
            ->where('en_location', false) // Uniquement les voitures qui ne sont pas en location
            ->whereNotExists(function ($query) use ($request) {
                $query->select(DB::raw(1))
                    ->from('locations')
                    ->where('voitures.id', '=', 'locations.voiture_id')
                    ->where(function ($query) use ($request) {
                        $query->where('locations.date_fin', '>=', $request->input('startDate'))
                            ->where('locations.date_debut', '<=', $request->input('endDate'));
                    });
            })
            ->select('voitures.*')
            ->get();

        return response()->json($availableCars, 200);
    } catch (\Exception $e) {
        // Loggez l'erreur pour le débogage
    

        // Retournez une réponse avec un statut d'erreur
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}
}












   






