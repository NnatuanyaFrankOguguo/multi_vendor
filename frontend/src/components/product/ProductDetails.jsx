import React, { useState, useRef } from "react";
import styles from "../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


//REMEMBER ADD AN OPTION OR A REPLACE IF A PRODUCT DETAILS IS NOT ADDED LIKE ASKED IN THE FORM ALWAYS PUT A DEFAULT VALUE
// WITH THE // OPERATOR

const ProductDetails = ({ data }) => {
    const [select, setSelect] = useState(0);
    const [showZoom, setShowZoom] = useState(false);
    const imageRef = useRef(null);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [zoomLevel, setZoomLevel] = useState(2); // Initial zoom level
    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false);
    const navigate = useNavigate()

    const decrementCount = () => {
        if(count > 0) setCount(count - 1)
    }

    const incrementCount = () => {
        setCount(count + 1)
    }

    // MESSAGE SUBMIT
    const handleMessgaeSubmit = () => {
        navigate("/inbox?conservation=456789fdfdnfmhlm")
    }
  
    // Constants for zoom functionality
    const ZOOM_WINDOW_SIZE = 350; // Increased size for the zoom window
  
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
  
      const rect = imageRef.current.getBoundingClientRect();
  
      // Calculate cursor position relative to the image
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
  
      // Ensure values are between 0 and 1
      const boundedX = Math.max(0, Math.min(1, x));
      const boundedY = Math.max(0, Math.min(1, y));
  
      setZoomPosition({
        x: boundedX * 100,
        y: boundedY * 100,
      });
    };
  
    const handleWheel = (e) => {
      // Zoom in or out on mouse wheel scroll
      const delta = e.deltaY > 0 ? -0.1 : 0.1; // Adjust zoom level
      const newZoomLevel = Math.min(Math.max(zoomLevel + delta, 1), 4); // Limit between 1x and 4x
      setZoomLevel(newZoomLevel);
    };
  
    return (
      <div className="bg-white min-h-screen">
        {data ? (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side: Images */}
                <div className="w-full md:w-1/2 flex gap-4">
                    {/* Thumbnail Images */}
                    <div className="flex flex-col gap-3">
                        {data.image_Url.map((img, index) => (
                            <div key={index} className={`w-20 h-20 cursor-pointer border-2 transition-all duration-200 hover:border-blue-400 
                                ${select === index ? "border-blue-500" : "border-transparent"}`} 
                                onClick={() => setSelect(index)} >
                                <img
                                    src={img.url}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
    
                    {/* Main Image Container */}
                    <div className="relative flex-1" onMouseEnter={() => setShowZoom(true)} onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove} onWheel={handleWheel} >
                        {/* Darkened Overlay */}
                        {showZoom && (
                            <div className="absolute inset-0 bg-black bg-opacity-50"
                            style={{
                                maskImage: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 80px, black 150px)`,
                                WebkitMaskImage: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 80px, black 150px)`,
                            }}
                            >

                            </div>
                        )}
        
                        <img ref={imageRef} src={data.image_Url[select].url}nalt="Selected product" className="w-full h-full object-cover"/>
                    </div>
                </div>
    
                {/* Right side - Zoom Window */}
                {showZoom && (
                    <div className="hidden md:block absolute z-50"
                    style={{
                        top: "30%", // Keep the zoom window aligned vertically
                        left: "calc(50% + 10px)", // Adjusted to reduce the gap to 20px
                        width: `${ZOOM_WINDOW_SIZE}px`,
                        height: `${ZOOM_WINDOW_SIZE}px`,
                        border: "2px solid #ccc",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        backgroundImage: `url(${data.image_Url[select].url})`,
                        backgroundSize: `${zoomLevel * 100}%`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: "no-repeat",
                    }}
                    >

                    </div>
                )}
    
                {/* Product Name below Zoom Window */}
                <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {data.name || "Product Name"}
                        </h1>
                        <p className="text-gray-600">
                            {data.description || "Product description goes here"}
                        </p>
                        <div className="flex pt-1">
                            <h4 className={`${styles.productDiscountPrice}`}>
                                ₦{data.discount_price}
                            </h4>

                            <h3 className={`${styles.price}`}> {/*this is if there is discount price here (which is formerly the original price while the discount price is now initaily the recent price)*/}
                                {
                                    data.price ? data.price + "₦" : null
                                }
                            </h3>
                        </div>

                        <div className="flex items-center mt-10 justify-between pr-3">
                            <div>
                                <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                onClick={decrementCount}> -

                                </button>
                                <span className='bg-gray-200 text-gray-800 font-meduim px-4 py-[11px]'>
                                    {count}

                                </span>
                                <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                onClick={incrementCount}> +

                                </button>
                            </div>

                            <div>
                                {
                                    click ? (
                                        <AiFillHeart size={22} className='cursor-pointer  hover:scale-125 transition-transform duration-300'
                                        onClick={() => setClick(!click)} color={click ? 'red' : '#333'} title='Remove from wishlist'/>
                                    ) : (
                                        <AiOutlineHeart size={22} className='cursor-pointer hover:scale-125 transition-transform duration-300'
                                        onClick={() => setClick(!click)} color={click ? 'red' : '#333'} title='Add to wishlist'/>
                                    )
                                }
                            </div>
                        </div>

                        
                    </div>
                            {/* REMOVE THIS PARTICULA DIV OR SET IT WELL THAT THE IMAGE DOES NOT EXPAND AS THE DIV EXPANDS AND ALSO TELL CHATGPT TO MAKE THE ZOOM WINDOW RESPONSIVE AND THE TWO SMALLER IMAGES TOO RESPONSIVE WHEN ON MOBILE DEVICE */}
                    <div>
                        <div className={`${styles.button} mt-6 rounded h-11 flex items-center`}>
                            <span className="text-white flex items-center">
                                Add to cart <AiOutlineShoppingCart className="ml-1"/>
                            </span>
                        </div>

                        <div className="flex items-center pt-8">
                            <img src={data.shop.shop_avatar.url} alt="" className="w-[50px] h-[50px] rounded-full mr-2" />
                            <div className="pr-8">
                                <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                    {data.shop.name}
                                </h3>
                                <h3 className="pb-3 text-[15px]">
                                    ({data.shop.ratings}) Ratings
                                </h3>
                            </div>

                            <div className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}>
                                <span className="text-white flex items-center justify-center">
                                    Send Message <AiOutlineMessage className="ml-1" />
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        ) : null}
      </div>
    );
  };
  
  export default ProductDetails;