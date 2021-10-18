# Demo widget using React

## A sample react library which fetches and displays the device details based on the device id.
## It also updates the device name by taking an input from the user.

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
	  
5.  In tsconfig file, we will enable: declaration, declarationMap, sourceMap ,outDir: "lib".

	```  
	declaration:To publish build version of our project
	declarationMap:To navigate from d.ts file to ts file
	sourceMap:To observe our ts file from js file.
	outDir:To generate our output declaration,declarationMap,sourceMap file in lib folder.
	```

 6. Since we are using typescript, we will add  "types" in package.json that will point to "lib" folder.
````
```  "name": "react-library",
     "version": "1.0.0",
     "description": "A react library which fetches the device details of a particular device id. It also updates the device name by taking an input from the user.",
	 "main": "index.js",
     "types": "lib",```
````

7. Since we have to use react so we install react and types as dev dependency.
 ```npm i react @types/react -D```
 
  "devDependencies": {
              "@types/react": "^17.0.30",
              react": "^17.0.2",
              "typescript": "^4.4.4"
              } 

  **NOTE:** *We install react as dev dependency because we do not want to fix a particular version of react for consumer of our package.*

 8. Add the following as peer dependencies.
 ````
 ``` "peerDependencies": {
"react": ">=17.0.2"
} ```
````
**NOTE:** *We add a peer dependency so that when we install a package, npm know that it has to install some version of react which is >= 17.. or so.*

  9. To enable react support within typescript, we need to enable jsx and point it to react in tsconfig.json.
 ```
 "compilerOptions": {
					"jsx": "react"
					}
```

10. Create **src/index.tsx** file as entry point for our library.(*tsx allows us to use jsx*). 

 11. All our input typescript code will be located in **src** folder.

 12. In order to use Cumulocity Inventory Service, we need to install c8y/client in our library project.
```
npm i @c8y/client
```
You will see the following entry in package.json file.
```
"dependencies": {
"@c8y/client": "^1009.0.19"
}
```
 13. Provide id and fetchClient object as an input to react library.
Add the below block of code in index.tsx file and do the necessary import.
import { FetchClient } from  "@c8y/client";
```
 type  Props = {
fetchClient:FetchClient;
id: string;
}
```
11. In order to use react query in our library, we need Query Client.
		```
		npm i react-query
		```
	Add the following code in index.tsx file
	```
	import { QueryClient } from  "react-query";
	const  client = new  QueryClient();
    ```
12. Create a functional Component 'src/App.tsx' . App.tsx will receive fetchClient and device id as input. Therefore create props for the same.

```import { FetchClient } from  "@c8y/client";
import  React from  "react";
 type  Props = {
fetchClient:FetchClient;
id: string;
}


const  App: React.FC<Props> = ({fetchClient, id}) => {
return(
<div>
<div>This is a demo widget which fetches the device details </div>
</div>
);
}
export  default  App; 
```

13. In index.tsx, Create a functional component and pass fetchClient and device id as an input.
These inputs will inturn be passed as inputs to our App functional component.
 
 ```
 const  client = new  QueryClient();
 export  const  FetchDeviceDetails : React.FC<Props> = ({fetchClient, id}) =>{
return (
<QueryClientProvider  client={client}>
<App  fetchClient={fetchClient}  id={id}  ></App>
</QueryClientProvider>
)
}
```
**NOTE: ** Wrap the App component inside QueryClientProvider to enable it to use Query Client.

14. In App.tsx file, create an interface of Device Item to map the device details.
```
export  type  DeviceItem = {
id:string;
creationTime: string;
lastUpdated:string;
name: string;
}
```

15. In tsconfig.ts file, add the following
```
"compilerOptions": {
"target": "ES2015",
}
```

16. In App.tsx, add the following methods to get and update device details. 

```
const  inventory = new  InventoryService(fetchClient);
```


Get Device Details
```const  getDeviceDetails = async (): Promise<DeviceItem> =>
((await  inventory.detail(id)).data) as  any;
const {data, refetch} = useQuery<DeviceItem>('devices', getDeviceDetails);
```

Update Device name
```const  updateDeviceDetails = async (name: any) => {
const  partialUpdateObject: Partial<IManagedObject> = {
id:  id,
name:  name,
};
inventory.update(partialUpdateObject).then((result) =>{
if(result.res.status == 200) {
refetch();
}
})
}
```
17.  Add your development code.

 18. In order to publish the package to npm, we need to setup package.json. In package.json, "main": will contain entry point which in our case will be "lib/index.js".
Once your library is ready, add the build command in scripts(in package.json file)  to run the typescript compiler against the src folder.
```
{
"main": "lib/index.js",
"scripts": {
"build": "tsc -p ."
}
}
```
Run the command
 ```
 npm run build
 ```
 
 18.  All the generated assets will be put into lib folder.
 19. Login to npm. Then run the command npm publish.
 20. We publish the package and use it from another application.
