import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { deleteEvent, getAllEvents } from '../../redux/actions/event';

const AllEvents = () => {
    //so basically this component will display all products from the state.products(redux). If you want to filter products based on category, you can add a filter component or hook here.
    //we are not using API call cause we are displaying our products in the store profile and here also so in order to not query the database multiple times
    //you can fetch data from the database once and store it in the store state.
    const {events, isLoading} = useSelector((state) => state.event);
    const {store} = useSelector((state) => state.store);
    const dispatch = useDispatch();

   

    useEffect(() => {
        dispatch( getAllEvents(store._id));
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteEvent(id));
        window.location.reload(); //to refresh the page after deleting a product
    }

    const columns = [
        {field : "id", headerName : "Event Id", minWidth: 150, flex: 0.7},
        {field : "name", headerName : "Name", minWidth: 150, flex: 0.7},
        {field : "price", headerName : "Price", minWidth: 100, flex: 0.7},
        {field : "category", headerName : "Category", minWidth: 150, flex: 0.7},
        {field : "stock", headerName : "Stock", minWidth: 80, flex: 0.5},
        {field : "sold", headerName : "Sold out", minWidth: 80, flex: 0.5},
        {field : "", headerName : "Preview", minWidth: 80, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
            const d = params.row.name
            const product_name = d.replace(/\s+/g, '-'); //to remove the spaces on the initial name so each word will be able to come up in the search
            return (
                <>
                    <Link to={`/product/${product_name}`}>
                        <Button>
                            <AiOutlineEye size={20} />
                        </Button>
                    </Link>
                </>) 
            }
        },//add more columns as per your requirement,
        {field : "Delete", headerName : " ", minWidth: 120, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        
            return (
                <>
                
                    <Button onClick={() => handleDelete(params.id)}>
                        <AiOutlineDelete size={20} />
                    </Button>
                
                </>) 
            }
        }
    ]

    const rows = [ ];
    console.log(events);
    events && events.forEach((event) => {
        rows.push({
            id: event._id,
            name: event.name,
            price: "₦" + event.originalPrice,
            //discountPrice: `₦${event.discountPrice} - ${event.discountPercentage}%`,
            category: event.category,
            stock: event.stock,
            sold: event.soldOut,
        })
    })

    

  return (
    <>
        {
            isLoading ? <Loader /> : (
                  <div style={{ height: 400, width: '100%' }} >
                    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick />
                  </div>
                
            )
        }
    </>
  )
}

export default AllEvents