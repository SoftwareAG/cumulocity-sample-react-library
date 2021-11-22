import { FetchClient, IManagedObject, InventoryService } from "@c8y/client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Wrapper } from "./App.styles";
import Moment from 'moment';

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
    if(data !== undefined) {
      data.creationTime = Moment(new Date(data.creationTime)).format('DD MMMM YYYY HH:mm');
      data.lastUpdated = Moment(new Date(data.lastUpdated)).format('DD MMMM YYYY HH:mm');
      }

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
    <Wrapper>
    <div>
    <div className='heading'>Demo widget which fetches the device details</div>
      <div>
      <span className="key">Device Id: </span>
      <span>{data?.id}</span>
    </div>
    <div>
      <span className="key">Name: </span>
      <span>{data?.name}</span>
    </div>
    <div> 
      <span className="key">Last Updated: </span>
      <span>{data?.lastUpdated}</span>
    </div>
    <div>
      <span className="key">Creation Time: </span>
      <span>{data?.creationTime}</span>
    </div>
    <input className='inputBox' onChange={handleChange} type="text" placeholder="Enter device name"></input>
    <button className="updateButton"  onClick={() => updateDeviceDetails(name)}>Update Device</button>
     <div>
      <span className='key'>Updated device name : </span>
      <span>{name}</span></div>
    </div>
    </Wrapper>

  );
}

export default App;