import React from 'react'
import { useState } from 'react'
import { UseAuthContext } from '../hooks/UseAuthContext';
import LostandFoundNav from '../components/LostandFoundNav';
import LostAndFoundPage from './LostAndFoundPage';
import AllFoundItem from './AllFoundItem';
import AllLostItem from './AllLostItem';

const AllItemPost = () => {
    const [selectedItemLink, setSelectedItemLink] = useState('/LFpage');
    const {user} = UseAuthContext();

  return (
    <>
        <div className="bg-light">
            {user && (
                <div className="container">
                <div className="row flex-column flex-lg-row">
                    <div className="col-12 col-md-3 col-lg-2 border overflow-hidden py-1 p-0 d-none d-xl-block ">
                       <LostandFoundNav selectedItemLink={selectedItemLink} setSelectedItemLink={setSelectedItemLink}/>
                    </div>
                    <div className="col border p-0 vh-100">
                        {selectedItemLink === "/LFpage" && (
                            <div><LostAndFoundPage/></div>       
                        )}
                        {selectedItemLink === "/allFoundItem" && (
                            <div><AllFoundItem/></div>
                        )} 
                         {selectedItemLink === "/allLostItem" && (
                            <div><AllLostItem/></div>
                        )} 
                    </div>
                </div>
            </div>
            )}
        </div>
    </>
  )
}

export default AllItemPost