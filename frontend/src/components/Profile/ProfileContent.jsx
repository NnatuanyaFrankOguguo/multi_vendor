import React, { useState } from 'react'
import server from '../../server'
import { useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'

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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }


  return (
    <div className='w-full'>
        {/* profile Page */}
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

        {/* order page */}
        {
            active === 2 && (
                <div>
                    <AllOrders />
                </div>
            )
        }

        {/* wishlist page */}
        {
            active === 3 && (
                <div>
                    <h1>Wishlist</h1>
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
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

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
                        : status === "Shipped"
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
            _id: order._Id,
            id: order._Id,
            
            itemsQty: order.orderItems.reduce((acc, curr) => acc + curr.quantity, 0),
            totalPrice: "₦" + order.totalPrice,
            date: order.date,
            status: order.orderStatus,
        })
    })


    return (
        <div className='pl-8 pt-1'>
            
            <div style={{ height: "400px" }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick />
            </div>
    
        </div>
    )
}

export default ProfileContent