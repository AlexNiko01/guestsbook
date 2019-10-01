<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 50)->create()->each(function ($user) {
            /**
             * @var \App\User $user
             */
            $user->posts()->saveMany(factory(App\Post::class, 3)->make(['user_id' => $user->id]));

        });
    }
}
