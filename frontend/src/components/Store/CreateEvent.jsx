import  React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";  // Import Quill Editor
import "react-quill/dist/quill.snow.css";  // Import Quill styles
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md"; // Importing delete icon
import { createEvent } from "../../redux/actions/event";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
   const { store } = useSelector((state) => state.store);
   
 
   const { success, error } = useSelector((state) => state.event); //recieving the data we got from the product state after creating a new product in the server database whether successful or not


   useEffect(() => {
    // Reset success and error on page load
    dispatch({ type: 'ReseteventCreate' });
    }, [dispatch]);
 
   useEffect(() => {
     if(error) {
       toast.error(error);
     }
     if(success) {
       toast.success("Event created successfully!");
       dispatch({ type: 'ReseteventCreate' });
        // this is to reset the success and error state in the product reducer
       //window.location.reload() // this is to make sure that after the user is logged out token that been cleared from cookie storage the page refreshes that if the user goes back to the homepage the
      //  navigate("/dashboard-events"); //after creating a new product, navigate to the dashboard all product page we dont have it yet we will create it later
 
      
        

    
 
     }

     return () => {
      dispatch({ type: 'ReseteventCreate' });
     };
   }, [dispatch, error, success]); // when new dispatch will happen..asin a new product is created, useEffect will run again
 
 
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");
   const [tags, setTags] = useState("");
   const [originalPrice, setOriginalPrice] = useState("");
   const [discountPrice, setDiscountPrice] = useState("");
   const [stock, setStock] = useState("");
   const [images, setImages] = useState([]);
   const [highlights, setHighlights] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
 
 
   const handleHighlightsChange = (value) => {
     setHighlights(value);
   };
 
   // add new image to the images array when the add icon is clicked
   const handleImageChange = (e) => {
     e.preventDefault();
     
     let files = Array.from(e.target.files);
     setImages((prevImages) => [...prevImages, ...files]);
   };
 
   //remove an image from the images array when the delete icon is clicked
   const removeImage = (index) => {
     setImages(images.filter((_, i) => i !== index));
   };

    // TIME LOGIC FOR THE START AND END DATE OF THE EVENT IN THE FORM
    const handleStartDateChange = (e) => {
      const startDate = new Date(e.target.value);
      const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      setStartDate(startDate);
      setEndDate(null);
      document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);

     }

     //to make the event end atleast three days

     const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
     }

     const today = new Date().toISOString().slice(0, 10);

     const minEndDate = startDate ? 
     new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : today;

     // TIME LOGIC FOR THE START AND END DATE OF THE EVENT IN THE FORM
  
   const handleSubmit = (e) => {
     e.preventDefault();
     console.log("Product submitted");
 
     const newForm = new FormData();
 
     //breaking the images array into an object to add each one to the form data
     images.forEach((image) => newForm.append('images', image));
 
     newForm.append('name', name);
     newForm.append('description', description);
     newForm.append('category', category);
     newForm.append('tags', tags);
     newForm.append('originalPrice', originalPrice);
     newForm.append('discountPrice', discountPrice);
     newForm.append('stock', stock);
     newForm.append('highlights', highlights);
     newForm.append('storeId', store._id);
     newForm.append('start_Date', startDate.toISOString());
     newForm.append('end_Date', endDate.toISOString());
 
      dispatch(createEvent(newForm)); // meaning we are sending the new form data to the server via the createEvent action in the store actions file
     
  
   };
 
   return (
     <div className="flex flex-col items-center justify-center overflow-y-scroll" style={{
       msOverflowStyle: "none",  // For Internet Explorer and Edge
       scrollbarWidth: "none"     // For Firefox
     }}>
       <div className='w-[90%] max-w-md md:max-w-lg lg:max-w-xl h-[80vh] rounded-[4px] p-3  '>
       
           <h2 className='text-2xl font-semibold font-Poppins text-center mb-6'>Create Event</h2>
           <form onSubmit={handleSubmit} className='space-y-4'>
             <div>
               <label className='block text-gray-700'>Name <span className='text-red-500'>*</span></label>
               <input type='text' value={name} onChange={(e) => setName(e.target.value)} 
                 className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Enter Event product name' />
             </div>
             
             <div>
               <label className='block text-gray-700'>Description <span className='text-red-500'>*</span></label>
               <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                 className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' rows='3' placeholder='Enter Event description'></textarea>
             </div>
 
             <div className='grid grid-cols-2 gap-4'>
               <div>
                 <label className='block text-gray-700'>Event Start Date</label>
                 <input type='date' id="start-date" value={startDate ? startDate.toISOString().slice(0,10) : ""} onChange={handleStartDateChange} min={today}
                   className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Enter your event start date' />
               </div>
               <div>
                 <label className='block text-gray-700'>Event End Date</label>
                 <input type='date' id='end-date' value={endDate ? endDate.toISOString().slice(0,10) : ""} onChange={handleEndDateChange} min={minEndDate}
                   className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='product Key Features' />
               </div>
             </div>

             <div>
                <label className='block text-gray-700'>Tags</label>
                <input type='text' value={tags} onChange={(e) => setTags(e.target.value)}
                  className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='product Key Features' />
              </div>
 
             <div>
               <label className='block text-gray-700'>Category <span className='text-red-500'>*</span></label>
               <select value={category} onChange={(e) => setCategory(e.target.value)}
                 className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500'>
                 <option value='' disabled>Select a Category</option>
                 {/* categoriesData.map can be added dynamically */}
                 {
                     categoriesData && categoriesData.map((category, index) => (
                       <option key={index} value={category.title}>{category.title}</option>
                     ))
                 }
               </select>
             </div>
 
             <div className='grid grid-cols-2 gap-4'>
               <div>
                 <label className='block text-gray-700'>Original Price</label>
                 <input type='number' value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
                   className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Original Price' />
               </div>
               <div>
                 <label className='block text-gray-700'>Discount Price <span className='text-red-500'>*</span></label>
                 <input type='number' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)}
                   className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Discount Price' />
               </div>
             </div>
 
              {/* Event Highlights (WYSIWYG) */}
             <div className="mt-4">
               <label className="block text-gray-700 mb-2">Highlights</label>
               <ReactQuill value={highlights} onChange={handleHighlightsChange} className="bg-white" />
             </div>
 
             <div>
               <label className='block text-gray-700'>Product Stock <span className='text-red-500'>*</span></label>
               <input type='number' value={stock} onChange={(e) => setStock(e.target.value)}
                 className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Enter product quantity' />
             </div>
 
             <div>
               <label className='block text-gray-700'>Upload Images <span className='text-red-500'>*</span></label>
               <input type='file' id='upload' className='hidden' multiple onChange={handleImageChange} />
 
               <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2'>
                 {[...Array(3)].map((_, index) => (
                   <div key={index} className='w-20 h-20 border rounded-md flex items-center justify-center relative'>
                     {images[index] ? (
                       <>
                         <img src={URL.createObjectURL(images[index])} alt='Product' className='w-full h-full object-cover rounded-md' />
                         <button 
                           onClick={() => removeImage(index)}
                           className="absolute top-0 right-1 bg-red-600 text-white p-1 rounded-full shadow-md">
                           <MdClose size={12} />
                         </button>
                       </>
                     ) : (
                       <label htmlFor='upload' className='cursor-pointer flex flex-col items-center text-gray-500 text-xs'>
                         <AiOutlinePlusCircle size={30} className='text-gray-500 ' />
                       </label>
                     )}
                     {index === 0 && images.length > 0 && (
                       <span className='absolute top-0 left-0 bg-yellow-500 text-white text-xs px-1 rounded-br-md'>Main</span>
                     )}
                   </div>
                 ))}
               </div>
 
             </div>
 
             <div className='flex justify-center'>
               <button type='submit' className='w-full px-5 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700'>
                 Create Event
               </button>
             </div>
           </form>
         
       </div>
     </div>
   );
 };


export default CreateEvent