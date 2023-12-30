<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use App\Models\Voiture;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::all();
        return $locations;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validez les données de la requête
    $request->validate([
        'voiture_id' => 'required|exists:voitures,id',
        'client_id' => 'required|exists:clients,id',
        'date_debut' => 'required|date',
        'date_fin' => 'required|date|after_or_equal:date_debut',
    ]);

    // Créez une nouvelle location avec les données validées
    $location = new Location([
        'voiture_id' => $request->input('voiture_id'),
        'client_id' => $request->input('client_id'),
        'date_debut' => $request->input('date_debut'),
        'date_fin' => $request->input('date_fin'),
    ]);

    // Enregistrez la nouvelle location dans la base de données
    $location->save();

    // Mettez à jour l'état de la voiture pour la marquer comme "en_location"
    $voiture = Voiture::find($request->input('voiture_id'));
    $voiture->en_location = true;
    $voiture->save();

    // Retournez la réponse JSON avec la nouvelle location créée
    return response()->json($location, 201);
}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $location = Location::find($id);
        return response()->json($location);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $location = Location::find($id);
        $location->update($request->all());
        return response()->json($location, 200);
    }

    /**  
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $location = Location::find($id);
        $location->delete();
        return response()->json('location supprimée !');
    }
}
