import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '../../redux/actions/product';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import Select from 'react-select';
import axios from 'axios';
import server from '../../server';
import { toast } from 'react-toastify';

const AllCoupons = () => {
    //so basically this component will display all products from the state.products(redux). If you want to filter products based on category, you can add a filter component or hook here.
    //we are not using API call cause we are displaying our products in the store profile and here also so in order to not query the database multiple times
    //you can fetch data from the database once and store it in the store state.
    const [open, setOpen] = useState(false);
    const {store} = useSelector((state) => state.store);
    const {products, isLoading} = useSelector((state) => state.product);
    
    const [isloading, setIsloading] = useState(false);
    const [couponData, setCouponData] = useState([]);

    const [code, setCode] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
    const [userMaxUses, setUserMaxUses] = useState('');
    const [applicableProducts, setApplicableProducts] = useState([]);

    

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCoupons = async (id) => {
            try{
                setIsloading(true);
                const response = await axios.get(`${server}/api/v2/coupons/get-all-coupons/${id}`, {withCredentials: true});
                setCouponData(response.data.coupons);
                setIsloading(false);
            }catch(err){
                console.log(err)
                toast.error(err.response.data.message);
                setIsloading(false);
            } 
       }
       fetchCoupons(store._id);
       dispatch( getAllProducts(store._id));
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${server}/api/v2/coupons/delete-coupon/${id}`, {withCredentials: true});
            toast.success(response.data.message);
            window.location.reload(); //to refresh the page after deleting a product
        } catch (error) {
            toast.error(error.message);
        }
        
    }

    const columns = [
        {field : "id", headerName : "Code", minWidth: 150, flex: 0.7},
        {field : "price", headerName : "Discount Value", minWidth: 100, flex: 0.5},
        {field : "usedcount", headerName : "Used Count", minWidth: 150, flex: 0.5},
        {field : "applicableProducts", headerName : "Applicable Products", minWidth: 200, flex: 0.8},
        {field : "isactive", headerName : "isActive", minWidth: 100, flex: 0.5},
        {field : "endDate", headerName : "End Date", minWidth: 100, flex: 0.5},
        
        
        {field : "Delete", headerName : "Delete", minWidth: 120, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        
            return (
                <>
                
                    <Button onClick={() => handleDelete(params.id)}>
                        <AiOutlineDelete size={20} className='cursor-pointer text-red-500' />
                    </Button>
                
                </>) 
            }
        }
    ]

    const rows = [ ];

    couponData && couponData.forEach((item) => {
        rows.push({
            id: item.code,
            price: "₦" + item.discountValue,
            usedcount : item.usedCount,
            applicableProducts: item.applicableProducts.map((productId) => products.find((product) => product._id === productId).name).join(', '),
            isactive: item.isActive,
            endDate: new Date(item.endDate).toISOString().slice(0, 10)
            
        })
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const couponData = {
            code,
            discountValue,
            discountType,
            startDate,
            endDate,
            minPurchaseAmount,
            userMaxUses,
            storeId : store._id,
            applicableProducts: applicableProducts.map((item) => item.value), // Array of ObjectIds (string)
          };

        try {
            const response = await axios.post(`${server}/api/v2/coupons/create-coupon`, couponData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            toast.success(response.data.message);
            setOpen(false);
            // Clear the form
            window.location.reload(); //to refresh the page after adding a new product
            
        } catch (error) {
            toast.error(error.response.data.message);   
        }


    }

    //for the react applicable products in the form
      const productOptions = products?.map(product => ({
        value: product._id,
        label: product.name
      })) || []; // Fallback to empty array if products is undefined
     

  return (
    <>
        {
            isLoading ? <Loader /> : (
                  <div style={{ minHeight: 400, width: '100%', }} >
                    <div className='flex justify-end mr-4'>
                        <div className={`${styles.button} !h-[45px] px-2 cursor-pointer`} onClick={() => setOpen(true)}>
                            <p className='text-white'><span className='font-bold text-[20px]'>+</span> Coupon Code</p>

                        </div>
                    </div>
                    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick />

                    {/* Add a modal for adding a new COUPON */}
                    {open && (
                        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center'>
                            <div className='w-[95%] md:w-[70%] lg:w-[50%] max-w-3xl h-auto max-h-[90vh] overflow-y-auto bg-white rounded-xl p-6 shadow-2xl relative'>
                            {/* Close Button */}
                            <div className='flex justify-end'>
                                <RxCross1
                                size={20}
                                className='cursor-pointer text-red-500 hover:text-red-600 transition'
                                onClick={() => setOpen(false)}
                                />
                            </div>

                            {/* Header */}
                            <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Create New Coupon</h2>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className='space-y-5' aria-required='true'>

                                {/* Coupon Code */}
                                <div>
                                <label className='block mb-2 font-medium'>Coupon Code <span className='text-red-500'>*</span></label>
                                <input
                                    type='text'
                                    name='code'
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='SAVE20'
                                    required
                                />
                                </div>

                                {/* Discount Section */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block mb-2 font-medium'>Discount Value <span className='text-red-500'>*</span></label>
                                    <input
                                    type='number'
                                    name='discountValue'
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='₦20'
                                    required
                                    />
                                </div>
                                <div>
                                    <label className='block mb-2 font-medium'>Discount Type <span className='text-red-500'>*</span></label>
                                    <select
                                    name='discountType'
                                    value={discountType}
                                    onChange={(e) => setDiscountType(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                    >
                                    <option value='' disabled>Select Discount Type</option>
                                    <option value='Percentage'>Percentage</option>
                                    <option value='Fixed'>Fixed</option>
                                    </select>
                                </div>
                                </div>

                                {/* Date Section */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block mb-2 font-medium'>Start Date <span className='text-red-500'>*</span></label>
                                    <input
                                    type='date'
                                    name='startDate'
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                    />
                                </div>
                                <div>
                                    <label className='block mb-2 font-medium'>End Date <span className='text-red-500'>*</span></label>
                                    <input
                                    type='date'
                                    name='endDate'
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                    />
                                </div>
                                </div>

                                {/* Minimum Purchase Amount */}
                                <div>
                                <label className='block mb-2 font-medium'>Minimum Purchase Amount <span className='text-gray-400'>(Optional)</span></label>
                                <input
                                    type='number'
                                    name='minPurchaseAmount'
                                    value={minPurchaseAmount}
                                    onChange={(e) => setMinPurchaseAmount(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='₦100'
                                    required
                                />
                                </div>

                                {/* Max Uses per User */}
                                <div>
                                <label className='block mb-2 font-medium'>Max Uses per User <span className='text-gray-400'>(Optional)</span></label>
                                <input
                                    type='number'
                                    name='userMaxUses'
                                    value={userMaxUses}
                                    onChange={(e) => setUserMaxUses(e.target.value)}
                                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='3'
                                />
                                </div>

                                {/* Applicable Products */}
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Applicable Products <span className="text-red-500">*</span></label>
                                    <Select
                                    isMulti
                                    options={productOptions} // [{ label: 'Product A', value: 'ObjectId1' }, ...]
                                    value={applicableProducts}
                                    onChange={setApplicableProducts}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    />
                                </div>
                                {/* Submit Button */}
                                <button
                                type='submit'
                                className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg'
                                >
                                Create Coupon
                                </button>
                            </form>
                            </div>
                        </div>
                        )
                    }

                  </div>
                
            )
        }
    </>
  )
}

export default AllCoupons