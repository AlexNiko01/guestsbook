<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('list', 'PostController@index');
Route::get('post/{id}', 'PostController@show');

Route::group([
    'namespace' => 'Auth',

], function ($router) {
    Route::post('signup', 'RegisterController@signup');
});

Route::post('login', 'AuthController@login');


Route::group([
    'middleware' => 'jwt.auth',
    'namespace' => 'User',

], function ($router) {
    Route::resource('user/posts', 'PostController');
});

Route::group([
    'middleware' => 'jwt.auth',
], function ($router) {
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});



