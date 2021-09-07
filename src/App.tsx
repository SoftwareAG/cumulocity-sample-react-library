import { FetchClient, IManagedObject, InventoryService } from "@c8y/client";
import React, { useState } from "react";
import { useQuery } from "react-query";

// fetchClient input is received as an input from index.tsx
type Props = {
    fetchClient: FetchClient;
    id: string;
  }

  export type DeviceItem = {
    id:string;
    creationTime: string;
    lastUpdated:string;
    name: string;
  }

 
  const App: React.FC<Props> = ({fetchClient, id}) => {
    // 'name' variable is used to store the updated value of name.
  // setName sets the updated value to the variable 'name'
    const [name, setName] = useState('');
    function handleChange(e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; })  {
      e.preventDefault();
      setName(e.target.value);
    };

    // create an instance of inventory service
    const inventory = new InventoryService(fetchClient);

    // Fetch device details with device id as an input.
    // Refetch the details, once updated
    const getDeviceDetails = async (): Promise<DeviceItem> => 
    ((await inventory.detail(id)).data) as any;
    const {data, refetch} = useQuery<DeviceItem>('devices', getDeviceDetails);

    // update the name of the device
    const updateDeviceDetails = async (name: any) => {

      const partialUpdateObject: Partial<IManagedObject> = {
        id: id,
        name: name,
      };

      inventory.update(partialUpdateObject).then((result) =>{
        if(result.res.status == 200) {
          refetch();
        }
      })
    } 
  return (
      <div>
      <div>This is a demo widget which fetches the device details</div>
      <div>Device Id {data?.id}</div>
      <div>Name {data?.name}</div>
      <div> Last Updated {data?.lastUpdated}</div>
      <div>Creation Time {data?.creationTime}</div>
      <input onChange={handleChange} type="text" placeholder="Enter device name"></input>
      <button  onClick={() => updateDeviceDetails(name)}>Update Device</button>
       <div>Updated device name : {name}</div>
      </div>

  );
}

export default App;