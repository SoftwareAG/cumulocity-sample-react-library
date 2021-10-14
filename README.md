# Demo widget using React

## A sample react library which fetches the device details based on the device id and displays it. It also updates the device name by taking an input from the user.

## Create React Library

### Execute below commands to setup New React Library Project for widget developement. 

 1. Create a folder with any name of your choice.
 
    ```(example: react-library)```

 2. Navigate inside the folder and initialise a new package.json with default options.   

    ```npm init -y```

 3. As we have to use typescript in react component, we will install typescript as a dev dependency.

     ``` npm i typescript -D```

 4. Install typescript compiler to initialise a new tsconfig file.

	  ```npx tsc --init```
	  
 5. In tsconfig file, we will enable: declarations, declarationsMap, sourceMap , outDir: "lib".

	``` declarations:To publish build version of our project
	declarationsMap:To navigate from d.ts file to ts file
	sourceMap:To observe our ts file from js file.
	outDir:To generate our output declarations,declarationsMap,sourceMap file in lib folder.```

 6. Since we are using typescript, we will add  "types" in package.json that will point to "lib" folder.
````
```{
"types":"lib"
}```
````
7. Since we have to use react so we install react and types as dev dependency.
 ```npm i react @types/react -D```
  **NOTE:** *We install react as dev dependency because we do not want to fix a particular version of react for consumer of our package.*
  8. To enable react support within typescript, we need to enable jsx and point it to react in tsconfig.json.

 
 "compilerOptions": {
					"jsx": "react"
					}
 9. Add the following as peer dependencies.
 ````
 ``` "peerDependencies": {
"react": ">=17.0.2"
} ```
````
**NOTE:** *We add a peer dependency so that when we install a package, npm know that it has to install some version of react which is >= 17.. or so.*

10. Create src/index.tsx file as entry point for our library.(*tsx allows us to use jsx*). 
 11. All our input typescript code will be located in **src** folder.
 12. 
 


 13. In order to publish our package to npm, we need to setup package.json. In package.json, "main": will contain entry point which in our case will be "lib/index.js".
 14. Add a build command in scripts: to run the typescript compiler against the src folder.
 15.  All the generated assets will be put into lib folder.
 16. Login to npm. Then run the command npm publish.
 21. We rebuild our package which generated js and map files in lib folder.
 22. We publish the package and use it from another application.
  
