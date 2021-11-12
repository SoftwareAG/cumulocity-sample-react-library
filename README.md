
#  React Demo Widget

 The react demo widget is a sample library created using ReactJS. It  fetches the Inventory data  by taking the device id as an input and displays the same in a widget. It also updates the device name by taking an input from the user.
 This widget library can be used in react and angular applications.

#### Build Instructions
1. **If you want to use the react widget library in a react app, follow the instructions here**
### Create a react app

#####   Steps to follow
1.  Create a folder with the name of your choice. eg. react-app
2. Navigate inside the folder and run the below command.
```
 npx create-react-app sample-app --template typescript
 ```
 
 3.  In order to use Cumulocity Inventory Service, we need to install c8y/client in our react project.
  ```
npm i @c8y/client@1009.0.19
```
4. Install your react library package into your react app project.
```
npm i sample-react-library1
``` 
5. Replace the code in App.tsx file with the below block of code.
```
import { BasicAuth, Client } from  "@c8y/client";
import { FetchDeviceDetails } from  "sample-react-library1/lib";

 
function  App() {
const  auth = new  BasicAuth({
user:  'username',
password:  'password',
tenant:  'tenantId'
});

const  client = new  Client(auth, 'tenantUrl');
client.setAuth(auth);
const  fetchClient = client.core;

return (
<div>
<div>This is a react app. Below is the react library widget</div>
<div>..................................................................................</div>
<FetchDeviceDetails  fetchClient = {fetchClient}  id={'deviceId'}></FetchDeviceDetails>
<div>.....................................................................................</div>
</div>
);
}
 
export  default  App;
```
 **NOTE:** The fetchClient and device id will be passed as an input from react app into the react library as below:
  *<FetchDeviceDetails  fetchClient = {fetchClient}  id={'deviceId'}>	</FetchDeviceDetails>
  *
  
6. Run the command
```
 npm run start 
 ```

2. **If you want to extend/modify this widget library and use it in your application, follow the below steps.**

### Create a react library
 
 **Requirements:**

 - Git
 -  NodeJS (release builds are currently built with  `v14.15.0`)
 - NPM(Included with NodeJS)

**Instructions**

 1. Clone the repository:

``` git clone https://github.com/SoftwareAG/cumulocity-sample-react-library.git```

2. Change directory:

```cd  cumulocity-sample-react-library ```

3. Install the dependencies:

``` npm install ```

4. Modify the code according to your use case.
5. Run the command.
```
npm run build (tsc -p . && copy package.json lib && cd ./lib && npm pack)
```
A zip file will be created.
what to do with the zip file?
And use it in react app created in step 1.

3. **If you want to create the custom react library from scratch, follow the below steps.**

### Create Custom React Library

#### Execute below commands to setup New React Library Project for widget developement. 

 1. Create a folder with any name of your choice.
 
    ```(example: react-library)```

 2. Navigate inside the folder and initialise a new package.json with default options.   

    ```npm init -y```

 3. As we have to use typescript, react and types in react component, we will install them as a dev dependencies.

     ``` npm i typescript -D```
     ```npm i react @types/react -D```
     
   You will see the following entries in package.json file.    
   
"devDependencies": {
              "@types/react": "^17.0.30",
                react": "^17.0.2",
              "typescript": "^4.4.4"
              } 
              
  **NOTE:** *We install react, typescript and types as dev dependency because we do not want to fix a particular version of them for consumer of our package.*

 4. Install typescript compiler to initialise a new tsconfig file.

	  ```npx tsc --init```
	  
5.  In tsconfig file, we will enable: declaration, declarationMap, sourceMap ,outDir: "lib" and jsx: "react".

 "compilerOptions": {
					"jsx": "react",
					"target": "ES2015",
					}
					
	```  
	declaration:To publish build version of our project
	declarationMap:To navigate from d.ts file to ts file
	sourceMap:To observe our ts file from js file.
	outDir:To generate our output declaration,declarationMap,sourceMap file in lib folder.
	jsx: point it to react to enable react support within typescript
	```

 6. Since we are using typescript, we will add  "types" in package.json that will point to "lib" folder.
````
```  "name": "react-library",
     "version": "1.0.0",
     "description": "A react library which fetches the device details of a particular device id. It also updates the device name by taking an input from the user.",
	 "main": "index.js",
     "types": "lib",```
````

 
 8. Add the following as peer dependencies.
 ````
 ``` "peerDependencies": {
"react": ">=17.0.2"
} ```
````
**NOTE:** *We add a peer dependency so that when we install a package, npm know that it has to install some version of react which is >= 17.. or so.* 

10. Create **src/index.tsx** file as entry point for our library.(*tsx allows us to use jsx*).
All our input typescript code will be located in **src** folder. 

 12. In order to use Cumulocity Inventory Service, we need to install c8y/client in our library project.
```
npm i @c8y/client
```

In order to use react query in our library, we need Query Client.
```
npm i react-query
```

You will see the following entry in package.json file.
```
"dependencies": {
"@c8y/client": "^1009.0.19",
"react-query": "^3.21.1"
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
"build": "tsc -p . && copy package.json lib && cd ./lib && npm pack"
}
}
```
Run the command
 ```
 npm run build
 ```
 
 18.  All the generated assets will be put into lib folder and a .tgz file will be created.
 19. Login to npm. Then run the command npm publish.
 20. We publish the package and use it from another application.
