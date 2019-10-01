<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Post;

class PostController extends Controller
{

    /**
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PostResource::collection(Post::paginate(10));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return PostResource
     */
    public function show(int $id)
    {
        return new PostResource(Post::findOrFail($id));
    }
}
