<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('slider.index');
});

Route::get('/g', function () {
    return view('gsap.index');
});

Route::get('/t', function () {
    return view('time.index');
});
