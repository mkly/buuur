```
 ____   __ __  __ __  __ __  ____  
|    \ |  T  T|  T  T|  T  T|    \ 
|  o  )|  |  ||  |  ||  |  ||  D  )
|     T|  |  ||  |  ||  |  ||    / 
|  O  ||  :  ||  :  ||  :  ||    \ 
|     |l     |l     |l     ||  .  Y
l_____j \__,_j \__,_j \__,_jl__j\_j
                                   
```

A fairly trivial web app to send webcam gifs back and forth via websockets.

Possibly running at https://buuur.fly.dev

### Fly.io
```bash
fly launch
fly deploy
```

### Development
See the `package.json` file for `npm` tasks
Some highlights:

* `npm install`
* `npm run build` builds from source
* `num run watch` sets webpack to watch for changes
* `npm run serve` runs local server on port 3000
* `npm run test-e2e` runs browser end to end tests
