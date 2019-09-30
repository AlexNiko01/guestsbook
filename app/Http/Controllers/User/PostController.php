<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Post;
use Auth;

class PostController extends Controller
{

    /**
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $userId = Auth::user()->id;
        return PostResource::collection(Post::ofUser($userId)->paginate(3));
    }


    /**
     * Store a newly created resource in storage.
     * @param StorePostRequest $request
     * @return \App\Http\Resources\PostResource
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $post = new Post($validated);
        Auth::user()->posts()->save($post);

        return new PostResource($post);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  StorePostRequest $request
     * @param  Post $post
     * @return \App\Http\Resources\PostResource
     */
    public function update(StorePostRequest $request, Post $post)
    {
        $validated = $request->validated();
        $post->fill($validated)->save();
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     * @param Post $post
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }
}
