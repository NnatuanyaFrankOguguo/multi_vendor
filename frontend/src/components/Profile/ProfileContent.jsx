import React, { useState } from 'react'
import styles from '../../styles/styles'
import server from '../../server'
import { useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineTrackChanges } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { useRef } from 'react'

const ProfileContent = ({active}) => {
    const {user} = useSelector((state) => state.user)
    const [fname, setFname] = useState(user && user.fname)
    const [lname, setLname] = useState(user && user.lname)
    const [email, setEmail] = useState(user && user.email)
    const [number, setNumber] = useState(null)
    const [zipcode, setZipcode] = useState(null)
    const [address1, setAddress1] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [country, setCountry] = useState(null)

    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }


  return (
    <div className='w-full'>
        {/* profile content */}
        {
            active === 1 && (
                <>
                    <div className='flex justify-center w-full'>
                        <div className="relative">
                            <img src={user.googleId ? user.avatar : `${server}/images/${user.avatar}`} className="w-[125px] h-[100px] rounded-full object-cover border-[3px] border-[#3ad132]"  alt="profile" /> 
                            <div className=' absolute border w-[25px] h-[25px] bg-[#3ad132] rounded-full flex items-center justify-center cursor-pointer bottom-[5px] right-[5px]'>
                                <AiOutlineCamera />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='w-full px-5 flex flex-col  items-center'>
                        <form  onSubmit={handleSubmit} aria-required={true} >
                            <div className="w-full flex pb-3">
                                <div className="w-[50%]">
                                    <label className='block pb-2'>First Name</label>
                                    <input type="text" name="first-name" value={fname} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="w-[50%]">
                                    <label className='block pb-2'>Last Name</label>
                                    <input type="text" name="last-name" value={lname} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setLname(e.target.value)} />
                                </div>
                                
                            </div>

                            <div className="w-full flex pb-3"> 
                                <div className="w-[100%]">
                                    <label className='block pb-2'>Email Address</label>
                                    <input type="email" name="email" value={email} className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setEmail(e.target.value)} />
                                </div>  
                        
                    
                            </div>

                            <div className="w-full flex pb-3 "> 
                                <div className="w-[50%]">
                                    <label className='block pb-2'>Phone Number</label>
                                    <input type="tel" name="phone-number" value={number} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setNumber(e.target.value)} />
                                </div> 
                                <div className="w-[50%]">
                                    <label className='block pb-2'>Zip Code</label>
                                    <input type="number" name="zip-code" value={zipcode} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setZipcode(e.target.value)} />
                                </div>  
                        
                    
                            </div>

                            <div className="w-full flex pb-3"> 
                                <div className="w-[100%]">
                                    <label className='block pb-2'>Address</label>
                                    <input type="text" name="address1" value={address1} className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setAddress1(e.target.value)} />
                                </div> 
                            </div>

                            <div className="w-full flex pb-3"> 
                                <div className="w-[50%]">
                                    <label className='block pb-2'>City</label>
                                    <input type="text" name="city" value={city} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setCity(e.target.value)} />
                                </div> 
                                <div className="w-[50%]">
                                    <label className='block pb-2'>State</label>
                                    <input type="text" name="state" value={state} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setState(e.target.value)} />
                                </div>
                    
                            </div>
                            <input
                                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-3 cursor-pointer 
                                hover:bg-[#3a24db] hover:text-white transition-all duration-300`}
                                required
                                value="Update"
                                type="submit"
                            />
                            
                            
                        </form>
                        
                    </div>
                </>
            ) 
        }

        {/* order content */}
        {
            active === 2 && (
                <div>
                    <AllOrders />
                </div>
            )
        }

        {/* refund content */}
        {
            active === 3 && (
                <div>
                    <AllRefundOrders />
                </div>
            )
        }

        {/* Track ordercontent */}
        {
            active === 5 && (
                <div>
                    <TrackOrder />
                </div>
            )
        } 

        {/* Payment method content... you can save your payment method page so that you dont have to input it all over again when making transfer */}
        {
            active === 6 && (
                <div>
                    <PaymentMethod />
                </div>
            )
        }

        {/* Address content */}
        {
            active === 7 && (
                <div>
                    <Address />
                </div>
            )
        }
        {/* settings page */}
        {/* {
            active === 4 && (
                <div>
                    <h1>Settings</h1>
                </div>
            )
        } */}
    </div>
  )
}

const AllOrders = () => {
    // fetch orders from server and display them here
    const orders = [
        {
            _Id: 12222,
            orderItems: [
                {
                    productId: 1432227,
                    productName: 'Iphone 14 pro max',
                    quantity: 2,
                    price: 50
                },
                {
                    productId: 1432228,
                    productName: 'Samsung Galaxy S21',
                    quantity: 1,
                    price: 50
                }
            ],
            totalPrice: 150,
            date: '2022-01-01',
            orderStatus: 'Processing'
        }
            
    ];

    const columns = [
        { 
            field: "id", 
            headerName: "Order ID", 
            minWidth: 150, 
            flex: 0.7 
        },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.7,
            cellClassName: (params) =>
                {
                    const status = params.row.status;
                    return status === "Processing"
                        ? "bg-yellow-200 text-yellow-800"
                        : status === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800";
                }
            
        },
        {
            field: "itemsQty",
            headerName: "Items Quantity",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: " ",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }
    ]

    const rows = []

    orders && orders.forEach((order) => {
        rows.push({
            _id: order._Id, // Order ID (stored separately if needed)
            id: order._Id, // Used by the DataGrid for row identification
            itemsQty: order.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),  // Total quantity of items
            totalPrice: "₦" + order.totalPrice, // Prefix currency to the total price
            date: order.date,  // Order creation date
            status: order.orderStatus, // Order status (e.g., "Processing")
        })
    })


    return (
        <div className='pl-8 pt-1'>

            {
                rows.length === 0 ? (
                     // Render this message if no rows (orders) are available
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-700">
                        No orders available at the moment.
                    </p>
                </div>

                ) : (

                    <div className='w-full max-w-full overflow-x-auto' style={{ height: "400px" }}>
                        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick sx={{"@media (max-width: 768px)" : {
                            fontSize: "12px",
                            ".MuiDataGrid-cell, .MuiDataGrid-columnHeader" : {padding: "8px", },
                        },}} />
                    </div>
                )
            }
            
           
    
        </div>
    )
}
const AllRefundOrders = () => {
    // fetch orders from server and display them here
    //we will do have to filter the orders array to get only the refunded orders
    const orders = [
        {
            _Id: 12222,
            orderItems: [
                {
                    productId: 1432227,
                    productName: 'Iphone 14 pro max',
                    quantity: 2,
                    price: 50
                },
                {
                    productId: 1432228,
                    productName: 'Samsung Galaxy S21',
                    quantity: 1,
                    price: 50
                }
            ],
            totalPrice: 150,
            date: '2022-01-01',
            orderStatus: 'Processing'
        }
            
    ];

    const columns = [
        { 
            field: "id", 
            headerName: "Order ID", 
            minWidth: 150, 
            flex: 0.7 
        },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.7,
            cellClassName: (params) =>
                {
                    const status = params.row.status;
                    return status === "Processing"
                        ? "bg-yellow-200 text-yellow-800"
                        : status === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800";
                }
            
        },
        {
            field: "itemsQty",
            headerName: "Items Quantity",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: " ",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }
    ]

    const row = []

    orders && orders.forEach((order) => {
        row.push({
            _id: order._Id, // Order ID (stored separately if needed)
            id: order._Id, // Used by the DataGrid for row identification
            itemsQty: order.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),  // Total quantity of items
            totalPrice: "₦" + order.totalPrice, // Prefix currency to the total price
            date: order.date,  // Order creation date
            status: order.orderStatus, // Order status (e.g., "Processing")
        })
    })


    return (
        <div className='pl-8 pt-1'>

            {
                row.length === 0 ? (
                     // Render this message if no rows (orders) are available
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-700">
                        No orders available at the moment.
                    </p>
                </div>

                ) : (

                    <div className='w-full max-w-full overflow-x-auto' style={{ height: "400px" }}>
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick sx={{"@media (max-width: 768px)" : {
                            fontSize: "12px",
                            ".MuiDataGrid-cell, .MuiDataGrid-columnHeader" : {padding: "8px", },
                        },}} />
                    </div>
                )
            }
            
           
    
        </div>
    )
}

const TrackOrder = () => {
    // the track order button will be clicked and the order will be tracked to check where and where it has gotten to...
    const orders = [
        {
            _Id: 12222,
            orderItems: [
                {
                    productId: 1432227,
                    productName: 'Iphone 14 pro max',
                    quantity: 2,
                    price: 50
                },
                {
                    productId: 1432228,
                    productName: 'Samsung Galaxy S21',
                    quantity: 1,
                    price: 50
                }
            ],
            totalPrice: 150,
            date: '2022-01-01',
            orderStatus: 'Processing'
        }
            
    ];

    const columns = [
        { 
            field: "id", 
            headerName: "Order ID", 
            minWidth: 150, 
            flex: 0.7 
        },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.7,
            cellClassName: (params) =>
                {
                    const status = params.row.status;
                    return status === "Processing"
                        ? "bg-yellow-200 text-yellow-800"
                        : status === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800";
                }
            
        },
        {
            field: "itemsQty",
            headerName: "Items Quantity",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: " ",
            flex: 1,
            minWidth: 130,
            headerName: " ",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <MdOutlineTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }
    ]

    const row = []

    orders && orders.forEach((order) => {
        row.push({
            _id: order._Id, // Order ID (stored separately if needed)
            id: order._Id, // Used by the DataGrid for row identification
            itemsQty: order.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),  // Total quantity of items
            totalPrice: "₦" + order.totalPrice, // Prefix currency to the total price
            date: order.date,  // Order creation date
            status: order.orderStatus, // Order status (e.g., "Processing")
        })
    })

    return (
        <div className='pl-8 pt-1'>

            {
                row.length === 0 ? (
                     // Render this message if no rows (orders) are available
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-700">
                        No orders available at the moment.
                    </p>
                </div>

                ) : (

                    <div className='w-full max-w-full overflow-x-auto' style={{ height: "400px" }}>
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick sx={{"@media (max-width: 768px)" : {
                            fontSize: "12px",
                            ".MuiDataGrid-cell, .MuiDataGrid-columnHeader" : {padding: "8px", },
                        },}} />
                    </div>
                )
            }
            
           
    
        </div>
    )




}

const PaymentMethod = () => {
    // The payment method button will be clicked and the user will be redirected to the payment gateway...
    return (
        <div className="w-full px-5">
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                    Payment Method
                </h1>

                <div className={`${styles.button} flex items-center justify-center w-[100px] h-[40px] rounded-[5px] cursor-pointer`}>
                    <span className='text-[#fff]'>
                        Add New {/*  we will make a popup for the add new but it will be later */}
                    </span>
                </div>
            </div>
            <br/>
            <br/>
            {/*  Here we will show the payment methods (stored in a database) all these will be dynamic*/}
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                    <img src="https://cdn.freebiesupply.com/images/large/2x/mastercard-logo-png-transparent.png" alt="mastercard" className="w-[50px] " />

                    <h3 className='pl-5 font-[600]'>Nnatuanya Frank</h3>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>1234 **** **** ****</h6>

                    <h5 className='pl-6'> 08/2026 </h5>
                </div>

                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} color='#ff0000' className='cursor-pointer' />
                </div>

            </div>
        </div>
    )
}

const Address = () => {
    // I will also put the option to have their browser access their location
    return (
        <div className="w-full px-5">
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                    My Addresses
                </h1>

                <div className={`${styles.button} flex items-center justify-center w-[100px] h-[40px] rounded-[5px] cursor-pointer`}>
                    <span className='text-[#fff]'>
                        Add New {/*  we will make a popup for the add new but it will be later */}
                    </span>
                </div>
            </div>
            <br/>
            <br/>
            {/*  Here we will show the payment methods (stored in a database) all these will be dynamic*/}
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                    <h3 className='pl-5 font-[600]'>Default</h3>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>Lorem, ipsum dolor sit amet addkfrg (any address)</h6>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>(+234) 70 700 18654</h6>
                </div>

                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} color='#ff0000' className='cursor-pointer' />
                </div>

            </div>
        </div>
    )
}

export default ProfileContent